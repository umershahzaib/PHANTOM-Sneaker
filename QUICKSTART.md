# PHANTOM Website — Quick Start Guide

## Immediate Next Steps

### 1. Organize Your Assets (Windows)

Run the setup script to move your existing video into place:

```cmd
setup.bat
```

Or manually:
```cmd
mkdir public\videos
mkdir public\images
copy Sneaker_product_animation_design_20261027123354.mp4 public\videos\phantom-exploded.mp4
```

### 2. Install Dependencies

```cmd
npm install
```

### 3. Start Development Server

```cmd
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## What You Have Now

✅ **Complete Next.js website** with all sections implemented  
✅ **Scroll-controlled exploded view** using your existing video  
✅ **Premium dark theme** with electric blue accents  
✅ **Responsive design** for mobile, tablet, desktop  
✅ **GSAP animations** throughout the site  
✅ **Production-ready code** with TypeScript

## What You Still Need

### Critical Assets

1. **Hero Video** (`public/videos/phantom-hero.mp4`)
   - Generate a separate cinematic video for the hero section
   - Fully assembled sneaker with gentle rotation
   - 10-15 seconds, looped
   - Can be generated with Google Veo or Kling AI

2. **Poster Images** (optional but recommended)
   - `public/images/hero-poster.jpg` - Extract a frame from hero video
   - `public/images/experience-poster.jpg` - Extract from exploded view video

### Current Behavior

- **Hero Section**: Will show an animated gradient fallback until you add `phantom-hero.mp4`
- **Experience Section**: Will use your existing `Sneaker_product_animation_design_20261027123354.mp4` as the scroll-controlled exploded view

## How the Scroll-Controlled Animation Works

The signature **"INSIDE THE PHANTOM"** section uses your existing sneaker animation video:

1. The section pins when you scroll to it
2. As you scroll down, the video playback time is synchronized to your scroll progress
3. You can scroll up and down, and the animation reverses naturally
4. Progress indicator shows: 0% ASSEMBLED → 25% SEPARATING → 50% ENGINEERING REVEALED → 75% REASSEMBLING → 100% COMPLETE

This is completely separate from the hero section autoplay video.

## Customization

### Adjust Scroll Duration

In `components/ExperienceSection.tsx`, change the `end` value:

```typescript
end: '+=400%',  // Current: 4x viewport height
// Try: '+=300%' for faster, '+=500%' for slower
```

### Change Colors

In `tailwind.config.ts`, modify the color palette:

```typescript
colors: {
  phantom: {
    blue: '#00d4ff',  // Change accent color
    // ...
  }
}
```

### Add More Products

In `components/CollectionSection.tsx`, add items to the `products` array.

## Tech Stack

- **Next.js 15** - App Router with server/client components
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **GSAP ScrollTrigger** - Scroll-based animations
- **Three.js/React Three Fiber** - Ready for 3D model upgrade

## Troubleshooting

### Videos not playing
- Check file paths are correct in `public/videos/`
- Ensure video format is MP4 (H.264)
- Check browser console for errors

### Scroll animation not smooth
- Video file might be too large - try compressing it
- Ensure video codec is web-optimized

### Dependencies won't install
- Make sure you have Node.js 18+ installed
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

## Build for Production

```cmd
npm run build
npm start
```

Deploy to Vercel, Netlify, or any hosting platform that supports Next.js.

---

**You're ready to go!** Run `setup.bat` and `npm install`, then `npm run dev` to see your PHANTOM website.
