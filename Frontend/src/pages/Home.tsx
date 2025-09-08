import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Globe, Zap, Users, Star, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const Home: React.FC = () => {
  const stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '25+', label: 'Happy Clients' },
    { value: '3+', label: 'Years Experience' },
    { value: '99%', label: 'Client Satisfaction' },
  ];

  const services = [
    {
      icon: Brain,
      title: 'AI/ML Solutions',
      description: 'Custom machine learning models and AI-powered applications that drive business intelligence.',
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Modern, responsive web applications built with cutting-edge technologies.',
    },
    {
      icon: Zap,
      title: 'Digital Transformation',
      description: 'End-to-end digital solutions that modernize your business processes.',
    },
  ];

  const testimonials = [
    {
      name: 'Manish',
      role: 'CTO, DataCorp',
      content: 'TechVision delivered an exceptional AI solution that increased our efficiency by 40%.',
      rating: 5,
    },
    {
      name: 'Harshit',
      role: 'CEO, StartupX',
      content: 'Their web development expertise helped us launch our product ahead of schedule.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent-teal/80" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transforming Ideas Into
              <span className="block gradient-text">Digital Reality</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              We empower businesses with cutting-edge AI/ML solutions, modern web development, 
              and comprehensive digital transformation services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="btn-hero inline-flex items-center">
                Explore Our Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Cards */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex space-x-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="glass-card px-6 py-4 text-center">
                <div className="text-2xl font-bold text-black">{stat.value}</div>
                <div className="text-sm text-black/80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
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
              Our Core Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We deliver innovative solutions across multiple domains to help your business thrive in the digital age.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="service-card text-center group"
              >
                <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Link 
                  to="/services" 
                  className="inline-flex items-center text-primary hover:text-primary-light transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Why Choose TechVision?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We combine technical expertise with business acumen to deliver solutions that drive real results.
              </p>
              <div className="space-y-4">
                {[
                  'Expert team with 3+ years of industry experience',
                  'Cutting-edge technologies and best practices',
                  'Agile development methodology',
                  'Ongoing support and maintenance',
                  'Transparent communication throughout',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="service-card text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it - hear from our satisfied clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="service-card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warning fill-current" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Let's discuss how we can help you achieve your digital transformation goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                Start Your Project
              </Link>
              <Link to="/careers" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300">
                Join Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;