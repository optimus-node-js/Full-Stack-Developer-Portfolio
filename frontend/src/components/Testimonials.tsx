import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content: "Rahul's technical expertise and attention to detail are exceptional. He delivered our project ahead of schedule and exceeded all expectations. His communication throughout the process was outstanding.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      company: "StartupXYZ",
      content: "Working with Rahul was a game-changer for our company. His full-stack development skills and innovative solutions helped us scale our platform efficiently. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Design Lead",
      company: "CreativeStudio",
      content: "Rahul's ability to translate complex requirements into elegant solutions is remarkable. His collaborative approach and technical depth make him an invaluable team member.",
      rating: 5,
    },
    {
      id: 4,
      name: "David Kim",
      role: "Founder",
      company: "InnovateLab",
      content: "Rahul's expertise in AI/ML and algorithmic trading systems is impressive. He helped us implement sophisticated trading algorithms that significantly improved our performance.",
      rating: 5,
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Don't just take my word for it. Here's what clients and colleagues say about working with me.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="glass p-10 md:p-14 rounded-[3rem] text-center relative overflow-hidden border border-border/50 shadow-2xl bg-card/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>
              
              <Quote className="absolute top-8 left-8 md:top-12 md:left-12 h-12 w-12 text-primary/20" />
              <Quote className="absolute bottom-8 right-8 md:bottom-12 md:right-12 h-12 w-12 text-secondary/20 rotate-180" />
              
              <div className="relative z-10 max-w-3xl mx-auto min-h-[250px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex justify-center mb-8 gap-1">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    
                    <p className="text-xl md:text-3xl text-foreground font-heading font-medium leading-relaxed italic mb-10">
                      "{testimonials[currentIndex].content}"
                    </p>

                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 mb-4">
                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-xl font-bold">
                          {testimonials[currentIndex].name.charAt(0)}
                        </div>
                      </div>
                      <div className="font-bold text-xl font-heading mb-1">{testimonials[currentIndex].name}</div>
                      <div className="text-muted-foreground font-medium">
                        <span className="text-primary">{testimonials[currentIndex].role}</span> at {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center mt-12 gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border-border/50 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              {/* Progress Dots */}
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentIndex
                        ? 'bg-primary w-8'
                        : 'bg-border hover:bg-muted-foreground w-2'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border-border/50 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
