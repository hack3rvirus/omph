'use client'

import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Crown, Star } from 'lucide-react'

const clergyMembers = [
  {
    id: 'pope',
    name: 'Pope Francis',
    title: 'Supreme Pontiff',
    role: 'Pope',
    image: '/images/pope-francis.jpg',
    description: 'The 266th Pope of the Catholic Church, Bishop of Rome, and head of the worldwide Catholic Church.',
    contact: {
      email: 'info@vatican.va',
      location: 'Vatican City'
    },
    priority: 1
  },
  {
    id: 'bishop',
    name: 'Most Rev. Dr. Jude Arogundade',
    title: 'Bishop of Ondo Diocese',
    role: 'Diocesan Bishop',
    image: '/images/bishop-ondo.jpg',
    description: 'Local Ordinary of the Diocese of Ondo, overseeing the spiritual welfare of Catholics in Ondo State.',
    contact: {
      email: 'bishop@ondodiocese.org',
      phone: '+234-XXX-XXX-XXXX',
      location: 'Akure, Ondo State'
    },
    priority: 2
  },
  {
    id: 'bishop-emeritus',
    name: 'Most Rev. Dr. Emmanuel Badejo',
    title: 'Bishop Emeritus',
    role: 'Bishop Emeritus',
    image: '/images/bishop-emeritus.jpg',
    description: 'Former Bishop of Oyo Diocese, continues to serve the Church with wisdom and experience.',
    contact: {
      location: 'Oyo State'
    },
    priority: 3
  },
  {
    id: 'papal-nuncio',
    name: 'Archbishop Antonio Filipazzi',
    title: 'Apostolic Nuncio',
    role: 'Papal Nuncio',
    image: '/images/papal-nuncio.jpg',
    description: 'Vatican diplomat representing the Holy See in Nigeria and maintaining relations with the Church.',
    contact: {
      email: 'nunciature@lagos.net',
      location: 'Lagos, Nigeria'
    },
    priority: 4
  },
  {
    id: 'chaplain',
    name: 'Rev. Fr. John Chaplain',
    title: 'Chaplain',
    role: 'University Chaplain',
    image: '/images/priest-chaplain.jpg',
    description: 'Chaplain of Our Mother of Perpetual Help Chaplaincy at Adekunle Ajasin University.',
    contact: {
      email: 'chaplain@aaua.edu.ng',
      phone: '+234-XXX-XXX-XXXX',
      location: 'AEFUTHA Campus, Akure'
    },
    priority: 5
  },
  {
    id: 'assistant-chaplain',
    name: 'Rev. Fr. Michael Adebayo',
    title: 'Assistant Chaplain',
    role: 'Assistant Chaplain',
    image: '/images/assistant-chaplain.jpg',
    description: 'Assistant to the Chaplain, helping with liturgical celebrations and pastoral care.',
    contact: {
      email: 'assistant.chaplain@aaua.edu.ng',
      location: 'AEFUTHA Campus, Akure'
    },
    priority: 6
  },
  {
    id: 'resident-chaplain',
    name: 'Rev. Sr. Mary Benedict',
    title: 'Resident Chaplain',
    role: 'Religious Sister',
    image: '/images/resident-chaplain.jpg',
    description: 'Religious sister providing spiritual guidance and sacramental assistance.',
    contact: {
      email: 'sr.mary@aaua.edu.ng',
      location: 'AEFUTHA Campus, Akure'
    },
    priority: 7
  }
]

const otherOfficials = [
  {
    name: 'Mrs. Grace Okafor',
    title: 'Catechist Coordinator',
    role: 'Catechist',
    image: '/images/catechist-coordinator.jpg',
    description: 'Coordinates religious education programs for children and adults.'
  },
  {
    name: 'Mr. Peter Nwosu',
    title: 'Secretary',
    role: 'Administrative Secretary',
    image: '/images/secretary.jpg',
    description: 'Handles administrative duties and coordinates chaplaincy activities.'
  },
  {
    name: 'Mrs. Fatima Ibrahim',
    title: 'Youth Coordinator',
    role: 'Youth Ministry',
    image: '/images/youth-coordinator.jpg',
    description: 'Organizes youth programs and activities for CYON.'
  },
  {
    name: 'Mr. Joseph Adeyemi',
    title: 'Music Director',
    role: 'Choir Director',
    image: '/images/music-director.jpg',
    description: 'Leads the chaplaincy choir and liturgical music ministry.'
  }
]

export default function ClergyProfiles() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <Crown className="w-12 h-12 text-church-primary mx-auto mb-4" />
        <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
          Our Clergy & Leadership
        </h2>
        <div className="w-24 h-1 bg-church-primary mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet the dedicated clergy and lay leaders who guide our Catholic community
          in faith, service, and spiritual growth.
        </p>
      </motion.div>

      {/* Main Clergy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {clergyMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 3) }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="aspect-square bg-gray-200 relative overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Q0E0QUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DbGVyZ3kgUGhvdG88L3RleHQ+Cjwvc3ZnPg=='
                }}
              />
              <div className="absolute top-4 right-4">
                <div className="bg-church-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                  {member.priority}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="text-center mb-4">
                <h3 className="font-serif text-xl font-bold text-church-text mb-1">
                  {member.name}
                </h3>
                <p className="text-church-primary font-semibold text-sm mb-1">
                  {member.title}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.role}
                </p>
              </div>

              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {member.description}
              </p>

              <div className="space-y-2 text-xs text-gray-600">
                {member.contact.email && (
                  <div className="flex items-center">
                    <Mail className="w-3 h-3 mr-2" />
                    <span className="truncate">{member.contact.email}</span>
                  </div>
                )}
                {member.contact.phone && (
                  <div className="flex items-center">
                    <Phone className="w-3 h-3 mr-2" />
                    <span>{member.contact.phone}</span>
                  </div>
                )}
                {member.contact.location && (
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-2" />
                    <span>{member.contact.location}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Other Officials Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-50 rounded-lg p-8"
      >
        <div className="text-center mb-8">
          <Star className="w-8 h-8 text-church-primary mx-auto mb-2" />
          <h3 className="font-serif text-2xl font-bold text-church-text mb-2">
            Lay Leaders & Coordinators
          </h3>
          <p className="text-gray-600">
            Dedicated lay faithful who serve our community in various ministries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherOfficials.map((official, index) => (
            <motion.div
              key={official.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 10) }}
              className="bg-white rounded-lg p-4 text-center shadow-md"
            >
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={official.image}
                  alt={official.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjQwIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOUNBNEFBIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TGF5IExlYWRlcjwvdGV4dD4KPHN2Zz4='
                  }}
                />
              </div>
              <h4 className="font-serif text-lg font-bold text-church-text mb-1">
                {official.name}
              </h4>
              <p className="text-church-primary font-semibold text-sm mb-2">
                {official.title}
              </p>
              <p className="text-gray-600 text-xs leading-relaxed">
                {official.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
