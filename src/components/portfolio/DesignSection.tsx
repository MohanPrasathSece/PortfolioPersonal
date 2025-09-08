import { Palette, Figma, Layers, PenTool, Zap } from "lucide-react";

const DesignSection = () => {
  const melodiaScreens = [
    { id: 1, title: "Profile Screen", description: "My Profile with stats and player", image: "/melodia-profile.png" },
    { id: 2, title: "Search Screen", description: "Search results with suggestions", image: "/melodia-search.png" },
    { id: 3, title: "Playlist View", description: "Custom playlist management" },
    { id: 4, title: "Search & Browse", description: "Advanced music search and categories" },
    { id: 5, title: "Profile & Settings", description: "User profile and app preferences" },
    { id: 6, title: "Social Features", description: "Music sharing and social interactions" }
  ];

  const designTools = [
    { name: "Figma", icon: <Figma className="h-6 w-6" /> },
    { name: "UI/UX", icon: <Layers className="h-6 w-6" /> },
    { name: "Prototyping", icon: <PenTool className="h-6 w-6" /> },
    { name: "Design Systems", icon: <Zap className="h-6 w-6" /> }
  ];

  return (
    <section className="py-20 px-6 bg-black-surface">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Palette className="h-12 w-12 text-primary mr-4" />
            <h2 className="text-4xl lg:text-5xl font-bold">
              Design <span className="orange-gradient bg-clip-text text-transparent">Portfolio</span>
            </h2>
          </div>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Melodia - A comprehensive music streaming mobile app designed with modern UI/UX principles
          </p>
        </div>

        {/* Design Tools Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {designTools.map((tool, index) => (
            <div
              key={tool.name}
              className="card-gradient card-shadow rounded-xl p-4 text-center hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-2 flex justify-center">
                {tool.icon}
              </div>
              <h3 className="font-semibold mb-2">{tool.name}</h3>
              {/* Proficiency removed as requested */}
            </div>
          ))}
        </div>

        {/* Melodia Project Info */}
        <div className="mb-12">
          <div className="card-gradient card-shadow rounded-xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">Melodia</h3>
                <p className="text-gray-text">Music Streaming Mobile App</p>
              </div>
              <div className="flex items-center text-primary">
                <Figma className="h-8 w-8 mr-2" />
                <span className="font-semibold">Figma Design</span>
              </div>
            </div>
            <p className="text-gray-text leading-relaxed">
              A modern music streaming application designed with focus on user experience, 
              featuring intuitive navigation, personalized recommendations, and social music sharing. 
              The design emphasizes accessibility and seamless interaction across all screens.
            </p>
          </div>
        </div>

        {/* Melodia Screen Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {melodiaScreens.map((screen, index) => (
            <div
              key={screen.id}
              className="group card-gradient card-shadow rounded-xl overflow-hidden hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image or Placeholder */}
              {screen.image ? (
                <div className="bg-secondary h-[420px] md:h-[460px] lg:h-[500px]">
                  <img
                    src={screen.image}
                    alt={`Melodia ${screen.title}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (target.src.endsWith("/placeholder.svg")) return;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div>
              ) : (
                <div className="bg-secondary h-[420px] md:h-[460px] lg:h-[500px] border-2 border-dashed border-primary/30 flex items-center justify-center group-hover:border-primary transition-smooth">
                  <div className="text-center">
                    <Palette className="h-12 w-12 text-primary mx-auto mb-2 opacity-50 group-hover:opacity-100 transition-smooth" />
                    <p className="text-sm text-gray-text">Melodia {screen.title}</p>
                    <p className="text-xs text-gray-text mt-1">Mobile Screen Design</p>
                  </div>
                </div>
              )}
              
              {/* Screen Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm bg-primary/20 text-primary px-2 py-1 rounded-full">
                    Mobile App
                  </span>
                  <div className="flex items-center text-sm text-gray-text">
                    <Figma className="h-4 w-4 mr-1" />
                    Figma
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-smooth">
                  {screen.title}
                </h3>
                <p className="text-gray-text text-sm">
                  {screen.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-text mb-6">Interested in mobile app design or UI/UX collaboration?</p>
          <button className="btn-primary">
            Discuss Your Design Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default DesignSection;