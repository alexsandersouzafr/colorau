const [major, minor] = process.versions.node.split(".").map(Number);
const minMajor = 20;
const minMinor = 10;

const isTooOld =
  Number.isNaN(major) ||
  Number.isNaN(minor) ||
  major < minMajor ||
  (major === minMajor && minor < minMinor);

if (isTooOld) {
  console.error("\nERROR: Node.js version too old for this project.");
  console.error(`Detected: v${process.versions.node}`);
  console.error("Required: v20.10.0 or newer (recommended: v24 LTS).\n");
  console.error("Use:");
  console.error("  nvm use 24");
  console.error("Then run:");
  console.error("  npm run dev\n");
  process.exit(1);
}
