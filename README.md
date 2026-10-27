# PHANTOM — Premium Sneaker Website 🚀

A stunning, production-ready premium sneaker website featuring scroll-driven animations, cinematic visuals, and responsive design.

![PHANTOM](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)

## ✨ Features

- 🎬 **Cinematic Hero** — Autoplay video background with smooth fallback
- 📜 **Scroll-Driven Effects** — Interactive exploded view with GSAP ScrollTrigger
- 📱 **Fully Responsive** — Perfect on mobile, tablet, and desktop
- ⚡ **Performance Optimized** — Lazy loading, smooth 60fps animations
- ♿ **Accessible** — Keyboard navigation, reduced motion support, semantic HTML
- 🎨 **Premium Design** — Dark theme with electric blue accents
- 🔄 **Loading States** — Elegant loading screens and transitions

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
sneakers/
├── app/
│   ├── layout.tsx              # Root layout with SEO metadata
│   ├── page.tsx                # Main homepage
│   ├── globals.css             # Global styles & animations
│   └── favicon.svg             # PHANTOM logo favicon
├── components/
│   ├── Navigation.tsx          # Sticky nav with mobile menu
│   ├── HeroSection.tsx         # Video hero with CTAs
│   ├── ExperienceSection.tsx   # Scroll-controlled animation
│   ├── CollectionSection.tsx   # Product showcase
│   ├── TechnologySection.tsx   # Engineering features
│   ├── Footer.tsx              # Site footer
│   └── LoadingScreen.tsx       # Initial loading screen
├── public/
│   ├── videos/
│   │   └── phantom-hero.mp4    # ✅ Hero autoplay video (ready)
│   └── images/
│       └── phantom-exploded.gif # ✅ Scroll-controlled GIF (ready)
└── package.json
```

## 🎨 Design System

### Colors
- **Phantom Black**: `#0a0a0a` — Primary background
- **Graphite**: `#1a1a1a` — Cards and surfaces
- **Electric Blue**: `#00d4ff` — Primary accent
- **Silver**: `#e8e8e8` — Body text
- **White**: `#ffffff` — Headings

### Typography
- **Display**: Space Grotesk — Logo and headings
- **Body**: Inter — Body text and UI elements

### Spacing
8px grid system with extended utilities (18, 88, 100, 112, 128)

## 🎯 Sections Breakdown

### 1. Hero Section
- Autoplay MP4 video background
- Large PHANTOM branding
- Two CTAs with hover effects
- Scroll indicator
- Fallback gradient for video errors

### 2. Experience Section (Scroll-Controlled)
- GIF animation with scroll-driven zoom/rotation effects
- 5-stage progress indicator
- Dynamic stage labels
- Blue accent glow animations
- 400vh scroll distance (adjustable)

### 3. Collection Section
- 3 product cards with hover animations
- Premium layout with blue accent lines
- Responsive grid (1/2/3 columns)

### 4. Technology Section
- 4 engineering feature cards
- Scroll-triggered reveals
- Engineering philosophy quote

### 5. Footer
- Brand info
- Navigation links
- Social media icons
- Copyright notice

## 🛠️ Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP with ScrollTrigger
- **3D Ready**: Three.js, React Three Fiber

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Reduced motion support
- Alt text on all images
- Proper heading hierarchy

## ⚡ Performance

- Lazy loading for images and videos
- GSAP cleanup on unmount
- Optimized scroll listeners
- CSS transforms for animations (GPU acceleration)
- Video poster images
- Efficient re-render prevention

## 🎬 Assets Used

✅ **Hero Video**: `Sneaker_product_animation_design_20261027123354.mp4`
✅ **Experience GIF**: `kling_20261027_VIDEO_Create_an__4059_0-ezgif.com-video-to-gif-converter.gif`

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎨 Customization Tips

### Change Scroll Speed
In `ExperienceSection.tsx`, adjust:
```typescript
end: '+=400%'  // Higher = slower, Lower = faster
```

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  phantom: {
    blue: '#your-color',
    // ...
  }
}
```

### Add More Products
Edit `components/CollectionSection.tsx`:
```typescript
const products = [
  // Add your products here
]
```

## 📄 License

Private project — All rights reserved.

## 🤝 Credits

Built with ❤️ using Next.js, GSAP, and Tailwind CSS.

---

**Ready to showcase!** 🎉

Run `npm run dev` and open http://localhost:3000
