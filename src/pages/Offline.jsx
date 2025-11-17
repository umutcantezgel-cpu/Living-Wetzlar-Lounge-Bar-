import React from 'react';

export default function Offline() {
    return (
        <main id="main" className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4" style={{ color: '#00FFFF' }}>Sie sind offline</h1>
                <p className="mb-8" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-4 rounded-lg font-semibold smooth-transition neon-border uppercase"
                    style={{
                        background: 'rgba(0, 255, 255, 0.1)',
                        color: '#00FFFF'
                    }}
                >
                    Seite neu laden
                </button>
            </div>
        </main>
    );
}
