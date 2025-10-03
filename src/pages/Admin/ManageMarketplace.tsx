import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

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

const ManageMarketplace = () => {
  const [posts, setPosts] = useState<MarketplacePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'marketplace'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MarketplacePost));
      setPosts(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, 'marketplace', id), { status });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="font-heading text-3xl text-navyBlue mb-6">Manage Marketplace</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-heading text-xl text-navyBlue">{post.title}</h3>
            <p className="text-darkText">{post.description}</p>
            <p className="text-warmGold font-medium">₦{post.price}</p>
            <p className="text-sm text-gray-600">Category: {post.category}</p>
            {post.image && <img src={post.image} alt={post.title} className="w-20 h-20 object-cover mt-2" />}
            <p className="text-sm text-gray-600">Status: {post.status}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => updateStatus(post.id, 'approved')}
                className="bg-warmGold text-navyBlue px-4 py-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(post.id, 'rejected')}
                className="bg-liturgicalRed text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMarketplace;
