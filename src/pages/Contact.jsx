import React from 'react';
import HeroSection from '../components/shared/HeroSection';
import SectionHeading from '../components/shared/SectionHeading';
import ContactForm from '../components/contact/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
    return (
        <div>
            <HeroSection
                title="Kontakt"
                subtitle="Kontaktieren Sie uns oder besuchen Sie uns"
                backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
                height="h-[50vh]"
            />
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <SectionHeading
                                subtitle="Nachricht senden"
                                title="Kontaktieren Sie uns"
                                centered={false}
                            />
                            <div className="rounded-2xl p-8 shadow-lg" style={{
                                background: 'rgba(20, 23, 43, 0.8)',
                                border: '1px solid rgba(0, 255, 255, 0.2)'
                            }}>
                                <ContactForm />
                            </div>
                        </div>
                        <div>
                            <SectionHeading
                                subtitle="Besuchen Sie uns"
                                title="Classic Shisha Lounge"
                                centered={false}
                            />
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <MapPin size={24} className="mr-4" style={{ color: '#00FFFF' }} />
                                    <div>
                                        <h4 className="font-semibold mb-1" style={{ color: '#00FFFF' }}>Adresse</h4>
                                        <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>35683 Dillenburg<br />Hessen, Deutschland</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Phone size={24} className="mr-4" style={{ color: '#00FFFF' }} />
                                    <div>
                                        <h4 className="font-semibold mb-1" style={{ color: '#00FFFF' }}>Telefon</h4>
                                        <a href="tel:+4927719999999" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>+49 (0) 2771 999 9999</a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Mail size={24} className="mr-4" style={{ color: '#00FFFF' }} />
                                    <div>
                                        <h4 className="font-semibold mb-1" style={{ color: '#00FFFF' }}>E-Mail</h4>
                                        <a href="mailto:info@classic-shisha.de" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>info@classic-shisha.de</a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Clock size={24} className="mr-4" style={{ color: '#00FFFF' }} />
                                    <div>
                                        <h4 className="font-semibold mb-1" style={{ color: '#00FFFF' }}>Öffnungszeiten</h4>
                                        <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                            Mo-Do: 14:00 - 00:00<br />
                                            Fr-Sa: 14:00 - 02:00<br />
                                            Sonntag: 14:00 - 23:00
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
