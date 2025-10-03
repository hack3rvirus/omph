import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { onSnapshot, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Link } from 'react-router-dom';

interface MarketplacePost {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  status: string;
  timestamp: any;
}

const MarketplacePreview = () => {
  const [posts, setPosts] = useState<MarketplacePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'marketplace'),
      where('status', '==', 'approved'),
      orderBy('timestamp', 'desc'),
      limit(4)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MarketplacePost));
      setPosts(data);
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
          Marketplace
        </motion.h2>
        {loading ? (
          <div className="text-center">Loading marketplace...</div>
        ) : posts.length === 0 ? (
          <p className="text-center text-darkText">No items available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-beigeBg p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {post.image && <img src={post.image} alt={post.title} className="w-full h-32 object-cover rounded mb-4" />}
                <h3 className="font-heading text-lg text-navyBlue mb-2">{post.title}</h3>
                <p className="text-darkText text-sm mb-2">{post.description.substring(0, 50)}...</p>
                <p className="text-warmGold font-medium">₦{post.price}</p>
                <p className="text-sm text-gray-600">{post.category}</p>
              </motion.div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link to="/marketplace" className="bg-navyBlue text-white px-6 py-3 rounded-full hover:bg-blue-800 transition-colors">
            View All Items
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
