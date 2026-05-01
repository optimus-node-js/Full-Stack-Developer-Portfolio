import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, MousePointer, Clock, Globe, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  averageTime: string;
  topCountries: Array<{ country: string; visitors: number }>;
  topPages: Array<{ page: string; views: number }>;
  deviceTypes: Array<{ type: string; percentage: number }>;
  trafficSources: Array<{ source: string; percentage: number }>;
}

import AnimatedCounter from './AnimatedCounter';

const Analytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    uniqueVisitors: 0,
    averageTime: '0:00',
    topCountries: [],
    topPages: [],
    deviceTypes: [],
    trafficSources: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalytics({
        totalViews: 15420,
        uniqueVisitors: 8930,
        averageTime: '2:34',
        topCountries: [
          { country: 'United States', visitors: 3240 },
          { country: 'India', visitors: 2890 },
          { country: 'United Kingdom', visitors: 1560 },
          { country: 'Canada', visitors: 980 },
          { country: 'Germany', visitors: 760 }
        ],
        topPages: [
          { page: '/', views: 5420 },
          { page: '/project/spacex-launch', views: 1890 },
          { page: '/project/crowdsource', views: 1560 },
          { page: '/contact', views: 980 },
          { page: '/project/roi-calculator', views: 760 }
        ],
        deviceTypes: [
          { type: 'Desktop', percentage: 65 },
          { type: 'Mobile', percentage: 30 },
          { type: 'Tablet', percentage: 5 }
        ],
        trafficSources: [
          { source: 'Direct', percentage: 45 },
          { source: 'Google', percentage: 30 },
          { source: 'LinkedIn', percentage: 15 },
          { source: 'GitHub', percentage: 10 }
        ]
      });
      
      setIsLoading(false);
    };

    fetchAnalytics();
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  if (isLoading) {
    return (
      <section id="analytics" className="py-24 bg-background relative border-t border-border/50">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-6 text-xl text-muted-foreground font-medium animate-pulse">Loading analytics dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="analytics" className="py-24 bg-background relative border-t border-border/50">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Performance <span className="text-primary">Metrics</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Real-time dashboard tracking portfolio engagement and reach.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto space-y-6 lg:space-y-8"
        >
          {/* Key Metrics Bento */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { icon: Eye, label: "Total Views", value: analytics.totalViews, type: "number", color: "text-primary", bg: "bg-primary/10" },
              { icon: Users, label: "Unique Visitors", value: analytics.uniqueVisitors, type: "number", color: "text-secondary", bg: "bg-secondary/10" },
              { icon: Clock, label: "Avg. Session", value: analytics.averageTime, type: "text", color: "text-accent", bg: "bg-accent/10" },
              { icon: TrendingUp, label: "MoM Growth", value: 24, type: "percent", color: "text-primary", bg: "bg-primary/10" }
            ].map((metric, i) => (
              <motion.div key={i} variants={itemVariants} className="glass p-6 rounded-3xl border border-border/50 flex flex-col items-center text-center justify-center relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className={`w-12 h-12 rounded-2xl ${metric.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`text-3xl lg:text-4xl font-bold font-heading mb-1 ${metric.color}`}>
                  {metric.type === 'number' && <AnimatedCounter end={metric.value as number} />}
                  {metric.type === 'text' && metric.value}
                  {metric.type === 'percent' && <AnimatedCounter end={metric.value as number} prefix="+" suffix="%" />}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Detailed Analytics Grid */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Left Column: Top Pages & Traffic Sources */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <motion.div variants={itemVariants} className="glass p-8 rounded-[2.5rem] border border-border/50 h-[calc(50%-1rem)]">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold font-heading flex items-center">
                    <MousePointer className="h-5 w-5 mr-3 text-primary" />
                    Top Performing Pages
                  </h3>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                    View All <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                <div className="space-y-5">
                  {analytics.topPages.map((page, index) => (
                    <div key={page.page} className="flex items-center justify-between group">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                          {index + 1}
                        </div>
                        <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">{page.page}</span>
                      </div>
                      <div className="text-sm font-semibold bg-muted/50 px-3 py-1 rounded-lg">
                        {formatNumber(page.views)} <span className="text-muted-foreground text-xs font-normal">views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="glass p-8 rounded-[2.5rem] border border-border/50 h-[calc(50%-1rem)]">
                <h3 className="text-xl font-bold font-heading mb-8 flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-secondary" />
                  Traffic Sources
                </h3>
                <div className="space-y-6">
                  {analytics.trafficSources.map((source) => (
                    <div key={source.source}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{source.source}</span>
                        <span className="text-sm font-bold">{source.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${source.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          className="bg-gradient-to-r from-secondary to-primary h-full rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Global Reach & Devices */}
            <div className="space-y-6 lg:space-y-8">
              <motion.div variants={itemVariants} className="glass p-8 rounded-[2.5rem] border border-border/50 bg-gradient-to-br from-primary/5 to-transparent">
                <h3 className="text-xl font-bold font-heading mb-8 flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-primary" />
                  Global Reach
                </h3>
                <div className="space-y-5">
                  {analytics.topCountries.map((country, index) => (
                    <div key={country.country} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{country.country}</span>
                        <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-md">{formatNumber(country.visitors)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="glass p-8 rounded-[2.5rem] border border-border/50">
                <h3 className="text-xl font-bold font-heading mb-8">Device Split</h3>
                <div className="space-y-6">
                  {analytics.deviceTypes.map((device, index) => (
                    <div key={device.type}>
                      <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="font-medium flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-primary' : index === 1 ? 'bg-secondary' : 'bg-accent'}`}></span>
                          {device.type}
                        </span>
                        <span className="font-bold">{device.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${device.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                          className={`h-full rounded-full ${index === 0 ? 'bg-primary' : index === 1 ? 'bg-secondary' : 'bg-accent'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Analytics;
