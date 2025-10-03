'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Users, Heart, Calendar, Mail, Phone, User, Crown, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export default function CWOPage() {
  const executives = [
    { name: 'Mrs. Mary Adebisi', role: 'President', email: 'mary.adebisi@email.com', phone: '+234-803-XXX-XXXX' },
    { name: 'Mrs. Grace Okonkwo', role: 'Vice President', email: 'grace.okonkwo@email.com', phone: '+234-806-XXX-XXXX' },
    { name: 'Mrs. Rose Akinola', role: 'Secretary', email: 'rose.akinola@email.com', phone: '+234-805-XXX-XXXX' },
    { name: 'Mrs. Agnes Okoro', role: 'Treasurer', email: 'agnes.okoro@email.com', phone: '+234-807-XXX-XXXX' },
    { name: 'Mrs. Catherine Adeyemi', role: 'Financial Secretary', email: 'catherine.adeyemi@email.com', phone: '+234-808-XXX-XXXX' }
  ]

  const activities = [
    'Monthly spiritual meetings focusing on Catholic womanhood',
    'Annual retreat on the role of women in the Church',
    'Charity work and care for the less privileged',
    'Support for pregnant women and new mothers',
    'Marriage enrichment programs and family counseling',
    'Liturgical ministries including altar decoration',
    'Fundraising for chaplaincy and community projects'
  ]

  return (
    <div className="min-h-screen bg-church-background">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-pink-600 to-pink-800 py-16 px-4 sm:px-6 lg:px-8">
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
              <Heart className="w-12 h-12 text-white mr-4" />
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
                  Catholic Women Organization (CWO)
                </h1>
                <p className="text-white text-lg opacity-90">
                  Patron: Blessed Virgin Mary • Established: 2010
                </p>
              </div>
            </div>
            
            <p className="text-white text-lg max-w-3xl leading-relaxed">
              The Catholic Women Organization (CWO) empowers women to live their faith actively 
              through prayer, service, and community building. We follow the example of Mary, 
              the Mother of God, in our dedication to Christ and His Church.
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
                  <h3 className="font-semibold text-pink-600 mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    To empower Catholic women to live their faith actively through prayer, service, 
                    and community building, following the example of the Blessed Virgin Mary.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-pink-600 mb-2">Our Vision</h3>
                  <p className="text-gray-600">
                    To be instruments of God's love and mercy in our families and community, 
                    nurturing faith and promoting the dignity of all women.
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
                    <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
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
              <h2 className="font-serif text-2xl font-bold text-church-text mb-6">Our Patron</h2>
              <div className="flex items-start">
                <Crown className="w-8 h-8 text-pink-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-pink-600 mb-2">Blessed Virgin Mary</h3>
                  <p className="text-gray-600 leading-relaxed">
                    The Blessed Virgin Mary, Mother of God and our spiritual mother, is the perfect 
                    model of Catholic womanhood. Her "yes" to God's plan shows us how to trust in 
                    divine providence. As the first disciple and the Queen of Heaven, she intercedes 
                    for us and guides us to her Son, Jesus. We celebrate her many feast days throughout 
                    the liturgical year, especially the Immaculate Conception and the Assumption.
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
                    <span className="bg-pink-600 text-white text-xs font-medium px-2 py-1 rounded mb-2 inline-block">
                      {exec.role}
                    </span>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="w-3 h-3 mr-2" />
                        <a href={`mailto:${exec.email}`} className="hover:text-pink-600">
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
                  <Calendar className="w-5 h-5 text-pink-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">When</p>
                    <p className="text-gray-600 text-sm">Second Sunday of every month</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-pink-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Time</p>
                    <p className="text-gray-600 text-sm">After 10:00 AM Mass</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-pink-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Location</p>
                    <p className="text-gray-600 text-sm">Parish Hall</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-pink-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Members</p>
                    <p className="text-gray-600 text-sm">62 active members</p>
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
              <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-church-text mb-4">Join CWO</h3>
              <p className="text-gray-600 text-sm mb-6">
                Are you a Catholic woman seeking spiritual growth and sisterhood? 
                Join our community of faith-filled women making a difference.
              </p>
              <div className="space-y-3">
                <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded transition-colors">
                  <Mail className="w-4 h-4 mr-2 inline" />
                  Contact President
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors">
                  <Calendar className="w-4 h-4 mr-2 inline" />
                  Attend Next Meeting
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}