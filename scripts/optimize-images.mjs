/**
 * Resize + compress everything under public/images/.
 * Run after adding new photos: npm run optimize-images
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images");

/** Max width + JPEG quality by folder name. */
const RULES = {
  heroes: { maxWidth: 1600, quality: 82 },
  gallery: { maxWidth: 900, quality: 80 },
  audiences: { maxWidth: 1000, quality: 80 },
  winners: { maxWidth: 1200, quality: 82 },
  program: { maxWidth: 1400, quality: 82 },
};

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else if (/\.(jpe?g|png)$/i.test(e.name)) files.push(p);
  }
  return files;
}

function ruleFor(filePath) {
  const rel = path.relative(ROOT, filePath);
  const folder = rel.split(path.sep)[0];
  return RULES[folder] ?? { maxWidth: 1400, quality: 82 };
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

async function optimize(filePath) {
  const before = (await fs.stat(filePath)).size;
  const { maxWidth, quality } = ruleFor(filePath);
  const img = sharp(filePath, { failOn: "none" });
  const meta = await img.metadata();

  if (!meta.width) {
    console.warn(`skip (unreadable): ${filePath}`);
    return;
  }

  const pipeline = img.rotate();

  if (meta.width > maxWidth) {
    pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  const out = filePath + ".opt";
  if (/\.png$/i.test(filePath)) {
    await pipeline
      .png({ quality, compressionLevel: 9, effort: 10 })
      .toFile(out);
  } else {
    await pipeline.jpeg({ quality, mozjpeg: true }).toFile(out);
  }

  await fs.rename(out, filePath);
  const after = (await fs.stat(filePath)).size;
  const pct = before ? Math.round((1 - after / before) * 100) : 0;
  console.log(
    `${path.relative(ROOT, filePath)}: ${formatBytes(before)} → ${formatBytes(after)} (${pct}% smaller)`
  );
}

const files = await walk(ROOT);
console.log(`Optimizing ${files.length} images…\n`);
for (const f of files) {
  await optimize(f);
}
console.log("\nDone.");
