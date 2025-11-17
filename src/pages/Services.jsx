import React, { useState, memo } from 'react';
import { Coffee, Wind, ShoppingBag } from 'lucide-react';
import { createPageUrl, getOptimizedImageUrl } from '../utils';
import HeroSection from '../components/shared/HeroSection';

const Services = memo(() => {
    const [activeTab, setActiveTab] = useState('cafe');

    const services = {
        cafe: {
            icon: Coffee,
            title: 'Cafe & Getränke',
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
            description: 'Unser Cafe bietet Ihnen eine vielfältige Auswahl an erstklassigen Getränken.',
            features: ['Premium Espresso-basierte Getränke', 'Spezialitätenkaffee', 'Heiße Getränke', 'Kalte Erfrischungen', 'Leichte Speisen']
        },
        lounge: {
            icon: Wind,
            title: 'Shisha Lounge',
            image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80',
            description: 'Erleben Sie authentische Shisha-Kultur in entspannter Premium-Atmosphäre.',
            features: ['Premium Shisha-Setups', 'Große Auswahl an Tabaksorten', 'Gemütliche Atmosphäre', 'Professioneller Service']
        },
        shop: {
            icon: ShoppingBag,
            title: 'Retail Shop',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
            description: 'In unserem Shop finden Sie alles rund um die Wasserpfeife.',
            features: ['Große Auswahl an Wasserpfeifen', 'Premium Tabakmarken', 'Zubehör', 'Expertenwissen']
        }
    };

    const currentService = services[activeTab];
    const Icon = currentService.icon;

    return (
        <div>
            <HeroSection
                title="Unsere Services"
                subtitle="Vielfältige Angebote für jeden Anlass"
                backgroundImage="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1920&q=80"
                height="h-[50vh]"
            />
            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {Object.entries(services).map(([key, service]) => {
                            const TabIcon = service.icon;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold smooth-transition uppercase font-orbitron ${activeTab === key ? 'neon-border bg-neon-cyan/10 text-neon-cyan' : 'bg-navy-light/60 text-white'}`}
                                >
                                    <TabIcon size={20} />
                                    <span>{service.title}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="rounded-2xl overflow-hidden bg-navy-light border border-neon-cyan/20">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <img src={getOptimizedImageUrl(currentService.image)} alt={currentService.title} loading="lazy" className="w-full h-64 lg:h-auto object-cover" />
                            <div className="p-8">
                                <Icon size={48} className="mb-4 text-neon-pink" />
                                <h3 className="text-3xl font-bold mb-4 text-neon-cyan font-orbitron">{currentService.title}</h3>
                                <p className="mb-6 text-white/80">{currentService.description}</p>
                                <div className="space-y-3">
                                    {currentService.features.map((feature, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <div className="w-2 h-2 rounded-full mt-2 bg-neon-cyan" />
                                            <p className="text-white/90">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
});

Services.displayName = 'Services';
export default Services;
