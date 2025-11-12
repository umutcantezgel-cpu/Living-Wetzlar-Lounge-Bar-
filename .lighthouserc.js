module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 30000,
      url: [
        'http://localhost:4321/',
        'http://localhost:4321/drinks-food',
        'http://localhost:4321/about',
        'http://localhost:4321/events',
        'http://localhost:4321/contact',
        'http://localhost:4321/404'
      ],
      numberOfRuns: 5,
      settings: {
        preset: 'desktop',
        // Mobile-first testing (Weltmeisterniveau)
        formFactor: 'mobile',
        throttling: {
          rttMs: 150,
          throughputKbps: 1638,
          cpuSlowdownMultiplier: 4
        },
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
          disabled: false
        },
        emulatedUserAgent: 'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36'
      }
    },
    assert: {
      assertions: {
        // Weltmeisterniveau: ≥98 für alle Kategorien
        'categories:performance': ['error', { minScore: 0.98 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:best-practices': ['error', { minScore: 0.98 }],
        'categories:seo': ['error', { minScore: 0.98 }],

        // Core Web Vitals (Top 1-5% Ziele)
        'largest-contentful-paint': ['error', { maxNumericValue: 1800 }], // 1.8s
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.08 }], // 0.08
        'total-blocking-time': ['error', { maxNumericValue: 150 }], // 150ms
        'max-potential-fid': ['error', { maxNumericValue: 100 }], // 100ms

        // Performance budgets (Weltmeisterniveau)
        'resource-summary:script:size': ['error', { maxNumericValue: 35840 }], // 35KB
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 46080 }], // 45KB
        'resource-summary:font:size': ['error', { maxNumericValue: 102400 }], // 100KB
        'resource-summary:image:size': ['warn', { maxNumericValue: 512000 }], // 500KB
        'resource-summary:total:size': ['warn', { maxNumericValue: 1048576 }], // 1MB total

        // Security
        'is-on-https': 'error',
        'uses-http2': 'warn',
        'no-vulnerable-libraries': 'error',

        // Best Practices
        'errors-in-console': 'warn',
        'valid-source-maps': 'warn',
        'charset': 'error',
        'doctype': 'error',
        'meta-viewport': 'error',

        // SEO
        'meta-description': 'error',
        'link-text': 'error',
        'crawlable-anchors': 'error',
        'canonical': 'error',
        'robots-txt': 'warn',
        'structured-data': 'warn'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
