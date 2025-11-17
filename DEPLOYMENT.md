# 🚀 Netlify Deployment Guide

Complete guide to deploy Classic Shisha Lounge website to Netlify.

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git repository
- Netlify account (free tier works!)

## Quick Deploy to Netlify

### Option 1: One-Click Deploy (Fastest)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the button above
2. Connect your GitHub account
3. Select this repository
4. Click "Deploy site"
5. Done! Your site will be live in 2-3 minutes

### Option 2: Netlify CLI (Recommended for Developers)

```bash
# 1. Install Netlify CLI globally
npm install -g netlify-cli

# 2. Install project dependencies
npm install

# 3. Test build locally
npm run build

# 4. Test production build locally
npm run preview

# 5. Login to Netlify
netlify login

# 6. Initialize Netlify (first time only)
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose your team
# - Site name: classic-shisha-lounge (or your preferred name)
# - Build command: npm run build
# - Publish directory: dist

# 7. Deploy to production
netlify deploy --prod
```

### Option 3: Netlify Dashboard (Manual Upload)

```bash
# 1. Build the project
npm install
npm run build

# 2. Go to https://app.netlify.com/drop
# 3. Drag and drop the 'dist' folder
# 4. Your site is live!
```

### Option 4: Continuous Deployment (Best for Teams)

1. **Push code to GitHub** (already done!)

2. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select `Living-Wetzlar-Lounge-Bar-` repository

3. **Configure build settings:**
   - Branch to deploy: `main` or your preferred branch
   - Build command: `npm run build` (auto-detected)
   - Publish directory: `dist` (auto-detected)
   - Node version: 18 (from .nvmrc)

4. **Deploy:**
   - Click "Deploy site"
   - Wait 2-3 minutes
   - Your site is live!

5. **Enable auto-deploy:**
   - Every push to `main` branch automatically deploys
   - Pull requests get preview deployments

## Configuration Files

The following files are configured for optimal Netlify deployment:

### ✅ netlify.toml
- Build commands and settings
- Environment variables
- Redirects for SPA routing
- Security headers
- Cache control
- Build contexts (production, preview, branch)

### ✅ public/_redirects
- Backup SPA routing configuration
- Force HTTPS (optional)
- www to non-www redirect (optional)

### ✅ public/_headers
- Security headers (CSP, XSS protection, etc.)
- Cache control for assets
- Performance optimizations

### ✅ .nvmrc
- Specifies Node.js version 18
- Ensures consistent builds

## Environment Variables

If you need environment variables:

1. **Via Netlify Dashboard:**
   - Go to Site settings → Build & deploy → Environment
   - Add variables (e.g., API keys)

2. **Via Netlify CLI:**
   ```bash
   netlify env:set VITE_API_KEY "your-api-key"
   ```

3. **For local development:**
   - Create `.env.local` file
   - Add variables with `VITE_` prefix
   - Never commit this file!

## Custom Domain Setup

### Using Netlify Subdomain (Free)

Your site gets a free subdomain: `your-site-name.netlify.app`

To customize:
```bash
netlify sites:update --name your-custom-name
```

### Using Your Own Domain

1. **Buy a domain** (Namecheap, GoDaddy, etc.)

2. **Add domain in Netlify:**
   - Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain (e.g., `classicshisha.de`)

3. **Configure DNS:**
   - Point your domain's nameservers to Netlify:
     - `dns1.p01.nsone.net`
     - `dns2.p01.nsone.net`
     - `dns3.p01.nsone.net`
     - `dns4.p01.nsone.net`

4. **Enable HTTPS** (automatic & free!)
   - Netlify provides free SSL via Let's Encrypt
   - Enabled automatically for all domains

## Performance Optimizations

The deployment includes:

- ✅ **Brotli & Gzip compression** - Automatic on Netlify
- ✅ **CDN distribution** - Global edge network
- ✅ **HTTP/2** - Faster multiplexing
- ✅ **Asset optimization** - Automatic image optimization
- ✅ **Cache headers** - Configured for 1-year caching
- ✅ **Smart CDN** - Automatic cache invalidation

## Build Optimization

### Speed up builds:

1. **Cache node_modules:**
   ```toml
   [build]
     # Already configured in netlify.toml
   ```

2. **Use build plugins:**
   ```bash
   # Install Lighthouse plugin for audits
   npm install -D @netlify/plugin-lighthouse
   ```

3. **Skip builds when not needed:**
   ```bash
   # In commit message, add:
   [skip ci]
   # or
   [skip netlify]
   ```

## Monitoring & Analytics

### Enable Netlify Analytics (paid)
- Real user monitoring
- No JavaScript needed
- Privacy-friendly

```bash
# Enable via dashboard:
# Site settings → Analytics → Enable Analytics
```

### Or use free alternatives:
- Google Analytics (add to index.html)
- Plausible (privacy-focused)
- Umami (self-hosted)

## Troubleshooting

### Build Fails

**Check build logs:**
```bash
netlify build --dry
```

**Common issues:**
- Node version mismatch → Check .nvmrc
- Missing dependencies → Run `npm install`
- Build timeout → Optimize bundle size

### 404 Errors on Routes

**Fix:** Ensure `_redirects` file is in `public/` folder
```bash
ls -la public/_redirects
```

### Performance Issues

**Run Lighthouse:**
```bash
netlify build
netlify deploy --prod
# Then check Lighthouse report in Netlify dashboard
```

**Optimize images:**
```bash
# Use WebP format
# Compress with tools like TinyPNG
# Use lazy loading (already implemented)
```

### Cache Not Working

**Check headers:**
```bash
curl -I https://your-site.netlify.app/assets/index.js
# Look for Cache-Control header
```

**Clear CDN cache:**
```bash
netlify sites:clear-cache
```

## Advanced Features

### Deploy Previews
- Every pull request gets a unique preview URL
- Test changes before merging
- Share with stakeholders

### Branch Deploys
- Deploy specific branches for testing
- Useful for staging environments

### Split Testing
- A/B test different versions
- Available on Pro plan

### Functions (Serverless)
- Add API endpoints if needed
- Create `/netlify/functions` folder

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Netlify Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Security Checklist

- ✅ HTTPS enabled (automatic)
- ✅ Security headers configured
- ✅ CSP headers set
- ✅ XSS protection enabled
- ✅ No secrets in code
- ✅ Environment variables secure
- ✅ Dependencies updated

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All routes work (test navigation)
- [ ] Images load properly
- [ ] Forms submit correctly
- [ ] Mobile responsive
- [ ] Performance score > 90 (Lighthouse)
- [ ] Accessibility score > 90
- [ ] SEO score > 90
- [ ] All links work
- [ ] Social media previews work
- [ ] Analytics tracking works

## Support & Resources

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Forums:** https://answers.netlify.com
- **Netlify Status:** https://www.netlifystatus.com
- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Netlify
netlify deploy --prod

# Check site status
netlify status

# View deploy logs
netlify logs:deploy

# Open site in browser
netlify open:site

# Open Netlify dashboard
netlify open:admin
```

## Cost Estimate

**Free Tier (Starter):**
- 100 GB bandwidth/month
- 300 build minutes/month
- 1 concurrent build
- Free SSL
- Deploy previews
- Form submissions (100/month)

**Perfect for this project!** 🎉

---

**Need help?** Open an issue or contact support.

**Happy deploying!** 🚀
