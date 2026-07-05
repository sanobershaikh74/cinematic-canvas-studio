#!/usr/bin/env bash
# Aurora — extract webp frames from a source video for the
# scroll-driven cinematic background.
#
# Usage:
#   bash scripts/extract-frames.sh [SOURCE_VIDEO] [FPS]
#
# Defaults:
#   SOURCE_VIDEO = public/aurora-source.mp4
#   FPS          = 20
#
# After running, note the printed frame count and update
# `src/config/aurora.config.ts` → `frames.total`.

set -euo pipefail

SRC="${1:-public/aurora-source.mp4}"
FPS="${2:-20}"
OUT_DIR="public/frames"

if [ ! -f "$SRC" ]; then
  echo "❌ Source video not found: $SRC"
  echo "   Place your video there (or pass a path as \$1) and re-run."
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "❌ ffmpeg is not installed. Install it first (brew install ffmpeg / apt install ffmpeg)."
  exit 1
fi

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

echo "▶ Extracting frames from $SRC at ${FPS} fps → $OUT_DIR"
ffmpeg -hide_banner -loglevel warning \
  -i "$SRC" \
  -vf "fps=${FPS},scale=1280:-2:flags=lanczos" \
  -c:v libwebp -quality 78 -compression_level 6 \
  "$OUT_DIR/f_%03d.webp"

COUNT=$(ls "$OUT_DIR"/f_*.webp | wc -l | tr -d ' ')
echo ""
echo "✅ Extracted $COUNT frames."
echo "   → Update src/config/aurora.config.ts:  frames.total = $COUNT"
