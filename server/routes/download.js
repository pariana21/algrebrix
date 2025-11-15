import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { file } = req.query;

    if (!file || !file.endsWith('.csv')) {
      return res.status(400).json({ error: 'Invalid file parameter' });
    }

    const sanitizedFile = path.basename(file);

    const filePath = path.join(__dirname, '../../public/outputs', sanitizedFile);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath, sanitizedFile, (err) => {
      if (err) {
        console.error('Download error:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to download file' });
        }
      }
    });

  } catch (error) {
    console.error('Download route error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
