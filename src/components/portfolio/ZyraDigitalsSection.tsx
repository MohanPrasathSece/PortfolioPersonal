import { useState } from "react";
import { ExternalLink, Sparkles, Code, Rocket, Users, TrendingUp, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import TinyStars from "@/components/portfolio/TinyStars";
import zyraLogo from "@/assets/zyralogo.jpeg";

const ZyraDigitalsSection = () => {
  const [isPortalActive, setIsPortalActive] = useState(false);

  const journey = [
    {
      phase: "Idea",
      year: "June 2025",
      title: "Concept to Vision",
      description: "The initial idea for Zyra Digitals took shape with a clear vision: premium websites with performance and user experience at the core.",
      struggles: [
        "Validating the idea while balancing studies",
        "Defining services, positioning and brand",
        "Setting up processes and tools"
      ],
      icon: Sparkles
    },
    {
      phase: "Struggles",
      year: "September 2025",
      title: "Turning Challenges into Systems",
      description: "Faced real-world constraints: timelines, scope creep, and resource planning—converted them into repeatable systems and checklists.",
      achievements: [
        "Built client communication framework",
        "Created delivery playbook and QA routines",
        "Improved estimation and change-control"
      ],
      icon: Rocket
    },
    {
      phase: "Launch",
      year: "October 2025",
      title: "Zyra Digitals Founded",
      description: "Officially launched the studio—now delivering premium web solutions with a modern stack and measurable results.",
      highlights: [
        "Specialized in React, Node.js, and modern frameworks",
        "Focus on performance, UX, and scalability",
        "Building long-term client relationships"
      ],
      icon: Award
    }
  ];

  const skills = [
    { name: "Full-Stack Development", level: 95, icon: Code },
    { name: "Client Communication", level: 90, icon: Users },
    { name: "Project Management", level: 85, icon: TrendingUp },
    { name: "Problem Solving", level: 95, icon: Zap }
  ];

  const projects = [
    { name: "E-Commerce Platforms", count: 5 },
    { name: "Business Websites", count: 8 },
    { name: "Web Applications", count: 7 },
    { name: "WordPress Projects", count: 7 },
    { name: "Landing Pages", count: 10, description: "Hospitals, Cryptocurrency, Staffing & More" }
  ];

  const handlePortalClick = () => {
    setIsPortalActive(true);
    setTimeout(() => {
      window.open("https://www.zyradigitals.info", "_blank");
      setTimeout(() => setIsPortalActive(false), 1000);
    }, 1500);
  };

  return (
    <section id="zyra-digitals" className="relative pt-10 md:pt-16 pb-20 px-4 md:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <TinyStars densityScale={1.5} />
      </div>

      {/* Portal Animation Overlay */}
      {isPortalActive && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className="portal-animation">
            <div className="portal-ring portal-ring-1"></div>
            <div className="portal-ring portal-ring-2"></div>
            <div className="portal-ring portal-ring-3"></div>
            <div className="portal-center">
              <Sparkles className="h-16 w-16 text-primary animate-spin" />
            </div>
          </div>
        </div>
      )}

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">My Company</span>
          </div>
          <div className="flex justify-center mb-4">
            <img src={zyraLogo} alt="Zyra Digitals Logo" className="h-16 w-16 rounded-xl object-cover ring-1 ring-border" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-primary">
            Zyra Digitals
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Premium Web Development Studio
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            From a solo freelancer to building a professional web development studio, 
            crafting exceptional digital experiences for clients worldwide.
          </p>

          {/* Portal Button */}
          <div className="relative inline-block">
            <a href="https://www.zyradigitals.info" target="_blank" rel="noopener noreferrer" onClick={(e)=>{e.preventDefault(); handlePortalClick();}}>
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  Enter Zyra Digitals Portal
                  <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </a>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            The <span className="text-primary">Journey</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                >
                  <div className="relative group">
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 h-full">
                    {/* Icon & Phase */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.phase}</p>
                          <p className="text-lg font-bold text-primary">{item.year}</p>
                        </div>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2">
                      {item.struggles && (
                        <>
                          <p className="text-sm font-semibold text-orange-500">Struggles Faced:</p>
                          <ul className="space-y-1">
                            {item.struggles.map((struggle, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span>
                                <span>{struggle}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {item.achievements && (
                        <>
                          <p className="text-sm font-semibold text-green-500">Achievements:</p>
                          <ul className="space-y-1">
                            {item.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {item.highlights && (
                        <>
                          <p className="text-sm font-semibold text-primary">Current Focus:</p>
                          <ul className="space-y-1">
                            {item.highlights.map((highlight, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-1">→</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills Learned */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Skills <span className="text-primary">Mastered</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-semibold">{skill.name}</span>
                  </div>
                  <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 text-right">{skill.level}%</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Projects Completed */}
        <div className="mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Projects <span className="text-primary">Delivered</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {project.count}+
                </div>
                <p className="text-sm font-medium text-foreground mb-1">{project.name}</p>
                {project.description && (
                  <p className="text-xs text-muted-foreground">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Brand Card */}
        <div className="mx-auto max-w-4xl">
          <div className="bg-card/50 backdrop-blur-sm border border-border/60 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <img src={zyraLogo} alt="Zyra Digitals" className="h-16 w-16 md:h-20 md:w-20 rounded-xl object-cover ring-1 ring-border" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Build your next website with Zyra Digitals</h3>
              <p className="text-muted-foreground">Premium, performant and scalable websites for businesses—delivered with care and craftsmanship.</p>
            </div>
            <a href="https://www.zyradigitals.info" target="_blank" rel="noopener noreferrer" onClick={(e)=>{e.preventDefault(); handlePortalClick();}}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">Visit</Button>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes portalExpand {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(20) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes portalPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        .portal-animation {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .portal-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 3px solid;
          animation: portalExpand 1.5s ease-out forwards;
        }

        .portal-ring-1 {
          border-color: hsl(var(--primary));
          animation-delay: 0s;
        }

        .portal-ring-2 {
          border-color: hsl(24 100% 50%);
          animation-delay: 0.2s;
        }

        .portal-ring-3 {
          border-color: hsl(330 100% 50%);
          animation-delay: 0.4s;
        }

        .portal-center {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: portalPulse 0.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ZyraDigitalsSection;
