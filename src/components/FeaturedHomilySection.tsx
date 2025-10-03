import React from 'react';
import { motion } from 'framer-motion';

const FeaturedHomilySection = () => {
  return (
    <section className="py-16 bg-navyBlue text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl mb-4">Featured Homily</h2>
          <p className="font-body text-lg">Words of wisdom from our chaplain</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white text-navyBlue p-8 rounded-lg shadow-lg"
        >
          <h3 className="font-heading text-2xl mb-4">The Power of Faith in Our Lives</h3>
          <p className="font-body text-lg leading-relaxed mb-4">
            Dear brothers and sisters in Christ, faith is not merely an intellectual assent to certain truths, but a living, dynamic relationship with our Lord Jesus Christ. It is through faith that we find strength in times of trial, hope in moments of despair, and joy in the midst of sorrow.
          </p>
          <p className="font-body text-lg leading-relaxed mb-4">
            As we gather here today, let us remember that our faith is a gift from God, and it is meant to be shared. Let us be beacons of light in our community, showing the love of Christ through our words and actions.
          </p>
          <p className="font-body text-lg leading-relaxed">
            May the Blessed Mother of Perpetual Help continue to intercede for us, guiding us closer to her Son each day.
          </p>
          <p className="font-heading text-right mt-6">- Fr. Chidi Obasi</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedHomilySection;
