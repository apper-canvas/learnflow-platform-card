import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import * as courseService from '../services/api/courseService'
import * as enrollmentService from '../services/api/enrollmentService'
const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
const [coursesResult, enrollmentsResult] = await Promise.all([
          courseService.getAll(),
          enrollmentService.getAll()
        ])
        setFeaturedCourses(coursesResult?.slice(0, 6) || [])
        setEnrollments(enrollmentsResult || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
loadData()
  }, [])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const stats = [
    { icon: "Users", value: "50K+", label: "Active Students" },
    { icon: "BookOpen", value: "1,200+", label: "Courses" },
    { icon: "Award", value: "98%", label: "Success Rate" },
    { icon: "Globe", value: "80+", label: "Countries" }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-surface-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
<nav className="bg-white/95 backdrop-blur-lg border-b border-surface-200/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <ApperIcon size={32} />
              <span className="text-xl font-bold text-surface-800">LearnFlow</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#home" className="px-4 py-2 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                Home
              </a>
              <Link to="/features" className="px-4 py-2 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                Features
              </Link>
              <Link to="/about" className="px-4 py-2 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                About
              </Link>
              <Link to="/courses" className="px-4 py-2 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                Courses
              </Link>
              <Link to="/add-lessons" className="px-4 py-2 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                Add Lessons
              </Link>
              <Link to="/quiz" className="px-4 py-2 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                Quiz
              </Link>
              <Link to="/contact" className="px-4 py-2 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                Contact
              </Link>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login" className="btn-secondary">Sign In</Link>
              <Link to="/register" className="btn-primary">Get Started</Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-surface-200/50 bg-white/95 backdrop-blur-lg">
              <div className="flex flex-col space-y-2">
                <a href="#home" className="px-4 py-3 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                  Home
                </a>
                <Link to="/features" className="px-4 py-3 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                  Features
                </Link>
                <Link to="/about" className="px-4 py-3 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                  About
                </Link>
                <Link to="/courses" className="px-4 py-3 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                  Courses
                </Link>
                <Link to="/add-lessons" className="px-4 py-3 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                  Add Lessons
                </Link>
                <Link to="/quiz" className="px-4 py-3 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                  Quiz
                </Link>
                <Link to="/contact" className="px-4 py-3 text-surface-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                  Contact
                </Link>
                <div className="pt-4 flex flex-col space-y-3">
                  <Link to="/login" className="btn-secondary w-full text-center">Sign In</Link>
                  <Link to="/register" className="btn-primary w-full text-center">Get Started</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-surface-900 mb-6">
              Learn. <span className="text-gradient">Grow.</span> Succeed.
            </h1>
            <p className="text-xl text-surface-600 mb-8 max-w-3xl mx-auto">
              Transform your future with our comprehensive online learning platform. 
Access world-class courses, expert instructors, and interactive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/courses" className="btn-primary text-lg px-8 py-4">
                Start Learning Now
              </Link>
              <Link to="/features" className="btn-secondary text-lg px-8 py-4">
                Watch Demo
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-surface-600 dark:text-surface-400 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-50 dark:bg-surface-800">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Platform Features
            </motion.h2>
            <motion.p 
              className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover the powerful features that make LearnFlow the perfect platform for modern education and training.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              {
                icon: "BookOpen",
                title: "Interactive Learning",
                description: "Engage with interactive content, quizzes, and multimedia resources designed to enhance your learning experience."
              },
              {
                icon: "Users",
                title: "Expert Instructors",
                description: "Learn from industry professionals and certified educators who bring real-world experience to every lesson."
              },
              {
                icon: "TrendingUp",
                title: "Progress Tracking",
                description: "Monitor your learning journey with detailed analytics, progress reports, and achievement tracking."
              },
              {
                icon: "Clock",
                title: "Flexible Learning",
                description: "Study at your own pace with 24/7 access to courses, offline content, and mobile-friendly lessons."
              },
              {
                icon: "Award",
                title: "Certification",
                description: "Earn industry-recognized certificates and digital badges to showcase your skills and knowledge."
              },
              {
                icon: "MessageCircle",
                title: "Community Support",
                description: "Connect with fellow learners, participate in discussions, and get help from our supportive community."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="card p-6 hover:shadow-soft transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                  <ApperIcon name={feature.icon} className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
</section>

      {/* Footer */}
      <footer className="bg-surface-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Learn Section */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Learn</h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/courses" 
                    className="text-surface-300 hover:text-white transition-colors duration-200"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/instructors" 
                    className="text-surface-300 hover:text-white transition-colors duration-200"
                  >
                    Instructors
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/certifications" 
                    className="text-surface-300 hover:text-white transition-colors duration-200"
                  >
                    Certifications
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/enterprise" 
                    className="text-surface-300 hover:text-white transition-colors duration-200"
                  >
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className="text-surface-300 hover:text-white transition-colors duration-200"
                  >
About Us
                </Link>
              </li>
            </ul>
          </div>
            {/* Support Section */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/help-center" 
                    className="text-surface-300 hover:text-white transition-colors duration-200"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-surface-300 hover:text-white transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/community" 
                    className="text-surface-300 hover:text-white transition-colors duration-200"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/privacy-policy" 
                    className="text-surface-300 hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms-of-service" 
                    className="text-surface-300 hover:text-white transition-colors duration-200"
                  >
Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

          <div className="border-t border-surface-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">LearnFlow</span>
              </div>
              <p className="text-surface-400 text-sm">
                © 2024 LearnFlow. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home