import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(0);

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
      demo: "#"
    },
    {
      title: "FinalCampusLink",
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
      demo: "#"
    },
    {
      title: "Task Manager",
      tagline: "Collaborative Task Management",
      description: "A simple but functional task management web app with collaboration features and productivity insights.",
      features: [
        "Task creation & assignment",
        "Task progress tracking",
        "Collaboration support (multi-user)",
        "Task reporting for productivity insights"
      ],
      techStack: ["JavaScript", "HTML", "CSS"],
      image: "/placeholder-project.jpg",
      github: "#",
      demo: "#"
    },
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
      demo: "#"
    },
    {
      title: "Inventory Tracker",
      tagline: "Supplier-Linked Inventory Management",
      description: "Comprehensive inventory management system for businesses with supplier integration and role-based access control.",
      features: [
        "Secure CRUD operations",
        "Supplier-product linking",
        "JWT authentication & role-based access",
        "React dashboard with real-time stock updates",
        "Color-coded stock indicators for clarity"
      ],
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
      image: "/placeholder-project.jpg",
      github: "#",
      demo: "#"
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
      demo: "#"
    }
  ];

  // Sort projects from newest to oldest if a year field is provided on any item
  const hasYears = projects.some((p: any) => typeof (p as any).year === 'number');
  const sortedProjects = hasYears
    ? [...projects].sort((a: any, b: any) => (b.year ?? -Infinity) - (a.year ?? -Infinity))
    : projects;

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % sortedProjects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + sortedProjects.length) % sortedProjects.length);
  };

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

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={prevProject} className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-primary font-semibold">
            {currentProject + 1} of {sortedProjects.length}
          </span>
          <Button variant="outline" size="sm" onClick={nextProject} className="rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Project Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentProject * 100}%)` }}
          >
            {sortedProjects.map((project, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="card-gradient card-shadow rounded-2xl overflow-hidden hover-lift max-w-5xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Project Image */}
                    <div className="aspect-video lg:aspect-square bg-muted flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <ExternalLink className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-muted-foreground">Project Screenshot</p>
                        <p className="text-sm text-gray-text mt-1">Image placeholder - insert project screenshot</p>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-8">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-primary font-medium mb-4">{project.tagline}</p>
                        <p className="text-gray-text leading-relaxed">{project.description}</p>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-primary">Key Features:</h4>
                        <ul className="space-y-2">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                              <span className="text-gray-text text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-6">
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
            ))}
          </div>
        </div>

        {/* Project Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {sortedProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentProject ? 'bg-primary' : 'bg-muted'
              }`}
              aria-label={`Go to project ${index + 1}`}
              title={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;