import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const About = () => {
  const teamStats = [
    { label: "Team Members", value: "150+", icon: "Users" },
    { label: "Years Experience", value: "10+", icon: "Calendar" },
    { label: "Countries", value: "25+", icon: "Globe" },
    { label: "Projects Delivered", value: "500+", icon: "Award" }
  ]

  const values = [
    {
      icon: "Target",
      title: "Innovation",
      description: "We constantly push the boundaries of educational technology to create better learning experiences."
    },
    {
      icon: "Users",
      title: "Accessibility",
      description: "Making quality education accessible to learners worldwide, regardless of their background or location."
    },
    {
      icon: "Shield",
      title: "Quality",
      description: "We maintain the highest standards in content creation, platform security, and user experience."
    },
    {
      icon: "Heart",
      title: "Community",
      description: "Building a supportive global community where learners and educators can thrive together."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20 bg-learning-pattern">
      {/* Navigation */}
      <nav className="bg-glass fixed top-0 left-0 right-0 z-50 border-b border-surface-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="GraduationCap" className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">LearnFlow</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-surface-600 hover:text-primary transition-colors">Home</Link>
              <Link to="/features" className="text-surface-600 hover:text-primary transition-colors">Features</Link>
              <Link to="/about" className="text-surface-600 hover:text-primary transition-colors font-medium text-primary">About</Link>
              <Link to="/contact" className="text-surface-600 hover:text-primary transition-colors">Contact</Link>
            </div>

            <Link to="/" className="btn-primary text-sm py-2 px-4">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

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
              About <span className="text-gradient">LearnFlow</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-surface-600 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We're transforming education through innovative technology, creating opportunities for millions of learners worldwide to achieve their goals and unlock their potential.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-surface-600 mb-6 leading-relaxed">
                At LearnFlow, we believe that education is the key to unlocking human potential. Our mission is to democratize access to high-quality education by creating an innovative, engaging, and accessible learning platform that serves learners of all backgrounds and skill levels.
              </p>
              <p className="text-lg text-surface-600 mb-6 leading-relaxed">
                We combine cutting-edge technology with proven educational methodologies to deliver personalized learning experiences that adapt to each student's unique needs, pace, and learning style.
              </p>
              <p className="text-lg text-surface-600 leading-relaxed">
                Through our platform, we aim to bridge the gap between traditional education and the demands of the modern world, preparing learners for success in an ever-evolving global economy.
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Values
            </motion.h2>
            <motion.p 
              className="text-lg text-surface-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The principles that guide everything we do and shape our commitment to educational excellence.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="card p-8 hover:shadow-soft transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6">
                  <ApperIcon name={value.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-surface-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-surface-900 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Story
            </motion.h2>
            
            <motion.div 
              className="text-left space-y-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg text-surface-600 leading-relaxed">
                LearnFlow was founded in 2019 by a team of educators, technologists, and entrepreneurs who shared a common vision: to make high-quality education accessible to everyone, everywhere. Frustrated by the limitations of traditional learning methods and inspired by the potential of technology, we set out to create a platform that would revolutionize how people learn and teach.
              </p>
              
              <p className="text-lg text-surface-600 leading-relaxed">
                Starting with a small team of passionate individuals, we spent countless hours researching learning methodologies, testing technologies, and gathering feedback from educators and students around the world. Our goal was simple yet ambitious: to build a platform that would make learning more engaging, effective, and accessible than ever before.
              </p>
              
              <p className="text-lg text-surface-600 leading-relaxed">
                Today, LearnFlow serves over 50,000 students across 80+ countries, partnering with 500+ expert instructors to deliver world-class educational content. But we're just getting started. Our commitment to innovation and excellence drives us to continuously improve and expand our platform, ensuring that we remain at the forefront of educational technology.
              </p>
              
              <p className="text-lg text-surface-600 leading-relaxed">
                As we look to the future, we remain dedicated to our founding mission: empowering learners worldwide to achieve their goals and unlock their full potential through innovative, accessible, and engaging education.
              </p>
            </motion.div>
          </div>
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
            Join Our Learning Community
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to transform your learning experience? Join thousands of learners who are already achieving their goals with LearnFlow.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/" className="bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:bg-surface-50 transition-colors">
              Start Learning Today
            </Link>
            <Link to="/contact" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-primary transition-colors">
              Contact Us
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
                <li><Link to="/" className="hover:text-white transition-colors">Courses</Link></li>
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Certifications</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
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

export default About