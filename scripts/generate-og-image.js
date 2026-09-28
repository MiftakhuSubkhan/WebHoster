const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create high-res 1200x630 Open Graph banner for WebHoster.co.id
const svgBanner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090C10" />
      <stop offset="60%" stop-color="#0D131C" />
      <stop offset="100%" stop-color="#090C10" />
    </linearGradient>

    <!-- Emerald Glow Radial Gradient -->
    <radialGradient id="emeraldGlow" cx="20%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#00E599" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#00E599" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="blueGlow" cx="80%" cy="70%" r="45%">
      <stop offset="0%" stop-color="#0066FF" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#0066FF" stop-opacity="0" />
    </radialGradient>

    <!-- Badge Linear Gradient -->
    <linearGradient id="logoBadge" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00FFA8" />
      <stop offset="50%" stop-color="#00E599" />
      <stop offset="100%" stop-color="#00BA7A" />
    </linearGradient>

    <!-- Grid Pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B2433" stroke-width="1" stroke-opacity="0.4" />
    </pattern>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bg)" />

  <!-- Cyber Grid -->
  <rect width="1200" height="630" fill="url(#grid)" />

  <!-- Ambient Glows -->
  <rect width="1200" height="630" fill="url(#emeraldGlow)" />
  <rect width="1200" height="630" fill="url(#blueGlow)" />

  <!-- Decorative Border -->
  <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="#1B2433" stroke-width="2" />
  <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="#00E599" stroke-width="2" stroke-opacity="0.2" />

  <!-- Brand Logo & Name (Top Left) -->
  <g transform="translate(80, 75)">
    <!-- W Logo Box -->
    <rect width="56" height="56" rx="16" fill="url(#logoBadge)" />
    <!-- Letter W -->
    <path d="M 12 16 L 20 16 L 26 38 L 30 25 L 34 38 L 40 16 L 48 16 L 39 44 L 32 44 L 29 34 L 26 44 L 19 44 Z" fill="#090C10" />

    <!-- Text: WebHoster.co.id -->
    <text x="72" y="38" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="32" fill="#FFFFFF" letter-spacing="-0.5">WebHoster<tspan fill="#00E599">.co.id</tspan></text>
  </g>

  <!-- Pill Badge (Upper Right) -->
  <g transform="translate(800, 80)">
    <rect width="320" height="42" rx="21" fill="#00E599" fill-opacity="0.12" stroke="#00E599" stroke-opacity="0.35" stroke-width="1.5" />
    <text x="160" y="26" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="13" fill="#00E599" letter-spacing="1">⚡ WEBSITE SIAP PAKAI 24 JAM</text>
  </g>

  <!-- Main Headline -->
  <g transform="translate(80, 230)">
    <text font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="50" fill="#FFFFFF" letter-spacing="-1">
      Jasa Pembuatan Website,
    </text>
    <text y="68" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="50" fill="#00E599" letter-spacing="-1">
      Domain &amp; Cloud Hosting Cepat
    </text>
    <text y="140" font-family="Arial, Helvetica, sans-serif" font-weight="normal" font-size="22" fill="#94A3B8">
      Solusi all-in-one template WordPress siap pakai untuk UMKM &amp; Bisnis.
    </text>
    <text y="172" font-family="Arial, Helvetica, sans-serif" font-weight="normal" font-size="22" fill="#94A3B8">
      Langsung online dengan domain resmi (.com / .id) + NVMe server 99.9% uptime.
    </text>
  </g>

  <!-- Bottom Value Highlights (3 Pillars) -->
  <g transform="translate(80, 480)">
    <!-- Pillar 1 -->
    <rect x="0" y="0" width="320" height="68" rx="16" fill="#121824" stroke="#1B2433" stroke-width="1.5" />
    <text x="24" y="42" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="18" fill="#FFFFFF">
      🌐 Gratis Domain .com / .id
    </text>

    <!-- Pillar 2 -->
    <rect x="340" y="0" width="320" height="68" rx="16" fill="#121824" stroke="#1B2433" stroke-width="1.5" />
    <text x="364" y="42" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="18" fill="#FFFFFF">
      ⚡ NVMe Cloud Uptime 99.9%
    </text>

    <!-- Pillar 3 -->
    <rect x="680" y="0" width="360" height="68" rx="16" fill="#121824" stroke="#00E599" stroke-opacity="0.4" stroke-width="1.5" />
    <text x="704" y="42" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="18" fill="#00E599">
      🛠️ Elementor Tanpa Koding
    </text>
  </g>
</svg>`;

async function run() {
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  const appDir = path.join(rootDir, 'src', 'app');

  const svgBuffer = Buffer.from(svgBanner);

  // Generate 1200x630 PNG
  const ogPngBuffer = await sharp(svgBuffer).resize(1200, 630).png().toBuffer();
  // Also generate standard JPG fallback
  const ogJpgBuffer = await sharp(svgBuffer).resize(1200, 630).jpeg({ quality: 90 }).toBuffer();

  // Save to public/
  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogPngBuffer);
  fs.writeFileSync(path.join(publicDir, 'og-image.jpg'), ogJpgBuffer);
  fs.writeFileSync(path.join(publicDir, 'og-image.svg'), svgBanner);

  // Save to src/app/ for Next.js App Router automated Open Graph convention
  fs.writeFileSync(path.join(appDir, 'opengraph-image.png'), ogPngBuffer);
  fs.writeFileSync(path.join(appDir, 'twitter-image.png'), ogPngBuffer);

  console.log('✓ Successfully generated Open Graph images (1200x630):');
  console.log('  - public/og-image.png (' + ogPngBuffer.length + ' bytes)');
  console.log('  - public/og-image.jpg (' + ogJpgBuffer.length + ' bytes)');
  console.log('  - src/app/opengraph-image.png');
  console.log('  - src/app/twitter-image.png');
}

run().catch(err => {
  console.error('Error generating OG image:', err);
  process.exit(1);
});
