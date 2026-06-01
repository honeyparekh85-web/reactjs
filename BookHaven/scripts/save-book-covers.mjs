import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public', 'images', 'books');

const covers = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'book-cover-data.json'), 'utf8'),
);

fs.mkdirSync(outDir, { recursive: true });

covers.forEach((dataUrl, index) => {
  const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');
  const filename = `book-${index + 1}.jpg`;
  fs.writeFileSync(path.join(outDir, filename), buffer);
  console.log(`Wrote ${filename} (${buffer.length} bytes)`);
});

console.log('Done.');
