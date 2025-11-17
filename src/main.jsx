import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Menu = lazy(() => import('./pages/Menu'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Layout = lazy(() => import('./Layout'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-navy">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neon-cyan mb-4"></div>
      <p className="text-neon-cyan font-orbitron uppercase tracking-wider">Laden...</p>
    </div>
  </div>
);

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-navy p-4">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-orbitron text-neon-cyan mb-4">Oops!</h1>
            <p className="text-white mb-4">Etwas ist schiefgelaufen. Bitte laden Sie die Seite neu.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-neon-cyan text-navy rounded-lg font-semibold hover:bg-neon-pink transition-colors"
            >
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// App component with routing
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
            <Route path="/about" element={<Layout currentPageName="About"><About /></Layout>} />
            <Route path="/services" element={<Layout currentPageName="Services"><Services /></Layout>} />
            <Route path="/menu" element={<Layout currentPageName="Menu"><Menu /></Layout>} />
            <Route path="/gallery" element={<Layout currentPageName="Gallery"><Gallery /></Layout>} />
            <Route path="/contact" element={<Layout currentPageName="Contact"><Contact /></Layout>} />
            <Route path="*" element={<Layout currentPageName="Home"><Home /></Layout>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
