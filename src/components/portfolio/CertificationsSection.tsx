import { Award, ExternalLink, Calendar } from "lucide-react";

const CertificationsSection = () => {
  const certifications = [
    {
      title: "NPTEL Algorithms",
      provider: "NPTEL",
      description: "Comprehensive course on algorithms and data structures",
      year: "2023",
      category: "Algorithms",
      verified: true
    },
    {
      title: "Postman API Student Expert",
      provider: "Postman",
      description: "API testing and development expertise certification",
      year: "2023",
      category: "API Development",
      verified: true
    },
    {
      title: "AWS Solutions Architecture",
      provider: "Forage (Virtual Experience)",
      description: "Cloud architecture and AWS services virtual experience program",
      year: "2024",
      category: "Cloud Computing",
      verified: true
    },
    {
      title: "Goldman Sachs Virtual Experience",
      provider: "Goldman Sachs",
      description: "Software engineering virtual experience program",
      year: "2024",
      category: "Software Engineering",
      verified: true
    },
    {
      title: "Data Structures & Algorithms",
      provider: "Udemy",
      description: "Complete DSA course in C/C++ with practical implementations",
      year: "2023",
      category: "Programming",
      verified: true
    },
    {
      title: "React Development Fundamentals",
      provider: "Meta",
      description: "Advanced React development and modern frontend practices",
      year: "2024",
      category: "Frontend Development",
      verified: true
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
      title: "MongoDB Database Design",
      provider: "MongoDB University",
      description: "NoSQL database design and optimization techniques",
      year: "2023",
      category: "Database",
      verified: true
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
      title: "Python Programming Advanced",
      provider: "Python Institute",
      description: "Advanced Python concepts and application development",
      year: "2023",
      category: "Programming",
      verified: true
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
    <section className="py-20 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="orange-gradient bg-clip-text text-transparent">Certifications</span> & Learning
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Continuous learning through recognized certifications and professional development programs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.title}
              className="card-gradient card-shadow rounded-xl p-4 hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Certificate Image Placeholder */}
              <div className="aspect-[4/3] bg-secondary border-2 border-dashed border-primary/30 rounded-lg mb-4 flex items-center justify-center group-hover:border-primary transition-smooth">
                <div className="text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-1 opacity-50 group-hover:opacity-100 transition-smooth" />
                  <p className="text-xs text-gray-text">Certificate Image</p>
                </div>
              </div>

              {/* Header */}
              <div className="flex items-start justify-between mb-3">
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
              <div className="mb-3">
                <h3 className="text-sm font-bold mb-1 group-hover:text-primary transition-smooth line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-primary font-medium text-xs mb-1">{cert.provider}</p>
                <p className="text-gray-text text-xs leading-relaxed mb-2 line-clamp-2">
                  {cert.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center text-gray-text">
                  <Calendar className="h-3 w-3 mr-1" />
                  {cert.year}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(cert.category)}`}>
                  {cert.category}
                </div>
              </div>

              {/* Hover Effect - Show Link */}
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center text-primary text-xs hover:text-primary-glow cursor-pointer">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="card-gradient card-shadow rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Committed to <span className="text-primary">Continuous Learning</span>
            </h3>
            <p className="text-gray-text leading-relaxed">
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