import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Wind, ShoppingBag, Calendar, Star, Instagram, ArrowRight } from 'lucide-react';
import { createPageUrl, getOptimizedImageUrl } from '../utils';
import HeroSection from '../components/shared/HeroSection';
import FeatureCard from '../components/shared/FeatureCard';
import SectionHeading from '../components/shared/SectionHeading';

const Home = memo(() => {
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

    const galleryPreview = [
        { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80', caption: 'Lounge Atmosphäre' },
        { url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80', caption: 'Premium Getränke' },
        { url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80', caption: 'Gemütliche Sitzecken' },
        { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', caption: 'Events & Feiern' },
        { url: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80', caption: 'Shisha-Vielfalt' },
        { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', caption: 'Cafe Spezialitäten' }
    ];

    return (
        <div>
            {/* Hero Section */}
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

            {/* Features Section */}
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

            {/* About Teaser */}
            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src={getOptimizedImageUrl('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80')}
                                alt="Classic Shisha Lounge Interior"
                                loading="lazy"
                                className="rounded-2xl shadow-2xl hover-lift"
                            />
                        </div>
                        <div>
                            <SectionHeading
                                subtitle="Über uns"
                                title="Willkommen bei Classic"
                                centered={false}
                            />
                            <p className="leading-relaxed mb-6 text-white/80">
                                Seit Jahren ist Classic Shisha Lounge & Shop der Premium-Treffpunkt in Dillenburg für
                                alle, die echte Shisha-Kultur, exzellenten Kaffee und eine entspannte Atmosphäre schätzen.
                            </p>
                            <p className="leading-relaxed mb-8 text-white/80">
                                Mit über 3000 zufriedenen Gästen in unserer Community bieten wir nicht nur erstklassige
                                Produkte und Services, sondern auch ein Zuhause für unvergessliche Momente mit Freunden.
                            </p>
                            <Link
                                to={createPageUrl('About')}
                                className="inline-flex items-center px-6 py-3 rounded-lg smooth-transition neon-border uppercase bg-neon-pink/10 text-neon-pink font-orbitron"
                            >
                                Mehr über uns
                                <ArrowRight size={20} className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Preview */}
            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading
                        subtitle="Unsere Galerie"
                        title="Erleben Sie unser Ambiente"
                        centered={true}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {galleryPreview.map((image, index) => (
                            <div key={index} className="relative group overflow-hidden rounded-xl aspect-square hover-lift">
                                <img
                                    src={getOptimizedImageUrl(image.url)}
                                    alt={image.caption}
                                    loading="lazy"
                                    className="w-full h-full object-cover smooth-transition group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 smooth-transition flex items-end p-6">
                                    <p className="text-white text-lg font-semibold">{image.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to={createPageUrl('Gallery')}
                            className="inline-flex items-center px-8 py-4 rounded-lg smooth-transition neon-border uppercase tracking-wider bg-neon-cyan/10 text-neon-cyan font-orbitron"
                        >
                            Vollständige Galerie ansehen
                            <ArrowRight size={20} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading
                        subtitle="Kundenstimmen"
                        title="Was sagen unsere Gäste?"
                        centered={true}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="rounded-xl p-8 hover-lift scan-effect bg-navy-light border border-neon-cyan/20">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={20} className="fill-neon-gold text-neon-gold" style={{ filter: 'drop-shadow(0 0 5px #FFD700)' }} />
                                    ))}
                                </div>
                                <p className="italic mb-6 text-white/90">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold text-neon-cyan">{testimonial.name}</p>
                                    <p className="text-sm text-white/50">{testimonial.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instagram Feed */}
            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <SectionHeading
                            subtitle="Social Media"
                            title="Folgen Sie uns auf Instagram"
                            centered={true}
                        />
                        <a
                            href="https://instagram.com/classicshishalounge_"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-neon-pink hover:text-neon-cyan smooth-transition font-medium mt-4"
                        >
                            <Instagram size={24} className="mr-2" />
                            @classicshishalounge_
                        </a>
                    </div>

                    <div className="rounded-2xl p-8 text-center scan-effect bg-navy-light border border-neon-pink/20 shadow-lg">
                        <Instagram size={64} className="mx-auto mb-4 text-neon-pink" style={{ filter: 'drop-shadow(0 0 10px #FF00FF)' }} />
                        <p className="mb-6 text-white/80">
                            Besuchen Sie unser Instagram-Profil für aktuelle Bilder, Events und Specials!
                        </p>
                        <a
                            href="https://instagram.com/classicshishalounge_"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 rounded-lg smooth-transition neon-border uppercase bg-neon-pink/10 text-neon-pink font-orbitron"
                        >
                            Zu Instagram
                            <ArrowRight size={20} className="ml-2" />
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text text-neon-gold font-orbitron">
                        Bereit für ein unvergessliches Erlebnis?
                    </h2>
                    <p className="text-lg mb-8 text-white/80">
                        Besuchen Sie uns in Dillenburg und erleben Sie Premium Shisha-Kultur in entspannter Atmosphäre.
                    </p>
                    <Link
                        to={createPageUrl('Contact')}
                        className="inline-flex items-center px-8 py-4 rounded-lg text-lg font-semibold smooth-transition neon-border uppercase tracking-wider bg-neon-gold/10 text-neon-gold font-orbitron"
                    >
                        Kontaktieren Sie uns jetzt
                        <ArrowRight size={24} className="ml-2" />
                    </Link>
                </div>
            </section>
        </div>
    );
});

Home.displayName = 'Home';

export default Home;
