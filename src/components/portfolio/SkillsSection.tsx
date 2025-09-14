import { Code, Database, Globe, Palette, Server, Smartphone } from "lucide-react";

const SkillsSection = () => {
  const skills = [
    {
      category: "Programming Languages",
      icon: <Code className="h-6 w-6 md:h-8 md:w-8" />,
      items: ["Java", "Python", "JavaScript", "C"],
    },
    {
      category: "Frontend Development",
      icon: <Globe className="h-6 w-6 md:h-8 md:w-8" />,
      items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      category: "Backend Development",
      icon: <Server className="h-6 w-6 md:h-8 md:w-8" />,
      items: ["Node.js", "Express.js"],
    },
    {
      category: "Database & Tools",
      icon: <Database className="h-6 w-6 md:h-8 md:w-8" />,
      items: ["MongoDB", "MySQL", "Firebase", "Git", "Postman", "Linux"],
    },
    {
      category: "Game Development",
      icon: <Smartphone className="h-6 w-6 md:h-8 md:w-8" />,
      items: ["Unity 3D"],
    },
    {
      category: "Design Tools",
      icon: <Palette className="h-6 w-6 md:h-8 md:w-8" />,
      items: ["Figma", "Canva"],
    }
  ];

  return (
    <section id="skills" className="py-12 md:py-16 px-4 md:px-5">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">
            Technical <span className="orange-gradient bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-[11px] md:text-lg text-gray-text max-w-2xl mx-auto">
            Comprehensive expertise across the full development stack with a focus on modern technologies
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              className="card-gradient card-shadow rounded-xl p-3 md:p-6 hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-2 md:mb-4">
                <div className="text-primary group-hover:text-primary-glow transition-smooth">
                  {skill.icon}
                </div>
                <h3 className="text-[11px] md:text-xl font-semibold ml-2 md:ml-3 leading-snug">{skill.category}</h3>
              </div>
              
              <div className="space-y-1.5 mb-2 md:mb-4">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-full text-[9px] md:text-sm mr-1.5 mb-1.5"
                  >
                    {item}
                  </span>
                ))}
              </div>

              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;