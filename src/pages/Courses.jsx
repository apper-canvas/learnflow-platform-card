import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { Search, Filter, BookOpen, Clock, Users, Star, ChevronRight, GraduationCap } from 'lucide-react'
import Navigation from '../components/Navigation'
import * as courseService from '../services/api/courseService'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    previousEducation: '',
    learningGoals: '',
    termsAccepted: false
  })
  const [formErrors, setFormErrors] = useState({})
  const [enrolling, setEnrolling] = useState(false)

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

  const handleEnroll = (course) => {
    setSelectedCourse(course)
    setShowEnrollModal(true)
    // Reset form data
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelation: '',
      previousEducation: '',
      learningGoals: '',
      termsAccepted: false
    })
    setFormErrors({})
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email format is invalid'
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required'
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required'
    if (!formData.address.trim()) errors.address = 'Address is required'
    if (!formData.city.trim()) errors.city = 'City is required'
    if (!formData.state.trim()) errors.state = 'State is required'
    if (!formData.zipCode.trim()) errors.zipCode = 'ZIP code is required'
    if (!formData.country.trim()) errors.country = 'Country is required'
    if (!formData.emergencyContactName.trim()) errors.emergencyContactName = 'Emergency contact name is required'
    if (!formData.emergencyContactPhone.trim()) errors.emergencyContactPhone = 'Emergency contact phone is required'
    if (!formData.emergencyContactRelation.trim()) errors.emergencyContactRelation = 'Emergency contact relation is required'
    if (!formData.termsAccepted) errors.termsAccepted = 'You must accept the terms and conditions'

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly')
      return
    }

    setEnrolling(true)
    
    try {
      const enrollmentData = {
        courseId: selectedCourse.id,
        courseName: selectedCourse.title,
        instructor: selectedCourse.instructor,
        price: selectedCourse.price,
        ...formData,
        enrollmentDate: new Date().toISOString()
      }
      
      // Use enrollment service to create enrollment
      await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData)
      })
      
      toast.success(`Successfully enrolled in ${selectedCourse.title}!`)
      setShowEnrollModal(false)
      setSelectedCourse(null)
    } catch (error) {
      console.error('Enrollment error:', error)
      toast.error('Failed to complete enrollment. Please try again.')
    } finally {
      setEnrolling(false)
    }
  }

  const closeModal = () => {
    setShowEnrollModal(false)
    setSelectedCourse(null)
    setFormErrors({})
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
      <Navigation />
      
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
                    onClick={() => handleEnroll(course)}
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

      {/* Enrollment Modal */}
      {showEnrollModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Enroll in Course</h2>
                  <h3 className="text-lg opacity-90">{selectedCourse.title}</h3>
                  <p className="text-sm opacity-75">by {selectedCourse.instructor}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white/80 hover:text-white text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <form onSubmit={handleFormSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h4 className="text-lg font-semibold text-surface-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.firstName ? 'border-red-500' : ''}`}
                        placeholder="Enter your first name"
                      />
                      {formErrors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.lastName ? 'border-red-500' : ''}`}
                        placeholder="Enter your last name"
                      />
                      {formErrors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.email ? 'border-red-500' : ''}`}
                        placeholder="Enter your email address"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.phone ? 'border-red-500' : ''}`}
                        placeholder="Enter your phone number"
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.dateOfBirth ? 'border-red-500' : ''}`}
                      />
                      {formErrors.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.dateOfBirth}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h4 className="text-lg font-semibold text-surface-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    Address Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.address ? 'border-red-500' : ''}`}
                        placeholder="Enter your street address"
                      />
                      {formErrors.address && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.city ? 'border-red-500' : ''}`}
                        placeholder="Enter your city"
                      />
                      {formErrors.city && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.state ? 'border-red-500' : ''}`}
                        placeholder="Enter your state/province"
                      />
                      {formErrors.state && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        ZIP/Postal Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.zipCode ? 'border-red-500' : ''}`}
                        placeholder="Enter your ZIP/postal code"
                      />
                      {formErrors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.country ? 'border-red-500' : ''}`}
                        placeholder="Enter your country"
                      />
                      {formErrors.country && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h4 className="text-lg font-semibold text-surface-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    Emergency Contact
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.emergencyContactName ? 'border-red-500' : ''}`}
                        placeholder="Emergency contact name"
                      />
                      {formErrors.emergencyContactName && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.emergencyContactName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        name="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.emergencyContactPhone ? 'border-red-500' : ''}`}
                        placeholder="Emergency contact phone"
                      />
                      {formErrors.emergencyContactPhone && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.emergencyContactPhone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Relationship *
                      </label>
                      <select
                        name="emergencyContactRelation"
                        value={formData.emergencyContactRelation}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.emergencyContactRelation ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select relationship</option>
                        <option value="parent">Parent</option>
                        <option value="spouse">Spouse</option>
                        <option value="sibling">Sibling</option>
                        <option value="friend">Friend</option>
                        <option value="other">Other</option>
                      </select>
                      {formErrors.emergencyContactRelation && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.emergencyContactRelation}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h4 className="text-lg font-semibold text-surface-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    Additional Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Previous Education/Experience
                      </label>
                      <textarea
                        name="previousEducation"
                        value={formData.previousEducation}
                        onChange={handleInputChange}
                        rows="3"
                        className="input-field"
                        placeholder="Describe your relevant educational background or experience..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Learning Goals
                      </label>
                      <textarea
                        name="learningGoals"
                        value={formData.learningGoals}
                        onChange={handleInputChange}
                        rows="3"
                        className="input-field"
                        placeholder="What do you hope to achieve from this course?"
                      />
                    </div>
                  </div>
                </div>

                {/* Course Summary */}
                <div className="bg-surface-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-surface-900 mb-4">Enrollment Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-surface-600">Course:</span>
                      <span className="font-medium">{selectedCourse.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-600">Instructor:</span>
                      <span className="font-medium">{selectedCourse.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-600">Duration:</span>
                      <span className="font-medium">{selectedCourse.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-600">Difficulty:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedCourse.difficulty)}`}>
                        {selectedCourse.difficulty}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Price:</span>
                        <span className="text-primary">${selectedCourse.price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                    <span className="text-sm text-surface-600">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>. I understand that enrollment fees are non-refundable after 7 days. *
                    </span>
                  </label>
                  {formErrors.termsAccepted && (
                    <p className="text-red-500 text-sm mt-1 ml-6">{formErrors.termsAccepted}</p>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn-secondary flex-1"
                    disabled={enrolling}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                    disabled={enrolling}
                  >
                    {enrolling ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Enrollment
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Courses