'use client'

import { motion } from 'framer-motion'
import { Cross, Heart, Users, Calendar, MapPin, Phone, Mail } from 'lucide-react'

export default function AboutPage() {
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
              About Our Chaplaincy
            </h1>
            <p className="text-white text-xl max-w-3xl mx-auto leading-relaxed">
              Our Mother of Perpetual Help Chaplaincy serves the Catholic community at 
              Adekunle Ajasin University, Akungba-Akoko (AAUA), fostering faith, fellowship, and spiritual growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl font-bold text-church-text mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-church-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <img
              src="https://images.pexels.com/photos/208271/pexels-photo-208271.jpeg"
              alt="Our Mother of Perpetual Help"
              className="w-full rounded-lg shadow-lg"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-2xl font-bold text-church-text">
              Founded in Faith, Growing in Love
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our Mother of Perpetual Help Chaplaincy was established to serve the spiritual needs 
              of Catholic students, staff, and faculty at Adekunle Ajasin University. Under the 
              patronage of Our Mother of Perpetual Help, we provide a home away from home for 
              Catholics in the university community.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We celebrate the Holy Mass, provide sacramental services, organize retreats and 
              spiritual programs, and foster a vibrant Catholic community that supports academic 
              excellence while nurturing spiritual growth.
            </p>
            <div className="flex items-center space-x-4">
              <Heart className="w-6 h-6 text-church-primary" />
              <span className="text-church-text font-medium">
                "Under your protection, we find comfort and guidance"
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="catholic-card text-center"
            >
              <Cross className="w-12 h-12 text-church-primary mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide spiritual guidance, sacramental services, and pastoral care to the 
                Catholic community at AAUA, fostering holiness and academic excellence in the 
                light of Catholic teaching.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="catholic-card text-center"
            >
              <Heart className="w-12 h-12 text-church-primary mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be a beacon of Catholic faith and values in the university, forming young 
                Catholics who will be leaders in their professions and witnesses to Christ 
                in the world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Patron Saint */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl font-bold text-church-text mb-4">Our Patron Saint</h2>
          <div className="w-24 h-1 bg-church-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-2xl font-bold text-church-text">
              Our Mother of Perpetual Help
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our Mother of Perpetual Help is a title of the Blessed Virgin Mary associated with 
              a miraculous icon housed in the Church of Sant'Alfonso in Rome. The icon depicts 
              Mary holding the Child Jesus, with the Archangels Michael and Gabriel showing Him 
              the instruments of His future Passion.
            </p>
            <p className="text-gray-600 leading-relaxed">
              She is invoked as a powerful intercessor for those in need, especially students 
              facing academic challenges, families in distress, and all who seek her maternal 
              protection. Her feast day is celebrated on June 27th.
            </p>
            <div className="bg-church-primary bg-opacity-10 p-4 rounded-lg">
              <p className="text-church-text font-medium italic">
                "Mother of Perpetual Help, you have been blessed and favored by God. 
                You became not only the Mother of the Redeemer, but the Mother of the redeemed as well. 
                We come to you today as your loving children."
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
          >
            <img
              src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg"
              alt="Our Mother of Perpetual Help Icon"
              className="w-full rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold text-church-text mb-4">Visit Us</h2>
            <div className="w-24 h-1 bg-church-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
              className="catholic-card text-center"
            >
              <MapPin className="w-8 h-8 text-church-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-gray-600 text-sm">
                Adekunle Ajasin University<br />
                Akungba-Akoko<br />
                Ondo State, Nigeria
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
              className="catholic-card text-center"
            >
              <Phone className="w-8 h-8 text-church-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">
                +234-XXX-XXX-XXXX<br />
                <span className="text-xs">Available during office hours</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4 }}
              className="catholic-card text-center"
            >
              <Mail className="w-8 h-8 text-church-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600 text-sm">
                chaplain@aaua.edu.ng<br />
                <span className="text-xs">We respond within 24 hours</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}