import React from 'react';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Book, Users, Mail } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-surface-600 max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using LearnFlow platform
          </p>
          <div className="mt-4 text-sm text-surface-500">
            Last updated: January 2024
          </div>
        </div>

        {/* Terms Content */}
        <div className="card p-8 mb-8">
          {/* Table of Contents */}
          <div className="mb-8 p-6 bg-surface-50 rounded-xl">
            <h2 className="text-xl font-semibold text-surface-800 mb-4 flex items-center">
              <Book className="h-5 w-5 mr-2 text-primary" />
              Table of Contents
            </h2>
            <nav className="grid md:grid-cols-2 gap-2">
              <a href="#agreement" className="text-primary hover:text-primary-dark transition-colors">1. User Agreement</a>
              <a href="#platform-usage" className="text-primary hover:text-primary-dark transition-colors">2. Platform Usage</a>
              <a href="#user-accounts" className="text-primary hover:text-primary-dark transition-colors">3. User Accounts</a>
              <a href="#content-policy" className="text-primary hover:text-primary-dark transition-colors">4. Content Policy</a>
              <a href="#intellectual-property" className="text-primary hover:text-primary-dark transition-colors">5. Intellectual Property</a>
              <a href="#privacy" className="text-primary hover:text-primary-dark transition-colors">6. Privacy & Data</a>
              <a href="#payment-terms" className="text-primary hover:text-primary-dark transition-colors">7. Payment Terms</a>
              <a href="#limitation-liability" className="text-primary hover:text-primary-dark transition-colors">8. Limitation of Liability</a>
            </nav>
          </div>

          {/* Section 1: User Agreement */}
          <section id="agreement" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-primary" />
              1. User Agreement
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                By accessing and using LearnFlow ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                LearnFlow is an online learning platform that provides educational content, courses, certifications, and related services. These terms govern your use of our platform and services.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be at least 13 years old to use our services</li>
                <li>You agree to provide accurate and complete information</li>
                <li>You are responsible for maintaining account security</li>
                <li>You agree to comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Platform Usage */}
          <section id="platform-usage" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4">
              2. Platform Usage
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                LearnFlow grants you a limited, non-exclusive, non-transferable license to access and use the platform for personal or educational purposes.
              </p>
              <h3 className="text-lg font-semibold text-surface-700">Permitted Uses:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and complete courses and learning materials</li>
                <li>Participate in discussions and community features</li>
                <li>Download materials for offline study (where permitted)</li>
                <li>Share achievements and certifications</li>
              </ul>
              <h3 className="text-lg font-semibold text-surface-700">Prohibited Uses:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sharing account credentials with others</li>
                <li>Attempting to breach security or access unauthorized areas</li>
                <li>Using the platform for commercial purposes without permission</li>
                <li>Distributing copyrighted content without authorization</li>
              </ul>
            </div>
          </section>

          {/* Section 3: User Accounts */}
          <section id="user-accounts" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4 flex items-center">
              <Users className="h-6 w-6 mr-2 text-primary" />
              3. User Accounts
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                To access certain features of LearnFlow, you must create an account. You are responsible for maintaining the confidentiality of your account information.
              </p>
              <h3 className="text-lg font-semibold text-surface-700">Account Requirements:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these terms or engage in prohibited activities.
              </p>
            </div>
          </section>

          {/* Section 4: Content Policy */}
          <section id="content-policy" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4">
              4. Content Policy
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                All content on LearnFlow, including courses, materials, and user-generated content, must comply with our content guidelines.
              </p>
              <h3 className="text-lg font-semibold text-surface-700">Content Standards:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Content must be educational and appropriate</li>
                <li>No harmful, offensive, or discriminatory material</li>
                <li>Respect intellectual property rights</li>
                <li>No spam, advertising, or promotional content</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Intellectual Property */}
          <section id="intellectual-property" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4">
              5. Intellectual Property
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                All content, features, and functionality on LearnFlow are owned by LearnFlow or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <h3 className="text-lg font-semibold text-surface-700">Your Content:</h3>
              <p>
                You retain ownership of content you create and submit to LearnFlow. By submitting content, you grant us a license to use, display, and distribute your content in connection with our services.
              </p>
            </div>
          </section>

          {/* Section 6: Privacy & Data */}
          <section id="privacy" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4">
              6. Privacy & Data Protection
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use LearnFlow.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We collect information necessary to provide our services</li>
                <li>We use industry-standard security measures</li>
                <li>We do not sell personal information to third parties</li>
                <li>You can request access, modification, or deletion of your data</li>
              </ul>
            </div>
          </section>

          {/* Section 7: Payment Terms */}
          <section id="payment-terms" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4">
              7. Payment Terms
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                For paid courses and premium features, the following payment terms apply:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All payments are processed securely through our payment partners</li>
                <li>Subscription fees are billed in advance</li>
                <li>Refunds are available within 30 days of purchase</li>
                <li>Prices may change with 30 days advance notice</li>
              </ul>
            </div>
          </section>

          {/* Section 8: Limitation of Liability */}
          <section id="limitation-liability" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4">
              8. Limitation of Liability
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                LearnFlow provides educational services "as is" without warranties of any kind. We strive to provide accurate and up-to-date content but cannot guarantee specific learning outcomes.
              </p>
              <p>
                To the fullest extent permitted by law, LearnFlow shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our platform.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <div className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/10">
            <h2 className="text-xl font-semibold text-surface-800 mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-primary" />
              Questions About These Terms?
            </h2>
            <p className="text-surface-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-surface-600">
              <p>Email: legal@learnflow.com</p>
              <p>Address: 123 Education St, Learning City, LC 12345</p>
              <p>Phone: (555) 123-4567</p>
            </div>
            <div className="mt-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors duration-200"
              >
                Contact Support
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="text-center">
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;