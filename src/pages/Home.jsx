import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const stats = [
    { label: "Active Courses", value: featuredCourses?.length || 0, icon: "BookOpen" },
    { label: "Total Enrollments", value: enrollments?.length || 0, icon: "Users" },
    { label: "Learning Hours", value: "2,450+", icon: "Clock" },
    { label: "Success Rate", value: "94%", icon: "TrendingUp" }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-surface-600 font-medium">Loading LearnFlow...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="bg-glass fixed top-0 left-0 right-0 z-50 border-b border-surface-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="GraduationCap" className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">LearnFlow</span>
            </motion.div>
<div className="hidden md:flex items-center space-x-8">
              <a href="/contact" className="text-surface-600 hover:text-primary transition-colors">Contact</a>
              <a href="#features" className="text-surface-600 hover:text-primary transition-colors">Features</a>
              <a href="#about" className="text-surface-600 hover:text-primary transition-colors">About</a>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-surface-100 hover:bg-surface-200 transition-colors"
              >
                <ApperIcon name={darkMode ? "Sun" : "Moon"} className="w-5 h-5" />
              </button>
              <button className="btn-primary text-sm py-2 px-4">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Transform Your Learning
              <span className="text-gradient block mt-2">Experience Today</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join thousands of learners in our interactive platform designed for modern education. 
              Create, learn, and grow with cutting-edge tools and expert instructors.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className="btn-primary flex items-center justify-center space-x-2">
                <ApperIcon name="Play" className="w-5 h-5" />
                <span>Start Learning</span>
              </button>
              <button className="btn-secondary flex items-center justify-center space-x-2">
                <ApperIcon name="BookOpen" className="w-5 h-5" />
                <span>Browse Courses</span>
              </button>
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
        </div>
      </section>

      {/* Main Feature Section */}
      <section id="courses" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Interactive Course Creation Studio
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Experience our advanced course builder that makes creating engaging educational content simple and intuitive.
            </p>
          </div>
          
          <MainFeature />
        </div>
</section>
      {/* Footer */}
      <footer className="bg-surface-900 dark:bg-surface-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <ApperIcon name="GraduationCap" className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">LearnFlow</span>
              </div>
              <p className="text-surface-300 mb-4 max-w-md">
                Empowering learners worldwide with innovative educational technology and interactive learning experiences.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-surface-800 hover:bg-surface-700 rounded-lg flex items-center justify-center transition-colors">
                  <ApperIcon name="Twitter" className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-surface-800 hover:bg-surface-700 rounded-lg flex items-center justify-center transition-colors">
                  <ApperIcon name="Linkedin" className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-surface-800 hover:bg-surface-700 rounded-lg flex items-center justify-center transition-colors">
                  <ApperIcon name="Github" className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instructors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Certifications</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-700 mt-8 pt-8 text-center text-surface-400">
            <p>&copy; 2024 LearnFlow. All rights reserved. Built with passion for education.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home