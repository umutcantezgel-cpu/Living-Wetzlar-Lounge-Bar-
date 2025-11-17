# Classic Shisha Lounge & Cafe Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/umutcantezgel-cpu/Living-Wetzlar-Lounge-Bar-)

Premium Shisha Lounge & Cafe website with cyberpunk-themed design and neon aesthetics.

**🚀 Ready for Netlify deployment!** See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide.

## Features

- ⚡ **Lightning Fast**: Built with Vite for optimal performance
- 🎨 **Modern Design**: Cyberpunk/neon aesthetic with stunning animations
- 📱 **Responsive**: Mobile-first design that works on all devices
- ♿ **Accessible**: WCAG compliant with proper ARIA labels
- 🔍 **SEO Optimized**: Meta tags, structured data, and semantic HTML
- 🚀 **Performance**: Lazy loading, code splitting, and optimized images
- 🎭 **Interactive**: Canvas animations and particle effects

## Performance Optimizations

- **Code Splitting**: Pages are lazy-loaded for faster initial load
- **Image Optimization**: All images use optimized URLs with lazy loading
- **Canvas Effects**: Throttled animations at 30fps, disabled on mobile
- **Reduced Motion**: Respects user preferences for reduced motion
- **Bundle Optimization**: Vendor chunks separated for better caching
- **Compression**: Gzip and Brotli compression enabled

## Tech Stack

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, consistent icons

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### 🎯 Netlify (Recommended - Production Ready!)

**One-Click Deploy:**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/umutcantezgel-cpu/Living-Wetzlar-Lounge-Bar-)

**Or use Netlify CLI:**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login and deploy
netlify login
netlify init
netlify deploy --prod
```

**Continuous Deployment:**
1. Push your code to GitHub (already done!)
2. Go to [Netlify Dashboard](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select this repository
5. Deploy! (Build settings auto-detected)

📖 **Complete Netlify Guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions

### Alternative: Vercel

```bash
npm i -g vercel
vercel
```

### Manual Deployment

```bash
# Build the project
npm run build

# Upload the 'dist' folder to your hosting provider
```

## Project Structure

```
src/
├── pages/              # Page components (lazy-loaded)
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Menu.jsx
│   ├── Gallery.jsx
│   └── Contact.jsx
├── components/
│   ├── shared/         # Reusable components
│   ├── gallery/        # Gallery-specific components
│   ├── contact/        # Contact form components
│   └── effects/        # Canvas effects components
├── utils.js            # Utility functions
├── Layout.jsx          # Main layout component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Performance Tips

1. **Images**: Use optimized images (WebP format when possible)
2. **Fonts**: Consider self-hosting fonts for better performance
3. **Analytics**: Add analytics after critical resources load
4. **Monitoring**: Use Lighthouse for regular performance audits

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

All rights reserved © 2024 Classic Shisha Lounge & Shop

## Contact

- **Location**: 35683 Dillenburg, Germany
- **Phone**: +49 (0) 2771 999 9999
- **Email**: info@classic-shisha.de
- **Instagram**: [@classicshishalounge_](https://instagram.com/classicshishalounge_)