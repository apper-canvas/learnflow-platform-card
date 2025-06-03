import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageCircle, TrendingUp, Award, Calendar, Heart, MessageSquare, Eye } from 'lucide-react';
import Navigation from '../components/Navigation';

const Community = () => {
  const recentDiscussions = [
    {
      id: 1,
      title: "Best practices for React state management",
      author: "Sarah Chen",
      replies: 23,
      views: 1250,
      lastActivity: "2 hours ago",
      category: "React",
      isHot: true
    },
    {
      id: 2,
      title: "JavaScript async/await vs Promises",
      author: "Mike Johnson",
      replies: 15,
      views: 890,
      lastActivity: "4 hours ago",
      category: "JavaScript",
      isHot: false
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox - When to use what?",
      author: "Emily Davis",
      replies: 31,
      views: 2100,
      lastActivity: "6 hours ago",
      category: "CSS",
      isHot: true
    },
    {
      id: 4,
      title: "Node.js performance optimization tips",
      author: "David Wilson",
      replies: 18,
      views: 1450,
      lastActivity: "1 day ago",
      category: "Node.js",
      isHot: false
    }
  ];

  const topContributors = [
    {
      id: 1,
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      posts: 245,
      reputation: 8920,
      badge: "Expert"
    },
    {
      id: 2,
      name: "Jessica Lee",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=60&h=60&fit=crop&crop=face",
      posts: 189,
      reputation: 7340,
      badge: "Mentor"
    },
    {
      id: 3,
      name: "Robert Garcia",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      posts: 156,
      reputation: 6180,
      badge: "Helper"
    }
  ];

  const communityStats = [
    { label: "Active Members", value: "12,847", icon: Users },
    { label: "Discussions", value: "8,392", icon: MessageCircle },
    { label: "Daily Posts", value: "156", icon: TrendingUp },
    { label: "Experts", value: "89", icon: Award }
  ];

  const popularTopics = [
    { name: "React", posts: 2840, trend: "+15%" },
    { name: "JavaScript", posts: 3250, trend: "+8%" },
    { name: "Python", posts: 1980, trend: "+22%" },
    { name: "CSS", posts: 1560, trend: "+5%" },
    { name: "Node.js", posts: 1340, trend: "+12%" },
    { name: "Vue.js", posts: 890, trend: "+18%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            LearnFlow Community
          </h1>
          <p className="text-xl text-surface-600 max-w-3xl mx-auto mb-8">
            Connect with fellow learners, share knowledge, and grow together in our vibrant learning community.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="card p-6 text-center hover:shadow-soft transition-all duration-200">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-surface-900 mb-1">{stat.value}</div>
                <div className="text-sm text-surface-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Discussions */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-surface-900">Recent Discussions</h2>
                <button className="btn-primary text-sm px-4 py-2">
                  Start Discussion
                </button>
              </div>
              
              <div className="space-y-4">
                {recentDiscussions.map((discussion) => (
                  <div key={discussion.id} className="border border-surface-200 rounded-xl p-4 hover:shadow-card transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-surface-900 hover:text-primary cursor-pointer">
                            {discussion.title}
                          </h3>
                          {discussion.isHot && (
                            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium">
                              Hot
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-surface-600">
                          <span>by {discussion.author}</span>
                          <span className="bg-surface-100 text-surface-700 px-2 py-1 rounded-md">
                            {discussion.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-surface-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{discussion.views} views</span>
                        </div>
                      </div>
                      <span>{discussion.lastActivity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-surface-900 mb-4">Community Guidelines</h2>
              <div className="space-y-4 text-surface-600">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-surface-900">Be Respectful</h3>
                    <p>Treat all community members with kindness and respect, regardless of their experience level.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-surface-900">Stay on Topic</h3>
                    <p>Keep discussions relevant to the topic at hand and use appropriate categories.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-surface-900">Share Knowledge</h3>
                    <p>Help others learn by sharing your knowledge and experiences constructively.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Contributors */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-surface-900 mb-4">Top Contributors</h2>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={contributor.id} className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={contributor.avatar}
                        alt={contributor.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-surface-900">{contributor.name}</div>
                      <div className="text-sm text-surface-600">
                        {contributor.posts} posts • {contributor.reputation} rep
                      </div>
                    </div>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {contributor.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Topics */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-surface-900 mb-4">Popular Topics</h2>
              <div className="space-y-3">
                {popularTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-surface-900">{topic.name}</div>
                      <div className="text-sm text-surface-600">{topic.posts} posts</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">{topic.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-surface-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full btn-primary">
                  Start New Discussion
                </button>
                <button className="w-full btn-secondary">
                  Browse Categories
                </button>
                <button className="w-full btn-secondary">
                  Find Study Groups
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Community Events */}
        <div className="card p-6 mt-8">
          <h2 className="text-2xl font-bold text-surface-900 mb-6">Upcoming Community Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-surface-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm text-primary font-medium">Jan 25, 2024</span>
              </div>
              <h3 className="font-semibold text-surface-900 mb-2">React Best Practices Workshop</h3>
              <p className="text-sm text-surface-600 mb-3">Learn advanced React patterns and optimization techniques.</p>
              <button className="text-primary hover:text-primary-dark font-medium text-sm">
                Register Now →
              </button>
            </div>
            
            <div className="border border-surface-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm text-primary font-medium">Feb 1, 2024</span>
              </div>
              <h3 className="font-semibold text-surface-900 mb-2">Community Code Challenge</h3>
              <p className="text-sm text-surface-600 mb-3">Monthly coding challenge with exciting prizes.</p>
              <button className="text-primary hover:text-primary-dark font-medium text-sm">
                Join Challenge →
              </button>
            </div>
            
            <div className="border border-surface-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm text-primary font-medium">Feb 8, 2024</span>
              </div>
              <h3 className="font-semibold text-surface-900 mb-2">Career Q&A Session</h3>
              <p className="text-sm text-surface-600 mb-3">Get career advice from industry professionals.</p>
              <button className="text-primary hover:text-primary-dark font-medium text-sm">
                Save Spot →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">LearnFlow Community</span>
              </div>
              <p className="text-surface-300 mb-4">
                Join thousands of learners in our vibrant community. Share knowledge, get help, and grow together.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-surface-300">
                <li><Link to="/" className="hover:text-white transition-colors duration-200">Home</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors duration-200">Courses</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors duration-200">About</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contributors</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-800 mt-8 pt-8 text-center text-surface-400">
            <p>&copy; 2024 LearnFlow Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Community;