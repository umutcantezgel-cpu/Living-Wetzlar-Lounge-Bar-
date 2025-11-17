import React from 'react';
import HeroSection from '../components/shared/HeroSection';
import SectionHeading from '../components/shared/SectionHeading';
import GalleryGrid from '../components/gallery/GalleryGrid';

export default function Gallery() {
    const images = [
        { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80', caption: 'Lounge Atmosphäre', category: 'lounge' },
        { url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80', caption: 'Gemütliche Sitzecken', category: 'lounge' },
        { url: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=800&q=80', caption: 'Premium Ambiente', category: 'lounge' },
        { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', caption: 'Cafe Spezialitäten', category: 'beverages' },
        { url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80', caption: 'Premium Getränke', category: 'beverages' },
        { url: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80', caption: 'Shisha-Vielfalt', category: 'products' }
    ];

    return (
        <div>
            <HeroSection
                title="Unsere Galerie"
                subtitle="Erleben Sie das Ambiente von Classic"
                backgroundImage="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1920&q=80"
                height="h-[50vh]"
            />
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <SectionHeading
                        subtitle="Impressionen"
                        title="Entdecken Sie unsere Welt"
                        centered={true}
                    />
                    <GalleryGrid images={images} columns={3} />
                </div>
            </section>
        </div>
    );
}
