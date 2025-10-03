import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface Announcement {
  id: string;
  title: string;
  content: string;
  status: string;
  timestamp: any;
}

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'announcements'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
      setAnnouncements(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, 'announcements', id), { status });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="font-heading text-3xl text-navyBlue mb-6">Manage Announcements</h2>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-heading text-xl text-navyBlue">{announcement.title}</h3>
            <p className="text-darkText">{announcement.content}</p>
            <p className="text-sm text-gray-600">Status: {announcement.status}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => updateStatus(announcement.id, 'approved')}
                className="bg-warmGold text-navyBlue px-4 py-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(announcement.id, 'rejected')}
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

export default ManageAnnouncements;
