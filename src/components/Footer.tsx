import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Mail, href: 'mailto:karmarahul67@gmail.com', label: 'Email' },
    { icon: Linkedin, href: 'https://linkedin.com/in/rahul-vishwakarma-101346192', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/Rahul-gif-asus', label: 'GitHub' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border/50 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center space-y-10">
          
          {/* Logo & Back to Top */}
          <div 
            className="text-4xl font-bold font-heading bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={scrollToTop}
          >
            RV
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-medium">
            {[
              { label: 'About', id: 'about' },
              { label: 'Projects', id: 'projects' },
              { label: 'Skills', id: 'skills' },
              { label: 'Experience', id: 'experience' },
              { label: 'Contact', id: 'contact' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-border/50 bg-muted/30 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-glow"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* Quote */}
          <div className="text-center max-w-2xl">
            <p className="text-xl md:text-2xl font-heading text-foreground/80 font-medium">
              "Building the future, one line of code at a time."
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-4"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center space-x-1.5 mb-4 md:mb-0">
              <span>© {currentYear} Rahul Vishwakarma. Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse fill-red-500" />
              <span>and lots of ☕</span>
            </div>
            
            <div className="font-medium">
              All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;