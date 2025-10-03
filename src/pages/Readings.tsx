import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchDailyReadings } from '../lib/api';

interface DailyReading {
  firstReading: string;
  psalm: string;
  gospel: string;
  reflection?: string;
}

const Readings = () => {
  const [readings, setReadings] = useState<DailyReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReadings = async () => {
      try {
        const data = await fetchDailyReadings();
        setReadings(data);
      } catch (err) {
        setError('Unable to load daily readings. Please try again later.');
        // Fallback static readings
        setReadings({
          firstReading: "Reading from the Book of Genesis: In the beginning, God created the heavens and the earth...",
          psalm: "Psalm 104: The Lord is compassionate and gracious...",
          gospel: "Gospel according to John: In the beginning was the Word...",
          reflection: "Reflect on God's creative power and His love for us."
        });
      } finally {
        setLoading(false);
      }
    };
    loadReadings();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-beigeBg">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Loading daily readings...</div>
        </div>
      </div>
    );
  }

  if (error && !readings) {
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
          Daily Mass Readings
        </motion.h1>
        <p className="font-body text-lg text-center text-darkText mb-12">
          Nourish your soul with today's Scripture readings from the Catholic Liturgy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* First Reading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="font-heading text-2xl text-navyBlue mb-4">First Reading</h2>
            <p className="font-body text-darkText leading-relaxed">{readings?.firstReading}</p>
          </motion.div>

          {/* Responsorial Psalm */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="font-heading text-2xl text-navyBlue mb-4">Responsorial Psalm</h2>
            <p className="font-body text-darkText leading-relaxed">{readings?.psalm}</p>
          </motion.div>

          {/* Gospel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="font-heading text-2xl text-navyBlue mb-4">Gospel</h2>
            <p className="font-body text-darkText leading-relaxed">{readings?.gospel}</p>
          </motion.div>
        </div>

        {/* Reflection */}
        {readings?.reflection && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-3xl text-navyBlue mb-6">Daily Reflection</h2>
            <p className="font-body text-darkText leading-relaxed text-lg">{readings.reflection}</p>
          </motion.div>
        )}

        <div className="text-center mt-12">
          <p className="text-sm text-gray-600">
            Readings sourced from the United States Conference of Catholic Bishops (USCCB).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Readings;
