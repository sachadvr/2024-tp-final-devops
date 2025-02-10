import path from 'path';
import fs from 'fs';
import rateLimit from 'express-rate-limit';

// Create the rate limiter middleware
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  apiLimiter(req, res, () => {
    try {
      const content = req.body.content || '';

      if (content.length > 30000) {
        return res.status(400).send('Content too long. Max 30000 characters.');
      }

      const dataDir = path.join(process.cwd(), 'data');

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }

      fs.writeFileSync(path.join(dataDir, 'content.txt'), content, 'utf8');
      return res.status(200).send('Content saved successfully.');
    } catch (err) {
      console.error(err);
      return res.status(500).send('Error saving content.');
    }
  });
}
