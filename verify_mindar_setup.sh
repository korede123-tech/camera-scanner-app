#!/bin/bash

echo "🔍 Verifying MindAR Scanner Project Setup..."

# 1. Check directory structure
required_files=("public/index.html" "public/image_target.mind" "public/image_target.jpg" "public/sound.mp3" "public/script.js" "public/style.css" "server.js")

all_ok=true

for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Missing: $file"
    all_ok=false
  else
    echo "✅ Found: $file"
  fi
done

# 2. Check if image_target.mind is non-empty
if [ -s "public/image_target.mind" ]; then
  echo "✅ image_target.mind is valid and not empty."
else
  echo "❌ image_target.mind is empty or corrupted."
  all_ok=false
fi

# 3. Check if index.html includes required MindAR and A-Frame scripts
echo "🔍 Checking index.html for MindAR and A-Frame scripts..."
if grep -q "aframe.min.js" public/index.html && grep -q "mindar-image-aframe.prod.js" public/index.html; then
  echo "✅ index.html includes A-Frame and MindAR scripts."
else
  echo "❌ index.html missing A-Frame or MindAR scripts."
  all_ok=false
fi

# 4. Check correct path usage for image_target.mind
if grep -q "imageTargetSrc: image_target.mind" public/index.html; then
  echo "✅ Correct path to image_target.mind set in index.html"
else
  echo "⚠️ image_target.mind path might be incorrect in index.html"
fi

# 5. (Optional) Confirm Node.js is installed
if command -v node >/dev/null 2>&1; then
  echo "✅ Node.js installed: $(node -v)"
else
  echo "❌ Node.js is not installed. You need it for the server."
  all_ok=false
fi

# 6. Suggest next steps
if [ "$all_ok" = true ]; then
  echo -e "\n🎉 All files look good. You can now run your app and test the tracker."
else
  echo -e "\n⚠️ Please fix the above issues before running the camera scanner."
fi
