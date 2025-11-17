import React, { memo } from 'react';

const SectionHeading = memo(({
    title,
    subtitle,
    centered = true,
    accent = 'gold'
}) => {
    const accentColors = {
        gold: 'text-neon-gold',
        maroon: 'text-neon-pink',
        copper: 'text-neon-cyan'
    };

    const accentClass = accentColors[accent] || accentColors.gold;

    return (
        <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
            {subtitle && (
                <p className={`text-sm font-semibold uppercase tracking-wider mb-3 font-orbitron ${accentClass}`}>
                    {subtitle}
                </p>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-neon-cyan font-orbitron neon-text">
                {title}
            </h2>
            <div
                className={`w-24 h-1 ${centered ? 'mx-auto' : ''}`}
                style={{
                    background: 'linear-gradient(90deg, #00FFFF, #FF00FF)',
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                }}
            />
        </div>
    );
});

SectionHeading.displayName = 'SectionHeading';

export default SectionHeading;
