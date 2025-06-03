import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award, BookOpen, CheckCircle, Star, Users, TrendingUp, ArrowRight, Clock } from 'lucide-react'
import Navigation from '../components/Navigation'

const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const certifications = [
    {
      id: 1,
      title: "Web Development Professional",
      category: "development",
      level: "Professional",
      duration: "6 months",
      courses: 12,
      students: "15,000+",
      rating: 4.9,
      description: "Master modern web development with React, Node.js, and cloud deployment.",
      skills: ["React", "Node.js", "JavaScript", "MongoDB", "AWS"],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Data Science Specialist",
      category: "data",
      level: "Specialist",
      duration: "8 months",
      courses: 15,
      students: "12,000+",
      rating: 4.8,
      description: "Become proficient in data analysis, machine learning, and Python programming.",
      skills: ["Python", "Machine Learning", "SQL", "Statistics", "Tableau"],
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Digital Marketing Expert",
      category: "marketing",
      level: "Expert",
      duration: "4 months",
      courses: 10,
      students: "18,000+",
      rating: 4.7,
      description: "Learn comprehensive digital marketing strategies and tools.",
      skills: ["SEO", "Google Ads", "Social Media", "Analytics", "Content Marketing"],
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "UI/UX Design Master",
      category: "design",
      level: "Master",
      duration: "5 months",
      courses: 8,
      students: "10,000+",
      rating: 4.9,
      description: "Create exceptional user experiences with modern design principles.",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 5,
      title: "Cloud Architecture Professional",
      category: "cloud",
      level: "Professional",
      duration: "7 months",
      courses: 14,
      students: "8,000+",
      rating: 4.8,
      description: "Design and implement scalable cloud solutions on AWS and Azure.",
      skills: ["AWS", "Azure", "Docker", "Kubernetes", "DevOps"],
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 6,
      title: "Cybersecurity Specialist",
      category: "security",
      level: "Specialist",
      duration: "6 months",
      courses: 11,
      students: "7,000+",
      rating: 4.9,
      description: "Protect organizations from cyber threats with advanced security techniques.",
      skills: ["Network Security", "Ethical Hacking", "Incident Response", "Risk Assessment", "Compliance"],
      color: "from-red-500 to-red-600"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Certifications' },
    { id: 'development', name: 'Development' },
    { id: 'data', name: 'Data Science' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'design', name: 'Design' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'security', name: 'Security' }
  ]

  const benefits = [
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Our certifications are recognized by leading companies worldwide and validate your expertise."
    },
    {
      icon: TrendingUp,
      title: "Career Advancement",
      description: "Boost your career prospects with credentials that demonstrate your professional skills."
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Learn from industry experts who provide guidance throughout your certification journey."
    },
    {
      icon: CheckCircle,
      title: "Practical Projects",
      description: "Build a portfolio of real-world projects that showcase your abilities to employers."
    }
  ]

  const filteredCertifications = selectedCategory === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
              <Award className="w-4 h-4 mr-2" />
              Professional Certifications
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 mb-6">
              Earn Industry-Recognized 
              <span className="text-gradient block">Certifications</span>
            </h1>
            <p className="text-xl text-surface-600 mb-8 max-w-3xl mx-auto">
              Validate your skills with our comprehensive certification programs. 
              Stand out in your field with credentials that matter to employers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses" className="btn-primary text-lg px-8 py-4">
                Browse Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4">
                View Requirements
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-wrap gap-2 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-white text-surface-700 hover:bg-primary/5 hover:text-primary border border-surface-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {filteredCertifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="bg-white rounded-2xl shadow-card hover:shadow-soft transition-all duration-300 overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className={`h-2 bg-gradient-to-r ${cert.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 bg-gradient-to-r ${cert.color} text-white text-sm font-medium rounded-full`}>
                      {cert.level}
                    </span>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium text-surface-700">{cert.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-surface-900 mb-3 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  
                  <p className="text-surface-600 mb-4 leading-relaxed">
                    {cert.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-sm text-surface-600">{cert.duration}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <BookOpen className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-sm text-surface-600">{cert.courses} courses</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-sm text-surface-600">{cert.students}</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-surface-900 mb-2">Skills you'll gain:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-surface-100 text-surface-700 text-xs rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    to="/courses"
                    className="w-full btn-primary flex items-center justify-center group"
                  >
                    Start Learning
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Why Choose Our Certifications?
            </motion.h2>
            <motion.p 
              className="text-lg text-surface-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our certification programs are designed to give you the skills and recognition you need to advance your career.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-card hover:shadow-soft transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-surface-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-6">
              Ready to Get Certified?
            </h2>
            <p className="text-lg text-surface-600 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have advanced their careers with our industry-recognized certifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses" className="btn-primary text-lg px-8 py-4">
                Browse All Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/contact" className="btn-secondary text-lg px-8 py-4">
                Contact Admissions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Certifications