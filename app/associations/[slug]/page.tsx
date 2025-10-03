'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Users, Heart, Calendar, Mail, Phone, User, Crown } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Mock data - in production, this would come from a database
const associationData: Record<string, any> = {
  'cmo': {
    name: 'Catholic Men Organization',
    patron: 'St. Joseph',
    type: 'Association',
    established: '2010',
    description: 'The Catholic Men Organization (CMO) is dedicated to fostering spiritual growth, fellowship, and service among Catholic men in the chaplaincy. We strive to be exemplary Catholic gentlemen who lead by example in our families, workplace, and community.',
    mission: 'To form Catholic men who are committed to their faith, family, and community service.',
    vision: 'To be a beacon of Catholic masculinity that inspires others to live according to Gospel values.',
    activities: [
      'Monthly spiritual meetings and reflections',
      'Annual retreat and recollection',
      'Community service projects',
      'Youth mentorship programs',
      'Family support initiatives'
    ],
    meetingTime: 'First Sunday of every month after 10:00 AM Mass',
    patronInfo: 'St. Joseph, the foster father of Jesus and husband of Mary, is the patron of workers, fathers, and the universal Church. He exemplifies quiet strength, faithfulness, and trust in God\'s plan.',
    executives: [
      { name: 'Mr. John Adebayo', role: 'President', email: 'john.adebayo@email.com', year: 2025 },
      { name: 'Mr. Peter Okafor', role: 'Vice President', email: 'peter.okafor@email.com', year: 2025 },
      { name: 'Mr. David Olumide', role: 'Secretary', email: 'david.olumide@email.com', year: 2025 },
      { name: 'Mr. Michael Adesanya', role: 'Treasurer', email: 'michael.adesanya@email.com', year: 2025 },
      { name: 'Mr. Joseph Ikechukwu', role: 'Financial Secretary', email: 'joseph.ikechukwu@email.com', year: 2025 }
    ],
    members: [
      { name: 'Mr. Emmanuel Ogundimu', email: 'emmanuel.ogundimu@email.com', year: 2025 },
      { name: 'Mr. Francis Adeyemi', email: 'francis.adeyemi@email.com', year: 2025 },
      { name: 'Mr. Anthony Nwosu', email: 'anthony.nwosu@email.com', year: 2025 },
      { name: 'Mr. Christopher Ojo', email: 'christopher.ojo@email.com', year: 2025 },
      { name: 'Mr. Gabriel Okoro', email: 'gabriel.okoro@email.com', year: 2025 }
    ]
  },
  'legion-of-mary': {
    name: 'Legion of Mary',
    patron: 'Blessed Virgin Mary',
    type: 'Pious Society',
    established: '2013',
    description: 'The Legion of Mary is a lay apostolic association whose members serve the Church on a voluntary basis in union with Mary, the Mother of Christ. We are organized as a Praesidium under the guidance of our Spiritual Director.',
    mission: 'To serve God through Mary by bringing souls to Jesus and Jesus to souls.',
    vision: 'To be Mary\'s instrument in the salvation of souls and the sanctification of the world.',
    activities: [
      'Weekly praesidium meetings with prayers and spiritual reading',
      'Visitation of homes and hospitals',
      'Catechism teaching for children',
      'Evangelization and street apostolate',
      'Prison ministry and care for the elderly'
    ],
    meetingTime: 'Every Sunday at 4:00 PM in the Parish Hall',
    patronInfo: 'The Blessed Virgin Mary, Mother of God and our Mother, is the perfect model of discipleship. She teaches us to say "yes" to God\'s will and to bring others to her Son Jesus.',
    executives: [
      { name: 'Mrs. Mary Adebisi', role: 'President', email: 'mary.adebisi@email.com', year: 2025 },
      { name: 'Miss Grace Okonkwo', role: 'Vice President', email: 'grace.okonkwo@email.com', year: 2025 },
      { name: 'Mrs. Rose Akinola', role: 'Secretary', email: 'rose.akinola@email.com', year: 2025 },
      { name: 'Mrs. Agnes Okoro', role: 'Treasurer', email: 'agnes.okoro@email.com', year: 2025 }
    ],
    members: [
      { name: 'Mrs. Catherine Adeyemi', email: 'catherine.adeyemi@email.com', year: 2025 },
      { name: 'Miss Blessing Okafor', email: 'blessing.okafor@email.com', year: 2025 },
      { name: 'Mrs. Patience Nwosu', email: 'patience.nwosu@email.com', year: 2025 },
      { name: 'Miss Joy Olumide', email: 'joy.olumide@email.com', year: 2025 }
    ]
  }
}

export default function AssociationDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const association = associationData[slug]

  if (!association) {
    return (
      <div className="min-h-screen bg-church-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-church-text mb-4">Association Not Found</h1>
          <Link href="/associations" className="text-church-primary hover:underline">
            ← Back to Associations
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-church-background">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-church-primary to-church-secondary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              href="/associations"
              className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Associations
            </Link>
            
            <div className="flex items-center mb-6">
              {association.type === 'Association' ? (
                <Users className="w-12 h-12 text-white mr-4" />
              ) : (
                <Heart className="w-12 h-12 text-white mr-4" />
              )}
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
                  {association.name}
                </h1>
                <p className="text-white text-lg opacity-90">
                  Patron: {association.patron} • Est. {association.established}
                </p>
              </div>
            </div>
            
            <p className="text-white text-lg max-w-3xl leading-relaxed">
              {association.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="catholic-card"
            >
              <h2 className="font-serif text-2xl font-bold text-church-text mb-6">Mission & Vision</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-church-secondary mb-2">Our Mission</h3>
                  <p className="text-gray-600">{association.mission}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-church-secondary mb-2">Our Vision</h3>
                  <p className="text-gray-600">{association.vision}</p>
                </div>
              </div>
            </motion.div>

            {/* Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="catholic-card"
            >
              <h2 className="font-serif text-2xl font-bold text-church-text mb-6">Our Activities</h2>
              <ul className="space-y-3">
                {association.activities.map((activity: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-church-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{activity}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Patron Saint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="catholic-card"
            >
              <h2 className="font-serif text-2xl font-bold text-church-text mb-6">Our Patron Saint</h2>
              <div className="flex items-start">
                <Crown className="w-8 h-8 text-church-primary mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-church-secondary mb-2">{association.patron}</h3>
                  <p className="text-gray-600 leading-relaxed">{association.patronInfo}</p>
                </div>
              </div>
            </motion.div>

            {/* Executives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="catholic-card"
            >
              <h2 className="font-serif text-2xl font-bold text-church-text mb-6">Executive Members (2025)</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-church-text">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-church-text">Position</th>
                      <th className="text-left py-3 px-4 font-semibold text-church-text">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {association.executives.map((exec: any, index: number) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">{exec.name}</td>
                        <td className="py-3 px-4">
                          <span className="bg-church-primary bg-opacity-10 text-church-primary px-2 py-1 rounded text-sm">
                            {exec.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <a 
                            href={`mailto:${exec.email}`}
                            className="text-church-primary hover:underline text-sm"
                          >
                            {exec.email}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Members */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="catholic-card"
            >
              <h2 className="font-serif text-2xl font-bold text-church-text mb-6">
                Members ({association.executives.length + association.members.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {association.members.map((member: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">{member.name}</span>
                    </div>
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-church-primary hover:underline text-sm"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Meeting Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="catholic-card"
            >
              <h3 className="font-serif text-xl font-bold text-church-text mb-4">Meeting Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-church-primary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">When</p>
                    <p className="text-gray-600 text-sm">{association.meetingTime}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-church-primary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Members</p>
                    <p className="text-gray-600 text-sm">{association.executives.length + association.members.length} active members</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Join Us */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="catholic-card text-center"
            >
              <Heart className="w-12 h-12 text-church-primary mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-church-text mb-4">Join Us</h3>
              <p className="text-gray-600 text-sm mb-6">
                Interested in joining our {association.type.toLowerCase()}? Contact us to learn more about membership.
              </p>
              <div className="space-y-3">
                <button className="w-full catholic-button">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </button>
                <button className="w-full catholic-button-secondary">
                  <Calendar className="w-4 h-4 mr-2" />
                  Attend Meeting
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}