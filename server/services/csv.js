import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateCSV(results, timestamp) {
  const outputDir = path.join(__dirname, '../../public/outputs');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filename = `${timestamp}-results.csv`;
  const filepath = path.join(outputDir, filename);

  const csvWriter = createObjectCsvWriter({
    path: filepath,
    header: [
      { id: 'url', title: 'URL' },
      { id: 'title', title: 'Title' },
      { id: 'excerpt', title: 'Excerpt' }
    ]
  });

  await csvWriter.writeRecords(results);

  return filepath;
}
