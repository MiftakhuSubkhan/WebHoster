const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create WebHoster Logo SVG
// Palette: #00E599 (Neon Mint / Cyber Emerald), #00F5A0, #00C882, #090C10 (Dark Slate Background)
// Beautiful squircle with gradient, subtle glowing border, and a bold modern geometric 'W'
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00FFA8" />
      <stop offset="50%" stop-color="#00E599" />
      <stop offset="100%" stop-color="#00BA7A" />
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#009960" stop-opacity="0.2" />
    </linearGradient>
  </defs>

  <!-- Squircle Base with smooth rounded corners -->
  <rect x="16" y="16" width="480" height="480" rx="124" fill="url(#bgGrad)" />
  <rect x="16" y="16" width="480" height="480" rx="124" fill="none" stroke="url(#borderGrad)" stroke-width="12" />

  <!-- Bold Modern Geometric 'W' (Optimized for ultra-crisp display from 16px to 512px) -->
  <path
    d="M 104 144
       L 172 144
       L 224 336
       L 256 228
       L 288 336
       L 340 144
       L 408 144
       L 336 384
       L 280 384
       L 256 304
       L 232 384
       L 176 384
       Z"
    fill="#090C10"
  />
</svg>`;

// Convert SVG to various sizes and generate ICO
async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  const appDir = path.join(rootDir, 'src', 'app');

  // Save base SVG to public and src/app
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), svgIcon, 'utf-8');
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgIcon, 'utf-8');
  console.log('✓ SVG icons saved to public and src/app');

  // Generate PNG sizes
  const svgBuffer = Buffer.from(svgIcon);

  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  // Save Apple touch icon & standard PNG icons
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);
  fs.writeFileSync(path.join(appDir, 'icon.png'), png512);

  // Build genuine ICO file containing 16x16, 32x32, 48x48 PNG frames
  const images = [
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(images.length, 4); // count

  const dirSize = 16 * images.length;
  let offset = 6 + dirSize;

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width, 0);
    entry.writeUInt8(img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([
    header,
    ...entries,
    ...images.map(img => img.buffer)
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('✓ favicon.ico created successfully (' + icoBuffer.length + ' bytes)');
}

main().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
