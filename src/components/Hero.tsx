import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchDailyReadings, fetchDailySaints, fetchDailyCelebration, DailySaint } from '../lib/api';

// Placeholder backgrounds
const slides = ['bg-gradient-to-r from-blue-900 to-blue-700', 'bg-gradient-to-r from-blue-800 to-blue-600', 'bg-gradient-to-r from-blue-700 to-blue-500'];

interface Reading {
  type: string;
  ref: string;
  preview: string;
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dailyLiturgy, setDailyLiturgy] = useState<{
    date: string;
    celebration: string;
    season: string;
    saints: DailySaint[];
    readings: Reading[];
    reflection: string;
  }>({
    date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    celebration: 'Loading...',
    season: 'Loading...',
    saints: [],
    readings: [],
    reflection: 'Loading...'
  });

  useEffect(() => {
    const fetchLiturgy = async () => {
      try {
        const [readings, saints, celebration] = await Promise.all([
          fetchDailyReadings(),
          fetchDailySaints(),
          fetchDailyCelebration()
        ]);
        setDailyLiturgy({
          date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
          celebration: celebration.type,
          season: `${celebration.season} Time`,
          saints,
          readings: [
            { type: 'First Reading', ref: readings.firstReading, preview: 'Preview not available' },
            { type: 'Responsorial Psalm', ref: readings.psalm, preview: 'Preview not available' },
            { type: 'Gospel', ref: readings.gospel, preview: 'Preview not available' }
          ],
          reflection: readings.reflection || 'A brief reflection on today\'s Gospel.'
        });
      } catch (error) {
        console.error('Error fetching liturgy:', error);
        setDailyLiturgy(prev => ({ ...prev, celebration: 'Error loading liturgy', season: 'Please try again later' }));
      }
    };
    fetchLiturgy();

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000); // Change slide every 7 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden text-white flex items-center justify-center">
      {/* Background Slideshow */}
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className={`absolute inset-0 bg-cover bg-center ${slides[currentSlide]}`}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-primaryBlue opacity-40"></div> {/* Color overlay */}

      {/* Header */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 w-11/12 md:w-3/4 lg:w-2/3 text-center mb-8"
      >
        <p className="font-body text-gray-200 text-lg">{dailyLiturgy.date}</p>
        <h1 className="font-heading text-3xl md:text-4xl text-accentGold mb-2">{dailyLiturgy.celebration}</h1>
        <p className="font-body text-gray-200 text-lg">{dailyLiturgy.season}</p>
      </motion.div>

      <div className="relative z-10 w-11/12 md:w-3/4 lg:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Saint of the Day Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="backdrop-blur-md bg-white/10 p-6 rounded-xl shadow-2xl border-2 border-liturgicalRed hover:shadow-3xl transition-all duration-300"
        >
          <h2 className="font-heading text-2xl text-white flex items-center mb-4"><span className="mr-2 text-accentGold text-3xl">✝</span> Saint of the Day</h2>
          {dailyLiturgy.saints.length > 0 ? (
            dailyLiturgy.saints.map((saint, index) => (
              <div key={saint.name} className="space-y-2 mb-4">
                <h3 className="font-body font-semibold text-lg text-accentGold">{saint.name}</h3>
                <p className="font-body text-sm text-gray-200 leading-relaxed">{saint.bio}</p>
                {saint.patronage.length > 0 && (
                  <p className="font-body text-sm text-gray-300 italic">Patronage: {saint.patronage.join(', ')}</p>
                )}
              </div>
            ))
          ) : (
            <p className="font-body text-gray-300">No saints listed for today.</p>
          )}
        </motion.div>

        {/* Today's Readings Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="backdrop-blur-md bg-white/10 p-6 rounded-xl shadow-2xl border-2 border-warmGold hover:shadow-3xl transition-all duration-300"
        >
          <h2 className="font-heading text-2xl text-white flex items-center mb-4"><span className="mr-2 text-accentGold text-3xl">📖</span> Today's Readings</h2>
          {dailyLiturgy.readings.length > 0 ? (
            dailyLiturgy.readings.map((reading) => (
              <div key={reading.type} className="mb-4 pb-4 border-b border-gray-600 last:border-b-0">
                <h3 className="font-body font-semibold text-lg text-accentGold mb-1">{reading.type}</h3>
                <p className="font-body text-sm text-gray-200">{reading.ref}</p>
                <p className="font-body text-sm text-gray-300 italic mt-1">"{reading.preview}"</p>
              </div>
            ))
          ) : (
            <p className="font-body text-gray-300">Readings loading...</p>
          )}
          <div className="mt-4 pt-4 border-t border-gray-600">
            <p className="font-body text-sm text-gray-200 mb-2">Reflection: {dailyLiturgy.reflection}</p>
            <button className="bg-accentGold text-primaryBlue font-bold py-2 px-4 rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg w-full">
              View Full Readings
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
