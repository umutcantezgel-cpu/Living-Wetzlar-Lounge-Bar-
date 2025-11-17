import React from 'react';
import HeroSection from '../components/shared/HeroSection';
import SectionHeading from '../components/shared/SectionHeading';

export default function Menu() {
    return (
        <div>
            <HeroSection
                title="Unser Menü"
                subtitle="Entdecken Sie unsere vielfältige Auswahl"
                backgroundImage="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&q=80"
                height="h-[50vh]"
            />
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading
                        subtitle="Unsere Karte"
                        title="Genießen Sie Qualität"
                        centered={true}
                    />
                    <p className="text-center max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Von exzellentem Kaffee bis zu Premium Shisha - bei uns finden Sie alles für ein perfektes Erlebnis.
                    </p>
                </div>
            </section>
        </div>
    );
}
