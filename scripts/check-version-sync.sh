#!/usr/bin/env bash

# This project supports multiple version managers (nvm, fnm, asdf, mise, etc.)
# by providing version hints in multiple formats (.nvmrc, .node-version, .tool-versions).
# This script ensures all version files remain consistent.

set -euo pipefail

nvmrc=$(cat .nvmrc)
node_version=$(cat .node-version)
tool_node=$(awk '$1 == "nodejs" { print $2 }' .tool-versions)
tool_pnpm=$(awk '$1 == "pnpm" { print $2 }' .tool-versions)
pkg_pnpm_raw=$(jq -r '.packageManager' package.json)
pkg_pnpm="${pkg_pnpm_raw#pnpm@}"

if [[ "$nvmrc" != "$node_version" || "$nvmrc" != "$tool_node" ]]; then
  echo "Error: Node.js versions are out of sync!" >&2
  echo "  .nvmrc: $nvmrc" >&2
  echo "  .node-version: $node_version" >&2
  echo "  .tool-versions: $tool_node" >&2
  exit 1
fi

if [[ "$tool_pnpm" != "$pkg_pnpm" ]]; then
  echo "Error: pnpm versions are out of sync!" >&2
  echo "  .tool-versions: $tool_pnpm" >&2
  echo "  package.json (packageManager): $pkg_pnpm" >&2
  exit 1
fi

echo "All versions are in sync."
