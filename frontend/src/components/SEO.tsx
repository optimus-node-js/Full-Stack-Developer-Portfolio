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
  title = "Rahul Vishwakarma - Full Stack Developer & AI Enthusiast",
  description = "Experienced Full Stack Developer specializing in React, Node.js, Python, and AI/ML. Building scalable web applications and innovative solutions.",
  keywords = "Full Stack Developer, React, Node.js, Python, AI, Machine Learning, Web Development, Portfolio",
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
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Rahul Vishwakarma Portfolio" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@rahul_vishwakarma" />
      
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
          "jobTitle": "Full Stack Developer",
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
            "addressCountry": "India"
          },
          "email": "karmarahul67@gmail.com",
          "telephone": "+91-9131114837"
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
