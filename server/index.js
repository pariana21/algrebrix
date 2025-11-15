import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chatRouter from './routes/chat.js';
import agentRouter from './routes/agent.js';
import downloadRouter from './routes/download.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRouter);
app.use('/api/agent', agentRouter);
app.use('/api/download', downloadRouter);

app.use(express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
  if (!req.path.startsWith('/api') && !req.path.startsWith('/public')) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  } else {
    next();
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Algebrix.ai Beta server running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://0.0.0.0:${PORT}/api`);
});
