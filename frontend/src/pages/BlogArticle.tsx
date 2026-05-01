import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react';
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

const BlogArticle = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock blog posts data - in real app, this would come from an API
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Building Scalable React Applications with Modern Patterns",
      excerpt: "Learn how to structure large-scale React applications using modern patterns, hooks, and best practices for maintainable code.",
      content: `
        <h2>Introduction</h2>
        <p>Building scalable React applications requires careful consideration of architecture, state management, and code organization. In this comprehensive guide, we'll explore modern patterns and best practices that will help you create maintainable and performant React applications.</p>
        
        <h2>Component Architecture</h2>
        <p>One of the key aspects of scalable React applications is proper component architecture. We'll discuss:</p>
        <ul>
          <li>Container vs Presentational Components</li>
          <li>Custom Hooks for Logic Reuse</li>
          <li>Compound Components Pattern</li>
          <li>Render Props and Higher-Order Components</li>
        </ul>
        
        <h2>State Management</h2>
        <p>Effective state management is crucial for large applications. We'll cover:</p>
        <ul>
          <li>Context API for Global State</li>
          <li>Redux Toolkit for Complex State</li>
          <li>Zustand for Lightweight State</li>
          <li>Server State with React Query</li>
        </ul>
        
        <h2>Performance Optimization</h2>
        <p>Performance is key to user experience. Learn about:</p>
        <ul>
          <li>React.memo and useMemo</li>
          <li>Code Splitting and Lazy Loading</li>
          <li>Virtual Scrolling</li>
          <li>Bundle Optimization</li>
        </ul>
        
        <h2>Testing Strategies</h2>
        <p>Comprehensive testing ensures reliability:</p>
        <ul>
          <li>Unit Testing with Jest and React Testing Library</li>
          <li>Integration Testing</li>
          <li>E2E Testing with Cypress</li>
          <li>Visual Regression Testing</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Building scalable React applications is an ongoing process that requires continuous learning and adaptation. By following these patterns and best practices, you'll be well-equipped to handle the challenges of modern web development.</p>
      `,
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
      content: `
        <h2>Introduction to Algorithmic Trading</h2>
        <p>Algorithmic trading has revolutionized the financial markets, allowing traders to execute strategies with precision and speed. This guide will walk you through the complete process of developing and implementing trading algorithms.</p>
        
        <h2>Strategy Development</h2>
        <p>Before coding, you need a solid strategy:</p>
        <ul>
          <li>Technical Analysis Indicators</li>
          <li>Fundamental Analysis Integration</li>
          <li>Market Microstructure</li>
          <li>Risk-Reward Ratios</li>
        </ul>
        
        <h2>Backtesting Framework</h2>
        <p>Testing your strategy is crucial:</p>
        <ul>
          <li>Historical Data Sources</li>
          <li>Backtesting Libraries (Backtrader, Zipline)</li>
          <li>Performance Metrics</li>
          <li>Walk-Forward Analysis</li>
        </ul>
        
        <h2>Implementation with Python</h2>
        <p>Python offers excellent libraries for trading:</p>
        <ul>
          <li>Pandas for Data Manipulation</li>
          <li>NumPy for Numerical Computing</li>
          <li>Matplotlib for Visualization</li>
          <li>API Integration with Brokers</li>
        </ul>
        
        <h2>Risk Management</h2>
        <p>Protecting your capital is paramount:</p>
        <ul>
          <li>Position Sizing</li>
          <li>Stop Loss and Take Profit</li>
          <li>Portfolio Diversification</li>
          <li>Drawdown Management</li>
        </ul>
        
        <h2>Live Trading Considerations</h2>
        <p>Moving from backtesting to live trading:</p>
        <ul>
          <li>Latency and Execution</li>
          <li>Slippage and Commissions</li>
          <li>Market Impact</li>
          <li>Monitoring and Alerts</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Algorithmic trading requires a combination of technical skills, market knowledge, and disciplined risk management. Start with paper trading and gradually scale up as you gain confidence in your strategies.</p>
      `,
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
      content: `
        <h2>Introduction</h2>
        <p>Deploying machine learning models to production is a complex process that requires careful planning and execution. This guide covers the essential practices for successful ML model deployment.</p>
        
        <h2>Model Development Lifecycle</h2>
        <p>The ML lifecycle includes several critical phases:</p>
        <ul>
          <li>Data Collection and Preprocessing</li>
          <li>Model Training and Validation</li>
          <li>Model Evaluation and Selection</li>
          <li>Deployment and Monitoring</li>
        </ul>
        
        <h2>Containerization and Deployment</h2>
        <p>Modern deployment strategies:</p>
        <ul>
          <li>Docker for Model Packaging</li>
          <li>Kubernetes for Orchestration</li>
          <li>CI/CD Pipelines</li>
          <li>Blue-Green Deployments</li>
        </ul>
        
        <h2>Model Serving</h2>
        <p>Efficient model serving is crucial:</p>
        <ul>
          <li>REST APIs and GraphQL</li>
          <li>Batch vs Real-time Inference</li>
          <li>Model Versioning</li>
          <li>A/B Testing</li>
        </ul>
        
        <h2>Monitoring and Observability</h2>
        <p>Keeping models healthy in production:</p>
        <ul>
          <li>Performance Metrics</li>
          <li>Data Drift Detection</li>
          <li>Model Drift Monitoring</li>
          <li>Alerting Systems</li>
        </ul>
        
        <h2>Scaling Considerations</h2>
        <p>Handling increased load:</p>
        <ul>
          <li>Horizontal vs Vertical Scaling</li>
          <li>Load Balancing</li>
          <li>Caching Strategies</li>
          <li>Resource Optimization</li>
        </ul>
        
        <h2>Security and Compliance</h2>
        <p>Protecting your ML systems:</p>
        <ul>
          <li>Data Privacy and GDPR</li>
          <li>Model Security</li>
          <li>Access Control</li>
          <li>Audit Logging</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Successful ML model deployment requires a holistic approach that considers not just the model itself, but the entire infrastructure, processes, and team capabilities.</p>
      `,
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
      content: `
        <h2>Introduction to Full-Stack TypeScript</h2>
        <p>TypeScript has become the standard for building large-scale applications. This guide covers building complete full-stack applications with TypeScript on both frontend and backend.</p>
        
        <h2>Backend Development with Node.js</h2>
        <p>Building robust APIs with TypeScript:</p>
        <ul>
          <li>Express.js with TypeScript</li>
          <li>Database Integration (MongoDB, PostgreSQL)</li>
          <li>Authentication and Authorization</li>
          <li>API Documentation with Swagger</li>
        </ul>
        
        <h2>Frontend Development</h2>
        <p>Modern frontend with TypeScript:</p>
        <ul>
          <li>React with TypeScript</li>
          <li>State Management (Redux Toolkit)</li>
          <li>Type-Safe API Calls</li>
          <li>Form Handling and Validation</li>
        </ul>
        
        <h2>Database Design and ORMs</h2>
        <p>Efficient data management:</p>
        <ul>
          <li>Prisma ORM</li>
          <li>TypeORM</li>
          <li>Database Migrations</li>
          <li>Query Optimization</li>
        </ul>
        
        <h2>Testing Strategies</h2>
        <p>Comprehensive testing approach:</p>
        <ul>
          <li>Unit Testing with Jest</li>
          <li>Integration Testing</li>
          <li>E2E Testing with Playwright</li>
          <li>API Testing</li>
        </ul>
        
        <h2>Deployment and DevOps</h2>
        <p>Getting your application to production:</p>
        <ul>
          <li>Docker and Docker Compose</li>
          <li>CI/CD with GitHub Actions</li>
          <li>Cloud Deployment (AWS, Vercel)</li>
          <li>Monitoring and Logging</li>
        </ul>
        
        <h2>Performance Optimization</h2>
        <p>Making your application fast:</p>
        <ul>
          <li>Database Query Optimization</li>
          <li>Caching Strategies</li>
          <li>CDN Implementation</li>
          <li>Bundle Optimization</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>TypeScript provides the type safety and developer experience needed for building maintainable full-stack applications. The key is to leverage its features effectively across your entire stack.</p>
      `,
      author: "Rahul Vishwakarma",
      date: "2024-01-01",
      readTime: "15 min read",
      tags: ["TypeScript", "Node.js", "Full-Stack"],
      featured: true,
    },
  ];

  const post = blogPosts.find(p => p.id === parseInt(id || '0'));

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="sticky top-0 z-50 glass border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  <Tag className="inline h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>By {post.author}</span>
              {post.featured && (
                <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                  Featured
                </span>
              )}
            </div>
          </header>

          {/* Article Body */}
          <div 
            className="prose prose-lg prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-ul:text-muted-foreground prose-li:mb-2 prose-li:leading-relaxed prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>
      </article>

      {/* Related Articles */}
      <section className="py-16 bg-section-bg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Related <span className="text-gradient-primary">Articles</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass p-6 rounded-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => window.location.href = `/blog/${relatedPost.id}`}
                >
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 text-gradient-secondary">
                    {relatedPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {relatedPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {relatedPost.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogArticle;
