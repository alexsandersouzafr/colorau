import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

function isImageFile(filename: string) {
  // Only consider files in `public/` root (not people/docs subfolders).
  return /\.(jpe?g|png|webp)$/i.test(filename);
}

const EXCLUDED_GALLERY_FILES = new Set(["foto-19.jpg", "og-thumb.jpg"]);

function isExcluded(filename: string) {
  return EXCLUDED_GALLERY_FILES.has(filename.toLowerCase());
}

function stableSortByName(a: string, b: string) {
  // Keep ordering deterministic across environments.
  return a.localeCompare(b);
}

export function getGalleryPhotos() {
  const entries = fs.readdirSync(PUBLIC_DIR, { withFileTypes: true });

  const files = entries
    .filter((ent) => ent.isFile())
    .map((ent) => ent.name)
    .filter((name) => isImageFile(name))
    .filter((name) => !isExcluded(name))
    .sort(stableSortByName);

  // Next/Image expects a URL-like string when using the `fill` layout.
  return files.map((name) => `/${name}`);
}

