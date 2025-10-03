import React from 'react';
import { motion } from 'framer-motion';

interface ClergyCardProps {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
}

const ClergyCard: React.FC<ClergyCardProps> = ({ name, role, imageUrl, bio }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
      whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img src={imageUrl} alt={name} className="w-full h-72 object-cover" />
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <h3 className="font-heading text-2xl">{name}</h3>
          <p className="font-body text-accentGold">{role}</p>
        </div>
      </div>
      <div className="p-4 flex-grow">
        <p className="font-body text-gray-700 text-sm">{bio}</p>
      </div>
    </motion.div>
  );
};

export default ClergyCard;
