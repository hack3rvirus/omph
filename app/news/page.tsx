'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Search, Tag } from 'lucide-react'

const newsArticles = [
  {
    id: 1,
    title: "New Academic Year Blessing Ceremony",
    excerpt: "Our Mother of Perpetual Help Chaplaincy welcomed students, faculty, and staff for the annual blessing ceremony marking the beginning of the new academic year.",
    content: "The ceremony was presided over by Rev. Fr. John Doe, with prayers for academic success, spiritual growth, and divine protection throughout the year.",
    date: "2025-01-15",
    category: "Academic",
    author: "Chaplaincy Communications",
    image: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg",
    featured: true
  },
  {
    id: 2,
    title: "Catholic Men Organization Installation",
    excerpt: "The Catholic Men Organization held their annual installation ceremony, welcoming new executives for the 2025 term.",
    content: "The ceremony featured the installation of new officers and a commitment to serve the parish community with dedication and faith.",
    date: "2025-01-10",
    category: "Association",
    author: "CMO Secretary",
    image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg",
    featured: false
  },
  {
    id: 3,
    title: "Lenten Season Preparation",
    excerpt: "As we approach the holy season of Lent, the chaplaincy announces special programs for prayer, fasting, and almsgiving.",
    content: "Join us for daily Mass, Stations of the Cross, and special Lenten missions to deepen your spiritual journey.",
    date: "2025-01-08",
    category: "Liturgical",
    author: "Parish Priest",
    image: "https://images.pexels.com/photos/208271/pexels-photo-208271.jpeg",
    featured: false
  },
  {
    id: 4,
    title: "Youth Ministry Retreat Success",
    excerpt: "Over 80 young adults participated in the annual youth retreat, focusing on 'Called to Holiness in the Modern World'.",
    content: "The retreat featured inspiring talks, group discussions, and moments of prayer and reflection.",
    date: "2025-01-05",
    category: "Youth",
    author: "CYON Coordinator",
    image: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg",
    featured: false
  },
  {
    id: 5,
    title: "Christmas Celebration Highlights",
    excerpt: "The chaplaincy celebrated the birth of Christ with midnight Mass, carol service, and community fellowship.",
    content: "The celebration brought together the entire university community in joy and thanksgiving.",
    date: "2024-12-25",
    category: "Celebration",
    author: "Chaplaincy Communications",
    image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg",
    featured: false
  },
  {
    id: 6,
    title: "New Catechism Classes Begin",
    excerpt: "Adult catechism classes have commenced for those seeking to deepen their understanding of the Catholic faith.",
    content: "Classes are held every Wednesday evening and cover fundamental Catholic teachings and practices.",
    date: "2024-12-20",
    category: "Education",
    author: "Catechist",
    image: "https://images.pexels.com/photos/208271/pexels-photo-208271.jpeg",
    featured: false
  }
]

const categories = ["All", "Academic", "Association", "Liturgical", "Youth", "Celebration", "Education"]

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredNews, setFilteredNews] = useState(newsArticles)

  const handleFilter = () => {
    let filtered = newsArticles

    if (selectedCategory !== "All") {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredNews(filtered)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const featuredArticle = newsArticles.find(article => article.featured)
  const regularArticles = filteredNews.filter(article => !article.featured)

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
              Parish News
            </h1>
            <p className="text-white text-xl max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest news and happenings in our parish community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                handleFilter()
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-church-primary" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                handleFilter()
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </motion.div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-12"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-church-primary text-white text-xs font-medium px-2 py-1 rounded mr-3">
                    Featured
                  </span>
                  <span className="bg-church-secondary text-white text-xs font-medium px-2 py-1 rounded">
                    {featuredArticle.category}
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-church-text mb-4">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-600 mb-4">{featuredArticle.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(featuredArticle.date)}
                  </div>
                  <button className="flex items-center text-church-primary hover:text-church-secondary font-medium transition-colors">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-church-primary text-white text-xs font-medium px-2 py-1 rounded">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(article.date)}
                </div>
                
                <h3 className="font-serif text-lg font-bold text-church-text mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">By {article.author}</span>
                  <button className="flex items-center text-church-primary hover:text-church-secondary font-medium text-sm transition-colors">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
              Stay Informed
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest news and updates 
              directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
              />
              <button className="catholic-button">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}