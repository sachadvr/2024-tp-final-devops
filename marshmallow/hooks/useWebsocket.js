import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useWebSocketConnectionHook = (cb, event) => {

  const socketRef = useRef(null);

  function socketClient() {
    const socket = io();

    socket.on("connect", () => {
      socket.on(event, (data) => {
        cb(data);
      });
    });

    socket.on("disconnect", () => {
    });

    socket.on("connect_error", async (err) => {
      console.log(`connect_error due to ${err.message}`);
      await fetch('/api/socket');
    });

  
    socketRef.current = socket;
  }

  useEffect(() => {
    socketClient();
    return ()=> {
      socketRef?.current?.disconnect();
    }
  },[]);


}

export default useWebSocketConnectionHook;