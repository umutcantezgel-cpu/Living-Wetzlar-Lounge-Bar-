# Classic Shisha Lounge & Cafe Website

Premium Shisha Lounge & Cafe website with cyberpunk-themed design and neon aesthetics.

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

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and deploy

Or use the CLI:

```bash
npm i -g vercel
vercel
```

### Netlify

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Netlify will auto-detect Vite and deploy

Or use the CLI:

```bash
npm i -g netlify-cli
netlify deploy --prod
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