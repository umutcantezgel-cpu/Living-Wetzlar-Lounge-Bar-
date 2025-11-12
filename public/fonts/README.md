# Self-Hosted Fonts Setup

**Status**: ⏳ Pending - Font files need to be downloaded and subsetted

## Requirements (P0 - Deploy-Blocking)

This project requires self-hosted fonts for:
- **DSGVO/TTDSG compliance** (no external requests without consent)
- **Performance** (eliminate external DNS lookup, faster LCP)
- **Privacy** (no data sent to Google Fonts CDN)

## Required Font Files

Download and add the following WOFF2 files to this directory:

1. **Inter Variable Font** (Latin subset)
   - File: `Inter-Variable.woff2`
   - Source: https://fonts.google.com/specimen/Inter
   - Subset: Latin (Basic + Extended)
   - Unicode Range: U+0020-007F, U+00A0-00FF, U+0100-017F
   - Weights: 300-700 (Variable)

2. **Playfair Display Regular**
   - File: `PlayfairDisplay-Regular.woff2`
   - Source: https://fonts.google.com/specimen/Playfair+Display
   - Subset: Latin (Basic + Extended)
   - Unicode Range: U+0020-007F, U+00A0-00FF, U+0100-017F
   - Weight: 400

3. **Playfair Display Bold**
   - File: `PlayfairDisplay-Bold.woff2`
   - Source: https://fonts.google.com/specimen/Playfair+Display
   - Subset: Latin (Basic + Extended)
   - Unicode Range: U+0020-007F, U+00A0-00FF, U+0100-017F
   - Weight: 700

## Font Subsetting Tool

Use `glyphhanger` or `pyftsubset` to create Latin-only subsets:

### Method 1: glyphhanger (Recommended)

```bash
npm install -g glyphhanger

# Download Inter Variable from Google Fonts, then:
glyphhanger --LATIN --subset=Inter-Variable.ttf --formats=woff2

# Download Playfair Display, then:
glyphhanger --LATIN --subset=PlayfairDisplay-Regular.ttf --formats=woff2
glyphhanger --LATIN --subset=PlayfairDisplay-Bold.ttf --formats=woff2
```

### Method 2: Google Webfonts Helper

Easiest option: https://gwfh.mranftl.com/fonts

1. Search for "Inter" and "Playfair Display"
2. Select **only** Latin charset
3. Select weights: Inter (300-700 Variable), Playfair (400, 700)
4. Download WOFF2 files
5. Copy to this directory

### Method 3: pyftsubset (fonttools)

```bash
pip install fonttools brotli

# After downloading TTF files:
pyftsubset Inter-Variable.ttf \
  --unicodes="U+0020-007F,U+00A0-00FF,U+0100-017F" \
  --output-file=Inter-Variable.woff2 \
  --flavor=woff2

pyftsubset PlayfairDisplay-Regular.ttf \
  --unicodes="U+0020-007F,U+00A0-00FF,U+0100-017F" \
  --output-file=PlayfairDisplay-Regular.woff2 \
  --flavor=woff2

pyftsubset PlayfairDisplay-Bold.ttf \
  --unicodes="U+0020-007F,U+00A0-00FF,U+0100-017F" \
  --output-file=PlayfairDisplay-Bold.woff2 \
  --flavor=woff2
```

## Verification

After adding fonts, verify they load correctly:

```bash
npm run build
npm run lhci  # Should show improved LCP and no external font requests
```

Expected file sizes (subsetted):
- `Inter-Variable.woff2`: ~80-120KB (all weights 300-700)
- `PlayfairDisplay-Regular.woff2`: ~40-60KB
- `PlayfairDisplay-Bold.woff2`: ~40-60KB
- **Total**: ~160-280KB (acceptable for font budget)

## Font Performance Optimizations

The `src/styles/fonts.css` file includes:
- ✅ `font-display: swap` (prevents FOIT, shows fallback immediately)
- ✅ `unicode-range` (loads only Latin subset)
- ✅ `size-adjust` (matches fallback font metrics to reduce CLS)
- ✅ `ascent-override`, `descent-override`, `line-gap-override` (fine-tune fallback metrics)

## Preloading Critical Fonts

The most critical font (Inter Variable, used for body text) should be preloaded in `BaseLayout.astro`:

```html
<link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

## License Information

Both fonts are licensed under **Open Font License (OFL)**:
- Inter: https://github.com/rsms/inter/blob/master/LICENSE.txt
- Playfair Display: https://github.com/clauseggers/Playfair-Display/blob/master/OFL.txt

Self-hosting is explicitly allowed under OFL.

---

**Next Steps**: Download fonts → Subset → Place in this directory → Test build → Verify LCP improvement
