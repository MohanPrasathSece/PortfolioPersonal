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

  // Minimal, no state needed

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
          <p className="text-lg text-gray-text max-w-2xl mx-auto">Melodia — spotlight the core flows with a focused preview and quick screen switcher.</p>
        </div>

        {/* Design Tools (minimal) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {designTools.map((tool, index) => (
            <div
              key={tool.name}
              className="card-gradient card-shadow rounded-xl p-4 text-center"
            >
              <div className="text-primary mb-2 flex justify-center">
                {tool.icon}
              </div>
              <h3 className="font-semibold mb-2">{tool.name}</h3>
              {/* Proficiency removed as requested */}
              </div>
            ))}
          </div>

        {/* Minimal layout – no intro card */}

        {/* Melodia Horizontal Scroll Gallery (images only) */}
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
          <div className="flex gap-6 snap-x snap-mandatory">
            {melodiaScreens.map((screen) => (
              <div key={screen.id} className="snap-start min-w-[260px] sm:min-w-[300px]">
                <div className="rounded-2xl p-3 transition-smooth">
                  <div className="bg-black aspect-[9/16] mx-auto w-[220px] md:w-[240px] rounded-[1.6rem] p-3 shadow-xl">
                    <img
                      src={screen.image}
                      alt={`Melodia ${screen.title}`}
                      className="w-full h-full object-contain object-top rounded-xl"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (target.src.endsWith('/placeholder.svg')) return;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* End minimal layout */}
      </div>
    </section>
  );
};

export default DesignSection;