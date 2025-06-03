import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, BarChart3, Shield, Zap, Check, ArrowRight, Building2, Globe, Award, Headphones } from 'lucide-react'
import Navigation from '../components/Navigation'
import ApperIcon from '../components/ApperIcon'

const Enterprise = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional')

  const features = [
    {
      icon: "Users",
      title: "Team Management",
      description: "Advanced user management with role-based access controls, team analytics, and collaborative learning tools."
    },
    {
      icon: "BarChart3",
      title: "Analytics & Reporting",
      description: "Comprehensive learning analytics, progress tracking, and detailed reporting for better decision making."
    },
    {
      icon: "Shield",
      title: "Enterprise Security",
      description: "Enterprise-grade security with SSO integration, data encryption, and compliance certifications."
    },
    {
      icon: "Zap",
      title: "Custom Integrations",
      description: "Seamless integration with your existing tools, LMS, and enterprise software ecosystem."
    },
    {
      icon: "Award",
      title: "Custom Content",
      description: "Upload and manage your own training content, courses, and certification programs."
    },
    {
      icon: "Headphones",
      title: "Dedicated Support",
      description: "24/7 dedicated support with account managers, training, and technical assistance."
    }
  ]

  const pricingPlans = [
    {
      id: 'professional',
      name: 'Professional',
      price: '$29',
      period: 'per user/month',
      description: 'Perfect for small to medium teams',
      features: [
        'Up to 100 users',
        'Advanced analytics',
        'Team management',
        'Standard integrations',
        'Email support',
        'Custom branding'
      ],
      popular: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$59',
      period: 'per user/month',
      description: 'Comprehensive solution for large organizations',
      features: [
        'Unlimited users',
        'Advanced analytics & reporting',
        'Advanced team management',
        'All integrations',
        'Priority support',
        'Custom content upload',
        'SSO integration',
        'Dedicated account manager'
      ],
      popular: true
    },
    {
      id: 'custom',
      name: 'Custom',
      price: 'Contact us',
      period: 'for pricing',
      description: 'Tailored solutions for your specific needs',
      features: [
        'Everything in Enterprise',
        'Custom development',
        'On-premise deployment',
        'Advanced security',
        'Custom integrations',
        'Training & onboarding',
        '24/7 phone support',
        'SLA guarantees'
      ],
      popular: false
    }
  ]

  const caseStudies = [
    {
      company: 'TechCorp Inc.',
      logo: 'Building2',
      industry: 'Technology',
      employees: '5,000+',
      results: [
        '85% increase in employee engagement',
        '60% faster onboarding process',
        '40% reduction in training costs'
      ]
    },
    {
      company: 'Global Finance Ltd.',
      logo: 'Globe',
      industry: 'Finance',
      employees: '10,000+',
      results: [
        '92% course completion rate',
        '50% improvement in compliance',
        '30% increase in skill assessments'
      ]
    },
    {
      company: 'Healthcare Plus',
      logo: 'Shield',
      industry: 'Healthcare',
      employees: '3,000+',
      results: [
        '95% employee satisfaction',
        '45% faster certification',
        '35% cost savings per employee'
      ]
    }
  ]

  const stats = [
    { label: "Enterprise Clients", value: "200+", icon: "Building2" },
    { label: "Active Users", value: "50K+", icon: "Users" },
    { label: "Countries Served", value: "80+", icon: "Globe" },
    { label: "Satisfaction Rate", value: "98%", icon: "Award" }
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
              Enterprise <span className="text-gradient">Learning Solutions</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-surface-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Empower your organization with scalable learning solutions designed for enterprise needs. 
              Transform your workforce with our comprehensive training platform.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className="btn-primary text-lg px-8 py-4">
                Schedule Demo
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Contact Sales
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="card p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-surface-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-surface-600 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Enterprise Features
            </motion.h2>
            <motion.p 
              className="text-lg text-surface-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Powerful features designed to meet the complex needs of large organizations and enterprises.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card p-6 hover:shadow-soft transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                  <ApperIcon name={feature.icon} className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-surface-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Enterprise Pricing
            </motion.h2>
            <motion.p 
              className="text-lg text-surface-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Choose the plan that best fits your organization's size and requirements.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`card p-8 relative ${plan.popular ? 'ring-2 ring-primary scale-105' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-surface-900 mb-2">{plan.name}</h3>
                  <p className="text-surface-600 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-surface-900 mb-1">
                    {plan.price}
                  </div>
                  <p className="text-surface-600 text-sm">{plan.period}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-surface-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    plan.popular 
                      ? 'btn-primary' 
                      : 'btn-secondary'
                  }`}
                >
                  {plan.id === 'custom' ? 'Contact Sales' : 'Get Started'}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Success Stories
            </motion.h2>
            <motion.p 
              className="text-lg text-surface-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              See how leading organizations are transforming their workforce with LearnFlow.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                className="card p-6 hover:shadow-soft transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mr-4">
                    <ApperIcon name={study.logo} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-surface-900">{study.company}</h3>
                    <p className="text-surface-600 text-sm">{study.industry} • {study.employees} employees</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {study.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-start">
                      <ArrowRight className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-surface-600 text-sm">{result}</span>
                    </div>
                  ))}
                </div>
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
            Ready to Transform Your Organization?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join hundreds of organizations that are already scaling their learning programs with LearnFlow Enterprise.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:bg-surface-50 transition-colors">
              Schedule a Demo
            </button>
            <Link to="/contact" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-primary transition-colors">
              Contact Sales Team
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
                Empowering organizations worldwide with innovative educational technology and scalable learning solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Enterprise</h4>
              <ul className="space-y-2 text-surface-300">
                <li><Link to="/enterprise" className="hover:text-white transition-colors">Enterprise Solutions</Link></li>
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/certifications" className="hover:text-white transition-colors">Certifications</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Sales</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-700 mt-8 pt-8 text-center text-surface-400">
            <p>&copy; 2024 LearnFlow Enterprise. All rights reserved. Built for organizations that value learning.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Enterprise