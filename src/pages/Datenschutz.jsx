import React from 'react';
import HeroSection from '../components/shared/HeroSection';

export default function Datenschutz() {
    return (
        <div>
            <HeroSection
                title="Datenschutzerklärung"
                subtitle="Informationen zum Datenschutz gemäß DSGVO"
                height="h-[40vh]"
            />
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto prose prose-invert">
                    <h2 className="text-2xl font-bold mb-4" style={{ color: '#00FFFF' }}>Datenschutz</h2>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                        Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften.
                    </p>
                    <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: '#00FFFF' }}>Cookies</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Diese Website verwendet Cookies. Diese dienen dazu, unser Angebot nutzerfreundlicher zu gestalten.
                        Sie können Ihre Cookie-Einstellungen jederzeit über den Cookie-Banner anpassen.
                    </p>
                    <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: '#00FFFF' }}>Kontaktformular</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Bei der Nutzung des Kontaktformulars werden die von Ihnen eingegebenen Daten
                        zur Bearbeitung Ihrer Anfrage verwendet und gespeichert.
                    </p>
                </div>
            </section>
        </div>
    );
}
