import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { onSnapshot, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Announcement {
  id: string;
  title: string;
  content: string;
  status: string;
  timestamp: any;
}

const AnnouncementsSection = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'announcements'),
      where('status', '==', 'approved'),
      orderBy('timestamp', 'desc'),
      limit(3)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
      setAnnouncements(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <section className="py-16 bg-beigeBg">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-4xl text-center text-navyBlue mb-12"
        >
          Announcements
        </motion.h2>
        {loading ? (
          <div className="text-center">Loading announcements...</div>
        ) : announcements.length === 0 ? (
          <p className="text-center text-darkText">No announcements at the moment.</p>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="font-heading text-2xl text-navyBlue mb-4">{announcement.title}</h3>
                <p className="text-darkText leading-relaxed">{announcement.content}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AnnouncementsSection;
