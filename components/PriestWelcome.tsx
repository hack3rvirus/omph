'use client'

import { motion } from 'framer-motion'
import { User, Mail, Phone } from 'lucide-react'

export default function PriestWelcome() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-church-primary to-church-secondary rounded-lg p-8 md:p-12 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Priest Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <div className="w-48 h-48 mx-auto lg:mx-0 rounded-full border-4 border-white shadow-lg overflow-hidden">
              <img
                src="/images/priest-chaplain.jpg"
                alt="Rev. Fr. John Chaplain"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Q0E0QUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcmllc3QgUGhvdG88L3RleHQ+Cjwvc3ZnPg=='
                }}
              />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-2xl font-bold">Rev. Fr. John Chaplain</h3>
              <p className="text-white text-opacity-90">Chaplain</p>
              <p className="text-sm text-white text-opacity-75 mt-1">Our Mother of Perpetual Help Chaplaincy</p>
            </div>
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 text-center lg:text-left"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 animated-heading">
              Welcome to Our Catholic Community
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                "Peace be with you! It is my great joy to welcome you to Our Mother of Perpetual Help Chaplaincy
                at Adekunle Ajasin University. As your chaplain, I am committed to walking with you in your faith journey,
                celebrating the sacraments, and building a vibrant Catholic community on this campus."
              </p>
              <p>
                "Whether you are a student, faculty member, or staff, you are part of our family. May Our Mother of Perpetual Help
                guide us all as we strive to live our faith authentically in our daily lives and studies."
              </p>
              <p>
                "Our chaplaincy serves as a spiritual home where we gather for Mass, adoration, confession, and fellowship.
                Through our various associations and ministries, we work to evangelize, serve the poor, and grow in holiness."
              </p>
              <p className="font-semibold italic">
                "Ad Majorem Dei Gloriam" - For the Greater Glory of God
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="flex items-center text-white">
                <Mail className="w-5 h-5 mr-2" />
                <span>chaplain@aaua.edu.ng</span>
              </div>
              <div className="flex items-center text-white">
                <Phone className="w-5 h-5 mr-2" />
                <span>+234-XXX-XXX-XXXX</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
