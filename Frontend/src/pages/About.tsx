import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Eye, Award, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const team = [
    {
      name: 'Gyanu',
      role: 'CEO & Co-Founder',
      bio: 'Former tech lead at Google with 8+ years in AI/ML development.',
    },
    {
      name: 'Manish',
      role: 'CTO & Co-Founder',
      bio: 'Full-stack architect with expertise in scalable web applications.',
    },
    {
      name: 'Harshit',
      role: 'Lead Data Scientist',
      bio: 'PhD in Machine Learning with focus on computer vision and NLP.',
    },
    {
      name: 'Kunwar',
      role: 'Head of Design',
      bio: 'UX/UI expert with a passion for user-centered design.',
    },
  ];

  const milestones = [
    { year: '2021', title: 'Company Founded', description: 'Started with a vision to democratize AI technology.' },
    { year: '2022', title: 'First Major Client', description: 'Delivered our first enterprise AI solution.' },
    { year: '2023', title: 'Team Expansion', description: 'Grew to 15+ talented professionals.' },
    { year: '2024', title: 'Innovation Award', description: 'Recognized for excellence in digital transformation.' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We stay at the forefront of technology to deliver cutting-edge solutions.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and open communication.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We are committed to delivering the highest quality in everything we do.',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We maintain honesty and openness in all our business relationships.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About TechVision
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're a passionate team of technologists dedicated to helping businesses 
              thrive in the digital age through innovative solutions and expert guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="service-card"
            >
              <Target className="w-12 h-12 text-primary mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To empower businesses of all sizes with cutting-edge technology solutions 
                that drive growth, efficiency, and innovation. We believe that every organization 
                deserves access to world-class digital tools and expertise.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="service-card"
            >
              <Eye className="w-12 h-12 text-primary mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Vision</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be the leading technology partner for businesses seeking digital transformation. 
                We envision a future where technology seamlessly integrates with business processes 
                to create unprecedented value and opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide our work and define our culture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Talented professionals passionate about technology and innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="service-card text-center group"
              >
                <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key milestones in our company's growth and evolution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-lg font-bold text-white">{milestone.year}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{milestone.title}</h3>
                <p className="text-muted-foreground">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Want to Join Our Team?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              We're always looking for talented individuals who share our passion for technology and innovation.
            </p>
            <motion.a
              href="/careers"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              View Open Positions
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;