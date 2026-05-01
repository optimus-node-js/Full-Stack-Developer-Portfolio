import { GraduationCap, Award, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Technology - BTech, Computer Science",
      institution: "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)",
      location: "Bhopal, Madhya Pradesh",
      period: "Aug 2019 - May 2023",
      grade: "7.91 CGPA",
      type: "University"
    },
    {
      degree: "Bachelor of Technology - BTech, Computer Software Engineering",
      institution: "Bansal Institute of Science & Technology",
      location: "Raisen Road, Kokta, Anand Nagar, Bhopal - 462021",
      period: "Aug 2019 - May 2023",
      grade: "7.91 (First Division with Honours)",
      type: "College"
    },
    {
      degree: "Science",
      institution: "Seva Sadan Higher Secondary School",
      location: "Burhanpur, Madhya Pradesh",
      period: "Aug 2019",
      grade: "86%",
      type: "School"
    },
    {
      degree: "Advance Computer Application",
      institution: "Global Computer Training Academy",
      location: "Burhanpur, Madhya Pradesh",
      period: "Apr 2019 - Aug 2019",
      grade: "A+",
      type: "Certification"
    }
  ];

  const certifications = [
    {
      title: "Learn Ethical Hacking from Scratch",
      issuer: "zSecurity | Udemy",
      year: "2023",
      description: "Certified in WiFi hacking, creating Trojans, gaining access to computers, finding website vulnerabilities, SQL injection, and social engineering attacks."
    },
    {
      title: "Geoprocessing Using Python",
      issuer: "Indian Institute of Remote Sensing",
      year: "2023",
      description: "Certified in analyzing geo and spatial data, raster and vector data processing, using Numpy and Pandas libraries in Python."
    },
    {
      title: "Data Mining and Business Analytics",
      issuer: "Infosys | Springboard",
      year: "2023",
      description: "Certified in data mining for answering business questions and overview of business analytics using WEKA."
    },
    {
      title: "Advance Computer Application",
      issuer: "Global Computer Training Academy",
      year: "2019",
      description: "Certified in Computer Hardware Specification, Computer Basics, Internet Working, MS-Office."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="education" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Education & <span className="text-primary">Certifications</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            My academic background and professional certifications that have shaped my expertise 
            in technology and software development.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          
          {/* Education Section */}
          <div className="mb-24">
            <h3 className="text-3xl font-bold mb-12 text-center font-heading flex items-center justify-center text-foreground">
              <GraduationCap className="h-8 w-8 mr-4 text-primary" />
              Academic Background
            </h3>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 gap-6 lg:gap-8"
            >
              {education.map((edu, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="group glass p-8 rounded-[2rem] border border-border/50 hover:border-primary/30 transition-all duration-300 relative overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h4 className="text-xl lg:text-2xl font-bold text-foreground mb-3 font-heading group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h4>
                    <div className="font-semibold text-muted-foreground mb-4 text-sm lg:text-base">{edu.institution}</div>
                    
                    <div className="space-y-2 mb-6 mt-auto">
                      <div className="flex items-center text-sm font-medium text-muted-foreground/80">
                        <MapPin className="h-4 w-4 mr-2 text-primary/70" />
                        {edu.location}
                      </div>
                      <div className="flex items-center text-sm font-medium text-muted-foreground/80">
                        <Calendar className="h-4 w-4 mr-2 text-secondary/70" />
                        {edu.period}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                      <div className="text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-full">
                        {edu.grade}
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {edu.type}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Certifications Section */}
          <div>
            <h3 className="text-3xl font-bold mb-12 text-center font-heading flex items-center justify-center text-foreground">
              <Award className="h-8 w-8 mr-4 text-secondary" />
              Professional Certifications
            </h3>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 gap-6 lg:gap-8"
            >
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="group glass p-8 rounded-[2rem] border border-border/50 hover:border-secondary/30 transition-all duration-300 relative overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-foreground font-heading group-hover:text-secondary transition-colors pr-4">
                        {cert.title}
                      </h4>
                      <div className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                        {cert.year}
                      </div>
                    </div>
                    
                    <div className="font-semibold text-muted-foreground mb-4 text-sm">{cert.issuer}</div>
                    
                    <p className="text-muted-foreground/90 leading-relaxed text-sm mt-auto border-t border-border/50 pt-6">
                      {cert.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Education;
