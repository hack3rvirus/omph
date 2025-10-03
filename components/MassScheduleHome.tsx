'use client'

import { motion } from 'framer-motion'
import { Clock, Calendar, MapPin, Cross } from 'lucide-react'

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
  }
]

const specialServices = [
  {
    title: 'Novena to Our Mother of Perpetual Help',
    day: 'Every Wednesday',
    time: '6:00 PM',
    description: 'Weekly devotion to our beloved patron'
  },
  {
    title: 'Confession',
    day: 'Saturday',
    time: '5:00 PM - 5:45 PM',
    description: 'Sacrament of Reconciliation'
  },
  {
    title: 'Adoration',
    day: 'First Friday',
    time: '7:00 PM - 8:00 PM',
    description: 'Eucharistic Adoration with Benediction'
  }
]

export default function MassScheduleHome() {
  return (
    <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <Cross className="w-12 h-12 text-church-primary mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
            Mass Schedule
          </h2>
          <div className="w-24 h-1 bg-church-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for the celebration of the Holy Eucharist and other liturgical services
            at Our Mother of Perpetual Help Chaplaincy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mass Times */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-serif text-2xl font-bold text-church-text mb-6">Holy Mass Times</h3>
            <div className="space-y-6">
              {massSchedule.map((schedule, index) => (
                <div key={schedule.day} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-church-primary mr-3" />
                    <h4 className="font-serif text-lg font-bold text-church-text">{schedule.day}</h4>
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
                </div>
              ))}
            </div>
          </motion.div>

          {/* Special Services */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-serif text-2xl font-bold text-church-text mb-6">Devotions & Services</h3>
            <div className="space-y-6">
              {specialServices.map((service, index) => (
                <div key={service.title} className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="font-serif text-lg font-bold text-church-text mb-2">
                    {service.title}
                  </h4>
                  <div className="flex items-center text-church-secondary mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="font-medium mr-4">{service.day}</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="font-medium">{service.time}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              ))}
            </div>

            {/* Location Info */}
            <div className="bg-church-primary bg-opacity-10 rounded-lg p-6 mt-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-church-primary mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-church-text mb-2">Location</h4>
                  <p className="text-gray-700 text-sm">
                    Our Mother of Perpetual Help Chaplaincy<br />
                    Adekunle Ajasin University<br />
                    Akungba-Akoko, Ondo State, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <a
            href="/mass-schedule"
            className="inline-flex items-center bg-church-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            View Full Schedule
            <Cross className="w-4 h-4 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
