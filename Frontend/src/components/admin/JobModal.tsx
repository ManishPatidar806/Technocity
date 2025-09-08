import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Job } from '@/api/jobs';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  type: yup.string().oneOf(['FULL_TIME', 'INTERNSHIP']).required('Type is required'),
  location: yup.string().required('Location is required'),
  experience:yup.string().required('Experience is required'),
  description: yup.string().required('Description is required'),
  requirements: yup.string(),
  responsibilities: yup.string(),
  qualifications:yup.string()
});

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onSubmit: (data: Omit<Job, 'id'>) => Promise<void>;
}

const JobModal: React.FC<JobModalProps> = ({
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
    defaultValues: job ? {
      title: job.title,
      type: job.type,
      location: job.location,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      qualifications: job.qualifications,
    } : undefined,
  });

  React.useEffect(() => {
    if (job) {
      reset({
        title: job.title,
        type: job.type,
        location: job.location,
        experience: job.experience,
        description: job.description,
        requirements: job.requirements,
        responsibilities: job.responsibilities,
        qualifications: job.qualifications,
      });
    } else {
      reset({
        title: '',
        type: 'FULL_TIME',
        experience: '',
        location: '',
        description: '',
        requirements: '',
        responsibilities: '',
        qualifications:''
      });
    }
  }, [job, reset]);

  const handleFormSubmit = async (data: any) => {
    const jobData = {
      ...data,
    };
    await onSubmit(jobData);
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
            className="relative bg-white rounded-2xl shadow-professional-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-border p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {job ? 'Edit Job' : 'Create New Job'}
                </h2>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                    Job Title *
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    id="title"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="e.g. Senior Frontend Developer"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">
                    Job Type *
                  </label>
                  <select
                    {...register('type')}
                    id="type"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background"
                  >
                    <option value="FULL_TIME">Full-time</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-destructive">{errors.type.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                  Location *
                </label>
                <input
                  {...register('location')}
                  type="text"
                  id="location"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="e.g. San Francisco, CA / Remote"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-destructive">{errors.location.message}</p>
                )}
              </div>
                <div>
                <label htmlFor="experience" className="block text-sm font-medium text-foreground mb-2">
                  Experience *
                </label>
                <input
                  {...register('experience')}
                  type="text"
                  id="experience"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="e.g. 3+ years"
                />
                {errors.experience && (
                  <p className="mt-1 text-sm text-destructive">{errors.experience.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  Job Description *
                </label>
                <textarea
                  {...register('description')}
                  id="description"
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="Brief description of the role and what you're looking for..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-foreground mb-2">
                  Requirements
                </label>
                <textarea
                  {...register('requirements')}
                  id="requirements"
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="Enter each requirement on a new line&#10;e.g. 3+ years of React experience&#10;Strong knowledge of TypeScript&#10;Experience with REST APIs"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Enter each requirement on a new line
                </p>
                {errors.requirements && (
                  <p className="mt-1 text-sm text-destructive">{errors.requirements.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="responsibility" className="block text-sm font-medium text-foreground mb-2">
                  Responsibilities
                </label>
                <textarea
                  {...register('responsibilities')}
                  id="responsibilities"
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="Enter each responsibility on a new line&#10;e.g. Develop responsive web applications&#10;Collaborate with design team&#10;Participate in code reviews"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Enter each responsibility on a new line
                </p>
                {errors.responsibilities && (
                  <p className="mt-1 text-sm text-destructive">{errors.responsibilities.message}</p>
                )}
              </div>
                <div>
                <label htmlFor="qualifications" className="block text-sm font-medium text-foreground mb-2">
                  Qualifications
                </label>
                <textarea
                  {...register('qualifications')}
                  id="qualifications"
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="Enter each qualifications on a new line&#10;e.g. Knowledge of responsive web applications&#10;Strong Understanding of Java&#10;Experience of Live Project"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Enter each qualification on a new line
                </p>
                {errors.qualifications && (
                  <p className="mt-1 text-sm text-destructive">{errors.qualifications.message}</p>
                )}
              </div>

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
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting ? 'Saving...' : (job ? 'Update Job' : 'Create Job')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JobModal;