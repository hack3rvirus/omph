import React from 'react';
import { motion } from 'framer-motion';

const Legion = () => {
  return (
    <div className="py-16 bg-beigeBg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-5xl text-navyBlue mb-4">Legion of Mary</h1>
          <p className="font-body text-lg text-darkText max-w-2xl mx-auto">
            The Legion of Mary is a lay Catholic organization founded in Dublin, Ireland, in 1921 by Frank Duff.
            It is dedicated to the spiritual development of its members through prayer, active apostolate, and Marian devotion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-2xl p-8 border border-liturgicalRed"
          >
            <h2 className="font-heading text-3xl text-navyBlue mb-6">Our Mission</h2>
            <p className="font-body text-darkText leading-relaxed mb-4">
              The Legion of Mary seeks to increase the faith and deepen the spirituality of its members through prayer and active apostolate.
              We are devoted to Our Lady and strive to bring souls closer to Christ through our works of mercy and evangelization.
            </p>
            <p className="font-body text-darkText leading-relaxed">
              Our primary apostolate is to go door-to-door, visiting homes to spread the Gospel, distribute religious literature,
              and offer prayers and spiritual support to those in need.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-2xl p-8 border border-warmGold"
          >
            <h2 className="font-heading text-3xl text-navyBlue mb-6">How to Join</h2>
            <p className="font-body text-darkText leading-relaxed mb-4">
              If you feel called to serve Our Lady and spread the faith, we welcome you to join our praesidium.
              Contact our chaplain or any active member to learn more about our meetings and activities.
            </p>
            <div className="space-y-2">
              <p className="font-body font-semibold text-navyBlue">Meeting Times:</p>
              <p className="font-body text-darkText">Every Wednesday, 7:00 PM at the Chapel</p>
              <p className="font-body font-semibold text-navyBlue mt-4">Contact:</p>
              <p className="font-body text-darkText">Fr. Chidi - chaplain@omphchapel.org</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-2xl p-8 border border-navyBlue"
        >
          <h2 className="font-heading text-3xl text-navyBlue mb-6 text-center">The Legionary Promise</h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-body text-darkText leading-relaxed italic text-center mb-6">
              "I, [Name], desire to enroll myself in the Legion of Mary, and I promise with the help of God to be faithful
              to the duties of a Legionary. I will recite daily the prayers of the Legion, namely the Rosary, the Catena,
              and the prayers of the Legionary. I will strive to do all in my power to further the work of the Legion,
              and I will obey the orders of my superiors."
            </p>
            <p className="font-body text-darkText text-center">
              This promise reflects our commitment to Marian devotion, prayer, and active service in the Church.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legion;
