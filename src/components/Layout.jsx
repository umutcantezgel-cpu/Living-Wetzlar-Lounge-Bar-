import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Clock } from 'lucide-react';
import { createPageUrl } from '../utils';
import SmokeCanvas from './effects/SmokeCanvas';
import CyberpunkEffects from './effects/CyberpunkEffects';
import CyberpunkBackground from './effects/CyberpunkBackground';

export default function Layout({ children, currentPageName }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="min-h-screen text-white relative" style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a3e 100%)' }}>
            <CyberpunkBackground />
            <SmokeCanvas />
            <CyberpunkEffects />

            {/* Header Navigation */}
            <header className={`fixed top-0 left-0 right-0 z-50 smooth-transition ${
                isScrolled ? 'cyber-bg shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
            }`} style={{
                borderBottom: isScrolled ? '1px solid rgba(0, 255, 255, 0.3)' : 'none',
                boxShadow: isScrolled ? '0 0 20px rgba(0, 255, 255, 0.2)' : 'none'
            }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link to={createPageUrl('Home')} className="flex items-center space-x-2 group">
                            <div className="text-2xl font-bold neon-text" style={{ color: '#00FFFF' }}>
                                CLASSIC
                            </div>
                            <div className="text-sm hidden sm:block" style={{
                                color: '#FF00FF',
                                textShadow: '0 0 10px #FF00FF'
                            }}>
                                SHISHA LOUNGE
                            </div>
                        </Link>

                        <nav className="hidden lg:flex items-center space-x-8">
                            {navigationLinks.map((link) => (
                                <Link
                                    key={link.page}
                                    to={createPageUrl(link.page)}
                                    className={`smooth-transition text-sm font-medium uppercase tracking-wider ${
                                        currentPageName === link.page ? 'neon-text' : 'hover:neon-text'
                                    }`}
                                    style={{
                                        color: currentPageName === link.page ? '#00FFFF' : '#ffffff',
                                        textShadow: currentPageName === link.page ? '0 0 10px #00FFFF' : 'none'
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        <Link
                            to={createPageUrl('Contact')}
                            className="hidden lg:block px-6 py-2 rounded-lg smooth-transition neon-border"
                            style={{
                                background: 'transparent',
                                color: '#00FFFF',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                letterSpacing: '2px'
                            }}
                        >
                            Kontakt
                        </Link>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 neon-border rounded"
                            style={{ color: '#00FFFF' }}
                            aria-label="Menü öffnen/schließen"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="lg:hidden cyber-bg border-t" style={{ borderColor: 'rgba(0, 255, 255, 0.3)' }}>
                        <nav className="px-4 py-4 space-y-3">
                            {navigationLinks.map((link) => (
                                <Link
                                    key={link.page}
                                    to={createPageUrl(link.page)}
                                    className={`block py-2 px-4 rounded smooth-transition uppercase tracking-wider ${
                                        currentPageName === link.page ? 'neon-border' : ''
                                    }`}
                                    style={{
                                        color: currentPageName === link.page ? '#00FFFF' : '#ffffff',
                                        background: currentPageName === link.page ? 'rgba(0, 255, 255, 0.1)' : 'transparent'
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="pt-16 relative" style={{ zIndex: 10 }}>
                {children}
            </main>

            {/* Footer */}
            <footer className="mt-20 relative" style={{
                background: 'linear-gradient(to bottom, transparent 0%, #0a0e27 20%)',
                borderTop: '1px solid rgba(0, 255, 255, 0.2)'
            }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold neon-text mb-4" style={{ color: '#00FFFF' }}>
                                CLASSIC
                            </h3>
                            <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Premium Shisha Lounge & Cafe in Dillenburg. Entspannung, Kaffee & echte Shisha-Kultur seit Jahren.
                            </p>
                            <div className="flex space-x-4">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                   className="smooth-transition hover:scale-110"
                                   style={{ color: '#00FFFF', filter: 'drop-shadow(0 0 5px #00FFFF)' }}
                                   aria-label="Facebook">
                                    <Facebook size={24} />
                                </a>
                                <a href="https://instagram.com/classicshishalounge_" target="_blank" rel="noopener noreferrer"
                                   className="smooth-transition hover:scale-110"
                                   style={{ color: '#FF00FF', filter: 'drop-shadow(0 0 5px #FF00FF)' }}
                                   aria-label="Instagram">
                                    <Instagram size={24} />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 uppercase tracking-wider" style={{ color: '#00FFFF', textShadow: '0 0 10px #00FFFF' }}>
                                Quick Links
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to={createPageUrl('About')} className="smooth-transition" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Über Uns</Link></li>
                                <li><Link to={createPageUrl('Services')} className="smooth-transition" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Services</Link></li>
                                <li><Link to={createPageUrl('Menu')} className="smooth-transition" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Menü</Link></li>
                                <li><Link to={createPageUrl('Gallery')} className="smooth-transition" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Galerie</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 flex items-center uppercase tracking-wider" style={{ color: '#00FFFF', textShadow: '0 0 10px #00FFFF' }}>
                                <Clock size={20} className="mr-2" />
                                Öffnungszeiten
                            </h4>
                            <ul className="space-y-2 text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                <li className="flex justify-between"><span>Mo - Do</span><span>14:00 - 00:00</span></li>
                                <li className="flex justify-between"><span>Fr - Sa</span><span>14:00 - 02:00</span></li>
                                <li className="flex justify-between"><span>Sonntag</span><span>14:00 - 23:00</span></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 uppercase tracking-wider" style={{ color: '#00FFFF', textShadow: '0 0 10px #00FFFF' }}>
                                Kontakt
                            </h4>
                            <ul className="space-y-3 text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                <li className="flex items-start">
                                    <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" style={{ color: '#00FFFF' }} />
                                    <span>35683 Dillenburg<br />Hessen, Deutschland</span>
                                </li>
                                <li className="flex items-center">
                                    <Phone size={18} className="mr-2 flex-shrink-0" style={{ color: '#00FFFF' }} />
                                    <a href="tel:+4927719999999" className="smooth-transition">+49 (0) 2771 999 9999</a>
                                </li>
                                <li className="flex items-center">
                                    <Mail size={18} className="mr-2 flex-shrink-0" style={{ color: '#00FFFF' }} />
                                    <a href="mailto:info@classic-shisha.de" className="smooth-transition">info@classic-shisha.de</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 text-center text-sm" style={{
                        borderTop: '1px solid rgba(0, 255, 255, 0.2)',
                        color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                        <p>&copy; {new Date().getFullYear()} Classic Shisha Lounge & Shop. Alle Rechte vorbehalten.</p>
                        <div className="mt-2 space-x-4">
                            <Link to={createPageUrl('Impressum')} className="smooth-transition hover:text-neon-cyan">Impressum</Link>
                            <Link to={createPageUrl('Datenschutz')} className="smooth-transition hover:text-neon-cyan">Datenschutz</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
