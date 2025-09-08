import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, LogOut, Code2, Users, Briefcase } from 'lucide-react';
import { getJobs, createJob, updateJob, Job, deleteJob } from '@/api/jobs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import JobModal from '@/components/admin/JobModal';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchJobs();
  }, [isAuthenticated, navigate]);

  const fetchJobs = async () => {
    try {
      const response = await getJobs();
      setJobs(response.data);
      console.log(jobs)
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch jobs.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleCreateJob = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const hadleDeleteJob = async (jobId :Number)=>{
    
     try {
      const response =  await deleteJob(jobId);
      console.log(response.message)
      await fetchJobs()
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to delete jobs.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }


  const handleJobSubmit = async (jobData: Omit<Job, 'id'>) => {
    try {
      if (editingJob) {
        await updateJob(editingJob.id, jobData);
        toast({
          title: "Job Updated",
          description: "Job has been updated successfully.",
          variant: "default",
        });
      } else {
        await createJob(jobData);
        toast({
          title: "Job Created",
          description: "New job has been created successfully.",
          variant: "default",
        });
      }
      await fetchJobs();
      setIsModalOpen(false);
      setEditingJob(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save job. Please try again.",
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
      {/* Header */}
      <header className="bg-white shadow-professional">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Admin Dashboard</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-border text-muted-foreground rounded-lg hover:bg-secondary transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="service-card"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mr-4">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
                <p className="text-2xl font-bold text-foreground">{jobs.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="service-card"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Full-time Positions</p>
                <p className="text-2xl font-bold text-foreground">
                  {jobs.filter(job => job.type === 'FULL_TIME').length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="service-card"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Internships</p>
                <p className="text-2xl font-bold text-foreground">
                  {jobs.filter(job => job.type === 'INTERNSHIP').length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Jobs Section */}
        <div className="service-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Job Listings</h2>
            <button
              onClick={handleCreateJob}
              className="btn-hero inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Job
            </button>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No jobs yet</h3>
              <p className="text-muted-foreground mb-4">Create your first job posting to get started.</p>
              <button
                onClick={handleCreateJob}
                className="btn-hero inline-flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Job
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border border-border rounded-lg p-6 hover:shadow-professional transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.type === 'FULL_TIME' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-accent-teal/10 text-accent-teal'
                        }`}>
                          {job.type === 'FULL_TIME' ? 'FULL_TIME' : 'INTERNSHIP'}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-2">{job.location}</p>
                      <p className="text-muted-foreground">{job.description}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditJob(job)}
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                        aria-label="Edit job"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        aria-label="Delete job"
                        onClick={() =>hadleDeleteJob(job.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Job Modal */}
      <JobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(null);
        }}
        job={editingJob}
        onSubmit={handleJobSubmit}
      />
    </div>
  );
};

export default AdminDashboard;