import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outputDir = path.resolve('public');

// Standard icon SVG (with squircle background for browser tab favicon)
const standardIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="smartMetroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#073B73" />
      <stop offset="100%" stop-color="#008C8C" />
    </linearGradient>
    <filter id="iconShadow" x="-10%" y="-10%" width="120%" height="125%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#062D59" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background squircle card with soft rounded corners -->
  <rect x="20" y="20" width="472" height="472" rx="112" fill="url(#smartMetroGrad)" />

  <!-- Inner Smart Metro Train scaled and centered -->
  <!-- Original coordinate box is 36x36; scaling by 9.5x places it nicely in center -->
  <g transform="translate(85, 85) scale(9.5)">
    <!-- Train front outline -->
    <rect x="7" y="5" width="22" height="23" rx="5" fill="#FFFFFF" />
    <!-- Train windshield -->
    <path d="M10 9H26V16C26 16.5 25.5 17 25 17H11C10.5 17 10 16.5 10 16V9Z" fill="#073B73" />
    <!-- Front destination display -->
    <rect x="13" y="7" width="10" height="1.5" rx="0.5" fill="#22B573" />
    <!-- Headlights -->
    <circle cx="12.5" cy="22.5" r="2" fill="#F4C542" />
    <circle cx="23.5" cy="22.5" r="2" fill="#F4C542" />
    <!-- Center badge -->
    <path d="M16.5 20.5H19.5" stroke="#008C8C" stroke-width="1.5" stroke-linecap="round" />
    <!-- Wheels -->
    <rect x="10" y="28" width="4" height="3" rx="1" fill="#062D59" />
    <rect x="22" y="28" width="4" height="3" rx="1" fill="#062D59" />
    <!-- Track line -->
    <path d="M5 32H31" stroke="#22B573" stroke-width="2" stroke-linecap="round" />
  </g>

  <!-- Gold notification pip matching MetroLogo -->
  <circle cx="430" cy="82" r="32" fill="#F4C542" stroke="#FFFFFF" stroke-width="12" />
</svg>
`;

// Full-bleed SVG for Apple Touch Icon & PWA maskable icons
// Apple automatically rounds the corners of apple-touch-icon, so having a full bleed background prevents black corner artifacts
const fullBleedSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="smartMetroGradFull" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#073B73" />
      <stop offset="100%" stop-color="#008C8C" />
    </linearGradient>
  </defs>

  <!-- Full bleed background -->
  <rect width="512" height="512" fill="url(#smartMetroGradFull)" />

  <!-- Inner Smart Metro Train centered inside safe area (65% safe zone for PWA maskable) -->
  <g transform="translate(100, 100) scale(8.66)">
    <!-- Train front outline -->
    <rect x="7" y="5" width="22" height="23" rx="5" fill="#FFFFFF" />
    <!-- Train windshield -->
    <path d="M10 9H26V16C26 16.5 25.5 17 25 17H11C10.5 17 10 16.5 10 16V9Z" fill="#073B73" />
    <!-- Front destination display -->
    <rect x="13" y="7" width="10" height="1.5" rx="0.5" fill="#22B573" />
    <!-- Headlights -->
    <circle cx="12.5" cy="22.5" r="2" fill="#F4C542" />
    <circle cx="23.5" cy="22.5" r="2" fill="#F4C542" />
    <!-- Center badge -->
    <path d="M16.5 20.5H19.5" stroke="#008C8C" stroke-width="1.5" stroke-linecap="round" />
    <!-- Wheels -->
    <rect x="10" y="28" width="4" height="3" rx="1" fill="#062D59" />
    <rect x="22" y="28" width="4" height="3" rx="1" fill="#062D59" />
    <!-- Track line -->
    <path d="M5 32H31" stroke="#22B573" stroke-width="2" stroke-linecap="round" />
  </g>

  <!-- Gold notification pip matching MetroLogo -->
  <circle cx="410" cy="102" r="30" fill="#F4C542" stroke="#FFFFFF" stroke-width="10" />
</svg>
`;

async function generate() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write vector SVG favicon
  fs.writeFileSync(path.join(outputDir, 'favicon.svg'), standardIconSvg.trim());
  console.log('✓ Created public/favicon.svg');

  const standardBuffer = Buffer.from(standardIconSvg);
  const fullBleedBuffer = Buffer.from(fullBleedSvg);

  // Generate PNG icons
  await sharp(standardBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(outputDir, 'favicon-32x32.png'));
  console.log('✓ Created public/favicon-32x32.png');

  await sharp(standardBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(outputDir, 'favicon-16x16.png'));
  console.log('✓ Created public/favicon-16x16.png');

  // Apple Touch Icon (180x180)
  await sharp(fullBleedBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));
  console.log('✓ Created public/apple-touch-icon.png');

  // PWA / Android 192x192
  await sharp(standardBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(outputDir, 'icon-192.png'));
  console.log('✓ Created public/icon-192.png');

  // PWA / Android 512x512
  await sharp(standardBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'icon-512.png'));
  console.log('✓ Created public/icon-512.png');

  // Maskable 512x512
  await sharp(fullBleedBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'icon-maskable-512.png'));
  console.log('✓ Created public/icon-maskable-512.png');

  // Also create favicon.ico from 32x32 png
  // Note: Modern browsers accept PNG favicon or SVG, but having favicon.ico directly prevents 404s
  const ico32Buffer = await sharp(standardBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(outputDir, 'favicon.ico'), ico32Buffer);
  console.log('✓ Created public/favicon.ico');
}

generate().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
