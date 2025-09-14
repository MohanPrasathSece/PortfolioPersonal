import { Code, Database, Globe, Palette, Server, Smartphone } from "lucide-react";

const SkillsSection = () => {
  const skills = [
    {
      category: "Programming Languages",
      icon: <Code className="h-8 w-8" />,
      items: ["Java", "Python", "JavaScript", "C"],
    },
    {
      category: "Frontend Development",
      icon: <Globe className="h-8 w-8" />,
      items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      category: "Backend Development",
      icon: <Server className="h-8 w-8" />,
      items: ["Node.js", "Express.js"],
    },
    {
      category: "Database & Tools",
      icon: <Database className="h-8 w-8" />,
      items: ["MongoDB", "MySQL", "Firebase", "Git", "Postman", "Linux"],
    },
    {
      category: "Game Development",
      icon: <Smartphone className="h-8 w-8" />,
      items: ["Unity 3D"],
    },
    {
      category: "Design Tools",
      icon: <Palette className="h-8 w-8" />,
      items: ["Figma", "Canva"],
    }
  ];

  return (
    <section id="skills" className="py-20 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Technical <span className="orange-gradient bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Comprehensive expertise across the full development stack with a focus on modern technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              className="card-gradient card-shadow rounded-xl p-6 hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="text-primary group-hover:text-primary-glow transition-smooth">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold ml-3">{skill.category}</h3>
              </div>
              
              <div className="space-y-2 mb-4">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm mr-2 mb-2"
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