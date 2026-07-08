const fs = require("node:fs/promises");
const path = require("node:path");

async function removeDirectory(target) {
  const resolvedTarget = path.resolve(process.cwd(), target);

  try {
    await fs.rm(resolvedTarget, { recursive: true, force: true });
    console.log(`Removed ${resolvedTarget}`);
  } catch (error) {
    console.error(`Failed to remove ${resolvedTarget}`);
    throw error;
  }
}

async function main() {
  const targets = process.argv.slice(2);

  if (targets.length === 0) {
    console.log("No directories provided.");
    return;
  }

  for (const target of targets) {
    await removeDirectory(target);
  }
}

main().catch(() => {
  process.exit(1);
});
