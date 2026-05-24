import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function replaceExtensions(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceExtensions(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jsx', '.js', '.css', '.json'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        const originalContent = content;
        
        // Regex to match our image paths ending in .png or .jpeg or .jpg
        content = content.replace(/\.png/gi, '.webp');
        content = content.replace(/\.jpeg/gi, '.webp');
        content = content.replace(/\.jpg/gi, '.webp');
        
        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Updated extensions in: ${fullPath}`);
        }
      }
    }
  }
}

replaceExtensions(srcDir);
console.log('Extensions replaced successfully.');
