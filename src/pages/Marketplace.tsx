import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { onSnapshot, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { submitMarketplacePost } from '../lib/api';

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

interface PostForm {
  title: string;
  description: string;
  price: number;
  category: string;
  image?: FileList;
}

const Marketplace = () => {
  const { register, handleSubmit, reset } = useForm<PostForm>();
  const [posts, setPosts] = useState<MarketplacePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'marketplace'),
      where('status', '==', 'approved'),
      orderBy('timestamp', 'desc'),
      limit(20)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MarketplacePost));
      setPosts(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const onSubmit: SubmitHandler<PostForm> = async (data) => {
    try {
      const postData = {
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        image: data.image?.[0] ? URL.createObjectURL(data.image[0]) : undefined // Simple URL for demo; in prod, upload to Firebase Storage
      };
      await submitMarketplacePost(postData);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert('Error submitting post. Please try again.');
    }
  };

  const categories = ['Books', 'Religious Items', 'Clothing', 'Other'];

  return (
    <div className="py-16 bg-beigeBg">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-5xl text-center text-navyBlue mb-4"
        >
          Community Marketplace
        </motion.h1>
        <p className="font-body text-lg text-center text-darkText mb-12">
          Buy, sell, or donate items within our OMPH community.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Submit Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="font-heading text-2xl text-navyBlue mb-6">Post an Item</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-darkText mb-1">Title</label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navyBlue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkText mb-1">Description</label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navyBlue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkText mb-1">Price (NGN)</label>
                <input
                  type="number"
                  {...register('price', { required: 'Price is required', min: 0 })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navyBlue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkText mb-1">Category</label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navyBlue"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-darkText mb-1">Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register('image')}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navyBlue"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-navyBlue text-white py-3 rounded-md hover:bg-blue-900 transition-all font-medium"
              >
                Submit Post
              </button>
            </form>
            {submitted && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-warmGold mt-4 font-medium"
              >
                Your post has been submitted for approval. Thank you!
              </motion.p>
            )}
          </motion.div>

          {/* Posts List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="font-heading text-2xl text-navyBlue mb-6">Available Items</h2>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : posts.length === 0 ? (
              <p className="text-center text-gray-600">No items available at the moment.</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {posts.map((post) => (
                  <div key={post.id} className="border-b pb-4">
                    <h3 className="font-heading text-lg text-navyBlue">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{post.description}</p>
                    <p className="text-warmGold font-medium">₦{post.price}</p>
                    <p className="text-xs text-gray-500">{post.category}</p>
                    {post.image && <img src={post.image} alt={post.title} className="w-20 h-20 object-cover mt-2 rounded" />}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
