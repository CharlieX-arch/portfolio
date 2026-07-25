const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', '.next', 'output', 'static');
const dest = path.join(__dirname, '..', 'out');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.error('Source static output not found:', src);
    process.exit(0);
  }
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(src, dest);
console.log('Exported static files to', dest);
