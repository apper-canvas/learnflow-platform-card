import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'
import Navigation from '../components/Navigation'

const Instructors = () => {
  const instructors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      expertise: "Machine Learning & AI",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      students: 12500,
      courses: 18,
      rating: 4.9,
      specializations: ["Deep Learning", "Neural Networks", "Computer Vision", "NLP"],
      experience: "10+ years",
      education: "PhD in Computer Science, Stanford University"
    },
    {
      id: 2,
      name: "Prof. Michael Rodriguez",
      expertise: "Web Development & JavaScript",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      students: 15200,
      courses: 24,
      rating: 4.8,
      specializations: ["React", "Node.js", "TypeScript", "Full Stack"],
      experience: "12+ years",
      education: "MS in Software Engineering, MIT"
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      expertise: "Data Science & Analytics",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      students: 9800,
      courses: 16,
      rating: 4.9,
      specializations: ["Python", "R", "Statistics", "Machine Learning"],
      experience: "8+ years",
      education: "PhD in Statistics, Harvard University"
    },
    {
      id: 4,
      name: "James Wilson",
      expertise: "Mobile Development & Flutter",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      students: 8500,
      courses: 12,
      rating: 4.7,
      specializations: ["Flutter", "Dart", "iOS", "Android"],
      experience: "7+ years",
      education: "BS in Computer Science, UC Berkeley"
    },
    {
      id: 5,
      name: "Dr. Lisa Park",
      expertise: "Cybersecurity & Ethical Hacking",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
      students: 6200,
      courses: 10,
      rating: 4.8,
      specializations: ["Penetration Testing", "Network Security", "Cryptography", "Compliance"],
      experience: "9+ years",
      education: "PhD in Cybersecurity, CMU"
    },
    {
      id: 6,
      name: "David Kumar",
      expertise: "Cloud Computing & DevOps",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      students: 11300,
      courses: 20,
      rating: 4.9,
      specializations: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      experience: "11+ years",
      education: "MS in Cloud Computing, Georgia Tech"
    }
  ]

  const teamStats = [
    { label: "Expert Instructors", value: "500+", icon: "Users" },
    { label: "Years Combined Experience", value: "2000+", icon: "Clock" },
    { label: "Students Taught", value: "50K+", icon: "GraduationCap" },
    { label: "Average Rating", value: "4.8", icon: "Star" }
  ]

  const expertiseAreas = [
    { name: "Web Development", instructors: 45, icon: "Code" },
    { name: "Data Science", instructors: 38, icon: "BarChart3" },
    { name: "Machine Learning", instructors: 32, icon: "Brain" },
    { name: "Mobile Development", instructors: 28, icon: "Smartphone" },
    { name: "Cybersecurity", instructors: 25, icon: "Shield" },
    { name: "Cloud Computing", instructors: 35, icon: "Cloud" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Meet Our <span className="text-gradient">Expert Instructors</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-surface-600 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Learn from industry professionals and academic experts who bring real-world experience and cutting-edge knowledge to every course.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-50">
        <div className="container mx-auto">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {teamStats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-surface-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-surface-600 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Instructors */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Featured Instructors
            </motion.h2>
            <motion.p 
              className="text-lg text-surface-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Get to know some of our top-rated instructors who are making a difference in students' lives worldwide.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {instructors.map((instructor, index) => (
              <motion.div
                key={instructor.id}
                className="card p-6 hover:shadow-soft transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="text-center mb-6">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-surface-900 mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    {instructor.expertise}
                  </p>
                  <p className="text-sm text-surface-600 mb-4">
                    {instructor.education}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <div className="text-lg font-semibold text-surface-900">
                      {instructor.students.toLocaleString()}
                    </div>
                    <div className="text-xs text-surface-600">Students</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-surface-900">
                      {instructor.courses}
                    </div>
                    <div className="text-xs text-surface-600">Courses</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-surface-900 flex items-center justify-center">
                      <ApperIcon name="Star" className="w-4 h-4 text-yellow-500 mr-1" />
                      {instructor.rating}
                    </div>
                    <div className="text-xs text-surface-600">Rating</div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-surface-600 mb-2">Specializations:</p>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specializations.slice(0, 3).map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                    {instructor.specializations.length > 3 && (
                      <span className="px-2 py-1 bg-surface-100 text-surface-600 text-xs rounded-full">
                        +{instructor.specializations.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-sm text-surface-600">
                  <p className="flex items-center">
                    <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
                    {instructor.experience} experience
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Areas of Expertise
            </motion.h2>
            <motion.p 
              className="text-lg text-surface-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our instructors cover a wide range of technology and business domains to meet diverse learning needs.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={index}
                className="card p-6 text-center hover:shadow-soft transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={area.icon} className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">
                  {area.name}
                </h3>
                <p className="text-surface-600">
                  {area.instructors} Expert Instructors
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Learn from the Best?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join thousands of students who are already learning from our world-class instructors.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/courses" className="bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:bg-surface-50 transition-colors">
              Browse Courses
            </Link>
            <Link to="/register" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-primary transition-colors">
              Start Learning Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <ApperIcon name="GraduationCap" className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">LearnFlow</span>
              </Link>
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
                <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/certifications" className="hover:text-white transition-colors">Certifications</Link></li>
                <li><Link to="/enterprise" className="hover:text-white transition-colors">Enterprise</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-surface-300">
                <li><Link to="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
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

export default Instructors