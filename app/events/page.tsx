'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, ArrowRight, Filter } from 'lucide-react'

const events = [
  {
    id: 1,
    title: "Feast of Our Mother of Perpetual Help",
    date: "2025-06-27",
    time: "8:00 AM",
    location: "Main Chapel",
    category: "Feast Day",
    description: "Annual celebration of our patron saint with special Mass, procession, and community fellowship.",
    attendees: 200,
    image: "https://images.pexels.com/photos/208271/pexels-photo-208271.jpeg"
  },
  {
    id: 2,
    title: "Youth Retreat Weekend",
    date: "2025-03-15",
    time: "6:00 PM",
    location: "Parish Hall",
    category: "Retreat",
    description: "A weekend of prayer, reflection, and fellowship for young adults aged 18-35.",
    attendees: 50,
    image: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg"
  },
  {
    id: 3,
    title: "Lenten Mission",
    date: "2025-03-10",
    time: "7:00 PM",
    location: "Main Chapel",
    category: "Mission",
    description: "Three-day Lenten mission with guest speaker focusing on prayer, fasting, and almsgiving.",
    attendees: 150,
    image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg"
  },
  {
    id: 4,
    title: "First Holy Communion Preparation",
    date: "2025-02-01",
    time: "10:00 AM",
    location: "Catechism Room",
    category: "Sacrament",
    description: "Preparation classes for children receiving their First Holy Communion.",
    attendees: 25,
    image: "https://images.pexels.com/photos/208271/pexels-photo-208271.jpeg"
  },
  {
    id: 5,
    title: "Christmas Carol Service",
    date: "2024-12-24",
    time: "11:00 PM",
    location: "Main Chapel",
    category: "Celebration",
    description: "Midnight Mass celebrating the birth of our Lord Jesus Christ.",
    attendees: 300,
    image: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg"
  },
  {
    id: 6,
    title: "Marriage Enrichment Seminar",
    date: "2025-02-14",
    time: "2:00 PM",
    location: "Conference Room",
    category: "Seminar",
    description: "A seminar for married couples on strengthening their relationship through faith.",
    attendees: 40,
    image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg"
  }
]

const categories = ["All", "Feast Day", "Retreat", "Mission", "Sacrament", "Celebration", "Seminar"]

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredEvents, setFilteredEvents] = useState(events)

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    if (category === "All") {
      setFilteredEvents(events)
    } else {
      setFilteredEvents(events.filter(event => event.category === category))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
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
            <Calendar className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Parish Events
            </h1>
            <p className="text-white text-xl max-w-3xl mx-auto leading-relaxed">
              Join us for worship, fellowship, and spiritual growth throughout the year
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center mb-8"
        >
          <Filter className="w-5 h-5 text-church-primary mr-3" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-church-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-church-primary hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Events Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-church-primary text-white text-xs font-medium px-2 py-1 rounded">
                    {event.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-church-text mb-3 line-clamp-2">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-church-primary" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-church-primary" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-church-primary" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="w-4 h-4 mr-2 text-church-primary" />
                    {event.attendees} expected
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>
                
                <button className="w-full bg-church-primary hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
              Stay Connected
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Don't miss out on upcoming events and activities. Join our community 
              and be part of our spiritual journey together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="catholic-button">
                Subscribe to Updates
              </button>
              <button className="catholic-button-secondary">
                Contact Event Coordinator
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}