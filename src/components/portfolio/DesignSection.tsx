import { Palette, Figma, Layers, PenTool, Zap } from "lucide-react";
import melProfile from "@/assets/profile.png";
import melSearch from "@/assets/search.png";
import melLibrary from "@/assets/library.png";
import melExplore from "@/assets/explore.png";
import melHome from "@/assets/home.png";
import melSong from "@/assets/song.png";
import TinyStars from "@/components/portfolio/TinyStars";

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
    <section id="design" className="relative py-10 md:py-20 px-6 bg-black">
      {/* Tiny stars background for black section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <TinyStars densityScale={1.35} />
      </div>
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="typ-h-section mb-4">
            Design <span className="orange-gradient bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="typ-body max-w-2xl mx-auto">Melodia — spotlight the core flows with a focused preview and quick screen switcher.</p>
        </div>

        {/* Design Tools (minimal) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">
          {designTools.map((tool, index) => (
            <div
              key={tool.name}
              className="card-gradient card-shadow rounded-xl p-3 md:p-4 text-center"
            >
              <div className="text-primary mb-2 flex justify-center">
                {/** Smaller icons on mobile */}
                {tool.icon && (
                  <div className="[&_*]:h-5 [&_*]:w-5 md:[&_*]:h-6 md:[&_*]:w-6">{tool.icon}</div>
                )}
              </div>
              <h3 className="text-sm md:text-base font-semibold mb-2">{tool.name}</h3>
              {/* Proficiency removed as requested */}
              </div>
            ))}
          </div>

        {/* Minimal layout – no intro card */}
        <div className="text-center mb-6">
          <h3 className="typ-h-sub text-primary">Melodia</h3>
          <p className="typ-small">Minimal preview of the core Melodia screens — scroll sideways to explore the UI flow.</p>
        </div>

        {/* Melodia Horizontal Scroll Gallery (images only) */}
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
          <div className="flex gap-6 snap-x snap-mandatory">
            {melodiaScreens.map((screen) => (
              <div key={screen.id} className="snap-start min-w-[260px] sm:min-w-[300px]">
                <div className="rounded-2xl p-3 transition-smooth flex flex-col h-full">
                  <div className="bg-black aspect-[9/16] mx-auto w-[220px] md:w-[240px] rounded-[1.6rem] p-3 shadow-xl flex-1">
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
                  <div className="mt-3 text-center">
                    <span className="inline-block typ-small font-medium text-violet-300 bg-violet-500/15 ring-1 ring-violet-500/20 rounded-full px-3 py-1">
                      {screen.title}
                    </span>
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