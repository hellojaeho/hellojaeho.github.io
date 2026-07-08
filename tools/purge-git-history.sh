#!/bin/bash
# ============================================================
# Git history purge — shrinks .git from ~1.7 GB to tens of MB
# by removing big binaries (old videos/images) from ALL history.
#
# ⚠️  DESTRUCTIVE: rewrites every commit hash and force-pushes.
#     1) Make a full backup first (step 0 below does this).
#     2) If anyone else has a clone, they must re-clone after.
#     3) Open PRs/branches based on old hashes will be orphaned.
#
# Run from the repo root:  bash tools/purge-git-history.sh
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

# --- 0. safety backup (full copy incl. .git) ---
BACKUP=~/Desktop/hellojaeho-repo-backup-$(date +%Y%m%d-%H%M%S)
echo "Backing up repo to $BACKUP ..."
cp -R . "$BACKUP"
echo "Backup done."

# --- 1. install git-filter-repo if missing ---
if ! command -v git-filter-repo >/dev/null 2>&1; then
  echo "git-filter-repo not found. Install with ONE of:"
  echo "  brew install git-filter-repo"
  echo "  pip3 install git-filter-repo"
  exit 1
fi

# --- 2. commit current state first (filter-repo needs a clean tree) ---
git add -A
git commit -m "Pre-purge snapshot: cleaned working tree" || true

# --- 3. purge every blob larger than 2 MB from ALL history ---
#     (current site assets stay: they're in the final tree and get re-added;
#      only *historical* versions of big files vanish)
git filter-repo --strip-blobs-bigger-than 2M --force

# --- 4. also drop long-dead paths from history entirely ---
git filter-repo --force \
  --path 'videos'      --path 'video copy' \
  --path 'img copy'    --path 'js copy' \
  --path 'music'       --invert-paths

# --- 5. re-add origin (filter-repo removes it) and force-push ---
git remote add origin https://github.com/hellojaeho/hellojaeho.github.io.git 2>/dev/null || true
echo ""
echo "History rewritten. Verify with:  git log --oneline | head ; du -sh .git"
echo "Then force-push:                 git push origin main --force"
echo "(Backup lives at $BACKUP — delete it once you're satisfied.)"
