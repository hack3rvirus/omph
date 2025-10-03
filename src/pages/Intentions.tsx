import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { onSnapshot, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { submitIntention } from '../lib/api';

interface IntentionData {
  id: string;
  title: string;
  date: string;
  donor: string;
  message: string;
  status: string;
  timestamp: any;
}

interface IntentionForm {
  title: string;
  date: string;
  donor: string;
  message: string;
}

const Intentions = () => {
  const { register, handleSubmit, reset } = useForm<IntentionForm>();
  const [intentions, setIntentions] = useState<IntentionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'intentions'),
      where('status', '==', 'approved'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IntentionData));
      setIntentions(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const onSubmit: SubmitHandler<IntentionForm> = async (data) => {
    try {
      await submitIntention(data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert('Error submitting intention. Please try again.');
    }
  };

  return (
    <div className="py-16 bg-beigeBg">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-5xl text-center text-navyBlue mb-4"
        >
          Mass Intentions
        </motion.h1>
        <p className="font-body text-lg text-center text-darkText mb-12">
          Submit intentions for Masses or view approved intentions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Submit Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="font-heading text-2xl text-navyBlue mb-6">Submit an Intention</h2>
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
                <label className="block text-sm font-medium text-darkText mb-1">Date</label>
                <input
                  type="date"
                  {...register('date', { required: 'Date is required' })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navyBlue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkText mb-1">Donor Name</label>
                <input
                  type="text"
                  {...register('donor', { required: 'Donor name is required' })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navyBlue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkText mb-1">Message</label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navyBlue"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-navyBlue text-white py-3 rounded-md hover:bg-blue-900 transition-all font-medium"
              >
                Submit Intention
              </button>
            </form>
            {submitted && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-warmGold mt-4 font-medium"
              >
                Your intention has been submitted for approval. Thank you!
              </motion.p>
            )}
          </motion.div>

          {/* Intentions List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="font-heading text-2xl text-navyBlue mb-6">Approved Intentions</h2>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : intentions.length === 0 ? (
              <p className="text-center text-gray-600">No approved intentions at the moment.</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {intentions.map((intention) => (
                  <div key={intention.id} className="border-b pb-4">
                    <h3 className="font-heading text-lg text-navyBlue">{intention.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{intention.message}</p>
                    <p className="text-xs text-gray-500">Donor: {intention.donor} | Date: {intention.date}</p>
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

export default Intentions;
