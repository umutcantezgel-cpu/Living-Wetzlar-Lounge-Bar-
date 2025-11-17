import React from 'react';
import HeroSection from '../components/shared/HeroSection';
import SectionHeading from '../components/shared/SectionHeading';

export default function About() {
    return (
        <div>
            <HeroSection
                title="Über Classic Shisha Lounge"
                subtitle="Premium-Treffpunkt für Genießer seit Jahren"
                backgroundImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80"
                height="h-[50vh]"
            />
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading
                        subtitle="Unsere Geschichte"
                        title="Willkommen bei Classic"
                        centered={true}
                    />
                    <p className="text-center max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Classic Shisha Lounge & Shop ist mehr als nur ein Ort - es ist ein Erlebnis.
                        Seit unserer Gründung haben wir uns zum Premium-Treffpunkt in Dillenburg entwickelt.
                    </p>
                </div>
            </section>
        </div>
    );
}
