import { Camera, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Load all images from assets/photography using a static glob (required by Vite)
const photoModules = import.meta.glob(
  "/src/assets/photography/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF}",
  { eager: true, import: "default" }
) as Record<string, string>;

const photos: string[] = Object.entries(photoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

// Lightweight lazy image component
const LazyPhoto = ({ src, alt, priority = false, onClick }: { src: string; alt: string; priority?: boolean; onClick?: () => void }) => {
  const ref = useRef<HTMLImageElement | null>(null);
  const [shown, setShown] = useState(priority);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (priority || shown) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      });
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [priority, shown]);

  return (
    <button type="button" className="group relative block w-full h-full cursor-zoom-in" onClick={onClick}>
      {/* Blur-up placeholder */}
      <div className={`absolute inset-0 bg-gradient-to-br from-gray-800/40 to-gray-900/40 ${loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`} />
      <img
        ref={ref}
        src={shown ? src : undefined}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 260px"
        className={`w-full h-full object-cover transition-all duration-500 ${loaded ? 'blur-0 scale-100' : 'blur-md scale-105'}`}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (!target.dataset.fallback) {
            target.dataset.fallback = "1";
            target.src = "/placeholder.svg";
            setLoaded(true);
          }
        }}
      />
      {/* Enlarge hint */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 text-white text-[10px] md:text-xs shadow ring-1 ring-white/10 md:opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none">
        <Maximize2 className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Enlarge</span>
      </div>
    </button>
  );
};

const PhotographySection = () => {
  const hasPhotos = photos.length > 0;
  const BATCH = 12; // number of items to render per batch
  const [visibleCount, setVisibleCount] = useState(Math.min(BATCH, photos.length));
  const visiblePhotos = hasPhotos ? photos.slice(0, visibleCount) : [];

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const step = (d: number) => setLightboxIndex((prev) => {
    const len = visiblePhotos.length;
    if (len === 0) return 0;
    let next = (prev + d) % len;
    if (next < 0) next += len;
    return next;
  });
  useEffect(() => {
    if (!lightboxOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxOpen]);

  return (
    <section className="py-12 px-6 bg-secondary/10">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="h-10 w-10 text-primary animate-float" />
            <h2 className="text-3xl lg:text-4xl font-bold">
              Beyond Code: My Lens as a{" "}
              <span className="orange-gradient bg-clip-text text-transparent">Photographer</span>
            </h2>
          </div>
          <p className="text-base text-gray-text max-w-3xl mx-auto">
            When I'm not coding, I capture the world through my camera. Photography teaches me composition, 
            attention to detail, and creative problem-solving – skills that enhance my development work.
          </p>
        </div>

        {/* Photography Grid (4 per row on desktop) */}
        {hasPhotos ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {visiblePhotos.map((src, idx) => (
              <div key={idx} className="w-full">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-black/80">
                  <LazyPhoto src={src} alt={`Photo ${idx + 1}`} priority={idx < 4} onClick={() => openLightbox(idx)} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-full">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-black/80 flex items-center justify-center">
                  <Camera className="h-7 w-7 text-primary/60" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {hasPhotos && visibleCount < photos.length && (
          <div className="mt-8 text-center">
            <button
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground shadow hover:shadow-md transition-smooth"
              onClick={() => setVisibleCount((c) => Math.min(c + BATCH, photos.length))}
            >
              Load more photos
            </button>
            <div className="mt-2 text-xs text-gray-text">Showing {visibleCount} of {photos.length}</div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeLightbox}
          >
            <ChevronRight className="rotate-180" />
          </button>
          <img
            src={visiblePhotos[lightboxIndex]}
            alt={`Photo ${lightboxIndex + 1}`}
            className="max-w-4xl max-h-screen object-contain"
          />
          <button
            className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-2xl"
            onClick={() => step(-1)}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-2xl"
            onClick={() => step(1)}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default PhotographySection;