import { useEffect, useState, useRef, use, useCallback } from 'react';
import useWebSocketConnectionHook from "../hooks/useWebsocket";

export default function Home() {
  const textareaRef = useRef(null);
  const [notificationText, setNotificationText] = useState('Your changes have been saved');
  const [notificationClass, setNotificationClass] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState('');
  const [isNotificationError, setIsNotificationError] = useState(false);
  const [link, setLink] = useState('');
  const fetchFile = useCallback(async () => {
    try {
      const res = await fetch('/api/get-file');
      if (res.ok) {
        const data = await res.text();
        if (textareaRef.current) {
          const regex = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/i;
          if (regex.test(data)) {
            setLink(data);
          }else {
            setLink('');
          }
          textareaRef.current.value = data;
          autoResizeTextArea();
        }
      }
    } catch (err) {
      console.error(err);
    }
   
  }, []);

  const fetchFileName = useCallback(async () => {
    try {
      const res = await fetch('/api/get-filename');
      if (res.ok) {
        const data = await res.text();
        setCurrentFile(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useWebSocketConnectionHook((data) => {
    if (textareaRef.current) {
          const regex = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/i;
          if (regex.test(data.content)) {
            setLink(data.content);
          }else {
            setLink('');
          }
          textareaRef.current.value = data.content;
          autoResizeTextArea();
        }
  }, "contentUpdate");

  useWebSocketConnectionHook((data) => {
    setCurrentFile(data.filename);

    // list all files
  }, "uploadUpdate");


  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
    
    fetchFile();
    fetchFileName();
  }, [fetchFile, fetchFileName]);


  const autoResizeTextArea = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const saveContent = (content) => {
    fetch('/api/save-file', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ content }),
    })
      .then((res) => res.text())
      .then(() => showNotification('Successfully synced with server'))
      .catch((err) => console.error(err));
  };

  const showNotification = (message = 'Successfully synced with server', error=false) => {
    setNotificationText(message);
    setIsNotificationError(error);
    setNotificationClass('popup-notification-animation-in');
  };


  const handleAnimationEnd = (e) => {
    if (e.animationName === 'appearfromthetop') {
      setNotificationClass('popup-notification-animation-out');
    } else if (e.animationName === 'disapearfromthetop') {
      setNotificationClass('');
    }
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Could not copy text', err);
    }
    document.body.removeChild(textArea);
  };

  const fallbackPaste = () => {
    const pastedText = prompt('Paste your text here:');
    if (pastedText !== null && textareaRef.current) {
      textareaRef.current.value += pastedText;
      autoResizeTextArea();
      saveContent(textareaRef.current.value);
      showNotification();
    }
  };

  const handleCopy = () => {
    const text = textareaRef.current.value;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => console.log('Text copied to clipboard'))
        .catch((err) => console.error('Failed to copy text: ', err));
    } else {
      fallbackCopy(text);
    }
  };

  const handlePaste = () => {
    if (!textareaRef.current) return;
    textareaRef.current.focus();
    textareaRef.current.value = '';
    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard.readText()
        .then((text) => {
          textareaRef.current.value += text;
          autoResizeTextArea();
          saveContent(textareaRef.current.value);
          showNotification();
        })
        .catch((err) => {
          console.error('Failed to read from clipboard: ', err);
          fallbackPaste();
        });
    } else {
      fallbackPaste();
    }
  };

  
  const handleClear = () => {
    if (!textareaRef.current) return;
    textareaRef.current.value = '';
    autoResizeTextArea();
    saveContent('');
    showNotification();
  };

  
  const handleInput = (e) => {
    autoResizeTextArea();
    saveContent(e.target.value);
  };

  
  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsModalOpen(true);

    };
    const handleDrop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsModalOpen(false);


      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        
        const fileInput = document.getElementById('files');
        fileInput.files = event.dataTransfer.files;
        document.getElementById('submit').click();
      }
    };

    const handleDragLeave = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsModalOpen(false);
    };

    document.body.addEventListener('dragover', handleDragOver);
    document.body.addEventListener('dragenter', handleDragOver);
    document.body.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop, false);

    return () => {
      document.body.removeEventListener('dragover', handleDragOver);
      document.body.removeEventListener('dragenter', handleDragOver);
    };
  }, []);

  
  const handleFileChange = () => {
    document.getElementById('submit').click();
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('files');
    if (!fileInput.files || fileInput.files.length === 0) {
      alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/upload-file');

      const textContainer = document.querySelector('.text-container');

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          textContainer.innerText = `Uploading: ${percentComplete.toFixed(2)}%`;
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          textContainer.innerText = 'File uploaded';
          showNotification('Successfully uploaded file, Refreshing page...');
          setTimeout(() => {
            textContainer.innerText = 'Drag and drop files or text here';
          }, 1000);
        }else {
          showNotification('Error uploading file', true);
        }
      };

      xhr.send(formData);
    } catch (err) {
      alert('An error occurred while uploading the file.');
      console.error(err);
    }
  }

  
  return (
    <div>
      
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2>Drag and Drop</h2>
            <p>Drag and drop files here to upload them</p>

            <div className='upload'>
              <img src='upload.png' alt="" width="100px" height="100px" />
              </div>
          </div>  
        </div>)}

      <div
        className={`popup-notification ${notificationClass} ${isNotificationError ? 'error' : ''}`}
        onAnimationEnd={handleAnimationEnd}
      >
        {notificationText}
      </div>

      <div className="content">
        <h1>Marshmallow <span>(v2)</span></h1>

        <div className="filename">
        {currentFile && (
          <a href={`/uploads/${currentFile}`}>
            <strong>{currentFile}</strong>
          </a>
        )}
        </div>
        <br/>

        <a href={`/uploads/${currentFile}`} id="img">

          {currentFile && (currentFile.toLowerCase().endsWith('.png') || currentFile.toLowerCase().endsWith('.jpg') || currentFile.toLowerCase().endsWith('.jpeg') || currentFile.toLowerCase().endsWith('.gif')) ?
            <img
              src={`/uploads/${currentFile}`}
              onError={(e) => e.target.style.display = 'none'}
              alt=""
              width="100px"
              height="100px"
            /> : null
          }
          {currentFile && !(currentFile.toLowerCase().endsWith('.png') || currentFile.toLowerCase().endsWith('.jpg') || currentFile.toLowerCase().endsWith('.jpeg') || currentFile.toLowerCase().endsWith('.gif')) ?
            <img
              src='default-icon.png'
              alt=""
              width="100px"
              height="100px"
            /> : null
          }
        </a>
        <br/>

        <div className="container" id="container">
          <div className="text-container">
            Drag and drop files or text here
          </div>

          <form
            action=""
            method="post"
            encType="multipart/form-data"
            id="upload-form"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="files" className="btn">Select File</label>
              <input
                id="files"
                name="file"
                style={{ visibility: 'hidden', position: 'absolute' }}
                type="file"
                onChange={handleFileChange}
              />
              <button
                type="submit"
                id="submit"
                style={{ visibility: 'hidden', position: 'absolute' }}
              />
            </div>
          </form>
        </div>

        {link && (
          <div className="link">
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </div>
        )}
        <textarea
          id="textarea"
          ref={textareaRef}
          placeholder="You can paste text here, your text will be saved automatically"
          rows={10}
          cols={50}
          onInput={handleInput}
        ></textarea>

        <div className="btns">
          <a href="#" id="clear-button" onClick={handleClear}>❌</a>
          <a href="#" id="copy-button" onClick={handleCopy}>📋</a>
          <a href="#" id="paste-button" onClick={handlePaste}>📄</a>
          <a href={`/uploads/${currentFile}`} id="dl-button">⬇️</a>
        </div>

        <br/>
        <section>
          <span>
            <b>marshmallow.rf.gd</b> is a simple website where you can paste text
            or upload files. The text will be saved automatically and the files
            will be uploaded to the server. You can also drag and drop files
            here. The files will be uploaded to the server and displayed on the page.
            The text will be saved automatically and displayed on the page.
          </span>
          <footer className="footer">Created by @sachadvr</footer>
        </section>
      </div>
    </div>
  );
}