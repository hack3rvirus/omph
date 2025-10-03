'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Users, Heart, Calendar, Mail, Phone, User, Crown, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export default function CMOPage() {
  const executives = [
    { name: 'Mr. John Adebayo', role: 'President', email: 'john.adebayo@email.com', phone: '+234-803-XXX-XXXX' },
    { name: 'Mr. Peter Okafor', role: 'Vice President', email: 'peter.okafor@email.com', phone: '+234-806-XXX-XXXX' },
    { name: 'Mr. David Olumide', role: 'Secretary', email: 'david.olumide@email.com', phone: '+234-805-XXX-XXXX' },
    { name: 'Mr. Michael Adesanya', role: 'Treasurer', email: 'michael.adesanya@email.com', phone: '+234-807-XXX-XXXX' },
    { name: 'Mr. Joseph Ikechukwu', role: 'Financial Secretary', email: 'joseph.ikechukwu@email.com', phone: '+234-808-XXX-XXXX' }
  ]

  const activities = [
    'Monthly spiritual meetings and reflections on Catholic masculinity',
    'Annual retreat focusing on fatherhood and leadership',
    'Community service projects including charity work',
    'Youth mentorship programs for young Catholic men',
    'Family support initiatives and marriage enrichment',
    'Participation in parish liturgical celebrations',
    'Fundraising for chaplaincy development projects'
  ]

  return (
    <div className="min-h-screen bg-church-background">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              href="/associations"
              className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Associations
            </Link>
            
            <div className="flex items-center mb-6">
              <Users className="w-12 h-12 text-white mr-4" />
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
                  Catholic Men Organization (CMO)
                </h1>
                <p className="text-white text-lg opacity-90">
                  Patron: St. Joseph • Established: 2010
                </p>
              </div>
            </div>
            
            <p className="text-white text-lg max-w-3xl leading-relaxed">
              The Catholic Men Organization (CMO) is dedicated to fostering spiritual growth, 
              fellowship, and service among Catholic men in our chaplaincy. We strive to be 
              exemplary Catholic gentlemen who lead by example in our families, workplace, and community.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="catholic-card"
            >
              <h2 className="font-serif text-2xl font-bold text-church-text mb-6">Mission & Vision</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-blue-600 mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    To form Catholic men who are committed to their faith, family, and community service, 
                    living as authentic disciples of Christ in all aspects of life.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-600 mb-2">Our Vision</h3>
                  <p className="text-gray-600">
                    To be a beacon of Catholic masculinity that inspires others to live according to 
                    Gospel values, serving as spiritual leaders in our homes and community.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="catholic-card"
            >
              <h2 className="font-serif text-2xl font-bold text-church-text mb-6">Our Activities</h2>
              <ul className="space-y-3">
                {activities.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{activity}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Patron Saint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="catholic-card"
            >
              <h2 className="font-serif text-2xl font-bold text-church-text mb-6">Our Patron Saint</h2>
              <div className="flex items-start">
                <Crown className="w-8 h-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-600 mb-2">Saint Joseph</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Saint Joseph, the foster father of Jesus and husband of Mary, is the patron of workers, 
                    fathers, and the universal Church. He exemplifies quiet strength, faithfulness, and trust 
                    in God's plan. As a model of Catholic manhood, he shows us how to be protectors, providers, 
                    and spiritual leaders in our families. His feast day is celebrated on March 19th.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Executive Members */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="catholic-card"
            >
              <h2 className="font-serif text-2xl font-bold text-church-text mb-6">Executive Members (2025)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {executives.map((exec, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-church-text mb-1">{exec.name}</h3>
                    <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded mb-2 inline-block">
                      {exec.role}
                    </span>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="w-3 h-3 mr-2" />
                        <a href={`mailto:${exec.email}`} className="hover:text-blue-600">
                          {exec.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-3 h-3 mr-2" />
                        <span>{exec.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Meeting Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="catholic-card"
            >
              <h3 className="font-serif text-xl font-bold text-church-text mb-4">Meeting Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">When</p>
                    <p className="text-gray-600 text-sm">First Sunday of every month</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Time</p>
                    <p className="text-gray-600 text-sm">After 10:00 AM Mass</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Location</p>
                    <p className="text-gray-600 text-sm">Parish Hall</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Members</p>
                    <p className="text-gray-600 text-sm">45 active members</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Join Us */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="catholic-card text-center"
            >
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-church-text mb-4">Join CMO</h3>
              <p className="text-gray-600 text-sm mb-6">
                Are you a Catholic man looking to grow in faith and fellowship? 
                Join our brotherhood and be part of something meaningful.
              </p>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
                  <Mail className="w-4 h-4 mr-2 inline" />
                  Contact President
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors">
                  <Calendar className="w-4 h-4 mr-2 inline" />
                  Attend Next Meeting
                </button>
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="catholic-card"
            >
              <h3 className="font-serif text-xl font-bold text-church-text mb-4">Membership Requirements</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  Must be a practicing Catholic man
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  Regular Mass attendance
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  Commitment to monthly meetings
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  Willingness to serve the community
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}