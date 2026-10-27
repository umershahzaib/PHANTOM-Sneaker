#!/bin/bash

# PHANTOM Setup Script
# This script organizes your existing assets into the proper structure

echo "Setting up PHANTOM sneaker website..."

# Create directories if they don't exist
mkdir -p public/videos
mkdir -p public/images

# Move existing video to the exploded view location
if [ -f "Sneaker_product_animation_design_20261027123354.mp4" ]; then
    echo "Moving sneaker animation video..."
    cp "Sneaker_product_animation_design_20261027123354.mp4" "public/videos/phantom-exploded.mp4"
    echo "✓ Exploded view video ready"
fi

# Move existing GIF as reference
if [ -f "kling_20261027_VIDEO_Create_an__4059_0-ezgif.com-video-to-gif-converter.gif" ]; then
    echo "Moving reference GIF..."
    cp "kling_20261027_VIDEO_Create_an__4059_0-ezgif.com-video-to-gif-converter.gif" "public/images/reference.gif"
    echo "✓ Reference material saved"
fi

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm install' to install dependencies"
echo "2. Add hero video to public/videos/phantom-hero.mp4"
echo "3. Add poster images to public/images/"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "Visit http://localhost:3000 to see your PHANTOM website!"
