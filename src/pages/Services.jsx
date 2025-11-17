import React from 'react';
import HeroSection from '../components/shared/HeroSection';
import SectionHeading from '../components/shared/SectionHeading';

export default function Services() {
    return (
        <div>
            <HeroSection
                title="Unsere Services"
                subtitle="Vielfältige Angebote für jeden Anlass"
                backgroundImage="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1920&q=80"
                height="h-[50vh]"
            />
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading
                        subtitle="Unser Angebot"
                        title="Premium Services"
                        centered={true}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="rounded-xl p-8" style={{ background: 'rgba(20, 23, 43, 0.8)', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
                            <h3 className="text-2xl font-bold mb-4" style={{ color: '#00FFFF' }}>Café & Getränke</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Premium Espresso, Tee, Kaffee und mehr</p>
                        </div>
                        <div className="rounded-xl p-8" style={{ background: 'rgba(20, 23, 43, 0.8)', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
                            <h3 className="text-2xl font-bold mb-4" style={{ color: '#00FFFF' }}>Shisha Lounge</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Premium Shisha-Setups mit großer Auswahl</p>
                        </div>
                        <div className="rounded-xl p-8" style={{ background: 'rgba(20, 23, 43, 0.8)', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
                            <h3 className="text-2xl font-bold mb-4" style={{ color: '#00FFFF' }}>Shop</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Premium Wasserpfeifen und Zubehör</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
