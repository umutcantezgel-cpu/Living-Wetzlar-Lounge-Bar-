import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

export default function HeroSection({
    title,
    subtitle,
    backgroundImage,
    height = 'h-[70vh]',
    showButtons = false,
    primaryButtonText = 'Galerie',
    primaryButtonLink = 'Gallery',
    secondaryButtonText = 'Kontakt',
    secondaryButtonLink = 'Contact'
}) {
    return (
        <div className={`relative ${height} flex items-center justify-center overflow-hidden`}>
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${backgroundImage || 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=1920&q=80'}')`,
                }}
            >
                <div className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(138, 58, 138, 0.7) 50%, rgba(0, 255, 255, 0.5) 100%)'
                    }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight neon-text uppercase tracking-wider"
                    style={{ color: '#00FFFF' }}>
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
                        style={{
                            color: '#FF00FF',
                            textShadow: '0 0 15px rgba(255, 0, 255, 0.6)'
                        }}>
                        {subtitle}
                    </p>
                )}

                {showButtons && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to={createPageUrl(primaryButtonLink)}
                            className="px-8 py-4 rounded-lg text-lg font-semibold smooth-transition hover:scale-105 hover-lift w-full sm:w-auto neon-border uppercase tracking-wider"
                            style={{
                                background: 'rgba(255, 0, 255, 0.2)',
                                color: '#FF00FF'
                            }}
                        >
                            {primaryButtonText}
                        </Link>
                        <Link
                            to={createPageUrl(secondaryButtonLink)}
                            className="px-8 py-4 rounded-lg text-lg font-semibold smooth-transition hover:scale-105 w-full sm:w-auto uppercase tracking-wider"
                            style={{
                                background: 'transparent',
                                border: '2px solid #FFD700',
                                color: '#FFD700'
                            }}
                        >
                            {secondaryButtonText}
                        </Link>
                    </div>
                )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32"
                style={{ background: 'linear-gradient(to top, rgba(10, 14, 39, 1) 0%, transparent 100%)' }}></div>
        </div>
    );
}
