import React, { useState, memo, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getOptimizedImageUrl } from '../../utils';

const GalleryGrid = memo(({ images, columns = 3 }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = useCallback((image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
    }, []);

    const closeLightbox = useCallback(() => {
        setSelectedImage(null);
    }, []);

    const goToPrevious = useCallback(() => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);
    }, [currentIndex, images]);

    const goToNext = useCallback(() => {
        const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);
    }, [currentIndex, images]);

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
                        aria-label={`Öffne ${image.caption || `Bild ${index + 1}`}`}
                    >
                        <img
                            src={getOptimizedImageUrl(image.url, 800, 80)}
                            alt={image.caption || `Gallery image ${index + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover smooth-transition group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 smooth-transition flex items-center justify-center">
                            <div className="text-center text-white p-4">
                                {image.caption && (
                                    <p className="text-lg font-semibold">{image.caption}</p>
                                )}
                                <p className="text-sm text-white/80 mt-2">Klicken zum Vergrößern</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Bildgalerie"
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:text-neon-gold smooth-transition p-2 z-10"
                        aria-label="Schließen"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevious();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-neon-gold smooth-transition p-2 z-10"
                        aria-label="Vorheriges Bild"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-neon-gold smooth-transition p-2 z-10"
                        aria-label="Nächstes Bild"
                    >
                        <ChevronRight size={48} />
                    </button>

                    <div className="max-w-6xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={getOptimizedImageUrl(selectedImage.url, 1200, 90)}
                            alt={selectedImage.caption || 'Gallery image'}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />
                        {selectedImage.caption && (
                            <p className="text-white text-lg mt-4 text-center">{selectedImage.caption}</p>
                        )}
                        <p className="text-white/60 text-sm mt-2">
                            {currentIndex + 1} / {images.length}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
});

GalleryGrid.displayName = 'GalleryGrid';

export default GalleryGrid;
