'use client'

import { motion } from 'framer-motion'
import { Book, MessageCircle, Heart, Cross, ArrowRight } from 'lucide-react'
import ChatBot from '@/components/ChatBot'

const doctrineTopics = [
  {
    title: 'The Trinity',
    description: 'One God in three divine Persons - Father, Son, and Holy Spirit',
    icon: Cross,
    color: 'bg-blue-500'
  },
  {
    title: 'Sacraments',
    description: 'The seven sacraments instituted by Christ for our salvation',
    icon: Heart,
    color: 'bg-green-500'
  },
  {
    title: 'Scripture & Tradition',
    description: 'The Word of God revealed through Sacred Scripture and Sacred Tradition',
    icon: Book,
    color: 'bg-purple-500'
  },
  {
    title: 'Prayer & Devotion',
    description: 'Various forms of prayer and devotion in Catholic spirituality',
    icon: MessageCircle,
    color: 'bg-red-500'
  }
]

const catholicResources = [
  {
    title: 'Catechism of the Catholic Church',
    description: 'The official compendium of Catholic doctrine',
    link: 'https://www.vatican.va/content/catechism/en.html',
    type: 'Official Document'
  },
  {
    title: 'Catholic Answers',
    description: 'Comprehensive Q&A on Catholic faith and practice',
    link: 'https://www.catholic.com/',
    type: 'Apologetics'
  },
  {
    title: 'Vatican Website',
    description: 'Official website of the Holy See',
    link: 'https://www.vatican.va/',
    type: 'Official'
  },
  {
    title: 'USCCB',
    description: 'United States Conference of Catholic Bishops',
    link: 'https://www.usccb.org/',
    type: 'Bishops Conference'
  }
]

export default function DoctrinePage() {
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
            <Cross className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Catholic Doctrine & Faith
            </h1>
            <p className="text-white text-xl max-w-3xl mx-auto leading-relaxed">
              Explore the teachings of the Catholic Church, deepen your understanding of our faith,
              and find answers to your spiritual questions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ASK A PADRE AI Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <MessageCircle className="w-12 h-12 text-church-primary mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
            ASK A PADRE AI
          </h2>
          <div className="w-24 h-1 bg-church-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our Catholic Q&A assistant is here to help you explore faith, doctrine, and spirituality.
            Ask questions about Scripture, saints, sacraments, prayer, and more.
          </p>
        </motion.div>

        {/* Chatbot Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <div className="text-center mb-6">
              <h3 className="font-serif text-xl font-bold text-church-text mb-2">
                Start a Conversation
              </h3>
              <p className="text-gray-600">
                Click the chat button below or ask questions about Catholic faith
              </p>
            </div>

            {/* Sample Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-church-text mb-2">What are the sacraments?</h4>
                <p className="text-sm text-gray-600">Learn about the seven sacraments of the Church</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-church-text mb-2">How should I pray?</h4>
                <p className="text-sm text-gray-600">Discover different forms of Catholic prayer</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-church-text mb-2">Who are the saints?</h4>
                <p className="text-sm text-gray-600">Understand the role of saints in our faith</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-church-text mb-2">What is the Trinity?</h4>
                <p className="text-sm text-gray-600">Explore the mystery of one God in three Persons</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                ⛪ For personal spiritual matters, always consult your parish priest
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Doctrine Topics */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
              Key Areas of Catholic Doctrine
            </h2>
            <div className="w-24 h-1 bg-church-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore fundamental teachings of the Catholic faith and deepen your understanding
              of our rich spiritual tradition.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctrineTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 8) }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
              >
                <div className={`${topic.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <topic.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-lg font-bold text-church-text mb-3">
                  {topic.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {topic.description}
                </p>
                <button className="text-church-primary hover:text-church-secondary font-medium transition-colors">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catholic Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
            Catholic Resources
          </h2>
          <div className="w-24 h-1 bg-church-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access authoritative Catholic resources for further study and spiritual growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {catholicResources.map((resource, index) => (
            <motion.a
              key={resource.title}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 12) }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-church-primary group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-bold text-church-text mb-2 group-hover:text-church-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {resource.description}
                  </p>
                  <span className="inline-block bg-church-primary bg-opacity-10 text-church-primary text-xs font-medium px-2 py-1 rounded">
                    {resource.type}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-church-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-church-primary">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <Heart className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Continue Your Faith Journey
            </h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              The Catholic faith is a lifelong journey of discovery and growth.
              Let us help you deepen your relationship with Christ and His Church.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-church-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                Join Our Community
              </button>
              <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-church-primary transition-colors">
                Contact a Priest
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chatbot */}
      <ChatBot />
    </div>
  )
}
