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
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1
        },
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false
        }
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],

        // Core Web Vitals
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],

        // Performance budgets
        'resource-summary:script:size': ['error', { maxNumericValue: 51200 }], // 50KB
        'resource-summary:stylesheet:size': ['warn', { maxNumericValue: 30720 }], // 30KB
        'resource-summary:font:size': ['error', { maxNumericValue: 102400 }], // 100KB
        'resource-summary:image:size': ['warn', { maxNumericValue: 512000 }], // 500KB

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
