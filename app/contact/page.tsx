'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Cross } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    toast.success('Message sent successfully! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
            <Cross className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-white text-xl max-w-3xl mx-auto leading-relaxed">
              We're here to help and answer any questions you may have. 
              Reach out to us and we'll respond as soon as we can.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-serif text-3xl font-bold text-church-text mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our Mother of Perpetual Help Chaplaincy welcomes you to reach out 
                for spiritual guidance, pastoral care, or any questions about our 
                parish community.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-church-primary mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-church-text mb-1">Address</h3>
                  <p className="text-gray-600">
                    Adekunle Ajasin University<br />
                    Akungba-Akoko<br />
                    Ondo State, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-6 h-6 text-church-primary mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-church-text mb-1">Phone</h3>
                  <p className="text-gray-600">+234-XXX-XXX-XXXX</p>
                  <p className="text-sm text-gray-500">Available during office hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-6 h-6 text-church-primary mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-church-text mb-1">Email</h3>
                  <p className="text-gray-600">chaplain@aaua.edu.ng</p>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-church-primary mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-church-text mb-1">Office Hours</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p>Saturday: 8:00 AM - 12:00 PM</p>
                    <p>Sunday: After Mass services</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-church-primary bg-opacity-10 p-6 rounded-lg">
              <h3 className="font-semibold text-church-text mb-2">Emergency Pastoral Care</h3>
              <p className="text-gray-600 text-sm mb-2">
                For urgent spiritual needs, last rites, or emergency pastoral care:
              </p>
              <p className="font-medium text-church-primary">+234-XXX-XXX-XXXX</p>
              <p className="text-xs text-gray-500">Available 24/7</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="font-serif text-2xl font-bold text-church-text mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="pastoral">Pastoral Care</option>
                  <option value="sacraments">Sacraments</option>
                  <option value="events">Events & Programs</option>
                  <option value="associations">Associations & Societies</option>
                  <option value="donations">Donations</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
                  placeholder="Please share your message or inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-church-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> For urgent matters requiring immediate attention, 
                please call our emergency pastoral care line or visit the chaplaincy office directly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
              Find Us
            </h2>
            <p className="text-gray-600">
              Located within the beautiful campus of Adekunle Ajasin University
            </p>
          </motion.div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-church-primary mx-auto mb-4" />
                <p className="text-gray-600">Interactive map will be embedded here</p>
                <p className="text-sm text-gray-500">Google Maps integration</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}