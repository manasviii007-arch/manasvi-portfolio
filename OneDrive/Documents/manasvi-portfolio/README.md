# Manasvi Chugh — Portfolio

A premium, dark-mode personal portfolio built with Next.js 15, Framer Motion, and Tailwind CSS.

## ✨ Features

- **Dark luxury design** — glassmorphism, gradient accents, premium typography
- **Animated loading screen** with progress indicator
- **Custom cursor** with magnetic hover effects
- **Scroll progress bar** at the top
- **Typing animation** in the hero
- **Framer Motion** throughout — fade-up reveals, card hovers, stagger animations
- **Project modal** — click any project card for full detail view
- **Responsive** — mobile-first, works across all screen sizes
- **SEO ready** — metadata, OpenGraph, Twitter cards, manifest
- **Scroll to top** button
- **Smooth navigation** with active section tracking

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── page.tsx            # Main page composition
│   └── globals.css         # Global styles, CSS variables
├── components/
│   ├── ui/
│   │   ├── CustomCursor.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── ScrollToTop.tsx
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── Leadership.tsx
│       ├── Achievements.tsx
│       ├── Skills.tsx
│       ├── Education.tsx
│       ├── Certifications.tsx
│       └── Contact.tsx
└── lib/
    └── utils.ts
```

## 🎨 Design System

**Colors:**
- Background: `#080808`
- Surface: `#0f0f0f`
- Accent: `#7c6af7` (purple)
- Accent Light: `#a78bfa`

**Typography:**
- Font: Inter (Google Fonts)

**Key patterns:**
- Glass morphism: `.glass` / `.glass-strong`
- Gradient text: `.gradient-text`
- Card hover: `.card-lift`

## 🌐 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

## 📋 Customization

1. Update personal info in each section component
3. Replace LinkedIn/GitHub URLs with real profiles
4. Add real resume PDF to `/public/resume.pdf`
5. Update `metadata` in `src/app/layout.tsx`

## 🔧 Tech Stack

- **Next.js 15** — React framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations
- **Lucide React** — Icons
