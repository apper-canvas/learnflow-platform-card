import React from 'react';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Users, Cookie, Mail, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-xl text-surface-600 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <div className="mt-4 text-sm text-surface-500">
            Last updated: January 2024
          </div>
        </div>

        {/* Privacy Content */}
        <div className="card p-8 mb-8">
          {/* Table of Contents */}
          <div className="mb-8 p-6 bg-surface-50 rounded-xl">
            <h2 className="text-xl font-semibold text-surface-800 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              Table of Contents
            </h2>
            <nav className="grid md:grid-cols-2 gap-2">
              <a href="#information-collection" className="text-primary hover:text-primary-dark transition-colors">1. Information We Collect</a>
              <a href="#information-usage" className="text-primary hover:text-primary-dark transition-colors">2. How We Use Information</a>
              <a href="#information-sharing" className="text-primary hover:text-primary-dark transition-colors">3. Information Sharing</a>
              <a href="#cookies-tracking" className="text-primary hover:text-primary-dark transition-colors">4. Cookies & Tracking</a>
              <a href="#data-security" className="text-primary hover:text-primary-dark transition-colors">5. Data Security</a>
              <a href="#user-rights" className="text-primary hover:text-primary-dark transition-colors">6. Your Privacy Rights</a>
              <a href="#third-party-services" className="text-primary hover:text-primary-dark transition-colors">7. Third-Party Services</a>
              <a href="#data-retention" className="text-primary hover:text-primary-dark transition-colors">8. Data Retention</a>
            </nav>
          </div>

          {/* Section 1: Information We Collect */}
          <section id="information-collection" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-2 text-primary" />
              1. Information We Collect
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                We collect information you provide directly to us, information we obtain automatically when you use our services, and information from third-party sources.
              </p>
              
              <h3 className="text-lg font-semibold text-surface-700">Personal Information You Provide:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account registration information (name, email, password)</li>
                <li>Profile information and preferences</li>
                <li>Course enrollment and progress data</li>
                <li>Payment and billing information</li>
                <li>Communications with our support team</li>
                <li>User-generated content (assignments, discussions, reviews)</li>
              </ul>

              <h3 className="text-lg font-semibold text-surface-700">Information Collected Automatically:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent, clicks)</li>
                <li>Learning analytics (course progress, quiz scores, completion rates)</li>
                <li>Location data (approximate location based on IP address)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </section>

          {/* Section 2: How We Use Information */}
          <section id="information-usage" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4">
              2. How We Use Your Information
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                We use the information we collect to provide, maintain, and improve our services, and to communicate with you.
              </p>
              
              <h3 className="text-lg font-semibold text-surface-700">Primary Uses:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and deliver our educational services</li>
                <li>Process payments and manage subscriptions</li>
                <li>Personalize your learning experience</li>
                <li>Track and report on your learning progress</li>
                <li>Send important updates and notifications</li>
                <li>Provide customer support</li>
                <li>Improve our platform and develop new features</li>
              </ul>

              <h3 className="text-lg font-semibold text-surface-700">Legal Basis for Processing:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Performance of contract (providing services you've signed up for)</li>
                <li>Legitimate interests (improving our services, fraud prevention)</li>
                <li>Consent (marketing communications, optional features)</li>
                <li>Legal obligations (compliance with applicable laws)</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Information Sharing */}
          <section id="information-sharing" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4 flex items-center">
              <Users className="h-6 w-6 mr-2 text-primary" />
              3. How We Share Your Information
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:
              </p>
              
              <h3 className="text-lg font-semibold text-surface-700">Service Providers:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors for transaction handling</li>
                <li>Cloud hosting providers for data storage</li>
                <li>Email service providers for communications</li>
                <li>Analytics providers for platform improvement</li>
              </ul>

              <h3 className="text-lg font-semibold text-surface-700">Legal Requirements:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>To comply with legal obligations</li>
                <li>To protect our rights and property</li>
                <li>To prevent fraud or security threats</li>
                <li>In connection with legal proceedings</li>
              </ul>

              <h3 className="text-lg font-semibold text-surface-700">Business Transfers:</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
              </p>
            </div>
          </section>

          {/* Section 4: Cookies & Tracking */}
          <section id="cookies-tracking" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4 flex items-center">
              <Cookie className="h-6 w-6 mr-2 text-primary" />
              4. Cookies & Tracking Technologies
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.
              </p>
              
              <h3 className="text-lg font-semibold text-surface-700">Types of Cookies We Use:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                <li><strong>Performance Cookies:</strong> Help us understand how users interact with our platform</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Targeting Cookies:</strong> Used to deliver relevant content and advertisements</li>
              </ul>

              <h3 className="text-lg font-semibold text-surface-700">Managing Cookies:</h3>
              <p>
                You can control cookies through your browser settings. Note that disabling certain cookies may affect platform functionality.
              </p>
            </div>
          </section>

          {/* Section 5: Data Security */}
          <section id="data-security" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4 flex items-center">
              <Lock className="h-6 w-6 mr-2 text-primary" />
              5. Data Security
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              
              <h3 className="text-lg font-semibold text-surface-700">Security Measures:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication requirements</li>
                <li>Employee training on data protection</li>
                <li>Incident response and breach notification procedures</li>
              </ul>

              <p>
                While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Section 6: Your Privacy Rights */}
          <section id="user-rights" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-primary" />
              6. Your Privacy Rights
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                Depending on your location, you may have certain rights regarding your personal information.
              </p>
              
              <h3 className="text-lg font-semibold text-surface-700">Your Rights Include:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                <li><strong>Erasure:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Restriction:</strong> Limit how we process your information</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for processing where applicable</li>
              </ul>

              <h3 className="text-lg font-semibold text-surface-700">Exercising Your Rights:</h3>
              <p>
                To exercise any of these rights, please contact us using the information provided at the end of this policy. We will respond to your request within the timeframes required by applicable law.
              </p>
            </div>
          </section>

          {/* Section 7: Third-Party Services */}
          <section id="third-party-services" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4">
              7. Third-Party Services
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                Our platform may integrate with third-party services and contain links to external websites. This privacy policy does not apply to third-party services.
              </p>
              
              <h3 className="text-lg font-semibold text-surface-700">Third-Party Integrations:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors (Stripe, PayPal)</li>
                <li>Analytics services (Google Analytics)</li>
                <li>Video hosting platforms</li>
                <li>Social media platforms</li>
                <li>Customer support tools</li>
              </ul>

              <p>
                We encourage you to review the privacy policies of any third-party services you use in connection with our platform.
              </p>
            </div>
          </section>

          {/* Section 8: Data Retention */}
          <section id="data-retention" className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-800 mb-4">
              8. Data Retention
            </h2>
            <div className="prose max-w-none text-surface-600 space-y-4">
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.
              </p>
              
              <h3 className="text-lg font-semibold text-surface-700">Retention Periods:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information: Until account deletion or 3 years after last activity</li>
                <li>Learning progress data: 7 years after course completion</li>
                <li>Payment information: As required by financial regulations</li>
                <li>Communications: 3 years after resolution</li>
                <li>Analytics data: Aggregated and anonymized after 2 years</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <div className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/10">
            <h2 className="text-xl font-semibold text-surface-800 mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-primary" />
              Privacy Questions or Concerns?
            </h2>
            <p className="text-surface-600 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-surface-600">
              <p>Email: privacy@learnflow.com</p>
              <p>Data Protection Officer: dpo@learnflow.com</p>
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

export default PrivacyPolicy;