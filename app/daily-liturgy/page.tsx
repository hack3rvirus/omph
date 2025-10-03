'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Book, Calendar, Heart, ArrowRight, Loader, RefreshCw } from 'lucide-react'

interface Reading {
  citation: string
  text: string
  preview: string
}

interface Saint {
  name: string
  type: string
  rank: string
  bio: string
}

interface DailyContent {
  date: string
  saints: Saint[]
  celebration: string
  readings: {
    firstReading: Reading
    psalm: Reading
    secondReading?: Reading
    gospel: Reading
    reflection: string
  }
  source: string
  lastUpdated: string
}

export default function DailyLiturgyPage() {
  const [dailyContent, setDailyContent] = useState<DailyContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedReading, setSelectedReading] = useState<'first' | 'psalm' | 'second' | 'gospel'>('first')

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
      setError('Unable to load today\'s liturgy. Please try again later.')
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
      <div className="min-h-screen bg-church-background flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-church-primary mx-auto mb-4 animate-spin" />
          <h1 className="font-serif text-2xl font-bold text-church-text mb-2">
            Loading Today's Liturgy
          </h1>
          <p className="text-gray-600">Fetching daily readings and saints...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-church-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <Book className="w-16 h-16 text-church-primary mx-auto mb-6" />
          <h1 className="font-serif text-2xl font-bold text-church-text mb-4">
            Daily Liturgy
          </h1>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={fetchDailyContent}
            className="catholic-button flex items-center mx-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!dailyContent) return null

  const getCurrentReading = () => {
    switch (selectedReading) {
      case 'first':
        return dailyContent.readings.firstReading
      case 'psalm':
        return dailyContent.readings.psalm
      case 'second':
        return dailyContent.readings.secondReading
      case 'gospel':
        return dailyContent.readings.gospel
      default:
        return dailyContent.readings.firstReading
    }
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
              {formatDate(dailyContent.date)}
            </h1>
            <p className="text-white text-xl mb-4">{dailyContent.celebration}</p>
            <p className="text-white text-sm opacity-75">
              Last updated: {new Date(dailyContent.lastUpdated).toLocaleTimeString()} • 
              Source: {dailyContent.source}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Saints Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center mb-6">
                <Heart className="w-6 h-6 text-church-primary mr-3" />
                <h2 className="font-serif text-2xl font-bold text-church-text">
                  {dailyContent.saints.length > 1 ? 'Saints of the Day' : 'Saint of the Day'}
                </h2>
              </div>
              
              {dailyContent.saints.map((saint, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="font-serif text-xl font-bold text-church-secondary mb-2">
                    {saint.name}
                  </h3>
                  <span className="inline-block bg-church-primary text-white text-sm font-medium px-3 py-1 rounded-full mb-3">
                    {saint.type}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{saint.bio}</p>
                </div>
              ))}
            </div>

            {/* Daily Reflection */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-serif text-xl font-bold text-church-text mb-4">
                Today's Reflection
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {dailyContent.readings.reflection}
              </p>
            </div>
          </motion.div>

          {/* Readings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex flex-wrap">
                  <button
                    onClick={() => setSelectedReading('first')}
                    className={`px-6 py-4 font-medium transition-colors ${
                      selectedReading === 'first'
                        ? 'bg-church-primary text-white border-b-2 border-church-primary'
                        : 'text-gray-600 hover:text-church-primary'
                    }`}
                  >
                    First Reading
                  </button>
                  <button
                    onClick={() => setSelectedReading('psalm')}
                    className={`px-6 py-4 font-medium transition-colors ${
                      selectedReading === 'psalm'
                        ? 'bg-church-primary text-white border-b-2 border-church-primary'
                        : 'text-gray-600 hover:text-church-primary'
                    }`}
                  >
                    Psalm
                  </button>
                  {dailyContent.readings.secondReading && (
                    <button
                      onClick={() => setSelectedReading('second')}
                      className={`px-6 py-4 font-medium transition-colors ${
                        selectedReading === 'second'
                          ? 'bg-church-primary text-white border-b-2 border-church-primary'
                          : 'text-gray-600 hover:text-church-primary'
                      }`}
                    >
                      Second Reading
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedReading('gospel')}
                    className={`px-6 py-4 font-medium transition-colors ${
                      selectedReading === 'gospel'
                        ? 'bg-church-primary text-white border-b-2 border-church-primary'
                        : 'text-gray-600 hover:text-church-primary'
                    }`}
                  >
                    Gospel
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-church-text mb-2">
                    {getCurrentReading()?.citation}
                  </h3>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-line">
                    {getCurrentReading()?.text}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}