import { IncomingForm } from 'formidable';
import fs from 'fs-extra';
import path from 'path';
import rateLimit from 'express-rate-limit';

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

const uploadDir = path.join(process.cwd(), 'uploads');

fs.ensureDirSync(uploadDir);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  }

  // Run the rate limiter middleware
  await new Promise((resolve, reject) => {
    apiLimiter(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  // Clear old uploads
  try {
    const files = await fs.readdir(uploadDir);
    await Promise.all(
      files.map((file) => fs.unlink(path.join(uploadDir, file)))
    );
  } catch (err) {
    console.error('Error clearing old uploads:', err);
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024,
    filename: (name, ext, part, form) => {
      return `${Date.now()}-${part.originalFilename}`;
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error in API route:', err);
      return res
        .status(500)
        .json({ error: `Something went wrong! ${err.message}` });
    }

    if (!files.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    res.status(200).json({
      message: 'File uploaded successfully.',
      filename: files.file.newFilename,
    });
  });
};
