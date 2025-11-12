import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://living-wetzlar.de',
  trailingSlash: 'never',
  build: {
    format: 'file',
    assets: 'assets',
    inlineStylesheets: 'never'
  },
  compressHTML: true,
  scopedStyleStrategy: 'class',
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/js/[name].[hash].js',
          chunkFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'assets/css/[name].[hash][extname]';
            }
            if (/\.(woff2?|ttf|otf|eot)$/.test(assetInfo.name)) {
              return 'assets/font/[name].[hash][extname]';
            }
            if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(assetInfo.name)) {
              return 'assets/img/[name].[hash][extname]';
            }
            return 'assets/[name].[hash][extname]';
          }
        }
      }
    }
  }
});
