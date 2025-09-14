import { Trophy, Award, Medal, Star } from "lucide-react";
import TinyStars from "@/components/portfolio/TinyStars";

const AchievementsSection = () => {
  const achievements = [
    {
      title: "HackerRank Silver Badge",
      description: "Achieved Silver Badge in C, Java, and Python programming challenges",
      icon: <Medal className="h-8 w-8" />,
      year: "2024",
      category: "Programming"
    },
    {
      title: "Skillrack 700+ Problems",
      description: "Solved over 700 programming problems across various difficulty levels",
      icon: <Star className="h-8 w-8" />,
      year: "2025",
      category: "Problem Solving"
    },
    {
      title: "1st Prize - VR Escape Room Game",
      description: "Won first place in a VR game development competition (Unity 3D)",
      icon: <Trophy className="h-8 w-8" />,
      year: "2025",
      category: "Game Development"
    },
    {
      title: "Top 10 - Gen-AI Hackathon (133 Teams)",
      description: "Secured a Top 10 position among 133 teams in a Generative AI hackathon",
      icon: <Award className="h-8 w-8" />,
      year: "2025",
      category: "AI/ML"
    }
  ];

  return (
    <section id="achievements" className="relative py-8 md:py-20 px-5 md:px-6 bg-secondary/20">
      {/* Tiny stars background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <TinyStars densityScale={1.2} />
      </div>
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="typ-h-section mb-3 md:mb-4">
            Key <span className="orange-gradient bg-clip-text text-transparent">Achievements</span>
          </h2>
          <p className="typ-body max-w-2xl mx-auto">
            Recognition and awards earned through competitive programming, hackathons, and technical competitions
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/30 h-full"></div>

          <div className="space-y-12">
            {[...achievements]
              .sort((a, b) => {
                // Primary sort: by year (desc)
                const yearDiff = Number(b.year) - Number(a.year);
                if (yearDiff !== 0) return yearDiff;
                // Secondary sort: explicit priority among same-year items
                const priority: Record<string, number> = {
                  "Top 10 - Gen-AI Hackathon (133 Teams)": 0,
                  "1st Prize - VR Escape Room Game": 1,
                  "Skillrack 700+ Problems": 2,
                };
                const pa = priority[a.title] ?? 99;
                const pb = priority[b.title] ?? 99;
                return pa - pb;
              })
              .map((achievement, index) => (
              <div
                key={achievement.title}
                className={`flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:gap-8`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Achievement Card */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="card-gradient card-shadow rounded-xl p-4 md:p-6 hover-lift group">
                    <div className={`flex items-center gap-3 md:gap-4 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'} justify-start mb-3 md:mb-4`}>
                      <div className="text-primary group-hover:text-primary-glow transition-smooth">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="typ-h-card">{achievement.title}</h3>
                        <span className="text-primary typ-small font-medium">{achievement.category}</span>
                      </div>
                    </div>
                    <p className="typ-body leading-relaxed mb-3 md:mb-4">
                      {achievement.description}
                    </p>
                    <div className="text-primary text-sm md:text-base font-semibold">{achievement.year}</div>
                  </div>
                </div>

                {/* Timeline Dot (hidden on mobile) */}
                <div className="hidden lg:flex relative items-center justify-center w-3.5 h-3.5 md:w-4 md:h-4 lg:w-6 lg:h-6 order-first lg:order-none" aria-hidden="true">
                  <div className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-6 lg:h-6 bg-primary rounded-full border-4 border-background animate-pulse-orange"></div>
                </div>

                {/* Spacer */}
                <div className="w-full lg:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;