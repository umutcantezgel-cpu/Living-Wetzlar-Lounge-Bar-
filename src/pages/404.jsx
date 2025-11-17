import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function NotFound() {
    return (
        <main id="main" className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold mb-4" style={{
                    background: 'linear-gradient(135deg, #00FFFF, #FF00FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>404</h1>
                <h2 className="text-3xl font-bold mb-4" style={{ color: '#00FFFF' }}>Seite nicht gefunden</h2>
                <p className="mb-8" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to={createPageUrl('Home')}
                        className="px-8 py-4 rounded-lg font-semibold smooth-transition neon-border uppercase"
                        style={{
                            background: 'rgba(0, 255, 255, 0.1)',
                            color: '#00FFFF'
                        }}
                    >
                        Zur Startseite
                    </Link>
                    <Link
                        to={createPageUrl('Contact')}
                        className="px-8 py-4 rounded-lg font-semibold smooth-transition uppercase"
                        style={{
                            background: 'transparent',
                            border: '2px solid #FF00FF',
                            color: '#FF00FF'
                        }}
                    >
                        Kontakt aufnehmen
                    </Link>
                </div>
            </div>
        </main>
    );
}
