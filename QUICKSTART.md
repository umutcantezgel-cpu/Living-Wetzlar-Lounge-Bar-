# 🚀 Quick Start Guide

Get your Classic Shisha Lounge website live in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- Git installed

## Step 1: Clone & Install (30 seconds)

```bash
# Clone the repository (if not already done)
git clone https://github.com/umutcantezgel-cpu/Living-Wetzlar-Lounge-Bar-.git
cd Living-Wetzlar-Lounge-Bar-

# Install dependencies
npm install
```

## Step 2: Test Locally (1 minute)

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
# Press Ctrl+C to stop
```

## Step 3: Deploy to Netlify (3 minutes)

### Option A: One-Click Deploy (Easiest!)

1. Click this button:

   [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/umutcantezgel-cpu/Living-Wetzlar-Lounge-Bar-)

2. Connect your GitHub account
3. Click "Deploy site"
4. Done! 🎉

### Option B: Netlify CLI (For Developers)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

### Option C: Netlify Dashboard (Manual)

```bash
# Build the project
npm run build

# Go to https://app.netlify.com/drop
# Drag and drop the 'dist' folder
# Done! 🎉
```

## Step 4: Configure (Optional)

### Custom Domain

1. Go to Netlify Dashboard → Domain settings
2. Add your custom domain
3. Update DNS settings
4. Enable HTTPS (automatic)

### Environment Variables

```bash
# If you need API keys or secrets
netlify env:set VITE_API_KEY "your-key"
```

## Troubleshooting

### Build fails?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 errors on routes?
Check that `public/_redirects` file exists

### Slow performance?
All optimizations are already configured! Check:
- Netlify Analytics for real metrics
- Lighthouse in browser DevTools

## What's Included?

✅ Fully configured Netlify deployment
✅ Automatic HTTPS
✅ Global CDN
✅ Continuous deployment from Git
✅ Deploy previews for PRs
✅ Optimized caching
✅ Security headers
✅ SPA routing

## Next Steps

- [ ] Customize content in `src/pages/`
- [ ] Add your own images
- [ ] Update contact information
- [ ] Set up custom domain
- [ ] Enable analytics
- [ ] Share with the world! 🌍

## Need Help?

- 📖 [Full Deployment Guide](./DEPLOYMENT.md)
- 📚 [Netlify Docs](https://docs.netlify.com)
- 💬 [Netlify Forums](https://answers.netlify.com)

## Project Structure

```
Living-Wetzlar-Lounge-Bar-/
├── src/
│   ├── pages/          # All your pages
│   ├── components/     # Reusable components
│   └── main.jsx        # App entry point
├── public/
│   ├── _redirects      # SPA routing config
│   └── _headers        # Security headers
├── netlify.toml        # Netlify configuration
└── package.json        # Dependencies
```

## Performance

Expected Lighthouse scores:
- ⚡ Performance: 90+
- ♿ Accessibility: 95+
- 💚 Best Practices: 95+
- 🔍 SEO: 100

## Support

Found a bug? [Open an issue](https://github.com/umutcantezgel-cpu/Living-Wetzlar-Lounge-Bar-/issues)

---

**Happy deploying!** 🎉
