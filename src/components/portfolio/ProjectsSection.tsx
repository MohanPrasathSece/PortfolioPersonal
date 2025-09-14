import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

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
      github: "#",
      demo: "#",
      gallery: [
        "/placeholder-project.jpg",
        "/placeholder-project.jpg",
        "/placeholder-project.jpg"
      ]
    },
    {
      title: "Campus Link",
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
      github: "#",
      demo: "#",
      gallery: [
        "/placeholder-project.jpg",
        "/placeholder-project.jpg",
        "/placeholder-project.jpg"
      ]
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
      github: "#",
      demo: "#"
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
      github: "#",
      demo: "#",
      gallery: [
        "/placeholder-project.jpg",
        "/placeholder-project.jpg",
        "/placeholder-project.jpg"
      ]
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
      github: "#",
      demo: "#",
      gallery: [
        "/placeholder-project.jpg",
        "/placeholder-project.jpg",
        "/placeholder-project.jpg"
      ]
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

  return (
    <section className="py-20 px-6">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="orange-gradient bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            A showcase of full-stack applications, AI-powered solutions, and innovative web platforms
          </p>
        </div>

        {/* Horizontal Scroll Controls (scroll with trackpad/mouse) */}
        <div className="text-center mb-6 text-sm text-gray-text">Scroll to view more projects →</div>

        {/* Project List - Horizontal Scroll */}
        <div ref={outerScrollRef} className="overflow-x-auto overflow-y-visible no-scrollbar -mx-4 px-4 pb-2">
          <div className="flex gap-6 snap-x snap-mandatory">
            {orderedProjects.map((project, index) => {
              const isFeatured = featuredTitles.has(project.title);
              return (
                <div key={index} className="snap-start min-w-[320px] sm:min-w-[560px] lg:min-w-[900px]">
                  <div className={`card-gradient card-shadow rounded-2xl hover-glow h-full relative hover:z-10 ${isFeatured ? 'border border-primary/40' : ''}`}>
                    {isFeatured && (
                      <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-md">
                        Featured
                      </div>
                    )}
                    <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl items-stretch">
                      {/* Project Image / Gallery */}
                      <div className="bg-muted flex items-center justify-center min-h-[160px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[260px] h-full">
                        {Array.isArray((project as any).gallery) && (project as any).gallery.length > 0 ? (
                          <div className="relative w-full h-full px-3 sm:px-4">
                            <div className="w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                              {(() => {
                                const imgs = (project as any).gallery as string[];
                                const idx = getIndex(index, imgs.length);
                                const src = imgs[idx];
                                return (
                                  <img
                                    src={src}
                                    alt={`${project.title} screenshot ${idx + 1}`}
                                    className="max-h-full max-w-full object-contain"
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
                            <button
                              type="button"
                              aria-label="Previous image"
                              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white shadow"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); step(index, (project as any).gallery.length, -1); }}
                            >
                              <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                              type="button"
                              aria-label="Next image"
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white shadow"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); step(index, (project as any).gallery.length, 1); }}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          </div>
                        ) : project.title === "MediSmart-AI" ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-[92%] h-[85%] rounded-2xl overflow-hidden shadow-inner" style={{background: 'linear-gradient(180deg,#16a34a 0%, #0f8a3b 100%)'}}>
                              <div className="h-full w-full flex flex-col items-center justify-center text-white text-center px-4">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-2">Your Health, Delivered.</h3>
                                <p className="text-xs md:text-sm text-white/90 max-w-md mb-4">
                                  Compare medicine prices, upload prescriptions, and get your medications delivered to your doorstep.
                                </p>
                                <div className="flex gap-3 flex-wrap justify-center">
                                  <button className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-white text-emerald-700 text-xs md:text-sm shadow hover:shadow-md transition-smooth">
                                    Search Medicines
                                  </button>
                                  <button className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-transparent border border-white/70 text-white text-xs md:text-sm hover:bg-white/10 transition-smooth">
                                    Upload Prescription
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <ExternalLink className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-muted-foreground">Project Screenshot</p>
                            <p className="text-sm text-gray-text mt-1">Image placeholder - insert project screenshot</p>
                          </div>
                        )}
                      </div>

                      {/* Project Details */}
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                          <p className="text-primary font-medium mb-4">{project.tagline}</p>
                          <p className="text-gray-text leading-relaxed">{project.description}</p>
                        </div>

                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="font-semibold mb-3 text-primary">Key Features:</h4>
                        <ul className="space-y-1.5">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                              <span className="text-gray-text text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <h4 className="font-semibold mb-3 text-primary">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getTechBadgeColor(tech)}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button variant="hero" size="sm" className="flex-1">
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </Button>
                        <Button variant="outline-orange" size="sm" className="flex-1">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Button>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicators removed in scrollable variant */}
      </div>
    </section>
  );
};

export default ProjectsSection;