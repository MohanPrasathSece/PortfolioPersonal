import fg from 'fast-glob';
import path from 'node:path';
import fs from 'node:fs/promises';

const SRC = path.resolve(process.cwd(), 'src');

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function processFile(file) {
  let text = await fs.readFile(file, 'utf8');
  let changed = false;

  // Placeholder no-op replace to keep logic consistent (we build output manually below)
  text = text;

  const regex = /([\w\-/_.]+)\.(jpe?g)/gi;
  let match;
  let offset = 0;
  let output = '';
  const original = text;
  while ((match = regex.exec(original)) !== null) {
    const [full, base] = match;
    const start = match.index;
    const end = start + full.length;
    output += original.slice(offset, start);

    const pngPathRel = `${base}.png`;
    // Build an absolute path candidate only for src/assets references
    let pngAbsCandidate = null;
    if (pngPathRel.startsWith('@/')) {
      pngAbsCandidate = path.resolve(process.cwd(), 'src', pngPathRel.slice(2));
    } else if (pngPathRel.startsWith('/src/')) {
      pngAbsCandidate = path.resolve(process.cwd(), pngPathRel.slice(1));
    } else if (pngPathRel.startsWith('src/')) {
      pngAbsCandidate = path.resolve(process.cwd(), pngPathRel);
    } else if (pngPathRel.includes('/assets/')) {
      // Try assets root
      pngAbsCandidate = path.resolve(process.cwd(), 'src', pngPathRel.split('/assets/')[1] ? `assets/${pngPathRel.split('/assets/')[1]}` : '');
    }

    // Fallback: don't validate existence if we can't resolve; still replace (Vite alias may resolve)
    let exists = true;
    if (pngAbsCandidate) exists = await fileExists(pngAbsCandidate).catch(() => true);

    if (exists) {
      output += pngPathRel;
      changed = true;
    } else {
      output += full; // keep original
    }
    offset = end;
  }
  output += original.slice(offset);

  if (changed) {
    await fs.writeFile(file, output, 'utf8');
    console.log('Updated refs in', path.relative(process.cwd(), file));
  }
}

async function run() {
  const files = await fg(['src/**/*.{ts,tsx,js,jsx,css,md,mdx,html}'], { absolute: true });
  for (const f of files) {
    await processFile(f);
  }
  console.log('Reference update complete.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
