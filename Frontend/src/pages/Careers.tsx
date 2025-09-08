import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { getJobs, Job, submitApplication } from '@/api/jobs';
import { useToast } from '@/hooks/use-toast';
import ApplicationModal from '@/components/ApplicationModal';

const Careers: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Default jobs as fallback
  const defaultJobs: Job[] = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      type: 'FULL_TIME',
      location: 'San Francisco, CA / Remote',
      description: 'Join our team to build cutting-edge web applications using React, Node.js, and cloud technologies.',
      requirements: [
        '5+ years of full-stack development experience',
        'Proficiency in React, Node.js, TypeScript',
        'Experience with cloud platforms (AWS/Azure)',
        'Strong understanding of REST APIs and databases',
      ],
      responsibilities: [
        'Develop scalable web applications',
        'Collaborate with design and product teams',
        'Mentor junior developers',
        'Participate in code reviews and architecture decisions',
      ],
    },
    {
      id: 2,
      title: 'Machine Learning Engineer',
      type: 'full-time',
      location: 'New York, NY / Remote',
      description: 'Help us build the next generation of AI-powered solutions for our clients.',
      requirements: [
        'MS/PhD in Computer Science, ML, or related field',
        'Experience with Python, TensorFlow/PyTorch',
        'Knowledge of ML algorithms and statistics',
        'Experience deploying ML models to production',
      ],
      responsibilities: [
        'Design and implement ML algorithms',
        'Build and optimize ML pipelines',
        'Collaborate with data scientists and engineers',
        'Research and implement new ML techniques',
      ],
    },
    {
      id: 3,
      title: 'Frontend Developer Intern',
      type: 'INTERNSHIP',
      location: 'Austin, TX / Remote',
      description: 'Learn modern frontend development while contributing to real projects.',
      requirements: [
        'Currently pursuing CS degree or bootcamp graduate',
        'Basic knowledge of HTML, CSS, JavaScript',
        'Familiarity with React is a plus',
        'Strong problem-solving skills',
      ],
      responsibilities: [
        'Assist in building user interfaces',
        'Learn modern development practices',
        'Participate in team meetings and code reviews',
        'Contribute to documentation and testing',
      ],
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      type: 'full-time',
      location: 'Seattle, WA / Remote',
      description: 'Build and maintain our cloud infrastructure and deployment pipelines.',
      requirements: [
        '3+ years of DevOps/SRE experience',
        'Experience with AWS/Azure, Docker, Kubernetes',
        'Knowledge of Infrastructure as Code (Terraform)',
        'Experience with CI/CD pipelines',
      ],
      responsibilities: [
        'Manage cloud infrastructure',
        'Build and maintain CI/CD pipelines',
        'Monitor system performance and reliability',
        'Implement security best practices',
      ],
    },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        // console.log(data.data.length)
        setJobs(Array.isArray(response.data) && response.data.length > 0 ? response.data : defaultJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs(defaultJobs);
        toast({
          title: "Info",
          description: "Showing demo jobs. Backend connection needed for live data.",
          variant: "default",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };


  const handleApplicationSubmit = async (applicationData: any) => {
    if (!selectedJob) return;
    try {
      await submitApplication(selectedJob.id, applicationData);
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll be in touch soon.",
        variant: "default",
      });
      setIsModalOpen(false);
      setSelectedJob(null);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    }
  };

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
              Join Our Team
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Build the future of technology with us. We're looking for passionate individuals 
              who want to make a real impact in the world of AI, web development, and digital transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose TechVision?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Growth & Learning',
                description: 'Continuous learning opportunities and career advancement paths.',
              },
              {
                title: 'Flexible Work',
                description: 'Remote-first culture with flexible hours and work-life balance.',
              },
              {
                title: 'Cutting-edge Tech',
                description: 'Work with the latest technologies and innovative projects.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="service-card text-center"
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
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
              Open Positions
            </h2>
            <p className="text-xl text-muted-foreground">
              Find your next opportunity with us.
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="service-card hover:shadow-professional-lg"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.type === 'FULL_TIME'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-accent-teal/10 text-accent-teal'
                      }`}
                    >
                      {job.type === 'FULL_TIME' ? 'Full-time' : 'Internship'}
                    </span>
                    <div className="flex items-center gap-6 mb-4 text-muted-foreground mt-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.type === 'FULL_TIME' ? 'Full-time' : 'Internship'}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6">{job.description}</p>
                    {job.requirements && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-2">Requirements:</h4>
                        <ul className="text-muted-foreground text-sm space-y-1">
                          {job.requirements.slice(0, 3).map((req, i) => (
                            <li key={i}>• {req}</li>
                          ))}
                          {job.requirements.length > 3 && (
                            <li className="text-primary font-medium">+{job.requirements.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="lg:ml-8 mt-6 lg:mt-0">
                    <button
                      onClick={() => handleApply(job)}
                      className="btn-hero inline-flex items-center"
                    >
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
};

export default Careers;