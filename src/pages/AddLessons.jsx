import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navigation from '../components/Navigation'
import ApperIcon from '../components/ApperIcon'
import { lessonService, courseService } from '../services'
const AddLessons = () => {
  const [lessons, setLessons] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingLesson, setEditingLesson] = useState(null)
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    videoUrl: '',
    duration: '',
    courseId: '',
    order: 1
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [lessonsData, coursesData] = await Promise.all([
        lessonService.getAll(),
        courseService.getAll()
      ])
      setLessons(lessonsData)
      setCourses(coursesData)
    } catch (error) {
      toast.error('Failed to load data')
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setFormLoading(true)
      
      const lessonData = {
        ...formData,
        duration: parseInt(formData.duration) || 0,
        order: parseInt(formData.order) || 1
      }

      if (editingLesson) {
        await lessonService.update(editingLesson.id, lessonData)
        toast.success('Lesson updated successfully!')
      } else {
        await lessonService.create(lessonData)
        toast.success('Lesson created successfully!')
      }

      await loadData()
      resetForm()
    } catch (error) {
      toast.error(editingLesson ? 'Failed to update lesson' : 'Failed to create lesson')
      console.error('Error saving lesson:', error)
    } finally {
      setFormLoading(false)
    }
  }

  const handleEdit = (lesson) => {
    setEditingLesson(lesson)
    setFormData({
      title: lesson.title,
      content: lesson.content,
      videoUrl: lesson.videoUrl || '',
      duration: lesson.duration.toString(),
      courseId: lesson.courseId,
      order: lesson.order || 1
    })
    setShowForm(true)
  }

  const handleDelete = async (lessonId) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) {
      return
    }

    try {
      await lessonService.delete_(lessonId)
      toast.success('Lesson deleted successfully!')
      await loadData()
    } catch (error) {
      toast.error('Failed to delete lesson')
      console.error('Error deleting lesson:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      videoUrl: '',
      duration: '',
      courseId: '',
      order: 1
    })
    setEditingLesson(null)
    setShowForm(false)
  }

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = !selectedCourse || lesson.courseId === selectedCourse
    return matchesSearch && matchesCourse
  })

  const getCourseTitle = (courseId) => {
    const course = courses.find(c => c.id === courseId)
    return course ? course.title : 'Unknown Course'
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-surface-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="GraduationCap" className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-surface-900">LearnFlow</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-surface-600 hover:text-primary transition-colors duration-200 font-medium">
                Home
              </Link>
              <Link to="/features" className="text-surface-600 hover:text-primary transition-colors duration-200 font-medium">
                Features
              </Link>
              <Link to="/about" className="text-surface-600 hover:text-primary transition-colors duration-200 font-medium">
                About
              </Link>
              <Link to="/courses" className="text-surface-600 hover:text-primary transition-colors duration-200 font-medium">
                Courses
              </Link>
              <Link to="/add-lessons" className="text-primary border-b-2 border-primary font-medium">
                Add Lessons
              </Link>
              <Link to="/contact" className="text-surface-600 hover:text-primary transition-colors duration-200 font-medium">
                Contact
              </Link>
            </div>

            <button className="btn-primary text-sm py-2 px-4">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-surface-900 mb-4">
            Lesson Management
          </h1>
          <p className="text-lg text-surface-600 max-w-2xl mx-auto">
            Create, edit, and organize course lessons with ease
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-card border border-surface-100 p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search lessons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>

                {/* Course Filter */}
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="input-field max-w-xs"
                >
                  <option value="">All Courses</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add Lesson Button */}
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <ApperIcon name="Plus" className="w-5 h-5" />
                <span>Add Lesson</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-surface-900">
                    {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-surface-400 hover:text-surface-600 transition-colors"
                  >
                    <ApperIcon name="X" className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Lesson Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Enter lesson title"
                      required
                    />
                  </div>

                  {/* Course Selection */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Course *
                    </label>
                    <select
                      name="courseId"
                      value={formData.courseId}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select a course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Lesson Content *
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      className="input-field h-32 resize-none"
                      placeholder="Enter lesson content and description"
                      required
                    />
                  </div>

                  {/* Video URL */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Video URL
                    </label>
                    <input
                      type="url"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="https://example.com/video.mp4"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="60"
                        min="1"
                      />
                    </div>

                    {/* Order */}
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Lesson Order
                      </label>
                      <input
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="1"
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="btn-primary flex-1 flex items-center justify-center space-x-2"
                    >
                      {formLoading ? (
                        <>
                          <ApperIcon name="Loader2" className="w-5 h-5 animate-spin" />
                          <span>{editingLesson ? 'Updating...' : 'Creating...'}</span>
                        </>
                      ) : (
                        <>
                          <ApperIcon name="Save" className="w-5 h-5" />
                          <span>{editingLesson ? 'Update Lesson' : 'Create Lesson'}</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Lessons List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <ApperIcon name="Loader2" className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
              <p className="text-surface-600">Loading lessons...</p>
            </div>
          ) : filteredLessons.length === 0 ? (
            <div className="text-center py-12">
              <ApperIcon name="BookOpen" className="w-16 h-16 mx-auto text-surface-300 mb-4" />
              <h3 className="text-xl font-semibold text-surface-700 mb-2">No lessons found</h3>
              <p className="text-surface-600 mb-6">
                {searchTerm || selectedCourse 
                  ? 'Try adjusting your search filters'
                  : 'Create your first lesson to get started'
                }
              </p>
              {!searchTerm && !selectedCourse && (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary"
                >
                  Add Your First Lesson
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredLessons.map((lesson) => (
                <div key={lesson.id} className="card p-6 hover:shadow-soft transition-all duration-200">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-surface-900">{lesson.title}</h3>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-lg">
                          Order: {lesson.order || 1}
                        </span>
                      </div>
                      <p className="text-surface-600 mb-2 line-clamp-2">{lesson.content}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-surface-500">
                        <span className="flex items-center space-x-1">
                          <ApperIcon name="BookOpen" className="w-4 h-4" />
                          <span>{getCourseTitle(lesson.courseId)}</span>
                        </span>
                        {lesson.duration && (
                          <span className="flex items-center space-x-1">
                            <ApperIcon name="Clock" className="w-4 h-4" />
                            <span>{lesson.duration} min</span>
                          </span>
                        )}
                        {lesson.videoUrl && (
                          <span className="flex items-center space-x-1">
                            <ApperIcon name="Video" className="w-4 h-4" />
                            <span>Video Available</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(lesson)}
                        className="p-2 text-surface-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="Edit lesson"
                      >
                        <ApperIcon name="Edit2" className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(lesson.id)}
                        className="p-2 text-surface-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete lesson"
                      >
                        <ApperIcon name="Trash2" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddLessons