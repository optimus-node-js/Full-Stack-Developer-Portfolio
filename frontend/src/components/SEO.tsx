import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  url?: string;
  image?: string;
  type?: string;
}

const SEO = ({
  title = "Rahul Vishwakarma — Senior Full Stack Developer | SaaS, Marketplaces, AI & Security",
  description = "Senior Full Stack Developer specializing in full-stack development, AI engineering, security assessment, and platform architecture. Building scalable products with TypeScript, Node.js, React, Next.js, PostgreSQL, OpenAI, and GCP.",
  keywords = "Senior Full Stack Developer, Product Engineer, Full Stack Developer, Booking Marketplace, AI Engineer, Security Engineer, TypeScript, Node.js, React, Next.js, PostgreSQL, OpenAI, AI Agents, Tool Calling, System Design, Multi-Tenant SaaS, Platform Architecture, Capacitor, OWASP, Blue Team, Notification Systems, Workflow Automation, GCP",
  author = "Rahul Vishwakarma",
  url = "https://rahul-vishwakarma-portfolio.vercel.app",
  image = "https://rahul-vishwakarma-portfolio.vercel.app/profile.jpeg",
  type = "website"
}: SEOProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Rahul Vishwakarma — Senior Full Stack Developer" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Rahul Vishwakarma" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Rahul Vishwakarma",
          "jobTitle": "Senior Full Stack Developer",
          "description": description,
          "url": url,
          "image": image,
          "sameAs": [
            "https://github.com/Rahul-gif-asus",
            "https://linkedin.com/in/rahul-vishwakarma-101346192"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ahmedabad",
            "addressRegion": "Gujarat",
            "addressCountry": "India"
          },
          "email": "karmarahul67@gmail.com",
          "telephone": "+91-9131114837",
          "knowsAbout": [
            "Full Stack Development",
            "AI Engineering",
            "Security Engineering",
            "Product Architecture",
            "TypeScript",
            "Node.js",
            "React",
            "Next.js",
            "PostgreSQL",
            "OpenAI",
            "System Design",
            "Multi-Tenant SaaS"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "Hind Social Network Pvt. Ltd."
          }
        })}
      </script>

      {/* WebSite Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Rahul Vishwakarma — Senior Full Stack Developer",
          "url": url,
          "description": description,
          "author": {
            "@type": "Person",
            "name": "Rahul Vishwakarma"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
