@echo off
REM PHANTOM Setup Script for Windows
REM This script organizes your existing assets into the proper structure

echo Setting up PHANTOM sneaker website...
echo.

REM Create directories if they don't exist
if not exist "public\videos" mkdir "public\videos"
if not exist "public\images" mkdir "public\images"

REM Move existing video to the exploded view location
if exist "Sneaker_product_animation_design_20261027123354.mp4" (
    echo Moving sneaker animation video...
    copy "Sneaker_product_animation_design_20261027123354.mp4" "public\videos\phantom-exploded.mp4"
    echo [OK] Exploded view video ready
)

REM Move existing GIF as reference
if exist "kling_20261027_VIDEO_Create_an__4059_0-ezgif.com-video-to-gif-converter.gif" (
    echo Moving reference GIF...
    copy "kling_20261027_VIDEO_Create_an__4059_0-ezgif.com-video-to-gif-converter.gif" "public\images\reference.gif"
    echo [OK] Reference material saved
)

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Run 'npm install' to install dependencies
echo 2. Add hero video to public\videos\phantom-hero.mp4
echo 3. Add poster images to public\images\
echo 4. Run 'npm run dev' to start the development server
echo.
echo Visit http://localhost:3000 to see your PHANTOM website!
echo.
pause
