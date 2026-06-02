import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const dirs = ['public', 'public/gallery'];

async function convertToWebP(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;
  
  const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  try {
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(webpPath);
    console.log(`Done: ${path.basename(filePath)} -> ${path.basename(webpPath)}`);
  } catch (err) {
    console.error(`Failed: ${filePath}`, err.message);
  }
}

async function run() {
  for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    const files = await readdir(dir);
    for (const file of files) {
      await convertToWebP(path.join(dir, file));
    }
  }
  console.log('Done! WebP files created.');
}

run();
