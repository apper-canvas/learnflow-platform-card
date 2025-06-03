import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-8">
            <ApperIcon name="BookX" className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-surface-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-surface-600 mb-8">
            Sorry, the learning resource you're looking for doesn't exist or has been moved.
          </p>
          
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center space-x-2"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            <span>Back to Learning</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound