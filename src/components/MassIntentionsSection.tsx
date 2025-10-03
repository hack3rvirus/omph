import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { onSnapshot, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Intention {
  id: string;
  title: string;
  date: string;
  donor: string;
  message: string;
  status: string;
  timestamp: any;
}

const MassIntentionsSection = () => {
  const [intentions, setIntentions] = useState<Intention[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'intentions'),
      where('status', '==', 'approved'),
      orderBy('timestamp', 'desc'),
      limit(5)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Intention));
      setIntentions(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-4xl text-center text-navyBlue mb-12"
        >
          Mass Intentions
        </motion.h2>
        {loading ? (
          <div className="text-center">Loading intentions...</div>
        ) : intentions.length === 0 ? (
          <p className="text-center text-darkText">No approved intentions at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {intentions.map((intention, index) => (
              <motion.div
                key={intention.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-beigeBg p-6 rounded-lg shadow-md"
              >
                <h3 className="font-heading text-xl text-navyBlue mb-2">{intention.title}</h3>
                <p className="text-darkText mb-2">{intention.message}</p>
                <p className="text-sm text-gray-600">Donor: {intention.donor}</p>
                <p className="text-sm text-gray-600">Date: {intention.date}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MassIntentionsSection;
