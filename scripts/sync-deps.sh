#!/usr/bin/env bash

# Run 'pnpm install' when pnpm-lock.yaml has changed.
# To be used as a git hook.

set -u

git diff --quiet "$1" "$2" -- pnpm-lock.yaml && exit 0

pnpm install || true
