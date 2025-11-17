import React from 'react';
import HeroSection from '../components/shared/HeroSection';

export default function Impressum() {
    return (
        <div>
            <HeroSection
                title="Impressum"
                subtitle="Angaben gemäß § 5 TMG"
                height="h-[40vh]"
            />
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto prose prose-invert">
                    <h2 className="text-2xl font-bold mb-4" style={{ color: '#00FFFF' }}>Angaben gemäß § 5 TMG</h2>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Classic Shisha Lounge & Shop<br />
                        Musterstraße 123<br />
                        35683 Dillenburg<br />
                        Deutschland
                    </p>
                    <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: '#00FFFF' }}>Kontakt</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Telefon: +49 (0) 2771 999 9999<br />
                        E-Mail: info@classic-shisha.de
                    </p>
                    <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: '#00FFFF' }}>Haftungsausschluss</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
                        Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                    </p>
                </div>
            </section>
        </div>
    );
}
