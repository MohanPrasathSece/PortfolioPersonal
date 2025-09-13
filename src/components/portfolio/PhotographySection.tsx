import { Camera, Heart, Eye } from "lucide-react";

const PhotographySection = () => {
  // Minimal: three featured placeholders
  const featured = Array.from({ length: 9 }, (_, i) => ({ id: i + 1, title: `Shot ${i + 1}` }));

  return (
    <section className="py-12 px-6 bg-secondary/10">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="h-10 w-10 text-primary animate-float" />
            <h2 className="text-3xl lg:text-4xl font-bold">
              Beyond Code: My Lens as a{" "}
              <span className="orange-gradient bg-clip-text text-transparent">Photographer</span>
            </h2>
          </div>
          <p className="text-base text-gray-text max-w-3xl mx-auto">
            When I'm not coding, I capture the world through my camera. Photography teaches me composition, 
            attention to detail, and creative problem-solving – skills that enhance my development work.
          </p>
        </div>

        {/* Photography Stats removed per request */}

        {/* Minimal – 3 vertical sections (rows), each with 3 images = 9 total */}
        <div className="space-y-10">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {featured.slice(row * 3, row * 3 + 3).map((item) => (
                  <div key={item.id} className="group relative rounded-2xl p-3 hover-glow transition-smooth">
                    <div className="w-[220px] sm:w-[240px] rounded-xl overflow-hidden">
                      <div className="w-full aspect-[4/5] bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                        <div className="text-center">
                          <Camera className="h-6 w-6 text-primary/60 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">{item.title}</p>
                        </div>
                      </div>
                    </div>
                    {/* Subtle glow border on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl ring-1 ring-primary/30"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographySection;