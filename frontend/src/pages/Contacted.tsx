import { useState, useMemo } from 'react';
import { db, type ContactSubmission } from '@/lib/instantdb';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Calendar, MessageSquare, User, Copy, Check, Search, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type SortField = 'timestamp' | 'name' | 'email' | 'subject';
type SortDir = 'asc' | 'desc';

const ContactedPage = () => {
  const { toast } = useToast();
  const { isLoading, error, data } = db.useQuery({ contacts: {} });

  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const contacts: ContactSubmission[] = useMemo(() => {
    if (!data?.contacts) return [];
    let items = [...data.contacts] as ContactSubmission[];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.subject?.toLowerCase().includes(q) ||
          c.message?.toLowerCase().includes(q)
      );
    }

    items.sort((a, b) => {
      const aVal = a[sortField] ?? '';
      const bVal = b[sortField] ?? '';
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      const compare = String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? compare : -compare;
    });

    return items;
  }, [data, searchQuery, sortField, sortDir]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1200);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const formatDate = (ts: number) => {
    if (!ts) return '—';
    return new Date(ts).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const SortHeader = ({ field, label, icon: Icon }: { field: SortField; label: string; icon?: React.ElementType }) => (
    <th
      className="px-3 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:text-foreground transition-colors"
      onClick={() => toggleSort(field)}
    >
      <span className="inline-flex items-center gap-1.5">
        {Icon && <Icon className="h-4 w-4" />}
        {label}
        <ArrowUpDown className={`h-3 w-3 ${sortField === field ? 'text-primary' : 'opacity-40'}`} />
      </span>
    </th>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading contact submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load submissions. Please try again.</p>
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
            {/* Search & Stats Bar */}
            <div className="bg-muted/30 px-6 py-4 border-b border-muted/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, subject, message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background/40 border-border/60 rounded-xl h-10"
                />
              </div>
              <span className="text-sm text-muted-foreground font-mono">
                {contacts.length} submission{contacts.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-muted/50">
                  <tr>
                    <SortHeader field="timestamp" label="Date" icon={Calendar} />
                    <SortHeader field="name" label="Name" icon={User} />
                    <SortHeader field="email" label="Email" icon={Mail} />
                    <SortHeader field="subject" label="Subject" />
                    <th className="px-3 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <span className="inline-flex items-center gap-1.5">
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {contacts.map((contact, idx) => (
                    <tr
                      key={contact.id}
                      className={`transition-all duration-200 hover:bg-primary/5 cursor-pointer ${
                        idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                      }`}
                      onClick={() => setSelected(contact)}
                    >
                      <td className="px-3 py-4 text-sm text-muted-foreground">
                        <div className="truncate text-xs">{formatDate(contact.timestamp)}</div>
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-foreground">
                        <div className="truncate">{contact.name}</div>
                      </td>
                      <td className="px-3 py-4 text-sm text-muted-foreground">
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-primary hover:text-primary/80 transition-colors underline truncate block text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {contact.email}
                        </a>
                      </td>
                      <td className="px-3 py-4 text-sm text-muted-foreground">
                        <div className="truncate text-xs">{contact.subject}</div>
                      </td>
                      <td className="px-3 py-4 text-sm text-muted-foreground">
                        <div className="truncate max-w-xs">{contact.message}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {contacts.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  {searchQuery ? 'No submissions match your search.' : 'No contact submissions yet.'}
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  {searchQuery ? 'Try a different search term.' : 'Submissions will appear here when visitors contact you.'}
                </p>
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
              onClick={(e) => e.stopPropagation()}
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
                      {formatDate(selected.timestamp)}
                    </span>
                  </div>
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
