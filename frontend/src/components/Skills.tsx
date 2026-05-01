import { useEffect, useRef, useState } from 'react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "💻",
      skills: [
        { name: "React.js", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 88 },
        { name: "Vue.js", level: 80 },
        { name: "HTML/CSS", level: 95 },
        { name: "JavaScript", level: 92 }
      ]
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 95 },
        { name: "Django", level: 85 },
        { name: "Flask", level: 82 },
        { name: "PHP", level: 75 },
        { name: "C++", level: 80 }
      ]
    },
    {
      title: "Database & Tools",
      icon: "🗄️",
      skills: [
        { name: "MongoDB", level: 88 },
        { name: "MySQL", level: 85 },
        { name: "Redis", level: 80 },
        { name: "Git", level: 90 },
        { name: "Docker", level: 75 },
        { name: "SQLite", level: 82 }
      ]
    },
    {
      title: "AI/ML & Data Science",
      icon: "🤖",
      skills: [
        { name: "TensorFlow", level: 85 },
        { name: "Scikit-learn", level: 88 },
        { name: "Pandas", level: 92 },
        { name: "NumPy", level: 90 },
        { name: "Data Analysis", level: 85 },
        { name: "Machine Learning", level: 82 }
      ]
    }
  ];

  const certifications = [
    "Advanced Computer Application - Global Computer Training Academy",
    "Business Analytics using WEKA - Infosys Springboard",
    "Geoprocessing Using Python - Indian Institute of Remote Sensing",
    "Data Mining and Decision Making - Infosys Springboard",
    "Ethical Hacking from Scratch - zSecurity/Udemy"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-section-bg relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technical <span className="text-gradient-primary">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit spanning full-stack development, AI/ML, 
            data science, and modern web technologies.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="glass p-8 rounded-2xl scroll-animate"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-xl font-semibold text-gradient-secondary">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className={`skill-progress ${isVisible ? 'w-full' : 'w-0'}`}
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Languages */}
          <div className="glass p-8 rounded-2xl scroll-animate">
            <h3 className="text-xl font-semibold text-gradient-primary mb-6 flex items-center">
              <span className="text-2xl mr-3">🌐</span>
              Languages
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Hindi</span>
                <span className="text-sm text-muted-foreground">Native</span>
              </div>
              <div className="flex justify-between items-center">
                <span>English</span>
                <span className="text-sm text-muted-foreground">Fluent</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="glass p-8 rounded-2xl scroll-animate">
            <h3 className="text-xl font-semibold text-gradient-primary mb-6 flex items-center">
              <span className="text-2xl mr-3">🏆</span>
              Certifications
            </h3>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="mt-16 text-center scroll-animate">
          <h3 className="text-2xl font-semibold mb-8 text-gradient-secondary">
            Key Specializations
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              "Algorithmic Trading",
              "Data Analysis",
              "Cybersecurity",
              "Team Leadership",
              "Full-Stack Development",
              "Machine Learning",
              "API Development",
              "Database Design",
              "Cloud Computing",
              "DevOps"
            ].map((specialization, index) => (
              <span
                key={index}
                className="px-4 py-2 glass rounded-full text-sm font-medium hover:glow-primary transition-all duration-300 cursor-default"
              >
                {specialization}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;