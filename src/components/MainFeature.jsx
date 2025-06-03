import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import * as courseService from '../services/api/courseService'
import * as lessonService from '../services/api/lessonService'

const MainFeature = () => {
  const [courses, setCourses] = useState([])
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('create')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showPreview, setShowPreview] = useState(false)

  // Course creation form state
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    lessons: []
  })

  // Lesson creation form state
  const [lessonForm, setLessonForm] = useState({
    title: '',
    content: '',
    duration: '',
    videoUrl: ''
  })

  const categories = [
    'Programming', 'Design', 'Business', 'Marketing', 'Data Science', 
    'Personal Development', 'Photography', 'Music', 'Language', 'Health'
  ]

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [coursesResult, lessonsResult] = await Promise.all([
          courseService.getAll(),
          lessonService.getAll()
        ])
        setCourses(coursesResult || [])
        setLessons(lessonsResult || [])
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleCourseSubmit = async (e) => {
    e.preventDefault()
    
    if (!courseForm.title.trim() || !courseForm.description.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const newCourse = {
        ...courseForm,
        price: parseFloat(courseForm.price) || 0,
        instructorId: 'instructor-1',
        enrollmentCount: 0,
        rating: 4.5,
        createdAt: new Date().toISOString()
      }

      const createdCourse = await courseService.create(newCourse)
      setCourses(prev => [createdCourse, ...prev])
      setCourseForm({
        title: '',
        description: '',
        category: '',
        price: '',
        lessons: []
      })
      
      toast.success('Course created successfully!')
      setActiveTab('manage')
    } catch (err) {
      setError(err.message)
      toast.error('Failed to create course')
    } finally {
      setLoading(false)
    }
  }

  const handleLessonSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedCourse || !lessonForm.title.trim()) {
      toast.error('Please select a course and enter lesson title')
      return
    }

    setLoading(true)
    try {
      const newLesson = {
        ...lessonForm,
        courseId: selectedCourse.id,
        duration: parseInt(lessonForm.duration) || 0,
        order: lessons.filter(l => l.courseId === selectedCourse.id).length + 1,
        assignments: []
      }

      const createdLesson = await lessonService.create(newLesson)
      setLessons(prev => [...prev, createdLesson])
      setLessonForm({
        title: '',
        content: '',
        duration: '',
        videoUrl: ''
      })
      
      toast.success('Lesson added successfully!')
    } catch (err) {
      setError(err.message)
      toast.error('Failed to create lesson')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCourse = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return

    setLoading(true)
    try {
      await courseService.delete(courseId)
      setCourses(prev => prev.filter(c => c.id !== courseId))
      toast.success('Course deleted successfully!')
    } catch (err) {
      setError(err.message)
      toast.error('Failed to delete course')
    } finally {
      setLoading(false)
    }
  }

  const CourseCard = ({ course }) => {
    const courseLessons = lessons.filter(l => l.courseId === course.id) || []
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="card p-6 group hover:shadow-neu-light transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-surface-900 mb-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <p className="text-surface-600 text-sm line-clamp-2 mb-3">
              {course.description}
            </p>
            <div className="flex items-center space-x-4 text-xs text-surface-500">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-lg">
                {course.category}
              </span>
              <span>${course.price}</span>
              <span>{courseLessons.length} lessons</span>
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => {
                setSelectedCourse(course)
                setShowPreview(true)
              }}
              className="p-2 text-surface-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <ApperIcon name="Eye" className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteCourse(course.id)}
              className="p-2 text-surface-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
            </button>
          </div>
        </div>
        
<div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="User" className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-surface-600">Instructor</span>
          </div>
          <button
            onClick={() => {
              setSelectedCourse(course)
              setActiveTab('lessons')
            }}
            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Add Lessons
          </button>
        </div>
      </motion.div>
    )
  }
  return (
    <div className="max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-8">
        <div className="bg-surface-100 p-2 rounded-2xl flex space-x-2">
          {[
            { id: 'create', label: 'Create Course', icon: 'Plus' },
            { id: 'manage', label: 'Manage Courses', icon: 'Settings' },
            { id: 'lessons', label: 'Add Lessons', icon: 'BookOpen' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-primary shadow-card'
                  : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              <ApperIcon name={tab.icon} className="w-5 h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Create Course Tab */}
        {activeTab === 'create' && (
          <motion.div
            key="create"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Plus" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-surface-900">Create New Course</h3>
                <p className="text-surface-600">Build an engaging learning experience</p>
              </div>
            </div>

            <form onSubmit={handleCourseSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                    placeholder="Enter course title..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Category
                  </label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, category: e.target.value }))}
                    className="input-field"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                  className="input-field min-h-32 resize-none"
                  placeholder="Describe what students will learn..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={courseForm.price}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, price: e.target.value }))}
                    className="input-field"
                    placeholder="99.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Plus" className="w-5 h-5" />
                        <span>Create Course</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* Manage Courses Tab */}
        {activeTab === 'manage' && (
          <motion.div
            key="manage"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-surface-900 mb-2">Course Management</h3>
              <p className="text-surface-600">Manage your created courses and track performance</p>
            </div>

            {loading ? (
              <div className="card p-8 text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-surface-600">Loading courses...</p>
              </div>
            ) : error ? (
              <div className="card p-8 text-center">
                <ApperIcon name="AlertTriangle" className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <p className="text-surface-600">Unable to load courses</p>
              </div>
            ) : courses.length === 0 ? (
              <div className="card p-8 text-center">
                <ApperIcon name="BookOpen" className="w-12 h-12 text-surface-400 mx-auto mb-4" />
                <p className="text-surface-600 mb-4">No courses created yet</p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="btn-primary"
                >
                  Create Your First Course
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnimatePresence>
                  {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}

        {/* Add Lessons Tab */}
        {activeTab === 'lessons' && (
          <motion.div
            key="lessons"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Course Selection */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-surface-900 mb-4">Select Course</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedCourse?.id === course.id
                        ? 'border-primary bg-primary/5'
                        : 'border-surface-200 hover:border-surface-300'
                    }`}
                  >
                    <h4 className="font-medium text-surface-900 mb-1">{course.title}</h4>
                    <p className="text-sm text-surface-600">{course.category}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Lesson Creation Form */}
            {selectedCourse && (
              <div className="card p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center">
                    <ApperIcon name="BookOpen" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-surface-900">Add Lesson</h3>
                    <p className="text-surface-600">Course: {selectedCourse.title}</p>
                  </div>
                </div>

                <form onSubmit={handleLessonSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Lesson Title *
                      </label>
                      <input
                        type="text"
                        value={lessonForm.title}
                        onChange={(e) => setLessonForm(prev => ({ ...prev, title: e.target.value }))}
                        className="input-field"
                        placeholder="Enter lesson title..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={lessonForm.duration}
                        onChange={(e) => setLessonForm(prev => ({ ...prev, duration: e.target.value }))}
                        className="input-field"
                        placeholder="30"
                        min="1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Video URL
                    </label>
                    <input
                      type="url"
                      value={lessonForm.videoUrl}
                      onChange={(e) => setLessonForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                      className="input-field"
                      placeholder="https://example.com/video.mp4"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Lesson Content
                    </label>
                    <textarea
                      value={lessonForm.content}
                      onChange={(e) => setLessonForm(prev => ({ ...prev, content: e.target.value }))}
                      className="input-field min-h-32 resize-none"
                      placeholder="Enter lesson content, notes, or learning objectives..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Plus" className="w-5 h-5" />
                        <span>Add Lesson</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Course Preview Modal */}
      <AnimatePresence>
        {showPreview && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-surface-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-surface-900">Course Preview</h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 flex items-center justify-center">
                  <ApperIcon name="Play" className="w-16 h-16 text-primary" />
                </div>

                <h4 className="text-xl font-bold text-surface-900 mb-4">{selectedCourse.title}</h4>
                <p className="text-surface-600 mb-6">{selectedCourse.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-surface-50 rounded-xl">
                    <div className="text-2xl font-bold text-primary">${selectedCourse.price}</div>
                    <div className="text-sm text-surface-600">Price</div>
                  </div>
                  <div className="text-center p-4 bg-surface-50 rounded-xl">
                    <div className="text-2xl font-bold text-secondary">
                      {lessons.filter(l => l.courseId === selectedCourse.id).length}
                    </div>
                    <div className="text-sm text-surface-600">Lessons</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold text-surface-900">Lessons:</h5>
                  {lessons.filter(l => l.courseId === selectedCourse.id).map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center space-x-3 p-3 bg-surface-50 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-surface-900">{lesson.title}</div>
                        {lesson.duration && (
                          <div className="text-sm text-surface-600">{lesson.duration} minutes</div>
                        )}
                      </div>
                    </div>
                  ))}
                  {lessons.filter(l => l.courseId === selectedCourse.id).length === 0 && (
                    <p className="text-surface-500 italic">No lessons added yet</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature