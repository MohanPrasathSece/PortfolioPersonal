import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import profileImg from "@/assets/hero-profile.jpg";
import OrbBot from "@/components/OrbBot";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-5 md:px-6 py-12 md:py-20 relative">
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Profile Image */
          }
          <div className="flex justify-center lg:order-2">
            <div className="relative">
              <div className="animated-border w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
                <img
                  src={profileImg}
                  alt="Mohan Prasath S — Profile Picture"
                  className="w-full h-full object-cover object-[50%_10%] rounded-full"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src.endsWith("/placeholder.svg")) return;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
              {/* OrbBot moved to top-right as absolute overlay */}
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center lg:text-left lg:order-1">
            <div className="mb-4 md:mb-6">
              <h1 className="typ-h-hero mb-2 md:mb-4 animate-fade-in-up">
                Hi, I'm{" "}
                <span className="orange-gradient bg-clip-text text-transparent whitespace-nowrap">
                  Mohan Prasath
                </span>
              </h1>
              <p className="typ-h-sub text-gray-text mb-1 md:mb-2">
                Full Stack Developer & Problem Solver
              </p>
            </div>
            
            <p className="typ-body mb-5 md:mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Passionate full-stack developer with expertise in modern web technologies, 
              competitive programming, and UI/UX design. Ready to bring your 
              ideas to life with clean, efficient code.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Button variant="hero" size="sm" className="group md:size-default" asChild>
                <a
                  href="https://drive.google.com/file/d/1EfxjW0Mb-YFUGMi7cL4tBNEbGeMkePKh/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4 md:h-5 md:w-5 group-hover:animate-bounce" />
                  Download Resume
                </a>
              </Button>
              <Button variant="outline-orange" size="sm" className="group md:size-default" asChild>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mohanprasath563@gmail.com&su=Freelance%20Project%20Inquiry&body=Hi%20Mohan%2C%0A%0AI'd%20like%20to%20discuss%20a%20project.%20Here%20are%20some%20details%3A%0A-%20Scope%3A%20%0A-%20Timeline%3A%20%0A-%20Budget%3A%20%0A%0AThanks!"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5 group-hover:animate-pulse" />
                  Hire Me for Freelance
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* OrbBot in the top-right corner */}
      <div className="pointer-events-none absolute right-3 top-3 md:right-8 md:top-8 hidden md:block">
        <OrbBot size={72} />
      </div>
    </section>
  );
};

export default HeroSection;