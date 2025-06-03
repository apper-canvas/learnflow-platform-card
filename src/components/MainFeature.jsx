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

  // Quiz creation form state
  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    timeLimit: '',
    questions: []
  })

  // Current question being created
  const [currentQuestion, setCurrentQuestion] = useState({
    id: '',
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 1
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

  const handleQuizSubmit = async (e) => {
    e.preventDefault()
    
    if (!quizForm.title.trim() || quizForm.questions.length === 0) {
      toast.error('Please fill in quiz title and add at least one question')
      return
    }

    setLoading(true)
    try {
      const newQuiz = {
        ...quizForm,
        timeLimit: parseInt(quizForm.timeLimit) || 30,
        id: `quiz-${Date.now()}`,
        createdAt: new Date().toISOString()
      }

      // In a real app, you would call a quiz service here
      // await quizService.create(newQuiz)
      
      setQuizForm({
        title: '',
        description: '',
        timeLimit: '',
        questions: []
      })
      
      setCurrentQuestion({
        id: '',
        type: 'multiple-choice',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        points: 1
      })
      
      toast.success('Quiz created successfully!')
      setActiveTab('manage')
    } catch (err) {
      setError(err.message)
      toast.error('Failed to create quiz')
    } finally {
      setLoading(false)
    }
  }

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) {
      toast.error('Please enter a question')
      return
    }

    if (currentQuestion.type === 'multiple-choice') {
      const hasEmptyOptions = currentQuestion.options.some(opt => !opt.trim())
      if (hasEmptyOptions) {
        toast.error('Please fill in all answer options')
        return
      }
      if (!currentQuestion.correctAnswer) {
        toast.error('Please select the correct answer')
        return
      }
    }

    if (currentQuestion.type === 'true-false' && !currentQuestion.correctAnswer) {
      toast.error('Please select the correct answer')
      return
    }

    const newQuestion = {
      ...currentQuestion,
      id: `question-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    setQuizForm(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }))

    // Reset current question
    setCurrentQuestion({
      id: '',
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 1
    })

    toast.success('Question added successfully!')
  }

  const removeQuestion = (questionId) => {
    setQuizForm(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }))
    toast.success('Question removed')
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
            { id: 'lessons', label: 'Add Lessons', icon: 'BookOpen' },
            { id: 'quiz', label: 'Create Quiz', icon: 'FileQuestion' },
            { id: 'courses', label: 'Browse Courses', icon: 'BookOpen' }
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

        {/* Quiz Builder Tab */}
        {activeTab === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <ApperIcon name="FileQuestion" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-surface-900">Quiz Builder</h3>
                  <p className="text-surface-600">Create interactive quizzes for your courses</p>
                </div>
              </div>

              <form onSubmit={handleQuizSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Quiz Title *
                    </label>
                    <input
                      type="text"
                      value={quizForm.title}
                      onChange={(e) => setQuizForm(prev => ({ ...prev, title: e.target.value }))}
                      className="input-field"
                      placeholder="Enter quiz title..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Time Limit (minutes)
                    </label>
                    <input
                      type="number"
                      value={quizForm.timeLimit}
                      onChange={(e) => setQuizForm(prev => ({ ...prev, timeLimit: e.target.value }))}
                      className="input-field"
                      placeholder="30"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={quizForm.description}
                    onChange={(e) => setQuizForm(prev => ({ ...prev, description: e.target.value }))}
                    className="input-field min-h-24 resize-none"
                    placeholder="Enter quiz description and instructions..."
                  />
                </div>

                {/* Questions List */}
                {quizForm.questions.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-surface-900">Questions ({quizForm.questions.length})</h4>
                    <div className="space-y-3">
                      {quizForm.questions.map((question, index) => (
                        <div key={question.id} className="p-4 border border-surface-200 rounded-xl">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                                  {question.type.replace('-', ' ').toUpperCase()}
                                </span>
                                <span className="text-xs text-surface-500">{question.points} point{question.points !== 1 ? 's' : ''}</span>
                              </div>
                              <p className="text-surface-900 font-medium mb-2">{question.question}</p>
                              {question.type === 'multiple-choice' && (
                                <div className="space-y-1">
                                  {question.options.map((option, optIndex) => (
                                    <div key={optIndex} className={`text-sm p-2 rounded ${
                                      option === question.correctAnswer ? 'bg-green-50 text-green-700' : 'text-surface-600'
                                    }`}>
                                      {String.fromCharCode(65 + optIndex)}. {option}
                                    </div>
                                  ))}
                                </div>
                              )}
                              {question.type === 'true-false' && (
                                <div className="text-sm text-surface-600">
                                  Correct Answer: <span className="font-medium">{question.correctAnswer}</span>
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeQuestion(question.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <ApperIcon name="Trash2" className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question Builder */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-surface-900 mb-4">Add New Question</h4>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 mb-2">
                          Question Type
                        </label>
                        <select
                          value={currentQuestion.type}
                          onChange={(e) => setCurrentQuestion(prev => ({ 
                            ...prev, 
                            type: e.target.value,
                            options: e.target.value === 'multiple-choice' ? ['', '', '', ''] : [],
                            correctAnswer: ''
                          }))}
                          className="input-field"
                        >
                          <option value="multiple-choice">Multiple Choice</option>
                          <option value="true-false">True/False</option>
                          <option value="short-answer">Short Answer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-surface-700 mb-2">
                          Points
                        </label>
                        <input
                          type="number"
                          value={currentQuestion.points}
                          onChange={(e) => setCurrentQuestion(prev => ({ ...prev, points: parseInt(e.target.value) || 1 }))}
                          className="input-field"
                          min="1"
                          max="10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Question *
                      </label>
                      <textarea
                        value={currentQuestion.question}
                        onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
                        className="input-field min-h-24 resize-none"
                        placeholder="Enter your question..."
                      />
                    </div>

                    {/* Multiple Choice Options */}
                    {currentQuestion.type === 'multiple-choice' && (
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-surface-700">Answer Options</label>
                        {currentQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-surface-600 w-8">
                              {String.fromCharCode(65 + index)}.
                            </span>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...currentQuestion.options]
                                newOptions[index] = e.target.value
                                setCurrentQuestion(prev => ({ ...prev, options: newOptions }))
                              }}
                              className="input-field flex-1"
                              placeholder={`Option ${String.fromCharCode(65 + index)}`}
                            />
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={currentQuestion.correctAnswer === option}
                              onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: option }))}
                              className="w-4 h-4 text-primary"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* True/False Options */}
                    {currentQuestion.type === 'true-false' && (
                      <div>
                        <label className="block text-sm font-medium text-surface-700 mb-2">Correct Answer</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="trueFalse"
                              value="True"
                              checked={currentQuestion.correctAnswer === 'True'}
                              onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                              className="w-4 h-4 text-primary"
                            />
                            <span>True</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="trueFalse"
                              value="False"
                              checked={currentQuestion.correctAnswer === 'False'}
                              onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                              className="w-4 h-4 text-primary"
                            />
                            <span>False</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Short Answer */}
                    {currentQuestion.type === 'short-answer' && (
                      <div>
                        <label className="block text-sm font-medium text-surface-700 mb-2">
                          Sample Answer (for reference)
                        </label>
                        <input
                          type="text"
                          value={currentQuestion.correctAnswer}
                          onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                          className="input-field"
                          placeholder="Enter a sample correct answer..."
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={addQuestion}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <ApperIcon name="Plus" className="w-4 h-4" />
                      <span>Add Question</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="text-sm text-surface-600">
                    {quizForm.questions.length} question{quizForm.questions.length !== 1 ? 's' : ''} added
                  </div>
                  <button
                    type="submit"
                    disabled={loading || quizForm.questions.length === 0}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <ApperIcon name="FileQuestion" className="w-5 h-5" />
                        <span>Create Quiz</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <motion.div
            key="courses"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-surface-900 mb-2">Featured Courses</h3>
              <p className="text-surface-600">Discover our most popular learning experiences</p>
            </div>

            {loading ? (
              <div className="card p-8 text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-surface-600">Loading courses...</p>
              </div>
            ) : error ? (
              <div className="card p-8 text-center">
                <ApperIcon name="AlertTriangle" className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <p className="text-surface-600">Unable to load courses. Please try again later.</p>
</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses?.map((course, index) => (
                  <motion.div
                    key={course?.id || index}
                    className="card overflow-hidden group hover:shadow-neu-light dark:hover:shadow-neu-dark"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-surface-800 px-3 py-1 rounded-lg text-sm font-medium">
                          {course?.category || 'General'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <ApperIcon 
                              key={i} 
                              name="Star" 
                              className={`w-4 h-4 ${i < Math.floor(course?.rating || 4) ? 'text-secondary fill-current' : 'text-surface-300'}`} 
                            />
                          ))}
                          <span className="text-sm text-surface-600 ml-2">
                            {course?.rating || 4.5}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          ${course?.price || 99}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2 line-clamp-2">
                        {course?.title || 'Course Title'}
                      </h3>
                      
                      <p className="text-surface-600 dark:text-surface-400 text-sm mb-4 line-clamp-3">
                        {course?.description || 'Course description goes here...'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-surface-500">
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="Users" className="w-4 h-4" />
                            <span>{course?.enrollmentCount || 0}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="BookOpen" className="w-4 h-4" />
                            <span>{course?.lessons?.length || 0} lessons</span>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => {
                            setSelectedCourse(course)
                            setShowPreview(true)
                          }}
                          className="text-primary hover:text-primary-dark font-medium text-sm transition-colors"
                        >
                          Learn More
                        </button>
                      </div>
</div>
                  </motion.div>
                ))}
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