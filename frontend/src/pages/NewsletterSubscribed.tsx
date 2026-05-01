import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Mail, Calendar, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getNewsletterSubscriptions, deleteNewsletterSubscription, deleteMultipleNewsletterSubscriptions, NewsletterSubscription } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';

const NewsletterSubscribed = () => {
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteType, setDeleteType] = useState<'single' | 'multiple'>('single');
  const [deleteId, setDeleteId] = useState<string>('');

  const fetchSubscriptions = async () => {
    try {
      setIsLoading(true);
      const data = await getNewsletterSubscriptions();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error fetching newsletter subscriptions:', error);
      toast({
        title: "Error",
        description: "Failed to load newsletter subscriptions",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectSubscription = (id: string) => {
    setSelectedSubscriptions(prev => 
      prev.includes(id) 
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedSubscriptions.length === subscriptions.length) {
      setSelectedSubscriptions([]);
    } else {
      setSelectedSubscriptions(subscriptions.map((sub, index) => `subscription-${index}`));
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteType('single');
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleBulkDeleteClick = () => {
    if (selectedSubscriptions.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select subscriptions to delete",
        variant: "destructive"
      });
      return;
    }
    setDeleteType('multiple');
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteType === 'single') {
        await deleteNewsletterSubscription(deleteId);
        setSubscriptions(prev => prev.filter((_, index) => `subscription-${index}` !== deleteId));
        toast({
          title: "Success",
          description: "Newsletter subscription deleted successfully"
        });
      } else {
        await deleteMultipleNewsletterSubscriptions(selectedSubscriptions);
        setSubscriptions(prev => prev.filter((_, index) => !selectedSubscriptions.includes(`subscription-${index}`)));
        setSelectedSubscriptions([]);
        toast({
          title: "Success",
          description: `${selectedSubscriptions.length} newsletter subscriptions deleted successfully`
        });
      }
    } catch (error) {
      console.error('Error deleting newsletter subscription:', error);
      toast({
        title: "Error",
        description: "Failed to delete newsletter subscription",
        variant: "destructive"
      });
    } finally {
      setShowDeleteModal(false);
    }
  };

  const formatDate = (timestamp: unknown) => {
    try {
      let date;
      if (timestamp && typeof (timestamp as { toDate: () => Date }).toDate === 'function') {
        date = (timestamp as { toDate: () => Date }).toDate();
      } else if (timestamp && typeof (timestamp as { seconds: number }).seconds === 'number') {
        date = new Date((timestamp as { seconds: number }).seconds * 1000);
      } else {
        date = new Date(timestamp as string | number);
      }
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading newsletter subscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Newsletter <span className="text-gradient-primary">Subscribers</span>
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Manage your newsletter subscribers and track engagement.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-6 rounded-2xl text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-4" />
            <div className="text-3xl font-bold text-primary mb-2">
              {subscriptions.length}
            </div>
            <div className="text-muted-foreground">Total Subscribers</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center">
            <Mail className="h-8 w-8 text-secondary mx-auto mb-4" />
            <div className="text-3xl font-bold text-secondary mb-2">
              {selectedSubscriptions.length}
            </div>
            <div className="text-muted-foreground">Selected</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center">
            <Calendar className="h-8 w-8 text-accent mx-auto mb-4" />
            <div className="text-3xl font-bold text-accent mb-2">
              {subscriptions.length > 0 ? formatDate(subscriptions[0].subscribedAt).split(',')[0] : 'N/A'}
            </div>
            <div className="text-muted-foreground">Latest Subscription</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={selectedSubscriptions.length === subscriptions.length && subscriptions.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm text-muted-foreground">
              Select All ({selectedSubscriptions.length}/{subscriptions.length})
            </span>
          </div>
          
          {selectedSubscriptions.length > 0 && (
            <Button
              onClick={handleBulkDeleteClick}
              variant="destructive"
              className="flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete Selected ({selectedSubscriptions.length})</span>
            </Button>
          )}
        </div>

        {/* Subscriptions Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-muted">
                <tr>
                  <th className="text-left p-6 font-medium text-muted-foreground w-12">
                    <Checkbox
                      checked={selectedSubscriptions.length === subscriptions.length && subscriptions.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left p-6 font-medium text-muted-foreground w-28">Email</th>
                  <th className="text-left p-6 font-medium text-muted-foreground w-24">Status</th>
                  <th className="text-left p-6 font-medium text-muted-foreground w-28">Subscribed</th>
                  <th className="text-left p-6 font-medium text-muted-foreground w-16">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {subscriptions.map((subscription, index) => (
                    <motion.tr
                      key={`subscription-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="border-b border-muted/50 hover:bg-muted/20 transition-colors"
                    >
                      <td className="p-6">
                        <Checkbox
                          checked={selectedSubscriptions.includes(`subscription-${index}`)}
                          onCheckedChange={() => handleSelectSubscription(`subscription-${index}`)}
                        />
                      </td>
                      <td className="p-6">
                        <div className="text-sm font-medium truncate">
                          {subscription.email}
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Active
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="text-xs text-muted-foreground">
                          {formatDate(subscription.subscribedAt)}
                        </div>
                      </td>
                      <td className="p-6">
                        <Button
                          onClick={() => handleDeleteClick(`subscription-${index}`)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {subscriptions.length === 0 && (
          <div className="text-center py-12">
            <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Newsletter Subscribers</h3>
            <p className="text-muted-foreground">
              Newsletter subscriptions will appear here once users start subscribing.
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {deleteType === 'single' ? 'Delete Newsletter Subscription' : 'Delete Multiple Subscriptions'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              {deleteType === 'single' 
                ? 'Are you sure you want to delete this newsletter subscription? This action cannot be undone.'
                : `Are you sure you want to delete ${selectedSubscriptions.length} newsletter subscriptions? This action cannot be undone.`
              }
            </p>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsletterSubscribed;
