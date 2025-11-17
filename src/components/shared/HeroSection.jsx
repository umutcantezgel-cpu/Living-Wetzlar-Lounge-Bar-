import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl, getOptimizedImageUrl } from '../../utils';

const HeroSection = memo(({
    title,
    subtitle,
    backgroundImage,
    height = 'h-[70vh]',
    showButtons = false,
    primaryButtonText = 'Galerie',
    primaryButtonLink = 'Gallery',
    secondaryButtonText = 'Kontakt',
    secondaryButtonLink = 'Contact'
}) => {
    const optimizedBg = getOptimizedImageUrl(
        backgroundImage || 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=1920&q=80',
        1920,
        85
    );

    return (
        <section className={`relative ${height} flex items-center justify-center overflow-hidden`}>
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${optimizedBg}')`,
                    willChange: 'transform'
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(138, 58, 138, 0.7) 50%, rgba(0, 255, 255, 0.5) 100%)'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight neon-text text-neon-cyan font-orbitron">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-neon-pink font-orbitron">
                        {subtitle}
                    </p>
                )}

                {showButtons && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to={createPageUrl(primaryButtonLink)}
                            className="px-8 py-4 rounded-lg text-lg font-semibold smooth-transition hover:scale-105 hover-lift w-full sm:w-auto neon-border text-neon-pink font-orbitron uppercase tracking-wider"
                            style={{
                                background: 'rgba(255, 0, 255, 0.2)'
                            }}
                        >
                            {primaryButtonText}
                        </Link>
                        <Link
                            to={createPageUrl(secondaryButtonLink)}
                            className="px-8 py-4 rounded-lg text-lg font-semibold smooth-transition hover:scale-105 w-full sm:w-auto border-2 border-neon-gold text-neon-gold font-orbitron uppercase tracking-wider"
                        >
                            {secondaryButtonText}
                        </Link>
                    </div>
                )}
            </div>

            {/* Decorative gradient at bottom */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32"
                style={{ background: 'linear-gradient(to top, rgba(10, 14, 39, 1) 0%, transparent 100%)' }}
            />
        </section>
    );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
