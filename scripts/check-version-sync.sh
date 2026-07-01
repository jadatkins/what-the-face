#!/usr/bin/env bash

# This project supports multiple version managers (nvm, fnm, asdf, mise, etc.)
# by providing version hints in multiple formats (.nvmrc, .node-version, .tool-versions).
# This script ensures all version files remain consistent.

set -euo pipefail

print_mismatch_error() {
  local group="$1"
  shift

  echo "Error: $group versions are out of sync!" >&2
  local entry
  for entry in "$@"; do
    echo "  ${entry%%:*}: ${entry#*:}" >&2
  done
}

check_all_equal() {
  local group="$1"
  shift

  local reference="${1#*:}"
  local entry
  for entry in "$@"; do
    if [[ "${entry#*:}" != "$reference" ]]; then
      print_mismatch_error "$group" "$@"
      exit 1
    fi
  done
}

node_versions=(
  ".nvmrc:$(<.nvmrc)"
  ".node-version:$(<.node-version)"
  ".tool-versions:$(awk '$1 == "nodejs" { print $2 }' .tool-versions)"
)

pnpm_versions=(
  ".tool-versions:$(awk '$1 == "pnpm" { print $2 }' .tool-versions)"
  "package.json (packageManager):$(jq -r '.packageManager | ltrimstr("pnpm@")' package.json)"
)

check_all_equal "Node.js" "${node_versions[@]}"
check_all_equal "pnpm" "${pnpm_versions[@]}"

echo "All versions are in sync."
