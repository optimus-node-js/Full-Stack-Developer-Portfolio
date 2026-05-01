import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Send, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveContactForm, ContactFormData } from '@/lib/firebase';

interface ContactModalProps {
  projectTitle?: string;
  triggerText?: string;
  triggerClassName?: string;
}

const ContactModal = ({ 
  projectTitle, 
  triggerText = "Get In Touch",
  triggerClassName = "w-full bg-primary hover:bg-primary/90 text-primary-foreground"
}: ContactModalProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Simple validation
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
      // Add project context to the message if provided
      const messageWithContext = projectTitle 
        ? `${formData.message}\n\n---\nProject: ${projectTitle}`
        : formData.message;

      const formDataWithContext = {
        ...formData,
        message: messageWithContext,
        projectTitle: projectTitle || null,
        type: (projectTitle ? 'project_inquiry' : 'general_contact') as 'project_inquiry' | 'general_contact'
      };

      // Save to Firebase
      await saveContactForm(formDataWithContext);
      
      toast({
        title: "Success!",
        description: "Your message has been sent. I'll get back to you soon.",
      });
      
      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsOpen(false);
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

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset form when modal closes
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] glass border-glass-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient-primary">
            {projectTitle ? `Contact about ${projectTitle}` : 'Get In Touch'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="modal-name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <Input
                id="modal-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="glass border-glass-border"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="modal-email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <Input
                id="modal-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="glass border-glass-border"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="modal-subject" className="block text-sm font-medium mb-2">
              Subject *
            </label>
            <Input
              id="modal-subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleInputChange}
              className="glass border-glass-border"
              placeholder={projectTitle ? `Inquiry about ${projectTitle}` : "What's this about?"}
            />
          </div>
          
          <div>
            <label htmlFor="modal-message" className="block text-sm font-medium mb-2">
              Message *
            </label>
            <Textarea
              id="modal-message"
              name="message"
              required
              value={formData.message}
              onChange={handleInputChange}
              className="glass border-glass-border min-h-32"
              placeholder={projectTitle 
                ? `Tell me about your interest in ${projectTitle} or any questions you have...`
                : "Tell me about your project, ideas, or just say hello..."
              }
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
