import { ExternalLink, Github, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const ProjectsSection = () => {
  // Horizontal scroll variant – no active state needed

  const projects = [
    {
      title: "Crowdfunding Platform",
      tagline: "Campaign Creation & Contribution System",
      description: "A comprehensive platform for creating and supporting crowdfunding campaigns with secure user registration and contribution workflows.",
      features: [
        "Campaign creation & management",
        "Secure user registration",
        "Contribution workflow (donations)",
        "Campaign progress tracking"
      ],
      techStack: ["Java", "Spring Boot", "MySQL"],
      image: "/placeholder-project.jpg",
      github: "https://github.com/MohanPrasathSece/Crowdfunding-Springboot.git",
      demo: "https://crowdfunding-frontend-woad.vercel.app/login",
      assetsDir: "crowdfunding-platform"
    },
    {
      title: "CampusLink Portal",
      tagline: "Modern Campus Web Application",
      description: "A campus-focused web app built with modern React ecosystem, featuring deployment options via Lovable and custom domain support.",
      features: [
        "User-friendly React interface",
        "Backend server integration with Node.js",
        "Local development with Vite & npm",
        "Supports custom domain linking",
        "Deploy/edit options via Lovable"
      ],
      techStack: ["Vite", "TypeScript", "React", "Tailwind CSS", "shadcn-ui"],
      image: "/placeholder-project.jpg",
      github: "https://github.com/MohanPrasathSece/FinalCampusLink.git",
      demo: "https://frontend-campus-connect.vercel.app",
      assetsDir: "campuslink-portal"
    },
    // 'Task Manager' project removed per request
    {
      title: "Food Rescue Network",
      tagline: "Real-time Food Donation Platform",
      description: "MERN stack application connecting donors and volunteers to reduce food waste with real-time tracking and secure authentication.",
      features: [
        "Real-time food donation tracking",
        "JWT authentication for security",
        "Role-based dashboards (donor, volunteer, admin)",
        "MongoDB donation record storage",
        "Responsive React UI deployed on Vercel"
      ],
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
      image: "/placeholder-project.jpg",
      github: "https://github.com/MohanPrasathSece/FoodRescueNetwork.git",
      demo: "https://foodrescuefrontend.vercel.app",
      assetsDir: "food-rescue-network"
    },
    {
      title: "MediSmart-AI",
      tagline: "AI-Powered Prescription Analysis",
      description: "AI-powered prescription analysis and pharmacy order management system using OCR/NER technology and real-time updates.",
      features: [
        "OCR/NER to extract medicines from prescriptions",
        "Pharmacy dashboard with inventory management",
        "Role-based access (patient, pharmacy, delivery partner)",
        "Real-time updates using Socket.io",
        "Deployed prototype with secure authentication"
      ],
      techStack: ["MERN", "Hugging Face", "Tesseract.js", "Socket.io"],
      image: "/placeholder-project.jpg",
      github: "https://github.com/MohanPrasathSece/MediSmart-Ai.git",
      demo: "https://medi-smart-frontend.vercel.app",
      assetsDir: "medismart-ai"
    },
    {
      title: "NammaCity",
      tagline: "City-Focused Web Application",
      description: "A city-focused web application currently in development with future scope for events, services, and interactive maps.",
      features: [
        "Frontend & backend infrastructure",
        "UI designed for city-based data access",
        "Future scope: events, services, and maps",
        "Scalable architecture for city services"
      ],
      techStack: ["HTML", "CSS", "JavaScript"],
      image: "/placeholder-project.jpg",
      github: "https://github.com/MohanPrasathSece/NammaCity.git",
      demo: "#",
      assetsDir: "namma-city"
    }
  ];

  // Sort projects from newest to oldest if a year field is provided on any item
  const hasYears = projects.some((p: any) => typeof (p as any).year === 'number');
  const sortedProjects = hasYears
    ? [...projects].sort((a: any, b: any) => (b.year ?? -Infinity) - (a.year ?? -Infinity))
    : projects;
  const visibleProjects = sortedProjects.filter((p) => p.title !== "Task Manager");
  // Bring MediSmart-AI to the front
  const orderedProjects = [
    ...visibleProjects.filter((p) => p.title === "MediSmart-AI"),
    ...visibleProjects.filter((p) => p.title === "Food Rescue Network"),
    ...visibleProjects.filter((p) => p.title !== "MediSmart-AI" && p.title !== "Food Rescue Network"),
  ];
  const featuredTitles = new Set(["MediSmart-AI", "Food Rescue Network"]);

  // Navigation state removed in scroll variant

  const getTechBadgeColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      "Java": "bg-red-500/20 text-red-400",
      "Spring Boot": "bg-green-500/20 text-green-400",
      "React": "bg-blue-500/20 text-blue-400",
      "Node.js": "bg-green-600/20 text-green-300",
      "MongoDB": "bg-green-500/20 text-green-400",
      "TypeScript": "bg-blue-600/20 text-blue-300",
      "Vite": "bg-purple-500/20 text-purple-400",
      "Tailwind CSS": "bg-cyan-500/20 text-cyan-400"
    };
    return colors[tech] || "bg-primary/20 text-primary";
  };

  const outerScrollRef = useRef<HTMLDivElement | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<{ [k: number]: number }>({});
  const getIndex = (i: number, len: number) => {
    const idx = galleryIndex[i] ?? 0;
    if (idx < 0) return 0;
    if (idx >= len) return len - 1;
    return idx;
  };
  const step = (i: number, len: number, delta: number) => {
    setGalleryIndex((prev) => {
      const curr = prev[i] ?? 0;
      let next = (curr + delta) % len;
      if (next < 0) next += len;
      return { ...prev, [i]: next };
    });
  };

  // Lightbox state for enlarged view
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");
  const [lightboxIsLandscape, setLightboxIsLandscape] = useState<boolean | null>(null);
  const openLightbox = (imgs: string[], index: number, title: string) => {
    if (!imgs || imgs.length === 0) return;
    setLightboxImages(imgs);
    setLightboxIndex(Math.max(0, Math.min(index, imgs.length - 1)));
    setLightboxTitle(title);
    setLightboxIsLandscape(null);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const lightboxStep = (delta: number) => {
    setLightboxIndex((prev) => {
      const len = lightboxImages.length;
      if (len === 0) return 0;
      let next = (prev + delta) % len;
      if (next < 0) next += len;
      return next;
    });
  };

  // Lightbox UX enhancements: lock scroll and enable keyboard navigation
  useEffect(() => {
    if (lightboxOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxStep(-1);
        if (e.key === 'ArrowRight') lightboxStep(1);
      };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [lightboxOpen]);

  // Load images from assets/projects/<dir>.
  // Ordering rules:
  // 1) files named one..ten (prefix) come first in that order
  // 2) then files with numeric prefixes (1,2,3,...) in ascending order
  // 3) otherwise alphabetical
  const loadProjectImages = (dir?: string) => {
    if (!dir) return [] as string[];
    // Vite's import.meta.glob requires a static string. We glob all project images and filter by dir.
    const modules = import.meta.glob('/src/assets/projects/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF}', { eager: true, import: 'default' }) as Record<string, string>;
    const order = ["one","two","three","four","five","six","seven","eight","nine","ten"]; // enforced order by filename (prefix)
    const items = Object.entries(modules)
      .filter(([path]) => path.includes(`/src/assets/projects/${dir}/`))
      .map(([path, src]) => {
        const file = path.split('/').pop() || "";
        const name = file.split('.').slice(0, -1).join('.').toLowerCase();
        // Word-based index (one..ten)
        const wordIdx = order.findIndex(key => name.startsWith(key));
        // Numeric index from prefix like 1-, 02_, etc.
        const numMatch = name.match(/^(\d{1,3})/);
        const numIdx = numMatch ? parseInt(numMatch[1], 10) : NaN;
        // Compute composite sort keys
        const hasWord = wordIdx !== -1;
        const hasNum = Number.isFinite(numIdx);
        return { name, src, wordIdx, numIdx: hasNum ? numIdx : Number.POSITIVE_INFINITY, hasWord, hasNum };
      });
    const anyWord = items.some(i => i.hasWord);
    const anyNum = items.some(i => i.hasNum);
    items.sort((a, b) => {
      // Word order first if present
      if (anyWord) {
        if (a.hasWord && b.hasWord) return (a.wordIdx - b.wordIdx) || a.name.localeCompare(b.name);
        if (a.hasWord) return -1;
        if (b.hasWord) return 1;
      }
      // Then numeric prefixes
      if (anyNum) {
        if (a.hasNum && b.hasNum) return (a.numIdx - b.numIdx) || a.name.localeCompare(b.name);
        if (a.hasNum) return -1;
        if (b.hasNum) return 1;
      }
      // Fallback alpha
      return a.name.localeCompare(b.name);
    });
    return items.map(i => i.src).filter(Boolean);
  };

  return (
    <section id="projects" className="py-8 md:py-14 px-0 md:px-6">
      <div className="container px-0 md:px-4 max-w-none md:max-w-7xl mx-auto">
        <div className="mb-4 md:mb-8">
          <div className="flex flex-col items-center gap-2 md:gap-3 text-center">
            <h2 className="typ-h-section">
              Featured <span className="orange-gradient bg-clip-text text-transparent">Projects</span>
            </h2>
            {/* Mobile: icon-only below heading, aligned a bit to the right */}
            <div className="w-full flex md:hidden mt-1 justify-end pr-3">
              <a
                href="https://github.com/MohanPrasathSece"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <Button variant="outline-orange" size="sm" className="p-2 h-10 w-10 !px-2">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
            </div>
            {/* Desktop: full button centered below heading */}
            <div className="hidden md:block">
              <a
                href="https://github.com/MohanPrasathSece"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline-orange" size="sm">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Controls (scroll with trackpad/mouse) */}
        <div className="text-center mb-6 text-sm text-gray-text">Scroll to view more projects →</div>

        {/* Project List - Horizontal Scroll */}
        <div ref={outerScrollRef} className="overflow-x-auto overflow-y-visible no-scrollbar pl-3 pr-0 md:-mx-4 md:px-4 pb-2">
          <div className="flex gap-6 snap-x snap-mandatory">
            {orderedProjects.map((project, index) => {
              const gallery = loadProjectImages((project as any).assetsDir);
              const currentIdx = getIndex(index, gallery.length);
              const isFeatured = featuredTitles.has(project.title);
              return (
                <div key={index} className="snap-start min-w-[360px] sm:min-w-[720px] lg:min-w-[1200px] first:ml-1.5 md:first:ml-0">
                  <div className={`card-gradient card-shadow rounded-2xl hover-glow h-full relative hover:z-10 ${isFeatured ? 'border border-primary/40' : ''}`}>
                    <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl items-stretch">
                      {/* Project Image / Gallery */}
                      <div className="bg-muted flex items-center justify-center min-h-[84px] sm:min-h-[110px] md:min-h-[140px] lg:min-h-[160px] h-full">
                        {gallery.length > 0 ? (
                          <div className="relative w-full h-full px-3 sm:px-4 cursor-zoom-in group" onClick={() => openLightbox(gallery, currentIdx, project.title)}>
                            <div className="w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                              {(() => {
                                const imgs = gallery as string[];
                                const idx = getIndex(index, imgs.length);
                                const src = imgs[idx];
                                return (
                                  <img
                                    src={src}
                                    alt={`${project.title} screenshot ${idx + 1}`}
                                    loading="lazy"
                                    decoding="async"
                                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 560px, 900px"
                                    className="object-contain w-full h-auto max-h-36 sm:max-h-48 md:max-h-56 lg:max-h-64 mt-2 sm:mt-3 md:mt-4"
                                    onError={(e) => {
                                      const target = e.currentTarget as HTMLImageElement;
                                      if (target.src.endsWith('/placeholder.svg')) return;
                                      target.src = '/placeholder.svg';
                                    }}
                                  />
                                );
                              })()}
                            </div>
                            {/* Nav buttons */}
                            {gallery.length > 1 && (
                            <button
                              type="button"
                              aria-label="Previous image"
                              className="absolute left-2 top-2 p-1.5 text-white/90 hover:text-white z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); step(index, gallery.length, -1); }}
                            >
                              <ChevronLeft className="h-6 w-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                            </button>
                            )}
                            {gallery.length > 1 && (
                            <button
                              type="button"
                              aria-label="Next image"
                              className="absolute right-2 top-2 p-1.5 text-white/90 hover:text-white z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); step(index, gallery.length, 1); }}
                            >
                              <ChevronRight className="h-6 w-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                            </button>
                            )}
                            {/* Enlarge hint */}
                            <div
                              className="absolute bottom-2 right-2 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/70 text-white text-xs shadow ring-1 ring-white/15 pointer-events-none md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                              aria-hidden="true"
                            >
                              <Maximize2 className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Enlarge</span>
                            </div>
                          </div>
                        ) : project.title === "MediSmart-AI" ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-[92%] h-[85%] rounded-2xl overflow-hidden shadow-inner bg-gradient-to-b from-emerald-600 to-emerald-700">
                              <div className="h-full w-full flex flex-col items-center justify-center text-white text-center px-4">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-2">Your Health, Delivered.</h3>
                                <p className="text-sm md:text-base text-white/90 max-w-md mb-4">
                                  Compare medicine prices, upload prescriptions, and get your medications delivered to your doorstep.
                                </p>
                                <div className="flex gap-3 flex-wrap justify-center">
                                  <button className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-white text-emerald-700 text-sm md:text-base shadow hover:shadow-md transition-smooth">
                                    Search Medicines
                                  </button>
                                  <button className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-transparent border border-white/70 text-white text-sm md:text-base hover:bg-white/10 transition-smooth">
                                    Upload Prescription
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                              <ExternalLink className="h-8 w-8 text-primary" />
                            </div>
                            <p className="typ-body">Project Screenshot</p>
                            <p className="typ-small mt-1">Image placeholder - insert project screenshot</p>
                          </div>
                        )}
                      </div>

                      {/* Project Details */}
                      <div className="p-3 md:p-5">
                        <div className="mb-2 md:mb-3">
                          <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 leading-snug">{project.title}</h3>
                          <p className="text-primary font-medium text-sm md:text-base mb-1.5 md:mb-3">{project.tagline}</p>
                          <p className="text-sm md:text-base text-gray-text leading-relaxed">{project.description}</p>
                        </div>

                      {/* Features */}
                      <div className="mb-2 md:mb-3">
                        <h4 className="text-sm md:text-base text-primary font-semibold mb-1 md:mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2.5 flex-shrink-0" />
                              <span className="text-sm md:text-base text-gray-text">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-2 md:mb-3">
                        <h4 className="text-sm md:text-base text-primary font-semibold mb-1 md:mb-2">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full typ-badge ${getTechBadgeColor(tech)}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 md:gap-3">
                        <a href={(project as any).github} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="outline-orange" size="sm" className="w-full text-sm">
                            <Github className="mr-2 h-4 w-4" />
                            View Code
                          </Button>
                        </a>
                        <a href={(project as any).demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="outline-orange" size="sm" className="w-full text-sm">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    {lightboxOpen && (
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4" onClick={closeLightbox}>
        <div className="relative w-full max-w-6xl max-h-[92vh] bg-background rounded-xl shadow-2xl ring-1 ring-border overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-border/60 bg-muted/40">
            <div className="text-sm sm:text-base font-semibold truncate pr-2">{lightboxTitle}</div>
            <div className="flex items-center gap-2">
              {lightboxImages.length > 0 && (
                <span className="text-xs text-gray-text">{lightboxIndex + 1} / {lightboxImages.length}</span>
              )}
              <button
                aria-label="Close"
                className="px-2 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm"
                onClick={closeLightbox}
              >
                Back
              </button>
            </div>
          </div>
          {/* Content */}
          <div className="relative flex-1 min-h-0 flex items-center justify-center bg-black">
            <div className="w-full h-full flex items-center justify-center p-3 sm:p-4">
              <img
                src={lightboxImages[lightboxIndex]}
                alt={`Screenshot ${lightboxIndex + 1}`}
                onLoad={(e) => {
                  const img = e.currentTarget;
                  setLightboxIsLandscape(img.naturalWidth >= img.naturalHeight);
                }}
                className={
                  `object-contain ${
                    lightboxIsLandscape === null
                      ? 'max-h-[85vh] max-w-[92vw]'
                      : lightboxIsLandscape
                        ? 'h-auto max-h-[75vh] w-auto max-w-[70vw]'
                        : 'w-full max-w-[88%] h-auto max-h-[85vh]'
                  }`
                }
              />
            </div>
            {lightboxImages.length > 1 && (
              <>
                <button
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-black shadow ring-1 ring-black/10 hover:bg-white"
                  onClick={() => lightboxStep(-1)}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  aria-label="Next"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-black shadow ring-1 ring-black/10 hover:bg-white"
                  onClick={() => lightboxStep(1)}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )}
  </section>
);
};

export default ProjectsSection;