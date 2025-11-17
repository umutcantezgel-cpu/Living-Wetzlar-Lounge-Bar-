import React from 'react';

export default function FeatureCard({ icon: Icon, title, description, link }) {
    return (
        <div className="rounded-xl p-8 smooth-transition hover-lift scan-effect relative group"
            style={{
                background: 'rgba(20, 23, 43, 0.8)',
                border: '1px solid rgba(0, 255, 255, 0.2)'
            }}>
            <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 relative"
                style={{
                    background: 'rgba(255, 0, 255, 0.1)',
                    border: '2px solid rgba(255, 0, 255, 0.3)'
                }}>
                <Icon size={32} style={{ color: '#FF00FF', filter: 'drop-shadow(0 0 10px #FF00FF)' }} />
            </div>
            <h3 className="text-2xl font-semibold mb-4 uppercase tracking-wider"
                style={{ color: '#00FFFF', textShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
                {title}
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {description}
            </p>
            {link && (
                <a
                    href={link}
                    className="smooth-transition font-medium inline-flex items-center uppercase text-sm"
                    style={{ color: '#FF00FF' }}
                >
                    Mehr erfahren
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            )}

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 opacity-50 group-hover:opacity-100 smooth-transition"
                style={{ borderColor: '#00FFFF' }} />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 opacity-50 group-hover:opacity-100 smooth-transition"
                style={{ borderColor: '#FF00FF' }} />
        </div>
    );
}
