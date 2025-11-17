import React from 'react';

export default function SectionHeading({
    title,
    subtitle,
    centered = true,
    accent = 'gold'
}) {
    const accentColors = {
        gold: '#FFD700',
        maroon: '#FF00FF',
        copper: '#00FFFF'
    };

    return (
        <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
            {subtitle && (
                <p className="text-sm font-semibold uppercase tracking-wider mb-3"
                    style={{
                        color: accentColors[accent],
                        textShadow: `0 0 10px ${accentColors[accent]}`
                    }}>
                    {subtitle}
                </p>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider"
                style={{
                    color: '#00FFFF',
                    textShadow: '0 0 20px rgba(0, 255, 255, 0.6)'
                }}>
                {title}
            </h2>
            <div className={`w-24 h-1 ${centered ? 'mx-auto' : ''}`}
                style={{
                    background: 'linear-gradient(90deg, #00FFFF, #FF00FF)',
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                }}></div>
        </div>
    );
}
