import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Clock } from 'lucide-react';
import { createPageUrl, isMobile, prefersReducedMotion } from './utils';

// Lazy load heavy effect components only when needed
const SmokeCanvas = lazy(() => import('./components/effects/SmokeCanvas'));
const CyberpunkBackground = lazy(() => import('./components/effects/CyberpunkBackground'));

export default function Layout({ children, currentPageName }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showEffects, setShowEffects] = useState(false);
    const location = useLocation();

    // Only show heavy effects on desktop and if user doesn't prefer reduced motion
    useEffect(() => {
        const shouldShowEffects = !isMobile() && !prefersReducedMotion();
        setShowEffects(shouldShowEffects);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location]);

    const navigationLinks = [
        { name: 'Home', page: 'Home' },
        { name: 'Über Uns', page: 'About' },
        { name: 'Services', page: 'Services' },
        { name: 'Menü', page: 'Menu' },
        { name: 'Galerie', page: 'Gallery' },
        { name: 'Kontakt', page: 'Contact' }
    ];

    return (
        <div className="min-h-screen text-white relative">
            {/* Cyberpunk Background Effects - Only on desktop */}
            {showEffects && (
                <Suspense fallback={null}>
                    <CyberpunkBackground />
                    <SmokeCanvas />
                </Suspense>
            )}

            {/* Lightweight scanlines and vignette - Always show */}
            <div className="scanlines" />
            <div className="vignette" />

            {/* Header Navigation */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 smooth-transition ${
                    isScrolled ? 'cyber-bg shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
                }`}
                style={{
                    borderBottom: isScrolled ? '1px solid rgba(0, 255, 255, 0.3)' : 'none',
                    boxShadow: isScrolled ? '0 0 20px rgba(0, 255, 255, 0.2)' : 'none'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <Link to={createPageUrl('Home')} className="flex items-center space-x-2 group" aria-label="Zur Startseite">
                            <div className="text-2xl font-bold neon-text text-neon-cyan font-orbitron">
                                CLASSIC
                            </div>
                            <div className="text-sm hidden sm:block text-neon-pink font-orbitron">
                                SHISHA LOUNGE
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8" aria-label="Hauptnavigation">
                            {navigationLinks.map((link) => (
                                <Link
                                    key={link.page}
                                    to={createPageUrl(link.page)}
                                    className={`smooth-transition text-sm font-medium uppercase tracking-wider ${
                                        currentPageName === link.page ? 'neon-text text-neon-cyan' : 'text-white hover:text-neon-cyan'
                                    }`}
                                    aria-current={currentPageName === link.page ? 'page' : undefined}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Contact Button */}
                        <Link
                            to={createPageUrl('Contact')}
                            className="hidden lg:block px-6 py-2 rounded-lg smooth-transition neon-border text-neon-cyan font-orbitron uppercase font-bold tracking-wider"
                        >
                            Kontakt
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 neon-border rounded text-neon-cyan"
                            aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav
                        className="lg:hidden cyber-bg border-t border-neon-cyan/30"
                        aria-label="Mobile Navigation"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navigationLinks.map((link) => (
                                <Link
                                    key={link.page}
                                    to={createPageUrl(link.page)}
                                    className={`block py-2 px-4 rounded smooth-transition uppercase tracking-wider ${
                                        currentPageName === link.page
                                            ? 'neon-border text-neon-cyan bg-neon-cyan/10'
                                            : 'text-white'
                                    }`}
                                    aria-current={currentPageName === link.page ? 'page' : undefined}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                )}
            </header>

            {/* Main Content */}
            <main className="pt-16 relative" style={{ zIndex: 10 }}>
                {children}
            </main>

            {/* Footer */}
            <footer
                className="mt-20 relative border-t border-neon-cyan/20"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, #0a0e27 20%)'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Brand Column */}
                        <div>
                            <h3 className="text-2xl font-bold neon-text text-neon-cyan mb-4 font-orbitron">
                                CLASSIC
                            </h3>
                            <p className="text-sm mb-4 text-white/70">
                                Premium Shisha Lounge & Cafe in Dillenburg. Entspannung, Kaffee & echte Shisha-Kultur seit Jahren.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="smooth-transition hover:scale-110 text-neon-cyan"
                                    aria-label="Facebook"
                                >
                                    <Facebook size={24} />
                                </a>
                                <a
                                    href="https://instagram.com/classicshishalounge_"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="smooth-transition hover:scale-110 text-neon-pink"
                                    aria-label="Instagram"
                                >
                                    <Instagram size={24} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold mb-4 uppercase tracking-wider text-neon-cyan font-orbitron">
                                Quick Links
                            </h4>
                            <ul className="space-y-2 text-sm">
                                {['About', 'Services', 'Menu', 'Gallery'].map(page => (
                                    <li key={page}>
                                        <Link
                                            to={createPageUrl(page)}
                                            className="text-white/70 hover:text-neon-cyan smooth-transition"
                                        >
                                            {page === 'About' ? 'Über Uns' : page === 'Menu' ? 'Menü' : page === 'Gallery' ? 'Galerie' : page}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Opening Hours */}
                        <div>
                            <h4 className="font-semibold mb-4 flex items-center uppercase tracking-wider text-neon-cyan font-orbitron">
                                <Clock size={20} className="mr-2" />
                                Öffnungszeiten
                            </h4>
                            <ul className="space-y-2 text-sm text-white/70">
                                <li className="flex justify-between">
                                    <span>Mo - Do</span>
                                    <span>14:00 - 00:00</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Fr - Sa</span>
                                    <span>14:00 - 02:00</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Sonntag</span>
                                    <span>14:00 - 23:00</span>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-semibold mb-4 uppercase tracking-wider text-neon-cyan font-orbitron">
                                Kontakt
                            </h4>
                            <ul className="space-y-3 text-sm text-white/70">
                                <li className="flex items-start">
                                    <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-neon-cyan" />
                                    <span>35683 Dillenburg<br />Hessen, Deutschland</span>
                                </li>
                                <li className="flex items-center">
                                    <Phone size={18} className="mr-2 flex-shrink-0 text-neon-cyan" />
                                    <a href="tel:+4927719999999" className="smooth-transition hover:text-neon-cyan">
                                        +49 (0) 2771 999 9999
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <Mail size={18} className="mr-2 flex-shrink-0 text-neon-cyan" />
                                    <a href="mailto:info@classic-shisha.de" className="smooth-transition hover:text-neon-cyan">
                                        info@classic-shisha.de
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-8 pt-8 text-center text-sm border-t border-neon-cyan/20 text-white/50">
                        <p>&copy; {new Date().getFullYear()} Classic Shisha Lounge & Shop. Alle Rechte vorbehalten.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
