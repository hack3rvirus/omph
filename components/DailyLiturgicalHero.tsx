'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Book, Heart, ArrowRight, Loader } from 'lucide-react'

interface Saint {
  name: string
  type: string
  rank: string
  bio: string
}

interface Reading {
  citation: string
  text: string
  preview: string
}

interface DailyContent {
  date: string
  saints: Saint[]
  celebration: string
  readings: {
    firstReading: Reading
    psalm: Reading
    gospel: Reading
    reflection: string
  }
  source: string
  lastUpdated: string
}

export default function DailyLiturgicalHero() {
  const [dailyContent, setDailyContent] = useState<DailyContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDailyContent()
  }, [])

  const fetchDailyContent = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/daily-content')
      if (!response.ok) {
        throw new Error('Failed to fetch daily content')
      }
      
      const data = await response.json()
      setDailyContent(data)
    } catch (error) {
      console.error('Error fetching daily content:', error)
      setError('Failed to load daily content. Please refresh the page.')
    } finally {
      setLoading(false)
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

  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-church-primary to-church-secondary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-4">
              <Loader className="w-8 h-8 animate-spin mr-3" />
              <h1 className="font-serif text-2xl md:text-3xl font-bold">
                Loading Today's Liturgy...
              </h1>
            </div>
            <p className="text-white text-lg opacity-90">Fetching daily readings and saints</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative bg-gradient-to-br from-church-primary to-church-secondary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="font-serif text-2xl md:text-3xl font-bold mb-4">Daily Liturgy</h1>
          <p className="text-red-200 mb-4">{error}</p>
          <button 
            onClick={fetchDailyContent}
            className="bg-white text-church-primary px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  if (!dailyContent) return null

  return (
    <section className="relative bg-gradient-to-br from-church-primary to-church-secondary py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-white mr-3" />
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white">
              {formatDate(dailyContent.date)}
            </h1>
          </div>
          <p className="text-white text-lg opacity-90">{dailyContent.celebration}</p>
          <p className="text-white text-sm opacity-75 mt-2">
            Last updated: {new Date(dailyContent.lastUpdated).toLocaleTimeString()} • Source: {dailyContent.source}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Saints of the Day */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white bg-opacity-95 rounded-lg p-6 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-church-primary mr-2" />
              <h2 className="font-serif text-xl font-bold text-church-text">
                {dailyContent.saints.length > 1 ? 'Saints of the Day' : 'Saint of the Day'}
              </h2>
            </div>
            {dailyContent.saints.map((saint, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="font-semibold text-church-secondary mb-1">{saint.name}</h3>
                <span className="text-sm text-church-primary font-medium bg-church-primary bg-opacity-10 px-2 py-1 rounded">
                  {saint.type}
                </span>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">{saint.bio}</p>
              </div>
            ))}
            <button className="w-full mt-4 text-church-primary hover:text-church-secondary transition-colors font-medium flex items-center justify-center">
              Read Full Story
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </motion.div>

          {/* Mass Readings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white bg-opacity-95 rounded-lg p-6 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <Book className="w-6 h-6 text-church-primary mr-2" />
              <h2 className="font-serif text-xl font-bold text-church-text">Daily Readings</h2>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-church-secondary">First Reading:</span>
                <p className="text-church-text font-medium">{dailyContent.readings.firstReading.citation}</p>
                <p className="text-gray-600 text-sm">{dailyContent.readings.firstReading.preview}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-church-secondary">Responsorial Psalm:</span>
                <p className="text-church-text font-medium">{dailyContent.readings.psalm.citation}</p>
                <p className="text-gray-600 text-sm">{dailyContent.readings.psalm.preview}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-church-secondary">Gospel:</span>
                <p className="text-church-text font-medium">{dailyContent.readings.gospel.citation}</p>
                <p className="text-gray-600 text-sm">{dailyContent.readings.gospel.preview}</p>
              </div>
            </div>
            <button className="w-full mt-4 text-church-primary hover:text-church-secondary transition-colors font-medium flex items-center justify-center">
              Read Full Texts
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </motion.div>

          {/* Daily Reflection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white bg-opacity-95 rounded-lg p-6 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-church-primary mr-2" />
              <h2 className="font-serif text-xl font-bold text-church-text">Today's Reflection</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {dailyContent.readings.reflection}
            </p>
            <button className="w-full text-church-primary hover:text-church-secondary transition-colors font-medium flex items-center justify-center">
              Full Reflection & Prayer
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}