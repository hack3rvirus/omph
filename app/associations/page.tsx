'use client'

import { motion } from 'framer-motion'
import { Users, Heart, Cross, ArrowRight, Calendar, Mail, User } from 'lucide-react'
import Link from 'next/link'

const associations = [
  {
    id: 'cmo',
    name: 'Catholic Men Organization',
    type: 'Association',
    patron: 'St. Joseph',
    description: 'The Catholic Men Organization (CMO) is dedicated to fostering spiritual growth, fellowship, and service among Catholic men in the chaplaincy.',
    members: 45,
    established: '2010',
    color: 'bg-blue-500'
  },
  {
    id: 'cwo',
    name: 'Catholic Women Organization',
    type: 'Association',
    patron: 'Blessed Virgin Mary',
    description: 'The Catholic Women Organization (CWO) empowers women to live their faith actively through prayer, service, and community building.',
    members: 62,
    established: '2010',
    color: 'bg-pink-500'
  },
  {
    id: 'cyon',
    name: 'Catholic Youth Organization of Nigeria',
    type: 'Association',
    patron: 'St. John Bosco',
    description: 'CYON provides a platform for young Catholics to grow in faith, develop leadership skills, and serve the Church and society.',
    members: 89,
    established: '2011',
    color: 'bg-green-500'
  },
  {
    id: 'nfcs',
    name: 'Nigeria Federation of Catholic Students',
    type: 'Association',
    patron: 'St. Thomas Aquinas',
    description: 'NFCS unites Catholic students in academic excellence, spiritual formation, and apostolic service.',
    members: 156,
    established: '2009',
    color: 'bg-purple-500'
  },
  {
    id: 'fecamds',
    name: 'Federation of Catholic Medical and Dental Students',
    type: 'Association',
    patron: 'St. Luke the Evangelist',
    description: 'FECAMDS supports Catholic medical and dental students in integrating faith with their professional calling.',
    members: 23,
    established: '2015',
    color: 'bg-red-500'
  },
  {
    id: 'altar-knights',
    name: 'Altar Knights',
    type: 'Association',
    patron: 'St. Tarcisius',
    description: 'Altar Knights serve at the altar during liturgical celebrations, assisting priests and deacons in the sacred liturgy.',
    members: 18,
    established: '2012',
    color: 'bg-yellow-500'
  },
  {
    id: 'choir',
    name: 'Chaplaincy Choir',
    type: 'Association',
    patron: 'St. Cecilia',
    description: 'The choir leads the congregation in worship through sacred music and liturgical songs.',
    members: 34,
    established: '2010',
    color: 'bg-indigo-500'
  },
  {
    id: 'lectors',
    name: 'Board of Lectors',
    type: 'Association',
    patron: 'St. Philip the Deacon',
    description: 'Lectors proclaim the Word of God during liturgical celebrations and help with scripture-based ministries.',
    members: 16,
    established: '2011',
    color: 'bg-teal-500'
  },
  {
    id: 'knights-of-columbus',
    name: 'Knights of Columbus',
    type: 'Association',
    patron: 'Christopher Columbus',
    description: 'A Catholic fraternal organization dedicated to charity, unity, fraternity, and patriotism, supporting families and communities.',
    members: 28,
    established: '2016',
    color: 'bg-red-600'
  },
  {
    id: 'st-vincent-de-paul',
    name: 'Society of St. Vincent de Paul',
    type: 'Association',
    patron: 'St. Vincent de Paul',
    description: 'Dedicated to serving the poor and marginalized through direct assistance, advocacy, and systemic change.',
    members: 35,
    established: '2014',
    color: 'bg-orange-500'
  },
  {
    id: 'rosary-society',
    name: 'Living Rosary Society',
    type: 'Association',
    patron: 'Blessed Virgin Mary',
    description: 'Devoted to the recitation of the Holy Rosary and promoting Marian devotion among the faithful.',
    members: 42,
    established: '2012',
    color: 'bg-rose-500'
  },
  {
    id: 'catechists',
    name: 'Catholic Catechists Association',
    type: 'Association',
    patron: 'St. John Paul II',
    description: 'Trains and supports lay catechists in teaching the faith, preparing candidates for sacraments.',
    members: 24,
    established: '2013',
    color: 'bg-emerald-500'
  }
]

const piousSocieties = [
  {
    id: 'legion-of-mary',
    name: 'Legion of Mary',
    type: 'Pious Society',
    patron: 'Blessed Virgin Mary',
    description: 'The Legion of Mary is a lay apostolic association whose members serve the Church on a voluntary basis.',
    members: 28,
    established: '2013',
    color: 'bg-blue-600'
  },
  {
    id: 'omph-society',
    name: 'Our Mother of Perpetual Help Society',
    type: 'Pious Society',
    patron: 'Our Mother of Perpetual Help',
    description: 'Devoted to spreading devotion to Our Mother of Perpetual Help through prayer and service.',
    members: 35,
    established: '2010',
    color: 'bg-blue-700'
  },
  {
    id: 'sacred-heart',
    name: 'Sacred Heart Society',
    type: 'Pious Society',
    patron: 'Sacred Heart of Jesus',
    description: 'Dedicated to promoting devotion to the Sacred Heart of Jesus through prayer and reparation.',
    members: 22,
    established: '2014',
    color: 'bg-red-600'
  }
]

export default function AssociationsPage() {
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
            <Users className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Associations & Societies
            </h1>
            <p className="text-white text-xl max-w-3xl mx-auto leading-relaxed">
              Join our vibrant Catholic community through various associations and pious societies 
              that foster spiritual growth, fellowship, and service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Associations Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl font-bold text-church-text mb-4">Parish Associations</h2>
          <div className="w-24 h-1 bg-church-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our associations bring together Catholics with shared interests and callings to serve 
            the Church and community in various capacities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {associations.map((association, index) => (
            <motion.div
              key={association.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 3) }}
              className="association-card group hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`${association.color} p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform`}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-church-text group-hover:text-church-primary transition-colors">
                    {association.name}
                  </h3>
                  <p className="text-sm text-gray-500">Patron: {association.patron}</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {association.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {association.members} members
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Est. {association.established}
                </div>
              </div>
              
              <Link 
                href={`/associations/${association.id}`}
                className="flex items-center text-church-primary hover:text-church-secondary font-medium transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pious Societies Section */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold text-church-text mb-4">Pious Societies</h2>
            <div className="w-24 h-1 bg-church-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our pious societies focus on specific devotions and spiritual practices, 
              deepening our relationship with God through prayer and contemplation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {piousSocieties.map((society, index) => (
              <motion.div
                key={society.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 10) }}
                className="association-card group hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className={`${society.color} p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform`}>
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-church-text group-hover:text-church-primary transition-colors">
                      {society.name}
                    </h3>
                    <p className="text-sm text-gray-500">Patron: {society.patron}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {society.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {society.members} members
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Est. {society.established}
                  </div>
                </div>
                
                <Link 
                  href={`/associations/${society.id}`}
                  className="flex items-center text-church-primary hover:text-church-secondary font-medium transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <Cross className="w-12 h-12 text-church-primary mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're called to serve, learn, or grow in faith, there's a place for you 
            in our associations and societies. Come and be part of our Catholic family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="catholic-button">
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </button>
            <button className="catholic-button-secondary">
              <Calendar className="w-4 h-4 mr-2" />
              Attend a Meeting
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}