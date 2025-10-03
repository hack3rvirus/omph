import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface Intention {
  id: string;
  title: string;
  date: string;
  donor: string;
  message: string;
  status: string;
  timestamp: any;
}

const ManageIntentions = () => {
  const [intentions, setIntentions] = useState<Intention[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'intentions'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Intention));
      setIntentions(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, 'intentions', id), { status });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="font-heading text-3xl text-navyBlue mb-6">Manage Mass Intentions</h2>
      <div className="space-y-4">
        {intentions.map((intention) => (
          <div key={intention.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-heading text-xl text-navyBlue">{intention.title}</h3>
            <p className="text-darkText">Donor: {intention.donor}</p>
            <p className="text-darkText">Date: {intention.date}</p>
            <p className="text-darkText">Message: {intention.message}</p>
            <p className="text-sm text-gray-600">Status: {intention.status}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => updateStatus(intention.id, 'approved')}
                className="bg-warmGold text-navyBlue px-4 py-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(intention.id, 'rejected')}
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

export default ManageIntentions;
