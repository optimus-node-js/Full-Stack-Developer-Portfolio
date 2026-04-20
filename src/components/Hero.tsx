import { Button } from '@/components/ui/button';
import { Download, Mail, Github, Linkedin, MapPin, Phone, ArrowDown, ChevronRight } from 'lucide-react';
import { bioData } from '@/data/resume-data';
import ParticleText from './ParticleText';
import { motion } from 'framer-motion';

const Hero = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Rahul_Vishwakarma_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socialLinks = [
    { icon: Mail, href: 'mailto:karmarahul67@gmail.com', label: 'Email' },
    { icon: Linkedin, href: 'https://linkedin.com/in/rahul-vishwakarma-101346192', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/Rahul-gif-asus', label: 'GitHub' },
  ];

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-hero-bg">
      <div className="absolute inset-0 z-0">
        <ParticleText 
          defaultText="CREATIVE" 
          hoverText="RAHUL" 
          className="opacity-10 dark:opacity-20"
        />
      </div>
      
      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent z-[1]" />
      
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left space-y-8 order-2 lg:order-1"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-primary text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for new opportunities
            </motion.div>
            
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.1] tracking-tight"
              >
                <span className="block text-foreground">
                  Creative
                </span>
                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300% animate-gradient">
                  Developer.
                </span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="space-y-3 pt-2"
              >
                <p className="text-xl sm:text-2xl text-muted-foreground font-body font-light max-w-lg mx-auto lg:mx-0">
                  Hi, I'm Rahul Vishwakarma. I build exceptional digital experiences that live at the intersection of design and engineering.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-sm font-medium">
                  <span className="px-3 py-1 rounded-md bg-muted/50 text-muted-foreground border border-border">
                    Full Stack
                  </span>
                  <span className="px-3 py-1 rounded-md bg-muted/50 text-muted-foreground border border-border">
                    AI/ML
                  </span>
                  <span className="px-3 py-1 rounded-md bg-muted/50 text-muted-foreground border border-border">
                    Algorithmic Trading
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <Button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full group transition-all duration-300 hover:shadow-[0_0_40px_hsla(var(--primary),0.4)]"
                data-testid="button-view-work"
              >
                Explore Work
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleDownloadResume}
                className="border-border hover:bg-muted/50 text-foreground px-8 py-6 text-lg rounded-full transition-all duration-300 group"
                data-testid="button-download-resume"
              >
                <Download className="mr-2 h-5 w-5 group-hover:-translate-y-1 transition-transform" />
                Resume
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-4 pt-6"
            >
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Connect</span>
              <div className="h-px w-8 bg-border"></div>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 rounded-full glass hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 text-muted-foreground"
                      aria-label={social.label}
                      data-testid={`link-social-${social.label.toLowerCase()}`}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2 relative"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] aspect-[4/5] group perspective-1000">
              {/* Glow Behind */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-700 animate-pulse-glow" />
              
              {/* Image Container */}
              <motion.div 
                whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative w-full h-full rounded-3xl overflow-hidden glass p-2 transform-style-3d shadow-2xl"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 mix-blend-multiply" />
                  <img
                    src={bioData.profileImage}
                    alt="Rahul Vishwakarma"
                    className="w-full h-full object-cover filter contrast-110 saturate-100 transition-transform duration-700 group-hover:scale-105"
                    data-testid="img-profile"
                  />
                  {/* Overlay subtle tech pattern */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] z-20 opacity-30" />
                </div>
              </motion.div>
              
              {/* Floating badges */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 p-4 rounded-2xl glass shadow-xl z-30"
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-foreground">3+</span>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Years Exp.</span>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 p-4 rounded-2xl glass shadow-xl z-30"
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-primary">15+</span>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Projects</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block z-20"
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Scroll to about section"
            data-testid="button-scroll-down"
          >
            <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
            <div className="p-2 rounded-full glass border-border group-hover:border-primary/50 transition-colors">
              <ArrowDown className="h-4 w-4" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
