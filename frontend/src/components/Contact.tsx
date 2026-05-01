import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveContactForm, ContactFormData } from '@/lib/firebase';
import { motion } from 'framer-motion';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'karmarahul67@gmail.com',
      href: 'mailto:karmarahul67@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9131114837',
      href: 'tel:+919131114837'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Ahmedabad, India',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Rahul-gif-asus',
      username: '@Rahul-gif-asus'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/rahul-vishwakarma-101346192',
      username: 'rahul-vishwakarma-101346192'
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:karmarahul67@gmail.com',
      username: 'karmarahul67@gmail.com'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      await saveContactForm(formData);
      
      toast({
        title: "Success!",
        description: "Your message has been sent. I'll get back to you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background relative border-t border-border/50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Ready to collaborate on your next project? Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
                
                <h3 className="text-2xl font-bold mb-8 font-heading relative z-10">
                  Send Me a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-semibold text-muted-foreground">
                        Name <span className="text-primary">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl h-12"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-muted-foreground">
                        Email <span className="text-primary">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl h-12"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-semibold text-muted-foreground">
                      Subject <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl h-12"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-muted-foreground">
                      Message <span className="text-primary">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl min-h-[150px] resize-y"
                      placeholder="Tell me about your project, ideas, or just say hello..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 rounded-xl text-lg font-semibold shadow-glow transition-all duration-300 hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information Sidebar */}
            <div className="space-y-6">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass p-8 rounded-[2rem] border border-border/50"
              >
                <h3 className="text-2xl font-bold mb-8 font-heading">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div key={index} className="flex items-center space-x-5 group">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-muted-foreground">{info.label}</div>
                          <a
                            href={info.href}
                            className="font-medium hover:text-primary transition-colors duration-200"
                          >
                            {info.value}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass p-8 rounded-[2rem] border border-border/50"
              >
                <h3 className="text-xl font-bold mb-6 font-heading">
                  Let's Connect Online
                </h3>
                
                <div className="flex flex-col space-y-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/80 hover:border-primary/30 transition-all duration-300 group"
                      >
                        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors mr-4" />
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{social.label}</div>
                          <div className="text-xs text-muted-foreground">{social.username}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass p-6 rounded-[2rem] border border-primary/20 bg-primary/5 flex items-center gap-4"
              >
                <div className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Available for new opportunities</h4>
                  <p className="text-xs text-muted-foreground mt-1">I typically respond within 24 hours.</p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;