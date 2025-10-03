'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

const upcomingEvents = [
  {
    id: 1,
    title: "Sunday Mass",
    date: "Every Sunday",
    time: "8:00 AM & 10:00 AM",
    location: "Main Chapel",
    description: "Join us for our weekly celebration of the Eucharist",
    type: "mass"
  },
  {
    id: 2,
    title: "Novena to Our Mother of Perpetual Help",
    date: "Every Wednesday",
    time: "6:00 PM",
    location: "Main Chapel",
    description: "Weekly devotion to our beloved patron",
    type: "devotion"
  },
  {
    id: 3,
    title: "Youth Fellowship Meeting",
    date: "Saturday, September 21",
    time: "4:00 PM",
    location: "Parish Hall",
    description: "CYON monthly gathering for all young adults",
    type: "meeting"
  },
  {
    id: 4,
    title: "Legion of Mary Meeting",
    date: "Sunday, September 22",
    time: "2:00 PM",
    location: "Conference Room",
    description: "Weekly praesidium meeting",
    type: "meeting"
  }
]

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'mass': return 'bg-church-primary text-white'
    case 'devotion': return 'bg-church-secondary text-white'
    case 'meeting': return 'bg-church-accent text-white'
    default: return 'bg-gray-500 text-white'
  }
}

export default function UpcomingEvents() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {upcomingEvents.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-church-primary"
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-serif text-lg font-bold text-church-text pr-4">
              {event.title}
            </h3>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getEventTypeColor(event.type)}`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-church-primary" />
              <span className="text-sm">{event.date}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-church-primary" />
              <span className="text-sm">{event.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-church-primary" />
              <span className="text-sm">{event.location}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{event.description}</p>
          
          <button className="w-full bg-church-primary hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded transition-colors">
            Learn More
          </button>
        </motion.div>
      ))}
    </div>
  )
}