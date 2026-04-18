# ZAFIRA Luxury Jewelry Website

A stunning luxury jewelry e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Splash Screen**: Animated brand introduction with logo reveal
- **Floating Icons**: 8 animated decorative icons floating across the page
- **Responsive Hero Slider**: Auto-sliding with mobile-specific images (4 seconds interval)
- **Smart Navigation**: Transparent header on scroll, About modal, smooth anchor navigation
- **Featured Products Grid**: Filterable jewelry showcase with cart/favorites integration
- **Categories Showcase**: Material-based exploration (Gold Plated, Crystals, Enamel)
- **Brand Story**: Compelling narrative with product imagery and founding story
- **Newsletter Signup**: Email subscription with animated feedback
- **Contact Section**: Complete footer with Egyptian contact information

## Product Features

- **Product Filtering**: Filter by categories (Gold Plated, Crystals, Enamel)
- **Shopping Cart**: Add/remove items with quantity management
- **Favorites System**: Save favorite products with quick access
- **Product Modal**: Detailed product view with image gallery
- **Video Integration**: Product showcase videos with modal player

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Images**: Next.js Image Optimization

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/           # React Components
│   ├── Navigation.tsx    # Main navigation with About modal
│   ├── HeroSlider.tsx    # Responsive image slider
│   ├── FeaturedProducts.tsx # Product grid with filtering
│   ├── CategoriesShowcase.tsx # Category cards
│   ├── BrandStory.tsx    # Brand narrative
│   ├── SplashScreen.tsx   # Loading animation
│   ├── FloatingIcons.tsx  # Decorative animations
│   └── Footer.tsx        # Contact info and links
├── contexts/            # React Context
│   └── CartContext.tsx   # Cart & Favorites state
└── lib/                # Utilities
    └── utils.ts          # Helper functions
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navigation.tsx
│   ├── HeroSlider.tsx
│   ├── UnboxingExperience.tsx
│   ├── FeaturedProducts.tsx
│   ├── CategoriesShowcase.tsx
│   ├── BrandStory.tsx
│   ├── Newsletter.tsx
│   └── Footer.tsx
└── lib/
    └── utils.ts
```

## Customization

### Colors
The brand colors are defined in `tailwind.config.ts`:
- **Gold**: Primary brand color (#c99a2e)
- **Obsidian**: Dark backgrounds (#0a0a0a)
- **Burgundy**: Accent color for packaging

### Images
Place your images in the `public/images/` directory:
- `slider1.jpg` - First hero slide
- `slider2.jpg` - Second hero slide
- `logo.png` - Brand logo
- `product-*.jpg` - Product images
- `category-*.jpg` - Category images
- `unboxing-*.jpg` - Unboxing experience images

## Build for Production

```bash
npm run build
```

The static export will be generated in the `dist/` folder.

## License

© 2025 ZAFIRA. All rights reserved.
