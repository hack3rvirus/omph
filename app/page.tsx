'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Cross, Heart, Users, BookOpen, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react'
import DailyLiturgicalHero from '@/components/DailyLiturgicalHero'
import QuickLinks from '@/components/QuickLinks'
import UpcomingEvents from '@/components/UpcomingEvents'
import NewsPreview from '@/components/NewsPreview'
import ChatBot from '@/components/ChatBot'
import PriestWelcome from '@/components/PriestWelcome'
import ClergyProfiles from '@/components/ClergyProfiles'
import MassScheduleHome from '@/components/MassScheduleHome'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-church-background flex items-center justify-center">
        <div className="text-center">
          <Cross className="w-12 h-12 text-church-primary mx-auto mb-4 animate-pulse" />
          <p className="text-church-text">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-church-background">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Cross className="w-8 h-8 text-church-primary mr-3" />
              <span className="font-serif text-xl font-bold text-church-text">
                Our Mother of Perpetual Help Chaplaincy
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="interactive-text">Home</a>
              <a href="/about" className="interactive-text">About</a>
              <a href="/clergy" className="interactive-text">Clergy</a>
              <a href="/associations" className="interactive-text">Associations</a>
              <a href="/events" className="interactive-text">Events</a>
              <a href="/contact" className="interactive-text">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Slideshow */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          <div className="slideshow-container">
            <div className="slide active" style={{backgroundImage: 'url("/images/church-exterior.jpg")'}}></div>
            <div className="slide" style={{backgroundImage: 'url("/images/our-mother-perpetual-help.jpg")'}}></div>
            <div className="slide" style={{backgroundImage: 'url("/images/chapel-interior.jpg")'}}></div>
            <div className="slide" style={{backgroundImage: 'url("/images/community-gathering.jpg")'}}></div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Daily Content Overlay */}
          <div className="absolute top-20 right-8 max-w-sm">
            <DailyLiturgicalHero />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl"
          >
            <div className="mb-8">
              <img
                src="/images/omph-logo.png"
                alt="Our Mother of Perpetual Help"
                className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-church-primary"
              />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-church-primary drop-shadow-lg animated-heading">
              Our Mother of Perpetual Help
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white drop-shadow-md">
              Chaplaincy, AEFUTHA 1
            </p>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200 drop-shadow-sm">
              "Under her protection, we find comfort and guidance.
              Serving the AEFUTHA community with faith, hope, and love."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-church-primary hover:bg-opacity-90 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Cross className="w-5 h-5 inline mr-2" />
                Join Us This Sunday
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-church-primary transition-all duration-300 shadow-lg hover:shadow-xl">
                <Heart className="w-5 h-5 inline mr-2" />
                Learn More
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Priest Welcome Message */}
      <PriestWelcome />

      {/* Mass Schedule Section */}
      <MassScheduleHome />

      {/* Clergy Profiles */}
      <ClergyProfiles />

      {/* Quick Links Section */}
      <QuickLinks />

      {/* Upcoming Events Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-church-primary mx-auto"></div>
        </motion.div>
        <UpcomingEvents />
      </section>

      {/* News and Announcements Preview */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
              Latest News & Announcements
            </h2>
            <div className="w-24 h-1 bg-church-primary mx-auto"></div>
          </motion.div>
          <NewsPreview />
        </div>
      </section>

      {/* Parish Info Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="catholic-card text-center"
          >
            <Heart className="w-12 h-12 text-church-primary mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold mb-3">Our Patron</h3>
            <p className="text-gray-600">
              Our Mother of Perpetual Help, pray for us. Under your protection, we find comfort and guidance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="catholic-card text-center"
          >
            <Users className="w-12 h-12 text-church-primary mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold mb-3">Our Community</h3>
            <p className="text-gray-600">
              A vibrant Catholic community at AEFUTHA, united in faith, hope, and love.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="catholic-card text-center"
          >
            <BookOpen className="w-12 h-12 text-church-primary mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold mb-3">Daily Readings</h3>
            <p className="text-gray-600">
              Follow the liturgical calendar with daily Mass readings, saints, and reflections.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 hero-gradient">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Join Our Parish Community
            </h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Whether you're a student at AEFUTHA or a member of the local community,
              you're welcome to join us for Mass, fellowship, and spiritual growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-church-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                Visit Us This Sunday
              </button>
              <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-church-primary transition-colors">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Cross className="w-6 h-6 text-church-primary mr-2" />
                <span className="font-serif text-lg font-bold">OMPH Chaplaincy</span>
              </div>
              <p className="text-gray-400 mb-4">
                Serving the AEFUTHA community with faith, hope, and love under the patronage of Our Mother of Perpetual Help.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  📘
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  📷
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">YouTube</span>
                  📺
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/mass-schedule" className="hover:text-white transition-colors">Mass Schedule</a></li>
                <li><a href="/sacraments" className="hover:text-white transition-colors">Sacraments</a></li>
                <li><a href="/daily-liturgy" className="hover:text-white transition-colors">Daily Readings</a></li>
                <li><a href="/prayer-requests" className="hover:text-white transition-colors">Prayer Requests</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Associations</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/associations/cmo" className="hover:text-white transition-colors">Catholic Men Organization</a></li>
                <li><a href="/associations/cwo" className="hover:text-white transition-colors">Catholic Women Organization</a></li>
                <li><a href="/associations/cyon" className="hover:text-white transition-colors">Catholic Youth Organization</a></li>
                <li><a href="/associations/knights-of-columbus" className="hover:text-white transition-colors">Knights of Columbus</a></li>
                <li><a href="/associations/st-vincent-de-paul" className="hover:text-white transition-colors">St. Vincent de Paul</a></li>
                <li><a href="/associations/legion-of-mary" className="hover:text-white transition-colors">Legion of Mary</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="text-gray-400 space-y-2">
                <p>AEFUTHA Campus</p>
                <p>Akure, Ondo State, Nigeria</p>
                <p>+234-XXX-XXX-XXXX</p>
                <p>info@omphaefutha.org</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Our Mother of Perpetual Help Chaplaincy, AEFUTHA 1. All rights reserved.</p>
            <p className="mt-2 text-sm">Website designed with ❤️ for our Catholic community</p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <ChatBot />
    </div>
  )
}
