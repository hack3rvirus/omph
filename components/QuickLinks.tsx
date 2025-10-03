'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, BookOpen, Heart, MessageSquare, MapPin } from 'lucide-react'

const quickLinks = [
  {
    title: 'Mass Schedule',
    description: 'Daily and Sunday Mass times',
    icon: Calendar,
    href: '/mass-schedule',
    color: 'bg-blue-500'
  },
  {
    title: 'Associations',
    description: 'Parish organizations & societies',
    icon: Users,
    href: '/associations',
    color: 'bg-green-500'
  },
  {
    title: 'Daily Readings',
    description: 'Scripture and liturgical calendar',
    icon: BookOpen,
    href: '/daily-liturgy',
    color: 'bg-purple-500'
  },
  {
    title: 'Prayer Requests',
    description: 'Submit your intentions',
    icon: Heart,
    href: '/prayer-requests',
    color: 'bg-red-500'
  },
  {
    title: 'Ask a Padre AI',
    description: 'Catholic Q&A assistance',
    icon: MessageSquare,
    href: '/doctrine',
    color: 'bg-yellow-500'
  },
  {
    title: 'Visit Us',
    description: 'Directions and contact info',
    icon: MapPin,
    href: '/contact',
    color: 'bg-indigo-500'
  }
]

export default function QuickLinks() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
          Parish Resources
        </h2>
        <div className="w-24 h-1 bg-church-primary mx-auto"></div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickLinks.map((link, index) => (
          <motion.a
            key={link.title}
            href={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 3) }}
            className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-church-primary hover:border-church-secondary"
          >
            <div className="flex items-center mb-4">
              <div className={`${link.color} p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform`}>
                <link.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-church-text group-hover:text-church-primary transition-colors">
                {link.title}
              </h3>
            </div>
            <p className="text-gray-600 text-sm">{link.description}</p>
          </motion.a>
        ))}
      </div>
    </section>
  )
}