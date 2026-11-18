// generate.mjs — renders poster.svg (the authored artwork) to entry.png at
// exactly 1024x1024 using the locally cached Chromium headless shell.
// The competition program itself (main.ts) only copies entry.png; this script
// is the authoring tool that produced the image, kept in the repo for review.
//
//   node generate.mjs
//
// No network is used: the poster is a self-contained SVG with no external refs.

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, copyFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const svgPath = join(here, 'poster.svg');
const shotPath = join(here, 'render.png');
const entryPath = join(here, 'entry.png');

function findChromium() {
  const cache = join(homedir(), '.cache', 'ms-playwright');
  for (const dir of readdirSync(cache).sort().reverse()) {
    const bin = join(cache, dir, 'chrome-headless-shell-linux64', 'chrome-headless-shell');
    if (dir.startsWith('chromium_headless_shell') && existsSync(bin)) return bin;
  }
  throw new Error('chromium headless shell not found in ' + cache);
}

const chrome = findChromium();
execFileSync(chrome, [
  '--headless',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1024,1024',
  '--default-background-color=00000000',
  '--screenshot=' + shotPath,
  pathToFileURL(svgPath).href,
], { stdio: 'inherit' });

copyFileSync(shotPath, entryPath);
console.log('wrote', entryPath);
