import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const files = fs.readdirSync(publicDir);

for (const file of files) {
  const filePath = path.join(publicDir, file);
  const stats = fs.statSync(filePath);
  if (stats.isFile()) {
    console.log(`${file}: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  }
}
