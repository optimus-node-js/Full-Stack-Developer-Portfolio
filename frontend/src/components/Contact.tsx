import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Github, Linkedin, Send, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveContactForm, ContactFormData } from '@/lib/firebase';
import { contactInfo } from '@/data/resume-data';
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

  const infoCards = [
    { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: Phone, label: 'Phone', value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', value: contactInfo.location, href: '#' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: contactInfo.github, username: '@Rahul-gif-asus' },
    { icon: Linkedin, label: 'LinkedIn', href: contactInfo.linkedin, username: 'rahul-vishwakarma-101346192' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({ title: 'Missing fields', description: 'Please fill out all fields.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    try {
      await saveContactForm(formData);
      toast({ title: 'Message sent!', description: "Thanks for reaching out — I'll reply within 24 hours." });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      toast({ title: 'Something went wrong', description: 'Please try again shortly.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden border-t border-border/60">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center scroll-animate">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 bg-muted/30 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="pulse-dot" /> Let's talk
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
            Have a project in mind?{' '}
            <span className="text-gradient-primary">Say hello.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            I typically respond within 24 hours. Open to senior FS roles, consulting and interesting collaborations.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid lg:grid-cols-[1.2fr_0.8fr] gap-6 max-w-6xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 lg:p-10 border border-border/60 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative">
              <h3 className="font-heading font-bold text-2xl">Send me a message</h3>
              <p className="mt-2 text-sm text-muted-foreground">Tell me what you're building — I'll get back soon.</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Name *</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="bg-background/40 border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email *</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="bg-background/40 border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl h-11"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Subject *</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className="bg-background/40 border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Message *</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, ideas or just say hello..."
                    className="bg-background/40 border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl min-h-[140px] resize-y"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-premium w-full h-12 rounded-xl text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send message
                      <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="glass rounded-3xl p-6 border border-border/60"
            >
              <h3 className="font-heading font-bold text-lg">Contact info</h3>
              <div className="mt-5 space-y-4">
                {infoCards.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <a
                      key={i}
                      href={c.href}
                      className="flex items-center gap-4 group"
                    >
                      <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{c.label}</div>
                        <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">{c.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass rounded-3xl p-6 border border-border/60"
            >
              <h3 className="font-heading font-bold text-lg">Connect</h3>
              <div className="mt-5 space-y-3">
                {socialLinks.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-border/60 hover:border-primary/30 hover:bg-muted/60 transition-all group"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">{s.label}</div>
                        <div className="text-xs text-muted-foreground truncate">{s.username}</div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass rounded-3xl p-5 border border-tertiary/30 bg-tertiary/5 flex items-center gap-4"
            >
              <span className="pulse-dot" />
              <div>
                <div className="text-sm font-semibold">Available for new opportunities</div>
                <div className="text-xs text-muted-foreground">Responds within 24 hours</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
