// src/pages/Clergy.tsx
import React from 'react';
import useSWR from 'swr';
import { getClergy } from '../services/firebaseService';
import ClergyCard from '../components/ClergyCard';
import { ClergyMember } from '../types';

const Clergy = () => {
  const { data: clergyData, error } = useSWR<ClergyMember[]>('clergy', getClergy);

  if (error) return <div className="text-center p-8">Failed to load clergy data.</div>;
  if (!clergyData) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="bg-bgWhite py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading text-5xl text-primaryBlue">Our Shepherds</h1>
          <p className="font-body text-lg text-gray-600 mt-2">Meet the clergy serving our Universal Church, Diocese, and Chaplaincy.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {clergyData.map((person) => (
            <ClergyCard 
              key={person.id}
              name={person.name}
              role={person.role}
              imageUrl={person.imageUrl}
              bio={person.bio}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clergy;