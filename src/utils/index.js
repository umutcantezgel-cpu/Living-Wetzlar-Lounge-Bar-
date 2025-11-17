/**
 * Utility Functions
 */

// Create page URL helper
export const createPageUrl = (pageName) => {
  const pageRoutes = {
    'Home': '/',
    'About': '/about',
    'Services': '/services',
    'Menu': '/menu',
    'Gallery': '/gallery',
    'Contact': '/contact',
    'Impressum': '/impressum',
    'Datenschutz': '/datenschutz'
  };

  return pageRoutes[pageName] || '/';
};

// Format price
export const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Check if element is in viewport
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Lazy load images
export const lazyLoadImage = (img) => {
  if (img.dataset.src) {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  }
};
