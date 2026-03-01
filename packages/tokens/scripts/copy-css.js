const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const cssDir = path.join(__dirname, '..', 'src', 'css');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const lightCss = fs.readFileSync(path.join(cssDir, 'light.css'), 'utf8');
const darkCss = fs.readFileSync(path.join(cssDir, 'dark.css'), 'utf8');

fs.writeFileSync(path.join(distDir, 'styles.css'), `${lightCss}\n${darkCss}`);

console.log('✓ CSS files copied to dist/styles.css');
