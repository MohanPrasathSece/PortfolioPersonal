import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TinyStars from "@/components/portfolio/TinyStars";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Crowdfunding Platform",
      category: "Full-Stack",
      description: "Campaign Creation & Contribution System",
      fullDescription: "A comprehensive platform for creating and supporting crowdfunding campaigns with secure user registration and contribution workflows.",
      techStack: ["Java", "Spring Boot", "MySQL"],
      image: "/placeholder-project.jpg",
      github: "https://github.com/MohanPrasathSece/Crowdfunding-Springboot.git",
      demo: "https://crowdfunding-frontend-woad.vercel.app/login",
      assetsDir: "crowdfunding-platform"
    },
    {
      title: "CampusLink Portal",
      category: "Web Application",
      description: "Modern Campus Web Application",
      fullDescription: "A campus-focused web app built with modern React ecosystem, featuring deployment options via Lovable and custom domain support.",
      techStack: ["Vite", "TypeScript", "React", "Tailwind CSS", "shadcn-ui"],
      image: "/placeholder-project.jpg",
      github: "https://github.com/MohanPrasathSece/FinalCampusLink.git",
      demo: "https://frontend-campus-connect.vercel.app",
      assetsDir: "campuslink-portal"
    },
    {
      title: "Food Rescue Network",
      category: "MERN Stack",
      description: "Real-time Food Donation Platform",
      fullDescription: "MERN stack application connecting donors and volunteers to reduce food waste with real-time tracking and secure authentication.",
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
      image: "/placeholder-project.jpg",
      github: "https://github.com/MohanPrasathSece/FoodRescueNetwork.git",
      demo: "https://foodrescuefrontend.vercel.app",
      assetsDir: "food-rescue-network"
    },
    {
      title: "MediSmart-AI",
      category: "AI/ML",
      description: "AI-Powered Prescription Analysis",
      fullDescription: "AI-powered prescription analysis and pharmacy order management system using OCR/NER technology and real-time updates.",
      techStack: ["MERN", "Hugging Face", "Tesseract.js", "Socket.io"],
      image: "/placeholder-project.jpg",
      github: "https://github.com/MohanPrasathSece/MediSmart-Ai.git",
      demo: "https://medi-smart-frontend.vercel.app",
      assetsDir: "medismart-ai"
    },
    {
      title: "NammaCity",
      category: "Web Development",
      description: "City-Focused Web Application",
      fullDescription: "A city-focused web application currently in development with future scope for events, services, and interactive maps.",
      techStack: ["HTML", "CSS", "JavaScript"],
      image: "/placeholder-project.jpg",
      github: "https://github.com/MohanPrasathSece/NammaCity.git",
      demo: "#",
      assetsDir: "namma-city"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const openProjectDialog = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
    setModalImageIndex(0);
  };

  const getTechBadgeColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      "React": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Node.js": "bg-green-600/20 text-green-300 border-green-600/30",
      "MongoDB": "bg-green-500/20 text-green-400 border-green-500/30",
      "TypeScript": "bg-blue-600/20 text-blue-300 border-blue-600/30",
      "Stripe": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "Tailwind CSS": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      "OpenAI": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      "Framer Motion": "bg-pink-500/20 text-pink-400 border-pink-500/30"
    };
    return colors[tech] || "bg-primary/20 text-primary border-primary/30";
  };

  const loadProjectImages = (dir?: string) => {
    if (!dir) return [] as string[];
    const modules = import.meta.glob('/src/assets/projects/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF}', { eager: true, import: 'default' }) as Record<string, string>;
    const items = Object.entries(modules)
      .filter(([path]) => path.includes(`/src/assets/projects/${dir}/`))
      .map(([path, src]) => ({ path, src }))
      .sort((a, b) => a.path.localeCompare(b.path));
    return items.map(i => i.src).filter(Boolean);
  };

  // Get visible projects for carousel
  const visibleCount = 3;
  const getVisibleProjects = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % projects.length;
      visible.push({ ...projects[index], originalIndex: index });
    }
    return visible;
  };

  return (
    <section id="projects" className="relative py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-background via-background/95 to-background">
      {/* Tiny stars background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <TinyStars densityScale={1.25} />
      </div>

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Projects</span>
          </h2>
        </div>

        {/* Projects Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {getVisibleProjects().map((project, idx) => {
              const images = loadProjectImages(project.assetsDir);
              const projectImage = images.length > 0 ? images[0] : project.image;
              
              return (
                <div
                  key={`${project.title}-${idx}`}
                  className="group relative bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
                  onClick={() => openProjectDialog(project)}
                >
                  {/* Project Image */}
                  <div className="relative h-64 bg-muted overflow-hidden">
                    <img
                      src={projectImage}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23374151"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%239CA3AF"%3EProject Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-full border border-border">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    {/* Quick Links */}
                    <div className="mt-4 flex gap-2">
                      {project.github && project.github !== '#' && (
                        <a href={(project as any).github} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">Code</Button>
                        </a>
                      )}
                      {project.demo && project.demo !== '#' && (
                        <a href={(project as any).demo} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">Live</Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevProject}
              className="rounded-full w-12 h-12 border-2 hover:border-primary hover:bg-primary/10 transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextProject}
              className="rounded-full w-12 h-12 border-2 hover:border-primary hover:bg-primary/10 transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-background border-0 p-0">
          {selectedProject && (
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setIsDialogOpen(false)}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white border border-gray-300 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>

              {/* Header */}
              <div className="p-6 pb-4">
                <DialogTitle className="text-2xl font-bold mb-1 text-gray-900 dark:text-foreground">
                  {selectedProject.title}
                </DialogTitle>
                <p className="text-sm text-orange-500 font-medium">
                  {selectedProject.category}
                </p>
              </div>

              <div className="px-6 pb-4">
                <div className="relative h-80 bg-gray-100 dark:bg-muted rounded-lg overflow-hidden">
                  {(() => {
                    const images = loadProjectImages(selectedProject.assetsDir);
                    const src = images[modalImageIndex] || images[0] || selectedProject.image;
                    const hasMany = images.length > 1;
                    return (
                      <>
                        <img
                          src={src}
                          alt={selectedProject.title}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.src = 'data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"800\" height=\"600\"%3E%3Crect width=\"800\" height=\"600\" fill=\"%23374151\"/%3E%3Ctext x=\"50%25\" y=\"50%25\" dominant-baseline=\"middle\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"24\" fill=\"%239CA3AF\"%3EProject Preview%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        {hasMany && (
                          <>
                            <button
                              aria-label="Previous"
                              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-black shadow ring-1 ring-black/10 hover:bg-white"
                              onClick={() => setModalImageIndex((i) => {
                                const len = images.length; return (i - 1 + len) % len;
                              })}
                            >
                              <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                              aria-label="Next"
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-black shadow ring-1 ring-black/10 hover:bg-white"
                              onClick={() => setModalImageIndex((i) => {
                                const len = images.length; return (i + 1) % len;
                              })}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </button>
                            <div className="absolute bottom-2 right-3 text-xs px-2 py-1 rounded bg-black/60 text-white">
                              {modalImageIndex + 1} / {images.length}
                            </div>
                          </>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Description */}
              <div className="px-6 pb-4">
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed text-sm">
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Technologies Used */}
              <div className="px-6 pb-6">
                <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-foreground">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-white dark:bg-background text-gray-700 dark:text-foreground text-sm font-medium border border-gray-200 dark:border-border rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="px-6 pb-6 flex gap-3">
                {selectedProject.github && selectedProject.github !== '#' && (
                  <a href={selectedProject.github as any} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">View Code</Button>
                  </a>
                )}
                {selectedProject.demo && selectedProject.demo !== '#' && (
                  <a href={selectedProject.demo as any} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">Live Demo</Button>
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;