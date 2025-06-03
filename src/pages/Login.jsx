import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Navigation from '../components/Navigation'
import ApperIcon from '../components/ApperIcon'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.email) {
      toast.error('Email is required')
      return false
    }
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address')
      return false
    }
    if (!formData.password) {
      toast.error('Password is required')
      return false
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock authentication logic
      if (formData.email === 'demo@learnflow.com' && formData.password === 'password') {
        toast.success('Login successful! Welcome back!')
        setTimeout(() => {
          navigate('/courses')
        }, 1000)
      } else {
        toast.error('Invalid email or password. Try demo@learnflow.com / password')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20">
      <Navigation />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="card p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                  <ApperIcon name="User" className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-surface-900 mb-2">Welcome Back</h2>
              <p className="text-surface-600">Sign in to your LearnFlow account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-surface-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-surface-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-field pr-12"
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-400 hover:text-surface-600"
                    disabled={isLoading}
                  >
                    <ApperIcon name={showPassword ? 'EyeOff' : 'Eye'} className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-surface-300 rounded"
                    disabled={isLoading}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-surface-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    type="button"
                    className="font-medium text-primary hover:text-primary-dark transition-colors"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <ApperIcon name="LogIn" className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-surface-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-primary hover:text-primary-dark transition-colors">
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-surface-50 rounded-lg">
              <p className="text-sm text-surface-600 mb-2">Demo credentials:</p>
              <p className="text-xs text-surface-500">Email: demo@learnflow.com</p>
              <p className="text-xs text-surface-500">Password: password</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login