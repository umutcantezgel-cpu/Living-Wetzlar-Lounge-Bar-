import React, { useState, memo } from 'react';
import HeroSection from '../components/shared/HeroSection';
import SectionHeading from '../components/shared/SectionHeading';
import GalleryGrid from '../components/gallery/GalleryGrid';

const Gallery = memo(() => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { key: 'all', label: 'Alle' },
        { key: 'lounge', label: 'Lounge' },
        { key: 'events', label: 'Events' },
        { key: 'beverages', label: 'Getränke' },
        { key: 'products', label: 'Produkte' }
    ];

    const allImages = [
        { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80', caption: 'Lounge Atmosphäre', category: 'lounge' },
        { url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80', caption: 'Gemütliche Sitzecken', category: 'lounge' },
        { url: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80', caption: 'Premium Ambiente', category: 'lounge' },
        { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', caption: 'Events & Feiern', category: 'events' },
        { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', caption: 'Geburtstagsfeier', category: 'events' },
        { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', caption: 'Cafe Spezialitäten', category: 'beverages' },
        { url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80', caption: 'Premium Getränke', category: 'beverages' },
        { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80', caption: 'Frischer Kaffee', category: 'beverages' },
        { url: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80', caption: 'Shisha-Vielfalt', category: 'products' },
        { url: 'https://images.unsplash.com/photo-1582194636597-2e53994a3e3c?w=800&q=80', caption: 'Premium Shishas', category: 'products' }
    ];

    const filteredImages = activeFilter === 'all' ? allImages : allImages.filter(img => img.category === activeFilter);

    return (
        <div>
            <HeroSection
                title="Unsere Galerie"
                subtitle="Erleben Sie das Ambiente von Classic"
                backgroundImage="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1920&q=80"
                height="h-[50vh]"
            />
            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading subtitle="Impressionen" title="Entdecken Sie unsere Welt" centered={true} />
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {filters.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setActiveFilter(filter.key)}
                                className={`px-6 py-3 rounded-lg font-semibold smooth-transition uppercase font-orbitron ${activeFilter === filter.key ? 'neon-border bg-neon-cyan/10 text-neon-cyan' : 'bg-navy-light/60 text-white'}`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                    <GalleryGrid images={filteredImages} columns={3} />
                    <div className="mt-16 rounded-2xl p-8 bg-navy-light border border-neon-cyan/20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold mb-2 neon-text text-neon-cyan font-orbitron">{allImages.length}</div>
                                <p className="text-white/70">Galerie-Bilder</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2 neon-text text-neon-pink font-orbitron">5+</div>
                                <p className="text-white/70">Jahre Erfahrung</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2 neon-text text-neon-gold font-orbitron">3000+</div>
                                <p className="text-white/70">Zufriedene Gäste</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
});

Gallery.displayName = 'Gallery';
export default Gallery;
