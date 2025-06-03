import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'
import Navigation from '../components/Navigation'

const Features = () => {
  const features = [
    {
      icon: 'BookOpen',
      title: 'Interactive Learning',
      description: 'Engage with dynamic content including videos, quizzes, and hands-on exercises designed to enhance your learning experience.',
      benefits: ['Multimedia content', 'Interactive exercises', 'Real-time feedback']
    },
    {
      icon: 'TrendingUp',
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and progress reports to stay motivated and on track.',
      benefits: ['Detailed analytics', 'Achievement badges', 'Performance insights']
    },
    {
      icon: 'Users',
      title: 'Collaborative Learning',
      description: 'Connect with peers, join study groups, and participate in discussions to enhance your learning through collaboration.',
      benefits: ['Study groups', 'Peer discussions', 'Shared projects']
    },
    {
      icon: 'Award',
      title: 'Assessments & Certificates',
      description: 'Test your knowledge with comprehensive assessments and earn certificates upon successful completion.',
      benefits: ['Custom quizzes', 'Verified certificates', 'Skill validation']
    },
    {
      icon: 'Smartphone',
      title: 'Mobile Learning',
      description: 'Learn anywhere, anytime with our responsive platform that works seamlessly across all devices.',
      benefits: ['Cross-platform sync', 'Offline access', 'Mobile optimized']
    },
    {
      icon: 'Brain',
      title: 'AI-Powered Recommendations',
      description: 'Get personalized course recommendations and learning paths tailored to your goals and learning style.',
      benefits: ['Personalized paths', 'Smart suggestions', 'Adaptive learning']
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Active Learners', icon: 'Users' },
    { number: '500+', label: 'Courses Available', icon: 'BookOpen' },
{ number: '95%', label: 'Completion Rate', icon: 'TrendingUp' },
    { number: '24/7', label: 'Support Available', icon: 'HeadphonesIcon' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20">
      <Navigation />
<Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gradient mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Powerful Features for Modern Learning
          </motion.h1>
          <motion.p 
            className="text-xl text-surface-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the comprehensive tools and capabilities that make LearnFlow the perfect platform for your educational journey.
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card p-8 group hover:shadow-neu-light transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <ApperIcon name={feature.icon} className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-surface-900 mb-3">{feature.title}</h3>
                <p className="text-surface-600 mb-4 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-surface-500">
                      <ApperIcon name="Check" className="h-4 w-4 text-accent mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
              Trusted by Thousands of Learners
            </h2>
            <p className="text-lg text-surface-600">
              Join our growing community of successful learners worldwide
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors">
                  <ApperIcon name={stat.icon} className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-surface-900 mb-2">{stat.number}</div>
                <div className="text-surface-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg text-surface-600 mb-8">
              Experience all these powerful features and more. Join thousands of learners who have transformed their skills with LearnFlow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a
                href="/"
                className="btn-primary inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon name="Play" className="h-5 w-5 mr-2" />
                Start Learning Now
              </motion.a>
              <motion.a
                href="/contact"
                className="btn-secondary inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon name="MessageCircle" className="h-5 w-5 mr-2" />
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ApperIcon name="GraduationCap" className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">LearnFlow</span>
          </div>
          <p className="text-surface-400 mb-6">
            Empowering learners worldwide with innovative educational technology.
          </p>
          <div className="flex justify-center space-x-6 text-surface-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/features" className="hover:text-white transition-colors">Features</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Features