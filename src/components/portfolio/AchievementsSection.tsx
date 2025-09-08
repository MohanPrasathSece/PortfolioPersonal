import { Trophy, Award, Medal, Star } from "lucide-react";

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
    <section className="py-20 px-6 bg-secondary/20">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Key <span className="orange-gradient bg-clip-text text-transparent">Achievements</span>
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Recognition and awards earned through competitive programming, hackathons, and technical competitions
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/30 h-full"></div>

          <div className="space-y-12">
            {[...achievements].sort((a, b) => Number(b.year) - Number(a.year)).map((achievement, index) => (
              <div
                key={achievement.title}
                className={`flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:gap-8`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Achievement Card */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="card-gradient card-shadow rounded-xl p-6 hover-lift group">
                    <div className={`flex items-center gap-4 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'} justify-start mb-4`}>
                      <div className="text-primary group-hover:text-primary-glow transition-smooth">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{achievement.title}</h3>
                        <span className="text-primary text-sm font-medium">{achievement.category}</span>
                      </div>
                    </div>
                    <p className="text-gray-text leading-relaxed mb-4">
                      {achievement.description}
                    </p>
                    <div className="text-primary font-semibold">{achievement.year}</div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="relative flex items-center justify-center w-4 h-4 lg:w-6 lg:h-6 order-first lg:order-none">
                  <div className="w-4 h-4 lg:w-6 lg:h-6 bg-primary rounded-full border-4 border-background animate-pulse-orange"></div>
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