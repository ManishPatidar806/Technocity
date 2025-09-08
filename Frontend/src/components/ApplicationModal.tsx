import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Job } from '@/api/jobs';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.string().required('Role is required'),
  resumeLink: yup.string().url('Please enter a valid URL').required('Resume link is required'),
});

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onSubmit: (data: any) => Promise<void>;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  job,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: job?.title || '',
    },
  });

  React.useEffect(() => {
    if (job) {
      reset({ role: job.title });
    }
  }, [job, reset]);

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
    reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-professional-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-border p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Apply for Position</h2>
                  {job && (
                    <p className="text-muted-foreground mt-1">{job.title}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                  Position Applied For *
                </label>
                <input
                  {...register('role')}
                  type="text"
                  id="role"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-secondary"
                  readOnly
                />
                {errors.role && (
                  <p className="mt-1 text-sm text-destructive">{errors.role.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="resumeLink" className="block text-sm font-medium text-foreground mb-2">
                  Resume Link *
                </label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    {...register('resumeLink')}
                    type="url"
                    id="resumeLink"
                    className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="https://drive.google.com/your-resume-link"
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Please provide a link to your resume (Google Drive, Dropbox, etc.)
                </p>
                {errors.resumeLink && (
                  <p className="mt-1 text-sm text-destructive">{errors.resumeLink.message}</p>
                )}
              </div>

              {/* Job Details */}
              {job && (
                <div className="border border-border rounded-lg p-4 bg-secondary/50">
                  <h3 className="font-semibold text-foreground mb-2">Position Details</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Type:</strong> {job.type === 'FULL_TIME' ? 'FULL_TIME' : 'INTERNSHIP'}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 btn-hero inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ApplicationModal;