// src/pages/Societies.tsx
import React from 'react';
import useSWR from 'swr';
import { getSocieties } from '../services/firebaseService';
import { Society } from '../types';
import { Link } from 'react-router-dom';

const Societies = () => {
  const { data: societies, error } = useSWR<Society[]>('societies', getSocieties);

  if (error) return <div className="text-center p-8">Failed to load societies data.</div>;
  if (!societies) return <div className="text-center p-8">Loading societies...</div>;

  const organizations = societies.filter(s => s.category === 'Organization');
  const piousSocieties = societies.filter(s => s.category === 'Pious Society');

  return (
    <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h1 className="font-heading text-5xl text-primaryBlue">Parish Societies</h1>
                <p className="font-body text-lg text-gray-600 mt-2">Find your place in our vibrant community of faith and service.</p>
            </div>

            {/* Organizations */}
            <div>
                <h2 className="font-heading text-3xl text-primaryRed mb-6 border-b-2 border-accentGold pb-2">Organizations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {organizations.map(org => (
                        <Link to={`/societies/${org.slug}`} key={org.id} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                            <h3 className="font-heading text-2xl text-primaryBlue">{org.name}</h3>
                            <p className="font-body text-gray-600 mt-2">Patron: {org.patron}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Pious Societies */}
            <div className="mt-16">
                <h2 className="font-heading text-3xl text-primaryRed mb-6 border-b-2 border-accentGold pb-2">Pious Societies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {piousSocieties.map(society => (
                        <Link to={`/societies/${society.slug}`} key={society.id} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                            <h3 className="font-heading text-2xl text-primaryBlue">{society.name}</h3>
                             <p className="font-body text-gray-600 mt-2">Patron: {society.patron}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Societies;