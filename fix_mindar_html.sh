#!/bin/bash

echo "🔧 Fixing index.html for MindAR setup..."

HTML="public/index.html"

# 1. Add timeout to <a-assets>
sed -i '' 's|<a-assets>|<a-assets timeout="10000">|g' "$HTML"

# 2. Add onloadeddata log to audio tag (escape quotes carefully)
sed -i '' "s|<audio id=\"scanSound\" src=\"sound.mp3\" preload=\"auto\">|<audio id=\"scanSound\" src=\"sound.mp3\" preload=\"auto\" onloadeddata=\"console.log('✅ sound.mp3 loaded')\">|g" "$HTML"

# 3. Fix imageTargetSrc path if needed
sed -i '' 's|imageTargetSrc: image_target.mind|imageTargetSrc: ./image_target.mind|g' "$HTML"

# 4. Confirm key assets exist
check_file() {
  if [ ! -f "public/$1" ]; then
    echo "❌ Missing: public/$1"
    exit 1
  else
    echo "✅ Found: public/$1"
  fi
}

check_file "image_target.mind"
check_file "sound.mp3"
check_file "image_target.jpg"

echo "✅ index.html patched successfully!"
