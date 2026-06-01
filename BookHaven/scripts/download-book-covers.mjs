import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'images', 'books');

const covers = [
  { file: 'book-1.jpg', url: 'https://covers.openlibrary.org/b/id/15103233-L.jpg' },
  { file: 'book-2.jpg', url: 'https://covers.openlibrary.org/b/id/14407898-L.jpg' },
  { file: 'book-3.jpg', url: 'https://covers.openlibrary.org/b/isbn/9781619634442-L.jpg' },
  { file: 'book-4.jpg', url: 'https://covers.openlibrary.org/b/isbn/9780143034902-L.jpg' },
  { file: 'book-5.jpg', url: 'https://covers.openlibrary.org/b/isbn/9780307744432-L.jpg' },
];

fs.mkdirSync(outDir, { recursive: true });

for (const { file, url } of covers) {
  const response = await fetch(url);
  if (!response.ok) {
    console.warn(`Skip ${file}: HTTP ${response.status}`);
    continue;
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(path.join(outDir, file), buffer);
  console.log(`Wrote ${file} (${buffer.length} bytes)`);
}

console.log('Done.');
