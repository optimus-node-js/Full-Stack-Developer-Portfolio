import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import Contacted from "./pages/Contacted";
import ProjectContacted from "./pages/ProjectContacted";
import NewsletterSubscribed from "./pages/NewsletterSubscribed";
import BlogArticle from "./pages/BlogArticle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/project/:projectId" element={<ProjectDetail />} />
                <Route path="/contacted" element={<Contacted />} />
                <Route path="/project/contacted" element={<ProjectContacted />} />
                <Route path="/newsletter/subscribed" element={<NewsletterSubscribed />} />
                <Route path="/blog/:id" element={<BlogArticle />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
