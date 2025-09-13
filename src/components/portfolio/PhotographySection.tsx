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

        {/* Minimal 3x3 Grid (no hover effects) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {featured.map((item) => (
            <div key={item.id} className="w-[220px] sm:w-[240px]">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-black">
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="h-7 w-7 text-primary/60" />
                </div>
              </div>
              {/* Caption removed per request */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographySection;