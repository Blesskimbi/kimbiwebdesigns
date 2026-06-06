import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageItem {
    src: string;
    alt: string;
}

const BlogImageCarousel = ({ images }: { images: ImageItem[] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1, align: 'start' });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi]);

    if (images.length === 0) return null;

    return (
        <div className="relative my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group/carousel bg-black/20">
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex touch-pan-y">
                    {images.map((img, i) => (
                        <div key={i} className="flex-none w-full flex items-center justify-center min-h-[200px]">
                            <img
                                src={img.src}
                                alt={img.alt || `Image ${i + 1}`}
                                className="w-full max-h-[560px] object-contain"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={scrollPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/90 transition-all opacity-0 group-hover/carousel:opacity-100 z-10 shadow-lg"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/90 transition-all opacity-0 group-hover/carousel:opacity-100 z-10 shadow-lg"
                        aria-label="Next image"
                    >
                        <ChevronRight size={22} />
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => emblaApi?.scrollTo(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === selectedIndex
                                        ? 'w-6 bg-white'
                                        : 'w-1.5 bg-white/40 hover:bg-white/70'
                                }`}
                                aria-label={`Go to image ${i + 1}`}
                            />
                        ))}
                    </div>

                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-semibold border border-white/10 z-10">
                        {selectedIndex + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    );
};

export default BlogImageCarousel;
