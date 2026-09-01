#!/usr/bin/env bash

# This project supports multiple version managers (nvm, fnm, asdf, mise, etc.)
# by providing version hints in multiple formats (.nvmrc, .node-version, .tool-versions).
# This script ensures all version files remain consistent.

set -euo pipefail

## Functions

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

get_major_version() {
  printf '%s\n' "$1" | grep -o '[0-9]\+' | head -1
}

## Exact version checks

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

## Major version checks

node_version="${node_versions[0]#*:}"
pnpm_version="${pnpm_versions[0]#*:}"

node_major=(
  ".nvmrc:$(get_major_version "$node_version")"
  "package.json (engines.node):$(get_major_version "$(jq -r '.engines.node' package.json)")"
  "package.json (@types/node):$(get_major_version "$(jq -r '.devDependencies["@types/node"]' package.json)")"
)

pnpm_major=(
  ".tool-versions (major):$(get_major_version "$pnpm_version")"
  "package.json (engines.pnpm major):$(get_major_version "$(jq -r '.engines.pnpm' package.json)")"
)

check_all_equal "Node.js major version" "${node_major[@]}"
check_all_equal "pnpm major version" "${pnpm_major[@]}"

echo "All versions are in sync."
