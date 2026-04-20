import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import NewsletterModal from './NewsletterModal';
import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  image?: string;
}

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Building Scalable React Applications with Modern Patterns",
      excerpt: "Learn how to structure large-scale React applications using modern patterns, hooks, and best practices for maintainable code.",
      content: "Full article content here...",
      author: "Rahul Vishwakarma",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["React", "JavaScript", "Frontend"],
      featured: true,
    },
    {
      id: 2,
      title: "Algorithmic Trading: From Strategy to Implementation",
      excerpt: "A deep dive into building profitable trading algorithms using Python, backtesting strategies, and risk management.",
      content: "Full article content here...",
      author: "Rahul Vishwakarma",
      date: "2024-01-10",
      readTime: "12 min read",
      tags: ["Python", "Trading", "Algorithms"],
      featured: false,
    },
    {
      id: 3,
      title: "Machine Learning in Production: Best Practices",
      excerpt: "Essential guidelines for deploying ML models in production environments, including monitoring, scaling, and maintenance.",
      content: "Full article content here...",
      author: "Rahul Vishwakarma",
      date: "2024-01-05",
      readTime: "10 min read",
      tags: ["Machine Learning", "DevOps", "Python"],
      featured: false,
    },
    {
      id: 4,
      title: "Full-Stack Development with TypeScript and Node.js",
      excerpt: "Building robust full-stack applications using TypeScript, Node.js, and modern development practices.",
      content: "Full article content here...",
      author: "Rahul Vishwakarma",
      date: "2024-01-01",
      readTime: "15 min read",
      tags: ["TypeScript", "Node.js", "Full-Stack"],
      featured: true,
    },
  ];

  const allTags = ['all', ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];
  const filteredPosts = selectedTag === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.tags.includes(selectedTag));

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <section id="blog" className="py-24 bg-section-bg relative border-t border-border/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent pointer-events-none z-[1]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Latest <span className="text-secondary">Articles</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Insights, tutorials, and thoughts on modern software development, AI/ML, and technology trends.
          </p>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 scroll-animate">
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className={`capitalize rounded-full px-6 transition-all duration-300 ${
                selectedTag === tag 
                  ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow' 
                  : 'bg-background/50 hover:bg-muted text-muted-foreground border-border/50'
              }`}
            >
              <Tag className="h-3.5 w-3.5 mr-2" />
              {tag}
            </Button>
          ))}
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-20 scroll-animate">
            <h3 className="text-3xl font-bold font-heading mb-10 text-center">Featured Articles</h3>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {featuredPosts.map((post) => (
                <motion.article 
                  key={post.id} 
                  whileHover={{ y: -5 }}
                  className="glass p-8 rounded-[2rem] border border-border/50 transition-all duration-300 relative overflow-hidden group cursor-pointer"
                  onClick={() => window.location.href = `/blog/${post.id}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-6 text-sm font-medium text-muted-foreground mb-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-secondary" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-2xl font-bold mb-4 font-heading group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h4>
                    
                    <p className="text-muted-foreground mb-8 text-lg leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-primary font-bold text-sm group-hover:gap-2 transition-all">
                      Read Article <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div className="scroll-animate max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold font-heading mb-10 text-center">All Articles</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {regularPosts.map((post) => (
                <motion.article 
                  key={post.id} 
                  whileHover={{ y: -5 }}
                  className="glass p-6 md:p-8 rounded-[2rem] border border-border/50 transition-all duration-300 group relative overflow-hidden cursor-pointer flex flex-col"
                  onClick={() => window.location.href = `/blog/${post.id}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-center space-x-4 text-xs font-medium text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="h-3.5 w-3.5 text-secondary" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock className="h-3.5 w-3.5 text-secondary" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold mb-3 font-heading group-hover:text-secondary transition-colors duration-300">
                      {post.title}
                    </h4>
                    
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-secondary font-bold text-sm group-hover:gap-2 transition-all mt-auto">
                      Read Article <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-24 scroll-animate">
          <div className="glass p-10 md:p-14 rounded-[3rem] border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold font-heading mb-4 text-foreground">Never miss an update</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join the newsletter to get my latest articles, tutorials, and insights delivered straight to your inbox.
            </p>
            <NewsletterModal>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-glow transition-all duration-300 hover:scale-105">
                Subscribe to Newsletter
              </Button>
            </NewsletterModal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
