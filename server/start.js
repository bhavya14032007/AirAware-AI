const fs = require('fs');
const path = require('path');

const candidates = [
  path.join(__dirname, 'dist', 'index.js'),
  path.join(__dirname, 'dist', 'src', 'index.js'),
];

let target = candidates.find(p => fs.existsSync(p));

if (!target) {
  console.log('[AirAware Server] dist/index.js not found. Compiling TypeScript on startup...');
  const { execSync } = require('child_process');
  try {
    execSync('npx tsc', { stdio: 'inherit', cwd: __dirname });
    target = candidates.find(p => fs.existsSync(p));
  } catch (err) {
    console.error('[AirAware Server] Failed to run tsc on startup:', err);
  }
}

if (!target) {
  console.error('[AirAware Server] Fatal: Could not compile or locate server build.');
  process.exit(1);
}

console.log(`[AirAware Server] Launching: ${target}`);
require(target);
