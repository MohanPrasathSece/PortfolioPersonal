import fg from 'fast-glob';
import path from 'node:path';
import fs from 'node:fs/promises';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd(), 'src', 'assets');

async function convertOne(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg'].includes(ext)) return false;
  const dir = path.dirname(file);
  const base = path.basename(file, ext);
  const out = path.join(dir, `${base}.png`);
  try {
    const buf = await fs.readFile(file);
    await sharp(buf).png({ compressionLevel: 9 }).toFile(out);
    console.log(`Converted: ${path.relative(process.cwd(), file)} -> ${path.relative(process.cwd(), out)}`);
    return true;
  } catch (e) {
    console.error('Failed converting', file, e.message);
    return false;
  }
}

async function run() {
  const files = await fg(['**/*.{jpg,jpeg,JPG,JPEG}'], { cwd: ROOT, absolute: true });
  if (files.length === 0) {
    console.log('No JPG/JPEG files found under', ROOT);
    return;
  }
  let converted = 0;
  for (const f of files) {
    const ok = await convertOne(f);
    if (ok) converted++;
  }
  console.log(`\nDone. Converted ${converted}/${files.length} files to PNG. Originals kept.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
