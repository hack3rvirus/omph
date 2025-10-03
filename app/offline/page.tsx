'use client'

import { motion } from 'framer-motion'
import { WifiOff, Heart, Book, Cross } from 'lucide-react'
import Link from 'next/link'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-church-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <WifiOff className="w-16 h-16 text-church-primary mx-auto mb-6" />
        
        <h1 className="font-serif text-3xl font-bold text-church-text mb-4">
          You're Offline
        </h1>
        
        <p className="text-gray-600 mb-8">
          Don't worry! You can still access some content and prayers while offline. 
          Your connection to God never goes offline.
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <Book className="w-5 h-5 text-church-primary mr-2" />
              <h3 className="font-semibold">Available Offline</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Traditional Catholic Prayers</li>
              <li>• The Holy Rosary</li>
              <li>• Basic Parish Information</li>
              <li>• Mass Schedule</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <Link 
            href="/prayers"
            className="block w-full bg-church-primary text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <Heart className="w-4 h-4 inline mr-2" />
            View Prayers
          </Link>
          
          <Link 
            href="/mass-schedule"
            className="block w-full bg-church-secondary text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <Cross className="w-4 h-4 inline mr-2" />
            Mass Schedule
          </Link>
          
          <button 
            onClick={() => window.location.reload()}
            className="block w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
        </div>

        <div className="mt-8 p-4 bg-church-primary bg-opacity-10 rounded-lg">
          <p className="text-sm text-church-text italic">
            "Be it done unto me according to thy word." - Luke 1:38
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Our Mother of Perpetual Help, pray for us.
          </p>
        </div>
      </motion.div>
    </div>
  )
}