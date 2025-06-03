import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Navigation from '../components/Navigation'
import {
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle, 
  XCircle, 
  BarChart3, 
  Trophy, 
  Timer,
  ChevronLeft,
  ChevronRight,
  Play,
  Filter,
  Search,
  Brain,
  Target,
  Zap
} from 'lucide-react'

const Quiz = () => {
  const navigate = useNavigate()
  
  // State management
  const [activeView, setActiveView] = useState('browse') // browse, taking, results
  const [quizzes, setQuizzes] = useState([])
  const [filteredQuizzes, setFilteredQuizzes] = useState([])
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [loading, setLoading] = useState(false)

  // Mock quiz data
  const mockQuizzes = [
    {
      id: 'quiz-1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and control structures.',
      subject: 'Programming',
      difficulty: 'Beginner',
      duration: 15, // minutes
      questionsCount: 10,
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          type: 'multiple',
          question: 'What is the correct way to declare a variable in JavaScript?',
          options: ['var x = 5;', 'variable x = 5;', 'v x = 5;', 'declare x = 5;'],
          correctAnswer: 0
        },
        {
          id: 'q2',
          type: 'multiple',
          question: 'Which of the following is NOT a JavaScript data type?',
          options: ['String', 'Boolean', 'Integer', 'Object'],
          correctAnswer: 2
        },
        {
          id: 'q3',
          type: 'boolean',
          question: 'JavaScript is a case-sensitive language.',
          correctAnswer: true
        }
      ]
    },
    {
      id: 'quiz-2',
      title: 'React Components',
      description: 'Advanced quiz covering React component lifecycle, hooks, and state management.',
      subject: 'Programming',
      difficulty: 'Advanced',
      duration: 25,
      questionsCount: 15,
      passingScore: 80,
      questions: [
        {
          id: 'q1',
          type: 'multiple',
          question: 'What hook is used for managing component state in functional components?',
          options: ['useEffect', 'useState', 'useContext', 'useReducer'],
          correctAnswer: 1
        },
        {
          id: 'q2',
          type: 'boolean',
          question: 'useEffect runs after every render by default.',
          correctAnswer: true
        }
      ]
    },
    {
      id: 'quiz-3',
      title: 'CSS Grid & Flexbox',
      description: 'Master modern CSS layout techniques with Grid and Flexbox.',
      subject: 'Design',
      difficulty: 'Intermediate',
      duration: 20,
      questionsCount: 12,
      passingScore: 75,
      questions: [
        {
          id: 'q1',
          type: 'multiple',
          question: 'Which CSS property is used to create a grid container?',
          options: ['display: flex;', 'display: grid;', 'grid-template;', 'flex-container;'],
          correctAnswer: 1
        }
      ]
    }
  ]

  // Initialize data
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setQuizzes(mockQuizzes)
      setFilteredQuizzes(mockQuizzes)
      setLoading(false)
    }, 500)
  }, [])

  // Filter quizzes based on search and filters
  useEffect(() => {
    let filtered = quizzes.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSubject = selectedSubject === 'all' || quiz.subject === selectedSubject
      const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty
      
      return matchesSearch && matchesSubject && matchesDifficulty
    })
    setFilteredQuizzes(filtered)
  }, [searchTerm, selectedSubject, selectedDifficulty, quizzes])

  // Timer effect
  useEffect(() => {
    let interval = null
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            handleQuizSubmit()
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [quizStarted, quizCompleted, timeRemaining])

  // Start quiz
  const handleStartQuiz = (quiz) => {
    setCurrentQuiz(quiz)
    setCurrentQuestion(0)
    setAnswers({})
    setTimeRemaining(quiz.duration * 60) // Convert to seconds
    setQuizStarted(true)
    setQuizCompleted(false)
    setActiveView('taking')
    toast.info(`Quiz "${quiz.title}" started! Good luck!`)
  }

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  // Navigate questions
  const handleNextQuestion = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  // Calculate score
  const calculateScore = () => {
    let correctAnswers = 0
    currentQuiz.questions.forEach(question => {
      const userAnswer = answers[question.id]
      if (userAnswer === question.correctAnswer) {
        correctAnswers++
      }
    })
    return Math.round((correctAnswers / currentQuiz.questions.length) * 100)
  }

  // Submit quiz
  const handleQuizSubmit = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setQuizCompleted(true)
    setQuizStarted(false)
    setActiveView('results')
    
    if (finalScore >= currentQuiz.passingScore) {
      toast.success(`Congratulations! You passed with ${finalScore}%!`)
    } else {
      toast.warning(`Quiz completed. Score: ${finalScore}%. Passing score: ${currentQuiz.passingScore}%`)
    }
  }

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100'
      case 'Intermediate': return 'text-orange-600 bg-orange-100'
      case 'Advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // Quiz Browse View
  const QuizBrowseView = () => (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Quiz Center</h1>
          </div>
          <p className="text-xl text-surface-600 max-w-2xl mx-auto">
            Test your knowledge and track your progress with our comprehensive quiz system
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-soft p-6 mb-8"
        >
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="input-field"
            >
              <option value="all">All Subjects</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Mathematics">Mathematics</option>
            </select>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="input-field"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            
            <button className="btn-primary flex items-center justify-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </motion.div>

        {/* Quiz Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-surface-600">Loading quizzes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover:shadow-soft transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">{quiz.title}</h3>
                <p className="text-surface-600 text-sm mb-4 line-clamp-2">{quiz.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-surface-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {quiz.duration} minutes
                  </div>
                  <div className="flex items-center text-sm text-surface-600">
                    <Target className="w-4 h-4 mr-2" />
                    {quiz.questionsCount} questions
                  </div>
                  <div className="flex items-center text-sm text-surface-600">
                    <Award className="w-4 h-4 mr-2" />
                    Passing: {quiz.passingScore}%
                  </div>
                </div>
                
                <button
                  onClick={() => handleStartQuiz(quiz)}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Quiz
                </button>
              </motion.div>
            ))}
          </div>
        )}
        
        {!loading && filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-surface-600 mb-2">No quizzes found</h3>
            <p className="text-surface-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )

  // Quiz Taking View
  const QuizTakingView = () => {
    const question = currentQuiz?.questions[currentQuestion]
    const progress = ((currentQuestion + 1) / currentQuiz?.questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Quiz Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-soft p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-foreground">{currentQuiz?.title}</h1>
              <div className="flex items-center bg-red-50 text-red-600 px-4 py-2 rounded-lg">
                <Timer className="w-5 h-5 mr-2" />
                <span className="font-mono text-lg font-bold">{formatTime(timeRemaining)}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-surface-600 mb-2">
                <span>Question {currentQuestion + 1} of {currentQuiz?.questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-surface-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-soft p-8 mb-6"
          >
            <h2 className="text-xl font-semibold text-foreground mb-6">
              {question?.question}
            </h2>

            {question?.type === 'multiple' ? (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      answers[question.id] === index
                        ? 'border-primary bg-primary/5'
                        : 'border-surface-200 hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={index}
                      checked={answers[question.id] === index}
                      onChange={() => handleAnswerSelect(question.id, index)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      answers[question.id] === index
                        ? 'border-primary bg-primary'
                        : 'border-surface-300'
                    }`}>
                      {answers[question.id] === index && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="text-surface-700">{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <label
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    answers[question.id] === true
                      ? 'border-green-500 bg-green-50'
                      : 'border-surface-200 hover:border-green-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    checked={answers[question.id] === true}
                    onChange={() => handleAnswerSelect(question.id, true)}
                    className="sr-only"
                  />
                  <CheckCircle className={`w-5 h-5 mr-3 ${
                    answers[question.id] === true ? 'text-green-500' : 'text-surface-300'
                  }`} />
                  <span className="text-surface-700">True</span>
                </label>
                
                <label
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    answers[question.id] === false
                      ? 'border-red-500 bg-red-50'
                      : 'border-surface-200 hover:border-red-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    checked={answers[question.id] === false}
                    onChange={() => handleAnswerSelect(question.id, false)}
                    className="sr-only"
                  />
                  <XCircle className={`w-5 h-5 mr-3 ${
                    answers[question.id] === false ? 'text-red-500' : 'text-surface-300'
                  }`} />
                  <span className="text-surface-700">False</span>
                </label>
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentQuestion === 0
                  ? 'bg-surface-100 text-surface-400 cursor-not-allowed'
                  : 'btn-secondary'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {currentQuestion === currentQuiz?.questions.length - 1 ? (
              <button
                onClick={handleQuizSubmit}
                className="btn-primary flex items-center"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="btn-primary flex items-center"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Quiz Results View
  const QuizResultsView = () => {
    const correctAnswers = currentQuiz?.questions.filter(q => answers[q.id] === q.correctAnswer).length || 0
    const totalQuestions = currentQuiz?.questions.length || 0
    const passed = score >= currentQuiz?.passingScore

    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              passed ? 'bg-green-100' : 'bg-orange-100'
            }`}>
              {passed ? (
                <Trophy className="w-10 h-10 text-green-600" />
              ) : (
                <Target className="w-10 h-10 text-orange-600" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {passed ? 'Congratulations!' : 'Good Effort!'}
            </h1>
            <p className="text-xl text-surface-600">
              {passed ? 'You passed the quiz!' : 'Keep practicing to improve your score'}
            </p>
          </motion.div>

          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-soft p-8 mb-6"
          >
            <div className="text-center mb-6">
              <div className={`text-6xl font-bold mb-2 ${
                passed ? 'text-green-600' : 'text-orange-600'
              }`}>
                {score}%
              </div>
              <p className="text-surface-600">Your Score</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{correctAnswers}</div>
                <p className="text-surface-600">Correct</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">{totalQuestions - correctAnswers}</div>
                <p className="text-surface-600">Incorrect</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{currentQuiz?.passingScore}%</div>
                <p className="text-surface-600">Passing Score</p>
              </div>
            </div>
          </motion.div>

          {/* Question Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-soft p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Question Review
            </h2>
            
            <div className="space-y-4">
              {currentQuiz?.questions.map((question, index) => {
                const userAnswer = answers[question.id]
                const isCorrect = userAnswer === question.correctAnswer
                
                return (
                  <div key={question.id} className="border border-surface-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground">
                        Question {index + 1}: {question.question}
                      </h3>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      )}
                    </div>
                    
                    {question.type === 'multiple' ? (
                      <div className="text-sm text-surface-600">
                        <p>Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {question.options[userAnswer] || 'Not answered'}
                        </span></p>
                        {!isCorrect && (
                          <p>Correct answer: <span className="text-green-600">
                            {question.options[question.correctAnswer]}
                          </span></p>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-surface-600">
                        <p>Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {userAnswer !== undefined ? userAnswer.toString() : 'Not answered'}
                        </span></p>
                        {!isCorrect && (
                          <p>Correct answer: <span className="text-green-600">
                            {question.correctAnswer.toString()}
                          </span></p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveView('browse')}
              className="btn-secondary flex items-center justify-center"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Browse More Quizzes
            </button>
            <button
              onClick={() => handleStartQuiz(currentQuiz)}
              className="btn-primary flex items-center justify-center"
            >
              <Zap className="w-4 h-4 mr-2" />
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render appropriate view
  const renderCurrentView = () => {
    switch (activeView) {
      case 'taking':
        return <QuizTakingView />
      case 'results':
        return <QuizResultsView />
      default:
        return <QuizBrowseView />
    }
  }
}

  return (
    <div>
      <Navigation />
      <AnimatePresence mode="wait">
        {renderCurrentView()}
      </AnimatePresence>
    </div>
  )
}