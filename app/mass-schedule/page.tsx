'use client'

import { motion } from 'framer-motion'
import { Clock, Calendar, MapPin, Cross, Bell } from 'lucide-react'

const massSchedule = [
  {
    day: 'Sunday',
    masses: [
      { time: '8:00 AM', type: 'Holy Mass', language: 'English' },
      { time: '10:00 AM', type: 'Holy Mass', language: 'English' }
    ]
  },
  {
    day: 'Monday - Friday',
    masses: [
      { time: '6:00 AM', type: 'Holy Mass', language: 'English' },
      { time: '6:00 PM', type: 'Holy Mass', language: 'English' }
    ]
  },
  {
    day: 'Saturday',
    masses: [
      { time: '6:00 AM', type: 'Holy Mass', language: 'English' },
      { time: '6:00 PM', type: 'Vigil Mass', language: 'English' }
    ]
  },
  {
    day: 'Holy Days of Obligation',
    masses: [
      { time: '6:00 AM', type: 'Holy Mass', language: 'English' },
      { time: '12:00 PM', type: 'Holy Mass', language: 'English' },
      { time: '6:00 PM', type: 'Holy Mass', language: 'English' }
    ]
  }
]

const specialServices = [
  {
    title: 'Novena to Our Mother of Perpetual Help',
    day: 'Every Wednesday',
    time: '6:00 PM',
    description: 'Join us for this beautiful devotion to our beloved patron'
  },
  {
    title: 'Adoration of the Blessed Sacrament',
    day: 'First Friday',
    time: '7:00 PM - 8:00 PM',
    description: 'Monthly Eucharistic Adoration with Benediction'
  },
  {
    title: 'Rosary',
    day: 'Daily',
    time: '30 minutes before each Mass',
    description: 'Praying the Holy Rosary together as a community'
  },
  {
    title: 'Confession',
    day: 'Saturday',
    time: '5:00 PM - 5:45 PM',
    description: 'Sacrament of Reconciliation available before Vigil Mass'
  }
]

export default function MassSchedulePage() {
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
              Mass Schedule
            </h1>
            <p className="text-white text-xl max-w-3xl mx-auto leading-relaxed">
              Join us for the celebration of the Holy Eucharist and other liturgical services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mass Schedule */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl font-bold text-church-text mb-4">Holy Mass Times</h2>
          <div className="w-24 h-1 bg-church-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {massSchedule.map((schedule, index) => (
            <motion.div
              key={schedule.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 3) }}
              className="catholic-card"
            >
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-church-primary mr-3" />
                <h3 className="font-serif text-xl font-bold text-church-text">{schedule.day}</h3>
              </div>
              <div className="space-y-3">
                {schedule.masses.map((mass, massIndex) => (
                  <div key={massIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-church-secondary mr-2" />
                      <span className="font-medium">{mass.time}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-church-text">{mass.type}</div>
                      <div className="text-sm text-gray-600">{mass.language}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Special Services */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold text-church-text mb-4">Special Services & Devotions</h2>
            <div className="w-24 h-1 bg-church-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 10) }}
                className="catholic-card"
              >
                <div className="flex items-start mb-4">
                  <Bell className="w-6 h-6 text-church-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-church-text mb-2">
                      {service.title}
                    </h3>
                    <div className="flex items-center text-church-secondary mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="font-medium mr-4">{service.day}</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="font-medium">{service.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <MapPin className="w-12 h-12 text-church-primary mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
            Visit Us
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Our Mother of Perpetual Help Chaplaincy is located at Adekunle Ajasin University, 
            Akungba-Akoko (AAUA). All are welcome to join us for worship and fellowship.
          </p>
          <div className="bg-church-primary bg-opacity-10 p-6 rounded-lg max-w-md mx-auto">
            <h3 className="font-semibold text-church-text mb-2">Location</h3>
            <p className="text-gray-600">
              Adekunle Ajasin University<br />
              Akungba-Akoko<br />
              Ondo State, Nigeria
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}