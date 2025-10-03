import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface DonationForm {
  name: string;
  amount: number;
  message: string;
  email: string;
}

const Donate = () => {
  const { register, handleSubmit, reset } = useForm<DonationForm>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<DonationForm> = async (data) => {
    try {
      await addDoc(collection(db, 'donations'), { ...data, timestamp: new Date(), status: 'pending' });
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert('Error submitting donation. Please try again.');
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
          Support OMPH Chaplaincy
        </motion.h1>
        <p className="font-body text-lg text-center text-darkText mb-12">
          Your generous donations help sustain our ministries, maintain our chapel, and support community outreach.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bank Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="font-heading text-2xl text-navyBlue mb-6">Bank Transfer Details</h2>
            <div className="space-y-4">
              <div>
                <strong>Bank:</strong> Zenith Bank PLC
              </div>
              <div>
                <strong>Account Name:</strong> Our Mother of Perpetual Help Chaplaincy
              </div>
              <div>
                <strong>Account Number:</strong> 1234567890
              </div>
              <div>
                <strong>Branch:</strong> AEFUTHA Branch, Ebonyi State
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-600">Please include "OMPH Donation - [Your Name]" in the reference.</p>
              </div>
              <div className="mt-6 p-4 bg-liturgicalRed/10 rounded border border-liturgicalRed/20">
                <p className="text-liturgicalRed font-medium">After transfer, please fill the form below to notify us.</p>
              </div>
            </div>
          </motion.div>

          {/* Donation Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="font-heading text-2xl text-navyBlue mb-6">Notify Us of Your Donation</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-darkText mb-1">Full Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navyBlue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkText mb-1">Email</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navyBlue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkText mb-1">Amount (NGN)</label>
                <input
                  type="number"
                  {...register('amount', { required: 'Amount is required', min: 100 })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navyBlue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkText mb-1">Message (Optional)</label>
                <textarea
                  {...register('message')}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navyBlue"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-navyBlue text-white py-3 rounded-md hover:bg-blue-900 transition-all font-medium"
              >
                Submit Notification
              </button>
            </form>
            {submitted && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-warmGold mt-4 font-medium"
              >
                Thank you! Your donation notification has been received. God bless you.
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
