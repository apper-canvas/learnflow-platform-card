import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { Search, Filter, BookOpen, Clock, Users, Star, ChevronRight, GraduationCap } from 'lucide-react'
import * as courseService from '../services/api/courseService'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    filterCourses()
  }, [courses, searchTerm, selectedCategory, selectedDifficulty])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const data = await courseService.getAll()
      setCourses(data)
    } catch (error) {
      toast.error('Failed to load courses')
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterCourses = () => {
    let filtered = courses

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(course => course.difficulty === selectedDifficulty)
    }

    setFilteredCourses(filtered)
  }

  const handleEnroll = async (courseId, courseTitle) => {
    try {
      // Simulate enrollment
      toast.success(`Successfully enrolled in ${courseTitle}!`)
    } catch (error) {
      toast.error('Failed to enroll in course')
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100'
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'Advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const categories = ['all', 'Programming', 'Design', 'Business', 'Data Science', 'Marketing']
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced']

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-surface-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-surface-900">LearnFlow</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-surface-600 hover:text-primary transition-colors">Home</Link>
              <Link to="/features" className="text-surface-600 hover:text-primary transition-colors">Features</Link>
              <Link to="/about" className="text-surface-600 hover:text-primary transition-colors">About</Link>
              <Link to="/courses" className="text-primary font-medium">Courses</Link>
              <Link to="/contact" className="text-surface-600 hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-surface-900 mb-4">
            Explore Our <span className="text-gradient">Courses</span>
          </h1>
          <p className="text-xl text-surface-600 max-w-3xl mx-auto">
            Discover thousands of courses from expert instructors and advance your skills
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-card p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-surface-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 rounded-xl border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Levels' : difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-surface-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </motion.div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card p-6 animate-pulse">
                <div className="h-48 bg-surface-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-surface-200 rounded mb-2"></div>
                <div className="h-4 bg-surface-200 rounded w-3/4 mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-surface-200 rounded w-16"></div>
                  <div className="h-6 bg-surface-200 rounded w-20"></div>
                </div>
                <div className="h-10 bg-surface-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover:shadow-soft transform hover:-translate-y-1 transition-all duration-300"
              >
                {/* Course Image */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-4 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary" />
                </div>

                {/* Course Info */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                    <span className="text-xs text-surface-500">{course.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-surface-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-surface-600 text-sm mb-3 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <p className="text-sm font-medium text-surface-700 mb-3">
                    by {course.instructor}
                  </p>
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-surface-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.enrolledStudents}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">${course.price}</span>
                  </div>
                  <button
                    onClick={() => handleEnroll(course.id, course.title)}
                    className="btn-primary flex items-center gap-2 text-sm"
                  >
                    Enroll Now
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="h-16 w-16 text-surface-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-surface-700 mb-2">No courses found</h3>
            <p className="text-surface-500">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Courses