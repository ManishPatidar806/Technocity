import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, LogIn } from 'lucide-react';
import { login } from '@/api/auth';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await login(data);
      authLogin(response.data);
      toast({
        title: "Login Successful",
        description: "Welcome back to the admin dashboard.",
        variant: "default",
      });
      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="glass-card bg-slate-700 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">TechVision</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-white/80">Access the admin dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <input
                {...register('username')}
                type="text"
                id="username"
                className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-white transition-colors bg-white/10 text-white placeholder-white/60"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-300">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-white transition-colors bg-white/10 text-white placeholder-white/60"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-300">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
              ) : (
                <LogIn className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Back to site */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-white/80 hover:text-white transition-colors text-sm"
            >
              ← Back to website
            </Link>
          </div>

          {/* Demo credentials info */}
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <p className="text-white/80 text-sm text-center">
              <strong>Demo Credentials:</strong><br />
              Username: admin<br />
              Password: password
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;