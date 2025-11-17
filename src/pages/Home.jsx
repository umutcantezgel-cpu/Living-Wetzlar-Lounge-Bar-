import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Wind, ShoppingBag, Calendar, Star, Instagram, ArrowRight } from 'lucide-react';
import { createPageUrl } from '../utils';
import HeroSection from '../components/shared/HeroSection';
import FeatureCard from '../components/shared/FeatureCard';
import SectionHeading from '../components/shared/SectionHeading';

export default function Home() {
    const features = [
        {
            icon: Wind,
            title: 'Premium Shisha',
            description: 'Entspannen Sie sich in unserer gemütlichen Lounge mit bester Shisha-Auswahl und authentischer Atmosphäre.'
        },
        {
            icon: Coffee,
            title: 'Cafe Perfektion',
            description: 'Hochwertige Kaffeespezialitäten, erfrischende Getränke und köstliche Snacks für jeden Geschmack.'
        },
        {
            icon: ShoppingBag,
            title: 'Shop & Produkte',
            description: 'Premium Wasserpfeifen und Zubehör direkt bei uns kaufen - Qualität und Expertenwissen garantiert.'
        },
        {
            icon: Calendar,
            title: 'Events & Feiern',
            description: 'Perfekter Ort für private Veranstaltungen, Geburtstage und Firmenevents in einzigartigem Ambiente.'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah M.',
            rating: 5,
            text: 'Die beste Shisha-Lounge in Dillenburg! Tolle Atmosphäre, freundliches Personal und erstklassige Qualität.',
            date: 'Februar 2024'
        },
        {
            name: 'Michael K.',
            rating: 5,
            text: 'Perfekter Ort zum Entspannen mit Freunden. Der Kaffee ist ausgezeichnet und die Shisha-Auswahl ist riesig!',
            date: 'Januar 2024'
        },
        {
            name: 'Lisa B.',
            rating: 5,
            text: 'Haben hier unseren Geburtstag gefeiert - einfach perfekt! Das Team hat alles super organisiert.',
            date: 'Dezember 2023'
        }
    ];

    return (
        <div>
            <HeroSection
                title="Premium Shisha Lounge & Cafe"
                subtitle="Entspannung, Kaffee & echte Shisha-Kultur in Dillenburg"
                backgroundImage="https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=1920&q=80"
                showButtons={true}
                primaryButtonText="Galerie erkunden"
                primaryButtonLink="Gallery"
                secondaryButtonText="Kontaktieren Sie uns"
                secondaryButtonLink="Contact"
            />

            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading
                        subtitle="Was wir anbieten"
                        title="Erleben Sie Classic"
                        centered={true}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading
                        subtitle="Kundenstimmen"
                        title="Was sagen unsere Gäste?"
                        centered={true}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="rounded-xl p-8 hover-lift scan-effect"
                                style={{
                                    background: 'rgba(20, 23, 43, 0.8)',
                                    border: '1px solid rgba(0, 255, 255, 0.2)'
                                }}>
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={20} style={{ fill: '#FFD700', color: '#FFD700', filter: 'drop-shadow(0 0 5px #FFD700)' }} />
                                    ))}
                                </div>
                                <p className="italic mb-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold" style={{ color: '#00FFFF' }}>{testimonial.name}</p>
                                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{testimonial.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text" style={{ color: '#FFD700' }}>
                        Bereit für ein unvergessliches Erlebnis?
                    </h2>
                    <p className="text-lg mb-8" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Besuchen Sie uns in Dillenburg und erleben Sie Premium Shisha-Kultur in entspannter Atmosphäre.
                    </p>
                    <Link
                        to={createPageUrl('Contact')}
                        className="inline-flex items-center px-8 py-4 rounded-lg text-lg font-semibold smooth-transition neon-border uppercase tracking-wider"
                        style={{
                            background: 'rgba(255, 215, 0, 0.1)',
                            color: '#FFD700'
                        }}
                    >
                        Kontaktieren Sie uns jetzt
                        <ArrowRight size={24} className="ml-2" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
