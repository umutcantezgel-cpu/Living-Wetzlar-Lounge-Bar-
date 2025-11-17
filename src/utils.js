// URL utility for creating page URLs
export function createPageUrl(page) {
  if (!page || page === 'Home') return '/';
  return `/${page.toLowerCase()}`;
}

// Image optimization helper
export function getOptimizedImageUrl(url, width = 800, quality = 80) {
  if (!url) return '';
  // For Unsplash images, add optimization parameters
  if (url.includes('unsplash.com')) {
    return `${url}&w=${width}&q=${quality}&auto=format&fit=crop`;
  }
  return url;
}

// Debounce utility for performance
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility for scroll/resize events
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if device is mobile
export function isMobile() {
  return window.innerWidth <= 768;
}

// Check if user prefers reduced motion
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Lazy load images observer
export function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    return imageObserver;
  }
  return null;
}
