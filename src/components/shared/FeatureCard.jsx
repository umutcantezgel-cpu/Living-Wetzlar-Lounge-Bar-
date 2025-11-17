import React, { memo } from 'react';

const FeatureCard = memo(({ icon: Icon, title, description, link }) => {
    return (
        <div
            className="rounded-xl p-8 smooth-transition hover-lift scan-effect relative group bg-navy-light border border-neon-cyan/20"
        >
            <div
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 relative bg-neon-pink/10 border-2 border-neon-pink/30"
            >
                <Icon size={32} className="text-neon-pink" style={{ filter: 'drop-shadow(0 0 10px #FF00FF)' }} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 uppercase tracking-wider text-neon-cyan font-orbitron">
                {title}
            </h3>
            <p className="leading-relaxed mb-4 text-white/80">
                {description}
            </p>
            {link && (
                <a
                    href={link}
                    className="smooth-transition font-medium inline-flex items-center uppercase text-sm text-neon-pink hover:text-neon-cyan"
                >
                    Mehr erfahren
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            )}

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 opacity-50 group-hover:opacity-100 smooth-transition border-neon-cyan" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 opacity-50 group-hover:opacity-100 smooth-transition border-neon-pink" />
        </div>
    );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;
