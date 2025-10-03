'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Send, Cross, Users, Calendar, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

export default function PrayerRequestsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    intention: '',
    category: '',
    anonymous: false,
    urgent: false
  })
  const [loading, setLoading] = useState(false)

  const categories = [
    'Health & Healing',
    'Family & Relationships',
    'Academic Success',
    'Employment & Career',
    'Spiritual Growth',
    'Thanksgiving',
    'Deceased Souls',
    'Vocations',
    'Other'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In production, this would submit to Firebase
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      toast.success('Your prayer request has been submitted. Our community will pray for your intention.')
      setFormData({
        name: '',
        email: '',
        intention: '',
        category: '',
        anonymous: false,
        urgent: false
      })
    } catch (error) {
      toast.error('Failed to submit prayer request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-church-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-church-primary to-church-secondary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Prayer Requests
            </h1>
            <p className="text-white text-xl max-w-3xl mx-auto leading-relaxed">
              Submit your prayer intentions and join our community in prayer. 
              We believe in the power of united prayer.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Prayer Request Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="font-serif text-2xl font-bold text-church-text mb-6">
              Submit Your Prayer Request
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
                    placeholder="Your full name"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
                    placeholder="your.email@example.com"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Prayer Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
                  disabled={loading}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="intention" className="block text-sm font-medium text-gray-700 mb-2">
                  Prayer Intention *
                </label>
                <textarea
                  id="intention"
                  name="intention"
                  value={formData.intention}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
                  placeholder="Please share your prayer intention..."
                  disabled={loading}
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleChange}
                    className="mr-3 rounded"
                    disabled={loading}
                  />
                  <span className="text-sm text-gray-700">Submit this request anonymously</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="urgent"
                    checked={formData.urgent}
                    onChange={handleChange}
                    className="mr-3 rounded"
                    disabled={loading}
                  />
                  <span className="text-sm text-gray-700">This is an urgent prayer request</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.intention.trim()}
                className="w-full bg-church-primary hover:bg-opacity-90 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {loading ? 'Submitting...' : 'Submit Prayer Request'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Privacy Notice:</strong> Your prayer requests are treated with utmost confidentiality. 
                Only our prayer team and chaplain have access to submitted intentions.
              </p>
            </div>
          </motion.div>

          {/* Information Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* About Prayer Requests */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Cross className="w-8 h-8 text-church-primary mr-3" />
                <h2 className="font-serif text-2xl font-bold text-church-text">
                  The Power of Prayer
                </h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                "Ask and it will be given to you; seek and you will find; knock and the door 
                will be opened to you." - Matthew 7:7
              </p>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                Our prayer request ministry connects you with our faith community. When you submit 
                a prayer intention, our dedicated prayer team and the entire chaplaincy community 
                will lift your needs before the Lord.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                We believe in the communion of saints and the power of intercessory prayer. 
                Your intentions are also remembered during our daily Masses and special devotions.
              </p>
            </div>

            {/* Prayer Schedule */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Calendar className="w-8 h-8 text-church-primary mr-3" />
                <h3 className="font-serif text-xl font-bold text-church-text">
                  When We Pray for You
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-church-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-700">Daily Mass</p>
                    <p className="text-sm text-gray-600">All intentions are remembered during daily Mass</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-church-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-700">Weekly Prayer Meeting</p>
                    <p className="text-sm text-gray-600">Every Wednesday at 7:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-church-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-700">First Friday Adoration</p>
                    <p className="text-sm text-gray-600">Special intentions during Eucharistic Adoration</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-church-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-700">Urgent Requests</p>
                    <p className="text-sm text-gray-600">Immediate prayer by our prayer team</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact for Urgent Needs */}
            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
              <h3 className="font-semibold text-red-800 mb-2">Emergency Pastoral Care</h3>
              <p className="text-red-700 text-sm mb-3">
                For urgent spiritual needs, last rites, or immediate pastoral care:
              </p>
              <p className="font-medium text-red-800">+234-XXX-XXX-XXXX</p>
              <p className="text-xs text-red-600">Available 24/7</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}