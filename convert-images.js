import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'public', 'assets');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const webpPath = fullPath.replace(ext, '.webp');
        try {
          await sharp(fullPath).webp({ quality: 80 }).toFile(webpPath);
          console.log(`Converted: ${fullPath} -> ${webpPath}`);
          // Remove original file after successful conversion to save space and ensure we replace all refs
          fs.unlinkSync(fullPath);
        } catch (err) {
          console.error(`Error converting ${fullPath}:`, err);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting image conversion...');
  await processDirectory(assetsDir);
  console.log('Image conversion complete.');
}

run();
