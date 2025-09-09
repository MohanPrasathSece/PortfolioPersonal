import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Github, Linkedin, Code, Send, MapPin } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      value: "mohanprasath563@gmail.com",
      href: "mailto:mohanprasath563@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      label: "Phone",
      value: "+91 90254 21149",
      href: "tel:+919025421149"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      label: "Location",
      value: "Coimbatore, Tamil Nadu",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="h-6 w-6" />,
      label: "GitHub",
      href: "https://github.com/MohanPrasathSece",
      username: "MohanPrasathSece"
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mohan-prasath-s-fullstackdeveloper",
      username: "mohan-prasath-s-fullstackdeveloper"
    },
    {
      icon: <Code className="h-6 w-6" />,
      label: "LeetCode",
      href: "https://leetcode.com/u/MohanPrasathSece",
      username: "MohanPrasathSece - LeetCode Profile"
    }
  ];

  return (
    <section className="py-20 px-6 bg-secondary/20">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Let's <span className="orange-gradient bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Ready to start your next project? Let's discuss how I can help bring your ideas to life 
            with modern, efficient solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <div className="card-gradient card-shadow rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Send className="mr-3 h-6 w-6 text-primary" />
                Send Me a Message
              </h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <Input 
                      placeholder="Your name" 
                      className="bg-input border-border focus:border-primary focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="bg-input border-border focus:border-primary focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Subject</label>
                  <Input 
                    placeholder="Project inquiry, collaboration, etc." 
                    className="bg-input border-border focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea 
                    placeholder="Tell me about your project or idea..." 
                    className="bg-input border-border focus:border-primary focus:ring-primary/20 transition-all min-h-[120px] resize-none"
                  />
                </div>
                
                <Button variant="hero" size="lg" className="w-full group">
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="card-gradient card-shadow rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Get in Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all hover-lift group"
                  >
                    <div className="text-primary group-hover:text-primary-glow transition-smooth mr-4">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="font-medium">{contact.label}</div>
                      <div className="text-gray-text text-sm">{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="card-gradient card-shadow rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Follow My Work</h3>
              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all hover-lift group"
                  >
                    <div className="flex items-center">
                      <div className="text-primary group-hover:text-primary-glow transition-smooth mr-4">
                        {social.icon}
                      </div>
                      <div>
                        <div className="font-medium">{social.label}</div>
                        <div className="text-gray-text text-sm">{social.username}</div>
                      </div>
                    </div>
                    <div className="text-primary opacity-0 group-hover:opacity-100 transition-all">
                      →
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="card-gradient card-shadow rounded-2xl p-8 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 text-green-400 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Available for Freelance Projects
              </div>
              <p className="text-gray-text text-sm">
                Currently accepting new projects and collaborations. 
                Let's build something amazing together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;