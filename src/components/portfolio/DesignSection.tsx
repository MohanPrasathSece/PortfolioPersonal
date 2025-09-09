import { Palette, Figma, Layers, PenTool, Zap } from "lucide-react";
import melProfile from "@/assets/profile.png";
import melSearch from "@/assets/search.png";
import melLibrary from "@/assets/library.png";
import melExplore from "@/assets/explore.png";
import melHome from "@/assets/home.png";
import melSong from "@/assets/song.png";

const DesignSection = () => {
  const melodiaScreens = [
    { id: 1, title: "Profile", description: "My Profile with stats and player", image: melProfile },
    { id: 2, title: "Search", description: "Search results with suggestions", image: melSearch },
    { id: 3, title: "Playlists", description: "Custom playlist management", image: melLibrary },
    { id: 4, title: "Explore", description: "Advanced music search and categories", image: melExplore },
    { id: 5, title: "Home", description: "User profile and app preferences", image: melHome },
    { id: 6, title: "Now Playing", description: "Music sharing and social interactions", image: melSong }
  ];

  const designTools = [
    { name: "Figma", icon: <Figma className="h-6 w-6" /> },
    { name: "UI/UX", icon: <Layers className="h-6 w-6" /> },
    { name: "Prototyping", icon: <PenTool className="h-6 w-6" /> },
    { name: "Design Systems", icon: <Zap className="h-6 w-6" /> }
  ];

  return (
    <section className="py-20 px-6 bg-black">
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
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
          <div className="flex gap-6 snap-x snap-mandatory">
            {melodiaScreens.map((screen, index) => (
              <div
                key={screen.id}
                className="group rounded-xl overflow-hidden hover-lift snap-start min-w-[260px] md:min-w-[280px] border border-muted/50 bg-transparent hover:bg-black/20 transition-smooth"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
              {/* Image or Placeholder */}
              {screen.image ? (
                <div className="bg-black/60 aspect-[9/16] mx-auto w-[200px] md:w-[220px] rounded-[1.6rem] p-3 border border-muted shadow-inner">
                  <img
                    src={screen.image}
                    alt={`Melodia ${screen.title}`}
                    className="w-full h-full object-contain object-top rounded-xl shadow-md"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (target.src.endsWith("/placeholder.svg")) return;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div>
              ) : (
                <div className="bg-black/60 aspect-[9/16] mx-auto w-[200px] md:w-[220px] rounded-[1.6rem] p-3 border-2 border-dashed border-primary/30 flex items-center justify-center group-hover:border-primary transition-smooth">
                  <div className="text-center">
                    <Palette className="h-12 w-12 text-primary mx-auto mb-2 opacity-50 group-hover:opacity-100 transition-smooth" />
                    <p className="text-sm text-gray-text">Melodia {screen.title}</p>
                    <p className="text-xs text-gray-text mt-1">Mobile Screen Design</p>
                  </div>
                </div>
              )}
              
              {/* Screen Info */}
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-1.5 group-hover:text-primary transition-smooth">
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