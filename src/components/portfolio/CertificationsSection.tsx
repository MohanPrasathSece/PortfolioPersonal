import { Award, ExternalLink, Calendar } from "lucide-react";
import awsImg from "@/assets/certificates/aws.png";
import goldmanImg from "@/assets/certificates/goldman.png";
import mongodbImg from "@/assets/certificates/mongodb.png";
import nptelImg from "@/assets/certificates/nptel.png";
import postmanImg from "@/assets/certificates/postman.png";
import pythonImg from "@/assets/certificates/python.png";
import reactImg from "@/assets/certificates/react.png";
import udemyImg from "@/assets/certificates/udemy.png";
import TinyStars from "@/components/portfolio/TinyStars";

const CertificationsSection = () => {
  const certifications = [
    {
      title: "NPTEL Algorithms",
      provider: "NPTEL",
      description: "Comprehensive course on algorithms and data structures",
      year: "2025",
      category: "Algorithms",
      verified: true,
      image: nptelImg
    },
    {
      title: "Postman API Student Expert",
      provider: "Postman",
      description: "API testing and development expertise certification",
      year: "2025",
      category: "API Development",
      verified: true,
      image: postmanImg
    },
    {
      title: "Java Certification",
      provider: "Red Hat",
      description: "Core Java concepts and enterprise-grade Java practices",
      year: "2025",
      category: "Programming",
      verified: true
    },
    {
      title: "Red Hat Certified Java Developer",
      provider: "Red Hat",
      description: "Advanced Java development and best practices validated by Red Hat.",
      year: "2025",
      category: "Programming",
      verified: true,
      image: "/placeholder.svg"
    },
    {
      title: "AWS Solutions Architecture",
      provider: "Forage (Virtual Experience)",
      description: "Cloud architecture and AWS services virtual experience program",
      year: "2025",
      category: "Cloud Computing",
      verified: true,
      image: awsImg
    },
    {
      title: "Goldman Sachs Virtual Experience",
      provider: "Forage (Virtual Experience)",
      description: "Software engineering virtual experience program",
      year: "2025",
      category: "Software Engineering",
      verified: true,
      image: goldmanImg
    },
    {
      title: "Data Structures & Algorithms",
      provider: "Udemy",
      description: "Complete DSA course in C/C++ with practical implementations",
      year: "2023",
      category: "Programming",
      verified: true,
      image: udemyImg
    },
    {
      title: "Learning React",
      provider: "Infosys",
      description: "Advanced React development and modern frontend practices",
      year: "2025",
      category: "Frontend Development",
      verified: true,
      image: reactImg
    },
    {
      title: "Node.js Backend Development",
      provider: "IBM",
      description: "Server-side development with Node.js and Express",
      year: "2024",
      category: "Backend Development",
      verified: true
    },
    {
      title: "Learning MongoDB",
      provider: "Infosys",
      description: "NoSQL database design and optimization techniques",
      year: "2025",
      category: "Database",
      verified: true,
      image: mongodbImg
    },
    {
      title: "JavaScript ES6+ Mastery",
      provider: "Coursera",
      description: "Modern JavaScript features and best practices",
      year: "2023",
      category: "Programming",
      verified: true
    },
    {
      title: "Git & GitHub Professional",
      provider: "GitHub",
      description: "Version control and collaboration workflows",
      year: "2024",
      category: "Development Tools",
      verified: true
    },
    {
      title: "Python Essentials",
      provider: "Cisco",
      description: "Advanced Python concepts and application development",
      year: "2024",
      category: "Programming",
      verified: true,
      image: pythonImg
    },
    {
      title: "Agile Development Methodology",
      provider: "Scrum Alliance",
      description: "Agile project management and development practices",
      year: "2024",
      category: "Project Management",
      verified: true
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Algorithms": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "API Development": "bg-green-500/20 text-green-400 border-green-500/30",
      "Cloud Computing": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "Software Engineering": "bg-orange-500/20 text-orange-400 border-orange-500/30",
      "Programming": "bg-red-500/20 text-red-400 border-red-500/30",
      "Frontend Development": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      "Backend Development": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      "Database": "bg-pink-500/20 text-pink-400 border-pink-500/30",
      "Development Tools": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      "Project Management": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    };
    return colors[category] || "bg-primary/20 text-primary border-primary/30";
  };

  return (
    <section id="certifications" className="relative py-8 md:py-16 px-0 md:px-6">
      {/* Tiny stars background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <TinyStars densityScale={1.2} />
      </div>
      <div className="container px-0 md:px-4 max-w-none md:max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="typ-h-section mb-2">
            <span className="orange-gradient bg-clip-text text-transparent">Certifications</span> & Learning
          </h2>
          <p className="typ-body max-w-2xl mx-auto">
            Continuous learning through recognized certifications and professional development programs
          </p>
        </div>

        {/* Mobile: horizontal scroll row */}
        <div className="md:hidden overflow-x-auto no-scrollbar pl-3 pr-0 md:-mx-4 md:px-4">
          <div className="flex gap-4 snap-x snap-mandatory">
            {[...certifications]
              .sort((a, b) => Number(b.year) - Number(a.year))
              .filter((c) => !!c.image)
              .map((cert, index) => (
                <div key={cert.title} className="snap-start min-w-[260px]">
                  <div className="card-gradient card-shadow rounded-xl p-3 hover-lift group">
                    {/* Certificate Image */}
                    <div className="aspect-[4/3] bg-secondary border border-border/30 rounded-lg mb-2 flex items-center justify-center overflow-hidden transition-smooth">
                      {cert.image ? (
                        <img
                          src={cert.image}
                          alt={`${cert.title} - ${cert.provider}`}
                          className="w-full h-full object-contain p-1"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (target.src.endsWith("/placeholder.svg")) return;
                            target.src = "/placeholder.svg";
                          }}
                        />
                      ) : (
                        <div className="text-center">
                          <Award className="h-8 w-8 text-primary mx-auto mb-1 opacity-50 group-hover:opacity-100 transition-smooth" />
                          <p className="text-xs text-gray-text">Certificate Image</p>
                        </div>
                      )}
                    </div>

                    {/* Content (condensed) */}
                    <h3 className="typ-h-card mb-1 line-clamp-2">{cert.title}</h3>
                    <p className="text-primary font-medium typ-small mb-1">{cert.provider}</p>
                    <div className="flex items-center justify-between typ-small">
                      <div className="flex items-center text-gray-text">
                        <Calendar className="h-3 w-3 mr-1" />
                        {cert.year}
                      </div>
                      <div className={`px-2 py-0.5 rounded-full typ-badge border ${getCategoryColor(cert.category)}`}>
                        {cert.category}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {[...certifications]
            .sort((a, b) => Number(b.year) - Number(a.year))
            .filter((c) => !!c.image)
            .map((cert, index) => (
            <div
              key={cert.title}
              className="card-gradient card-shadow rounded-xl p-4 hover-lift group"
            >
              {/* Certificate Image */}
              <div className="aspect-[4/3] bg-secondary border border-border/30 rounded-lg mb-3 flex items-center justify-center overflow-hidden transition-smooth">
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={`${cert.title} - ${cert.provider}`}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (target.src.endsWith("/placeholder.svg")) return;
                      target.src = "/placeholder.svg";
                    }}
                  />
                ) : (
                  <div className="text-center">
                    <Award className="h-8 w-8 text-primary mx-auto mb-1 opacity-50 group-hover:opacity-100 transition-smooth" />
                    <p className="text-xs text-gray-text">Certificate Image</p>
                  </div>
                )}
              </div>

              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="text-primary group-hover:text-primary-glow transition-smooth">
                  <Award className="h-6 w-6" />
                </div>
                {cert.verified && (
                  <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                    ✓
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="mb-2">
                <h3 className="typ-h-card mb-1 group-hover:text-primary transition-smooth line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-primary font-medium typ-small mb-1">{cert.provider}</p>
                <p className="typ-body leading-relaxed mb-1 line-clamp-2">
                  {cert.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between typ-small">
                <div className="flex items-center text-gray-text">
                  <Calendar className="h-3 w-3 mr-1" />
                  {cert.year}
                </div>
                <div className={`px-2 py-1 rounded-full typ-badge border ${getCategoryColor(cert.category)}`}>
                  {cert.category}
                </div>
              </div>

              {/* Hover Effect - Show Link */}
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {cert.image ? (
                  <a
                    href={cert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary typ-small hover:text-primary-glow"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </a>
                ) : (
                  <div className="flex items-center text-primary typ-small hover:text-primary-glow cursor-default">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="card-gradient card-shadow rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
              Committed to <span className="text-primary">Continuous Learning</span>
            </h3>
            <p className="text-gray-text leading-relaxed text-sm md:text-base">
              Always expanding my skill set through industry-recognized certifications, 
              hands-on projects, and staying current with the latest technologies in software development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;