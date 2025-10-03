'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'

const newsItems = [
  {
    id: 1,
    title: "Feast of Our Mother of Perpetual Help Celebration",
    excerpt: "Join us for a special celebration honoring our beloved patron. The day will include special Mass, procession, and community fellowship.",
    date: "September 15, 2025",
    category: "Celebration",
    image: "https://images.pexels.com/photos/208271/pexels-photo-208271.jpeg"
  },
  {
    id: 2,
    title: "New Academic Year Blessing",
    excerpt: "All students, faculty, and staff are invited to the blessing ceremony as we begin the new academic year with God's grace.",
    date: "September 10, 2025",
    category: "Academic",
    image: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg"
  },
  {
    id: 3,
    title: "Catholic Men Organization Installation",
    excerpt: "The installation ceremony for new CMO executives will take place after Sunday Mass. All parishioners are welcome.",
    date: "September 5, 2025",
    category: "Association",
    image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg"
  }
]

export default function NewsPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {newsItems.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
          <div className="aspect-video bg-gray-200 relative overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-church-primary text-white text-xs font-medium px-2 py-1 rounded">
                {item.category}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <Calendar className="w-4 h-4 mr-1" />
              {item.date}
            </div>
            
            <h3 className="font-serif text-lg font-bold text-church-text mb-3 line-clamp-2">
              {item.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {item.excerpt}
            </p>
            
            <button className="flex items-center text-church-primary hover:text-church-secondary font-medium text-sm transition-colors">
              Read More
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </motion.article>
      ))}
    </div>
  )
}