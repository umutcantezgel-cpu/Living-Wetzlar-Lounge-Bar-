import React from 'react';

export default function CyberpunkEffects() {
    return (
        <>
            {/* Scanlines Overlay */}
            <div
                className="scanlines fixed top-0 left-0 w-full h-full pointer-events-none"
                style={{ zIndex: 9999 }}
                aria-hidden="true"
            />

            {/* Vignette Effect */}
            <div
                className="vignette fixed top-0 left-0 w-full h-full pointer-events-none"
                style={{ zIndex: 9998 }}
                aria-hidden="true"
            />
        </>
    );
}
