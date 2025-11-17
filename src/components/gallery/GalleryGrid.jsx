import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryGrid({ images, columns = 3 }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = () => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);
    };

    const goToNext = () => {
        const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);
    };

    // Keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, currentIndex]);

    const gridCols = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    };

    return (
        <>
            <div className={`grid ${gridCols[columns]} gap-6`}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square hover-lift"
                        onClick={() => openLightbox(image, index)}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => e.key === 'Enter' && openLightbox(image, index)}
                        aria-label={`Öffne Bild: ${image.caption || `Galeriebild ${index + 1}`}`}
                    >
                        <img
                            src={image.url}
                            alt={image.caption || `Gallery image ${index + 1}`}
                            className="w-full h-full object-cover smooth-transition group-hover:scale-110"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 smooth-transition flex items-center justify-center"
                            style={{ background: 'rgba(10, 14, 39, 0.8)' }}>
                            <div className="text-center p-4">
                                {image.caption && (
                                    <p className="text-lg font-semibold" style={{ color: '#00FFFF' }}>
                                        {image.caption}
                                    </p>
                                )}
                                <p className="text-sm mt-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    Klicken zum Vergrößern
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0, 0, 0, 0.95)' }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="lightbox-image-title"
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 p-2 smooth-transition"
                        style={{ color: '#00FFFF' }}
                        aria-label="Lightbox schließen"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 smooth-transition"
                        style={{ color: '#00FFFF' }}
                        aria-label="Vorheriges Bild"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 smooth-transition"
                        style={{ color: '#00FFFF' }}
                        aria-label="Nächstes Bild"
                    >
                        <ChevronRight size={48} />
                    </button>

                    <div className="max-w-6xl max-h-[90vh] flex flex-col items-center">
                        <img
                            id="lightbox-image-title"
                            src={selectedImage.url}
                            alt={selectedImage.caption || 'Gallery image'}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />
                        {selectedImage.caption && (
                            <p className="text-lg mt-4 text-center" style={{ color: '#ffffff' }}>
                                {selectedImage.caption}
                            </p>
                        )}
                        <p className="text-sm mt-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                            {currentIndex + 1} / {images.length}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
