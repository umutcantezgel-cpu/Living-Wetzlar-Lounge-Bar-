import React, { memo } from 'react';
import { Award, Users, Heart, Sparkles, CheckCircle, Star } from 'lucide-react';
import HeroSection from '../components/shared/HeroSection';
import SectionHeading from '../components/shared/SectionHeading';
import { getOptimizedImageUrl } from '../utils';

const About = memo(() => {
    const values = [
        { icon: Award, title: 'Premium Qualität', description: 'Wir bieten nur das Beste - von Shisha-Tabak über Kaffee bis zu unserem Service.' },
        { icon: Users, title: 'Gemeinschaft', description: 'Ein Treffpunkt für Freunde, Familie und alle, die entspannte Momente schätzen.' },
        { icon: Heart, title: 'Authentizität', description: 'Echte Shisha-Kultur mit Leidenschaft und Hingabe zum Detail.' },
        { icon: Sparkles, title: 'Erlebnis', description: 'Jeder Besuch soll unvergesslich sein - von Atmosphäre bis Service.' }
    ];

    const whyChooseUs = [
        'Mehrjährige Erfahrung im Premium-Segment',
        'Über 3000 zufriedene Gäste in unserer Community',
        'Zentrale Lage in Dillenburg',
        'Vielfältiges Angebot: Cafe, Lounge & Shop',
        'Event-freundliche Räumlichkeiten',
        'Professionelles und freundliches Team',
        'Hochwertige Produkte und Equipment',
        'Entspannte und stilvolle Atmosphäre'
    ];

    return (
        <div>
            <HeroSection
                title="Über Classic Shisha Lounge"
                subtitle="Premium-Treffpunkt für Genießer seit Jahren"
                backgroundImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80"
                height="h-[50vh]"
            />

            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src={getOptimizedImageUrl('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80')}
                                alt="Classic Lounge Interior"
                                loading="lazy"
                                className="rounded-2xl shadow-2xl hover-lift"
                            />
                        </div>
                        <div>
                            <SectionHeading subtitle="Unsere Geschichte" title="Willkommen bei Classic" centered={false} />
                            <p className="leading-relaxed mb-6 text-white/80">
                                Classic Shisha Lounge & Shop ist mehr als nur ein Ort - es ist ein Erlebnis. Seit unserer
                                Gründung haben wir uns zum Premium-Treffpunkt in Dillenburg entwickelt.
                            </p>
                            <p className="leading-relaxed text-white/80">
                                Mit über 3000 Mitgliedern in unserer Community sind wir stolz darauf,
                                ein zweites Zuhause für so viele Menschen zu sein.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading subtitle="Unsere Werte" title="Wofür wir stehen" centered={true} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        {values.map((value, index) => (
                            <div key={index} className="text-center p-6 rounded-xl hover-lift scan-effect bg-navy-light border border-neon-cyan/20">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-neon-pink/10 border-2 border-neon-pink/30">
                                    <value.icon size={40} className="text-neon-pink" style={{ filter: 'drop-shadow(0 0 10px #FF00FF)' }} />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 uppercase tracking-wider text-neon-cyan font-orbitron">
                                    {value.title}
                                </h3>
                                <p className="text-white/80">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading subtitle="Ihre Vorteile" title="Warum Classic Shisha?" centered={true} />
                    <div className="max-w-4xl mx-auto mt-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {whyChooseUs.map((reason, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <CheckCircle size={24} className="flex-shrink-0 mt-1 text-neon-cyan" style={{ filter: 'drop-shadow(0 0 5px #00FFFF)' }} />
                                    <p className="text-lg text-white/90">{reason}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold mb-2 neon-text text-neon-cyan font-orbitron">3000+</div>
                            <p className="text-white/80">Community Mitglieder</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2 neon-text text-neon-pink font-orbitron">5+</div>
                            <p className="text-white/80">Jahre Erfahrung</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2 neon-text text-neon-green font-orbitron">100+</div>
                            <p className="text-white/80">Veranstaltungen pro Jahr</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2 text-neon-gold font-orbitron">★★★★★</div>
                            <p className="text-white/80">Kundenbewertungen</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
});

About.displayName = 'About';
export default About;
