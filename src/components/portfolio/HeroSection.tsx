import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import profileImg from "@/assets/hero-profile.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:order-2">
            <div className="relative">
              <div className="animated-border w-80 h-80">
                <img
                  src={profileImg}
                  alt="Profile picture"
                  className="w-full h-full object-cover object-[50%_10%] rounded-full transform scale-85 sm:scale-90 lg:scale-95 xl:scale-100"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src.endsWith("/placeholder.svg")) return;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center lg:text-left lg:order-1">
            <div className="mb-6">
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
                Hi, I'm{" "}
                <span className="orange-gradient bg-clip-text text-transparent whitespace-nowrap">
                  Mohan Prasath
                </span>
              </h1>
              <p className="text-2xl lg:text-3xl text-gray-text mb-2">
                Full Stack Developer & Problem Solver
              </p>
            </div>
            
            <p className="text-lg text-gray-text mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Passionate full-stack developer with expertise in modern web technologies, 
              competitive programming, and creative photography. Ready to bring your 
              ideas to life with clean, efficient code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Button variant="hero" size="lg" className="group" asChild>
                <a
                  href="https://drive.google.com/file/d/1EfxjW0Mb-YFUGMi7cL4tBNEbGeMkePKh/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Download Resume
                </a>
              </Button>
              <Button variant="outline-orange" size="lg" className="group" asChild>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mohanprasath563@gmail.com&su=Freelance%20Project%20Inquiry&body=Hi%20Mohan%2C%0A%0AI'd%20like%20to%20discuss%20a%20project.%20Here%20are%20some%20details%3A%0A-%20Scope%3A%20%0A-%20Timeline%3A%20%0A-%20Budget%3A%20%0A%0AThanks!"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Hire Me for Freelance
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;