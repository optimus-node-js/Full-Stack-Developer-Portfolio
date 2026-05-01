import { useState, useEffect } from 'react';
import { getContactSubmissions, ContactFormData, deleteContactSubmission, deleteMultipleContactSubmissions } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Phone, Calendar, MessageSquare, User, Copy, Check, Trash2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactSubmission extends ContactFormData {
  id: string;
}

const ContactedPage = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | string[] | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const submissions = await getContactSubmissions() as ContactSubmission[];
        setContacts(submissions);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1200);
  };

  const handleSelectContact = (contactId: string, checked: boolean) => {
    if (checked) {
      setSelectedContacts(prev => [...prev, contactId]);
    } else {
      setSelectedContacts(prev => prev.filter(id => id !== contactId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(contacts.map(contact => contact.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleDeleteClick = (contactId?: string) => {
    if (contactId) {
      setDeleteTarget(contactId);
    } else if (selectedContacts.length > 0) {
      setDeleteTarget(selectedContacts);
    }
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      if (Array.isArray(deleteTarget)) {
        await deleteMultipleContactSubmissions(deleteTarget);
        setContacts(prev => prev.filter(contact => !deleteTarget.includes(contact.id)));
        setSelectedContacts([]);
        toast({
          title: "Success",
          description: `${deleteTarget.length} contact(s) deleted successfully`,
        });
      } else if (deleteTarget) {
        await deleteContactSubmission(deleteTarget);
        setContacts(prev => prev.filter(contact => contact.id !== deleteTarget));
        toast({
          title: "Success",
          description: "Contact deleted successfully",
        });
      }
    } catch (error) {
      console.error('Error deleting contact(s):', error);
      toast({
        title: "Error",
        description: "Failed to delete contact(s). Please try again.",
        variant: "destructive"
      });
    } finally {
      setShowDeleteConfirm(false);
      setDeleteTarget(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading contact submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">Contact</span> Submissions
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              View and manage all contact form submissions from visitors
            </p>
          </div>

          <div className="glass rounded-2xl overflow-hidden shadow-2xl">
            {/* Action Bar */}
            {contacts.length > 0 && (
              <div className="bg-muted/30 px-6 py-4 border-b border-muted/50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedContacts.length === contacts.length && contacts.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    {selectedContacts.length > 0 ? `${selectedContacts.length} selected` : 'Select all'}
                  </span>
                </div>
                {selectedContacts.length > 0 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick()}
                    className="flex items-center space-x-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Selected ({selectedContacts.length})</span>
                  </Button>
                )}
              </div>
            )}
            
            <div className="w-full">
              <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="w-12 px-3 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {/* Checkbox column header */}
                    </th>
                    <th className="w-28 px-3 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Date
                    </th>
                    <th className="w-24 px-3 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <User className="h-4 w-4 inline mr-2" />
                      Name
                    </th>
                    <th className="w-40 px-3 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email
                    </th>
                    <th className="w-28 px-3 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-3 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <MessageSquare className="h-4 w-4 inline mr-2" />
                      Message
                    </th>
                    <th className="w-16 px-3 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {contacts.map((contact, idx) => (
                    <tr
                      key={contact.id}
                      className={`transition-all duration-200 hover:bg-primary/5 ${
                        idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                      }`}
                    >
                      <td className="px-3 py-4">
                        <Checkbox
                          checked={selectedContacts.includes(contact.id)}
                          onCheckedChange={(checked) => handleSelectContact(contact.id, checked as boolean)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td 
                        className="px-3 py-4 text-sm text-muted-foreground cursor-pointer"
                        onClick={() => setSelected(contact)}
                      >
                        <div className="truncate text-xs">
                          {contact.createdAt?.toDate().toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </div>
                      </td>
                      <td 
                        className="px-3 py-4 text-sm font-medium text-foreground cursor-pointer"
                        onClick={() => setSelected(contact)}
                      >
                        <div className="truncate">
                          {contact.name}
                        </div>
                      </td>
                      <td 
                        className="px-3 py-4 text-sm text-muted-foreground cursor-pointer"
                        onClick={() => setSelected(contact)}
                      >
                        <a 
                          href={`mailto:${contact.email}`} 
                          className="text-primary hover:text-primary/80 transition-colors underline truncate block text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {contact.email}
                        </a>
                      </td>
                      <td 
                        className="px-3 py-4 text-sm text-muted-foreground cursor-pointer"
                        onClick={() => setSelected(contact)}
                      >
                        <div className="truncate text-xs">
                          {contact.subject}
                        </div>
                      </td>
                      <td 
                        className="px-3 py-4 text-sm text-muted-foreground cursor-pointer"
                        onClick={() => setSelected(contact)}
                      >
                        <div className="truncate">
                          {contact.message}
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(contact.id);
                          }}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {contacts.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No contact submissions yet.</p>
                <p className="text-muted-foreground text-sm mt-2">Submissions will appear here when visitors contact you.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal for details */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="glass rounded-2xl shadow-2xl max-w-md w-full p-8 relative mx-4"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-muted-foreground hover:text-primary text-xl transition-colors"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                &times;
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-gradient-primary">Contact Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <span className="font-semibold text-foreground">Name:</span>
                    <span className="ml-2 text-muted-foreground">{selected.name}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <span className="font-semibold text-foreground">Email:</span>
                    <div className="flex items-center space-x-2">
                      <a 
                        href={`mailto:${selected.email}`} 
                        className="ml-2 text-primary underline break-all hover:text-primary/80"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {selected.email}
                      </a>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopy(selected.email, 'email')}
                        className="h-6 px-2 text-xs"
                      >
                        {copied === 'email' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="font-semibold text-foreground">Subject:</span>
                  <span className="ml-2 text-muted-foreground">{selected.subject}</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-primary mt-1" />
                  <div className="flex-1">
                    <span className="font-semibold text-foreground">Message:</span>
                    <div className="flex items-start space-x-2 mt-1">
                      <p className="ml-2 text-muted-foreground break-words leading-relaxed">
                        {selected.message}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopy(selected.message, 'message')}
                        className="h-6 px-2 text-xs flex-shrink-0"
                      >
                        {copied === 'message' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <span className="font-semibold text-foreground">Date:</span>
                    <span className="ml-2 text-muted-foreground">
                      {selected.createdAt?.toDate().toLocaleString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              className="glass rounded-2xl shadow-2xl max-w-md w-full p-8 relative mx-4"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-destructive/10 mb-4">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Confirm Deletion
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {Array.isArray(deleteTarget) 
                    ? `Are you sure you want to delete ${deleteTarget.length} contact(s)? This action cannot be undone.`
                    : "Are you sure you want to delete this contact? This action cannot be undone."
                  }
                </p>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={confirmDelete}
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactedPage;
