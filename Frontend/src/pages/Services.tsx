import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Globe, Zap, Database, Cloud, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { getServices, Service } from '@/api/services';
import { useToast } from '@/hooks/use-toast';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // here we fetch data from backend
  //i have not implement because i have not content like project ,work demo and all
  const defaultServices = [
    {
      id: 1,
      title: 'AI/ML Solutions',
      description: 'Custom machine learning models, predictive analytics, and AI-powered applications that transform your business intelligence.',
      icon: 'Brain',
      features: [
        'Custom ML Model Development',
        'Predictive Analytics',
        'Natural Language Processing',
        'Computer Vision Solutions',
        'AI Integration & Deployment',
      ],
    },
    {
      id: 2,
      title: 'Web Development',
      description: 'Modern, responsive web applications built with cutting-edge technologies for optimal performance and user experience.',
      icon: 'Globe',
      features: [
        'React & Next.js Applications',
        'Full-Stack Development',
        'Progressive Web Apps',
        'E-commerce Solutions',
        'API Development & Integration',
      ],
    },
    {
      id: 3,
      title: 'Digital Transformation',
      description: 'Comprehensive digital solutions that modernize your business processes and drive innovation across your organization.',
      icon: 'Zap',
      features: [
        'Process Automation',
        'Legacy System Modernization',
        'Digital Strategy Consulting',
        'Change Management',
        'Performance Optimization',
      ],
    },
    {
      id: 4,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services to ensure your applications are secure, reliable, and cost-effective.',
      icon: 'Cloud',
      features: [
        'Cloud Migration',
        'AWS/Azure/GCP Setup',
        'Container Orchestration',
        'Microservices Architecture',
        'DevOps & CI/CD',
      ],
    },
    {
      id: 5,
      title: 'Data Analytics',
      description: 'Transform your raw data into actionable insights with our comprehensive data analytics and visualization solutions.',
      icon: 'Database',
      features: [
        'Data Pipeline Development',
        'Business Intelligence',
        'Real-time Analytics',
        'Data Visualization',
        'Big Data Processing',
      ],
    },
    {
      id: 6,
      title: 'Cybersecurity',
      description: 'Protect your digital assets with our comprehensive security solutions and best practices implementation.',
      icon: 'Shield',
      features: [
        'Security Audits',
        'Penetration Testing',
        'Compliance Solutions',
        'Identity Management',
        'Incident Response',
      ],
    },
  ];

  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Brain,
    Globe,
    Zap,
    Cloud,
    Database,
    Shield,
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data.length > 0 ? data : defaultServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices(defaultServices);
        toast({
          title: "Info",
          description: "Showing demo services. Backend connection needed for live data.",
          variant: "default",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
              Our Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive IT solutions designed to accelerate your digital transformation 
              and drive sustainable business growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon || 'Globe'] || Globe;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="service-card group"
                >
                  <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  
                  {service.features && (
                    <div className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                      {service.features.length > 3 && (
                        <div className="text-sm text-primary font-medium">
                          +{service.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  )}
                  
                  <button className="w-full btn-hero-outline text-center inline-flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful project delivery and client satisfaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'We analyze your requirements and understand your business goals.',
              },
              {
                step: '02',
                title: 'Strategy',
                description: 'We develop a comprehensive strategy and project roadmap.',
              },
              {
                step: '03',
                title: 'Development',
                description: 'Our expert team builds your solution using best practices.',
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'We deploy and provide ongoing support for your solution.',
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{process.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Let's discuss your project requirements and how we can help you achieve your goals.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;