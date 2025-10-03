import React from 'react';
import { motion } from 'framer-motion';
import ClergyCard from './ClergyCard';

const clergyData = [
  {
    name: 'Pope Leo XIV',
    role: 'Pope',
    imageUrl: '/assets/images/popeleo.png',
    bio: 'His Holiness Pope Leo XIV, the Vicar of Christ and leader of the universal Church, guiding the faithful with compassion and mercy.'
  },
  {
    name: 'Archbishop Micheal Crotty',
    role: 'Papal Nuncio to Nigeria',
    imageUrl: '/assets/images/papalnuncio.png',
    bio: 'The Apostolic Nuncio representing the Holy See in Nigeria, fostering diplomatic and spiritual relations.'
  },
  {
    name: 'Revd. Dr. Peter Nworie Chukwu',
    role: 'Bishop',
    imageUrl: '/assets/images/bishoppeter.png',
    bio: 'Bishop Peter, the current bishop overseeing our diocese with pastoral care and leadership.'
  },
  {
    name: 'Revd. Dr. Michael Nnachi Okoro',
    role: 'Bishop Emeritus',
    imageUrl: '/assets/images/bishopemerituss.png',
    bio: 'Bishop Michael Nnachi Okoro, our Bishop Emeritus, whose wisdom and service continue to inspire the faithful.'
  },
  {
    name: 'Rev. Fr. Dr. John Chidi Obasi',
    role: 'Chaplain',
    imageUrl: '/assets/images/frchidi.png',
    bio: 'Fr. Chidi Obasi, the dedicated chaplain of OMPH Chaplaincy, serving the community with devotion and spiritual guidance.'
  },
  {
    name: 'Rev. Fr. Patrick Ekoh Otuibe',
    role: 'Assistant Chaplain',
    imageUrl: '/assets/images/thechaplains.png',
    bio: 'The Assistant Chaplain supporting the spiritual needs of our parish community with dedication.'
  },
  {
    name: 'Rev. Fr. Patrick Ezeonu',
    role: 'Resident Chaplain',
    imageUrl: '/assets/images/religous.png',
    bio: 'The Resident Chaplain providing ongoing pastoral care and support to the faithful.'
  }
];

const ClergySection = () => {
  return (
    <section className="py-16 bg-beigeBg">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-4xl text-center text-navyBlue mb-12"
        >
          Our Clergy
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clergyData.map((clergy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ClergyCard {...clergy} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClergySection;
