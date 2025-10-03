import React from 'react';
import { motion } from 'framer-motion';

const WelcomeMessage = () => {
  return (
    <section className="bg-bgWhite py-16 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        {/* Image */}
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="rounded-lg shadow-2xl w-full h-96 bg-gradient-to-br from-primaryBlue to-blue-600 flex items-center justify-center overflow-hidden">
            <img
              src="/assets/images/frchidi.png"
              alt="Rev. Fr. Dr. John Chidi Obasi"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="md:col-span-3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-heading text-4xl text-primaryBlue mb-4">A Warm Welcome to Our Parish Family</h2>
          <p className="font-body text-lg text-darkText mb-4 leading-relaxed">
            Dear brothers and sisters in Christ, peace be with you! It is with immense joy that I welcome you to the online home of Our Mother of Perpetual Help Chaplaincy. Here, we are more than just a community; we are a family united in faith, guided by the loving intercession of our Blessed Mother.
          </p>
          <p className="font-body text-darkText mb-6 leading-relaxed">
            Whether you are a long-time member, a new student or staff at AEFUTHA, or a visitor seeking a spiritual home, know that you are in the right place. Our doors and our hearts are always open. We invite you to explore our website, learn about our vibrant societies, join us for Mass, and grow with us in love and service to God and one another.
          </p>
          <p className="font-heading text-xl text-darkText">Rev. Fr. John Chidi Obasi</p>
          <p className="font-body text-gray-600">Chaplain</p>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeMessage;
