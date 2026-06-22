#!/usr/bin/env node

/**
 * This project supports multiple version managers (nvm, fnm, asdf, mise, etc.)
 * by providing version hints in multiple formats (.nvmrc, .node-version, .tool-versions).
 * This script ensures all version files remain consistent.
 */

import { readFileSync } from "node:fs";

function readVersion(filePath, pattern) {
  try {
    const content = readFileSync(filePath, "utf-8").trim();
    if (pattern) {
      const match = content.match(pattern);
      return match ? match[1] : null;
    }
    return content;
  } catch (error) {
    console.error(`Error reading ${filePath}: ${error.message}`);
    process.exit(1);
  }
}

// Read Node.js versions
const nodeVersionNvmrc = readVersion(".nvmrc");
const nodeVersionNodeVersion = readVersion(".node-version");
const nodeVersionToolVersions = readVersion(".tool-versions", /^nodejs\s+(.+)$/m);

// Read pnpm versions
const pnpmVersionToolVersions = readVersion(".tool-versions", /^pnpm\s+(.+)$/m);
const packageJson = JSON.parse(readFileSync("package.json", "utf-8"));
const pnpmVersionPackageJson = packageJson.packageManager?.replace("pnpm@", "");

// Check Node.js versions match
if (nodeVersionNvmrc !== nodeVersionNodeVersion || nodeVersionNvmrc !== nodeVersionToolVersions) {
  console.error("Error: Node.js versions are out of sync!");
  console.error(`  .nvmrc: ${nodeVersionNvmrc}`);
  console.error(`  .node-version: ${nodeVersionNodeVersion}`);
  console.error(`  .tool-versions: ${nodeVersionToolVersions}`);
  process.exit(1);
}

// Check pnpm versions match
if (pnpmVersionToolVersions !== pnpmVersionPackageJson) {
  console.error("Error: pnpm versions are out of sync!");
  console.error(`  .tool-versions: ${pnpmVersionToolVersions}`);
  console.error(`  package.json (packageManager): ${pnpmVersionPackageJson}`);
  process.exit(1);
}
