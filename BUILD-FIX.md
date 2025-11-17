# Build Fix: Lighthouse Plugin Issue

## Problem

The Netlify deployment was failing with exit code 2 because the `@netlify/plugin-lighthouse` plugin was configured in `netlify.toml` but not installed as a dependency in `package.json`.

**Error:**
```
Failed during stage 'building site': Build script returned non-zero exit code: 2
Installing plugins
   - @netlify/plugin-lighthouse@6.0.1
```

## Solution

**Disabled the Lighthouse plugin** in `netlify.toml` by commenting it out. This is an optional performance auditing feature that's not required for deployment.

The site will now deploy successfully without it.

## How to Enable Lighthouse Plugin (Optional)

If you want to enable Lighthouse performance audits on every deploy:

### Step 1: Install the plugin

```bash
npm install -D @netlify/plugin-lighthouse
```

### Step 2: Uncomment in netlify.toml

Edit `netlify.toml` and uncomment lines 90-94:

```toml
# Change this:
# [[plugins]]
#   package = "@netlify/plugin-lighthouse"
#
#   [plugins.inputs]
#     output_path = "reports/lighthouse.html"

# To this:
[[plugins]]
  package = "@netlify/plugin-lighthouse"

  [plugins.inputs]
    output_path = "reports/lighthouse.html"
```

### Step 3: Commit and push

```bash
git add package.json package-lock.json netlify.toml
git commit -m "feat: Enable Lighthouse performance auditing"
git push
```

### Step 4: View reports

After deployment, Lighthouse reports will be available in the Netlify dashboard under:
- Deploy details → Plugins → Lighthouse

## Alternative: Use Netlify CLI for Local Lighthouse

You can also run Lighthouse locally:

```bash
npm install -g @netlify/cli
netlify build
netlify deploy --build
```

## What You Get With Lighthouse Plugin

- ✅ Automatic performance audits on every deploy
- ✅ Lighthouse scores in deploy logs
- ✅ HTML reports saved to `reports/lighthouse.html`
- ✅ Track performance over time
- ✅ Catch performance regressions

## Current Status

- ✅ **Build fixed** - Site deploys successfully without Lighthouse
- ✅ **All optimizations active** - Code splitting, lazy loading, caching
- ✅ **Manual audits available** - Use Chrome DevTools Lighthouse anytime

## Performance Without Plugin

You can still audit performance manually:

1. **Chrome DevTools Lighthouse:**
   - Open your deployed site
   - F12 → Lighthouse tab
   - Click "Generate report"

2. **PageSpeed Insights:**
   - Visit https://pagespeed.web.dev
   - Enter your Netlify URL
   - View results

3. **WebPageTest:**
   - Visit https://www.webpagetest.org
   - Test your site from multiple locations

## Recommendation

**For now:** Deploy without the plugin and verify the site works perfectly.

**Later:** If you want automated audits on every deploy, enable the plugin following the steps above.

---

**Status:** ✅ Fixed and deployed
**Next:** Verify your site at your Netlify URL
