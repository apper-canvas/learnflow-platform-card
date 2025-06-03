import React from 'react';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import { BookOpen, HelpCircle, Mail, Phone, MessageCircle, FileText, Video, Settings, Users, Lock } from 'lucide-react';

const HelpCenter = () => {
  const faqData = [
    {
      question: "How do I get started with LearnFlow?",
      answer: "Getting started is easy! Simply create an account, browse our course catalog, and enroll in courses that interest you. You can track your progress and earn certifications as you complete courses."
    },
    {
      question: "How do I enroll in a course?",
      answer: "To enroll in a course, navigate to the Courses page, select the course you're interested in, and click the 'Enroll Now' button. Some courses may have prerequisites or fees."
    },
    {
      question: "Can I access courses offline?",
      answer: "Currently, courses require an internet connection to access. We're working on offline functionality for mobile apps in future updates."
    },
    {
      question: "How do I track my learning progress?",
      answer: "Your progress is automatically tracked as you complete lessons and quizzes. You can view your progress on your dashboard and course pages."
    },
    {
      question: "Are the certifications recognized?",
      answer: "Our certifications are recognized by many employers and institutions. Each certificate includes verification details and can be shared on professional networks."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. Enterprise customers can also arrange for invoicing."
    }
  ];

  const supportCategories = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Getting Started",
      description: "Learn how to use LearnFlow and get the most out of your learning experience",
      topics: ["Account Setup", "Course Navigation", "Progress Tracking", "Certificates"]
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Technical Support",
      description: "Troubleshoot technical issues and get help with platform functionality",
      topics: ["Login Issues", "Video Playback", "Browser Compatibility", "Mobile App"]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Account Management",
      description: "Manage your account settings, billing, and subscription details",
      topics: ["Profile Settings", "Billing & Payments", "Subscription Plans", "Data Export"]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Privacy & Security",
      description: "Information about data protection, privacy settings, and account security",
      topics: ["Privacy Controls", "Data Security", "Account Recovery", "Two-Factor Auth"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl">
              <HelpCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-surface-900 mb-4">Help Center</h1>
          <p className="text-xl text-surface-600 max-w-3xl mx-auto">
            Find answers to frequently asked questions, get started guides, and access support resources
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-surface-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-semibold text-surface-900">Live Chat</h3>
            </div>
            <p className="text-surface-600 mb-4">Get instant help from our support team</p>
            <button className="btn-primary">Start Chat</button>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-surface-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <Mail className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-semibold text-surface-900">Email Support</h3>
            </div>
            <p className="text-surface-600 mb-4">Send us a detailed message</p>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-surface-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <Video className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-semibold text-surface-900">Video Tutorials</h3>
            </div>
            <p className="text-surface-600 mb-4">Watch step-by-step guides</p>
            <button className="btn-secondary">Browse Videos</button>
          </div>
        </div>

        {/* Support Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-surface-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {supportCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-soft border border-surface-100 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl mr-4">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-surface-900 mb-2">{category.title}</h3>
                    <p className="text-surface-600 mb-4">{category.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.topics.map((topic, topicIndex) => (
                    <span key={topicIndex} className="px-3 py-1 bg-surface-100 text-surface-700 rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-surface-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-soft border border-surface-100">
                <h3 className="text-lg font-semibold text-surface-900 mb-3">{faq.question}</h3>
                <p className="text-surface-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-white/90 mb-6">Our support team is here to help you succeed with your learning journey</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center justify-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>support@learnflow.com</span>
            </div>
            <div className="flex items-center justify-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>1-800-LEARN-FLOW</span>
            </div>
          </div>
          
          <p className="text-white/80 text-sm">
            Support Hours: Monday - Friday, 9 AM - 6 PM EST
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-12 text-center">
          <div className="flex justify-center space-x-6 text-sm text-surface-600">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors duration-200">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;