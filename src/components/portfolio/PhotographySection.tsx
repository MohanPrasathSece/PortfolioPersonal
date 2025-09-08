import { Camera, Heart, Eye } from "lucide-react";

const PhotographySection = () => {
  // Placeholder for top 10 photographs
  const photographyGrid = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    caption: `Photograph ${index + 1}`,
    category: index % 3 === 0 ? "Nature" : index % 3 === 1 ? "Portrait" : "Architecture"
  }));

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Nature": "bg-green-500/20 text-green-400",
      "Portrait": "bg-blue-500/20 text-blue-400",
      "Architecture": "bg-purple-500/20 text-purple-400"
    };
    return colors[category] || "bg-primary/20 text-primary";
  };

  return (
    <section className="py-20 px-6 bg-secondary/10">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Camera className="h-12 w-12 text-primary animate-float" />
            <h2 className="text-4xl lg:text-5xl font-bold">
              Beyond Code: My Lens as a{" "}
              <span className="orange-gradient bg-clip-text text-transparent">Photographer</span>
            </h2>
          </div>
          <p className="text-lg text-gray-text max-w-3xl mx-auto">
            When I'm not coding, I capture the world through my camera. Photography teaches me composition, 
            attention to detail, and creative problem-solving – skills that enhance my development work.
          </p>
        </div>

        {/* Photography Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <Eye className="h-8 w-8" />, stat: "1000+", label: "Photos Captured" },
            { icon: <Heart className="h-8 w-8" />, stat: "5", label: "Years Experience" },
            { icon: <Camera className="h-8 w-8" />, stat: "3", label: "Photography Styles" }
          ].map((item, index) => (
            <div
              key={item.label}
              className="card-gradient card-shadow rounded-xl p-6 text-center hover-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-3 flex justify-center">{item.icon}</div>
              <div className="text-3xl font-bold text-primary mb-2">{item.stat}</div>
              <div className="text-gray-text">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Photography Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {photographyGrid.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative aspect-square bg-muted rounded-xl overflow-hidden hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Placeholder for actual photo */}
              <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                <div className="text-center">
                  <Camera className="h-8 w-8 text-primary/60 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Photo {photo.id}</p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium text-sm">{photo.caption}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(photo.category)}`}>
                      {photo.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Orange Glow Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl border-2 border-primary glow-orange"></div>
            </div>
          ))}
        </div>

        {/* Photography Philosophy */}
        <div className="mt-16 text-center">
          <div className="card-gradient card-shadow rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">
              <span className="text-primary">Photography</span> Meets <span className="text-primary">Development</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-semibold text-primary mb-3">Creative Vision</h4>
                <p className="text-gray-text leading-relaxed text-sm">
                  Photography has taught me to see beauty in details, composition in chaos, 
                  and stories in single moments – skills I bring to every UI/UX design I create.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-3">Technical Precision</h4>
                <p className="text-gray-text leading-relaxed text-sm">
                  The technical aspects of photography – lighting, exposure, post-processing – 
                  mirror the precision and attention to detail required in clean, efficient code.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions for User */}
        <div className="mt-8 text-center">
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-primary font-medium text-sm">
              📸 Replace the placeholder grid above with your top 10 photographs to showcase your creative side to potential clients!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographySection;