import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchDailySaints } from '../lib/api';

interface DailySaint {
  name: string;
  bio: string;
  patronage: string[];
}

const Saints = () => {
  const [saints, setSaints] = useState<DailySaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSaints = async () => {
      try {
        const data = await fetchDailySaints();
        setSaints(data);
      } catch (err) {
        setError('Unable to load daily saints. Please try again later.');
        // Fallback static saint
        setSaints([{
          name: "St. Francis of Assisi",
          bio: "Founder of the Franciscan Order, known for his love of nature, poverty, and devotion to Christ. He received the stigmata and is the patron saint of animals and ecology.",
          patronage: ["Animals", "Ecology", "Italy"]
        }]);
      } finally {
        setLoading(false);
      }
    };
    loadSaints();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-beigeBg">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Loading daily saints...</div>
        </div>
      </div>
    );
  }

  if (error && saints.length === 0) {
    return (
      <div className="py-16 bg-beigeBg">
        <div className="container mx-auto px-4 text-center">
          <p className="text-liturgicalRed">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-beigeBg">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-5xl text-center text-navyBlue mb-4"
        >
          Saints of the Day
        </motion.h1>
        <p className="font-body text-lg text-center text-darkText mb-12">
          Discover the lives and intercessions of the saints celebrated today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {saints.map((saint, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <h2 className="font-heading text-2xl text-navyBlue mb-4">{saint.name}</h2>
              <p className="font-body text-darkText mb-4 leading-relaxed">{saint.bio}</p>
              {saint.patronage.length > 0 && (
                <div>
                  <strong className="text-warmGold">Patronage:</strong>
                  <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
                    {saint.patronage.map((patron, i) => (
                      <li key={i}>{patron}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-600">
            Saint information sourced from the Catholic liturgical calendar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Saints;
