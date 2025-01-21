import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';

let io;

export default function handler(req, res) {
  if (!io) {
    io = new Server(res.socket.server, {
      cors: {
        origin: "*",
      },
    });

    io.on('connection', (socket) => {

      const dataPath = path.join(process.cwd(), 'data', 'content.txt');
      fs.watch(dataPath, (eventType) => {
        if (eventType === 'change') {
          const content = fs.readFileSync(dataPath, 'utf8');
          socket.emit('contentUpdate', { content });
        }
      });

      const uploadsPath = path.join(process.cwd(), 'uploads');

      fs.watch(uploadsPath, (eventType, filename) => {
        if (eventType === 'rename') {
          socket.emit('uploadUpdate', { filename });
        }
      });

      socket.on('disconnect', () => {
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
