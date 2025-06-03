import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Navigation from '../components/Navigation'
import ApperIcon from '../components/ApperIcon'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Full name is required')
      return false
    }
    if (formData.name.trim().length < 2) {
      toast.error('Name must be at least 2 characters long')
      return false
    }
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
    if (!formData.confirmPassword) {
      toast.error('Please confirm your password')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
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
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock registration logic
      toast.success('Account created successfully! Welcome to LearnFlow!')
      
      // Simulate auto-login after registration
      setTimeout(() => {
        navigate('/courses')
      }, 1500)
    } catch (error) {
      toast.error('An error occurred during registration. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20">
      <Navigation />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8 py-12">
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
                  <ApperIcon name="UserPlus" className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-surface-900 mb-2">Get Started</h2>
              <p className="text-surface-600">Create your LearnFlow account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-surface-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
              </div>

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
                    placeholder="Create a password"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-surface-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="input-field pr-12"
                    placeholder="Confirm your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-400 hover:text-surface-600"
                    disabled={isLoading}
                  >
                    <ApperIcon name={showConfirmPassword ? 'EyeOff' : 'Eye'} className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-surface-300 rounded"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-surface-700">
                    I agree to the{' '}
                    <button
                      type="button"
                      className="font-medium text-primary hover:text-primary-dark transition-colors"
                      disabled={isLoading}
                    >
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button
                      type="button"
                      className="font-medium text-primary hover:text-primary-dark transition-colors"
                      disabled={isLoading}
                    >
                      Privacy Policy
                    </button>
                  </label>
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
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <ApperIcon name="UserPlus" className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-surface-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Register