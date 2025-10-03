import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { format } from 'date-fns';

interface ParishEvent {
  id?: string;
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  type: string;
}

const ManageEvents: React.FC = () => {
  const [events, setEvents] = useState<ParishEvent[]>([]);
  const [formData, setFormData] = useState<ParishEvent>({
    title: '',
    date: '',
    time: '',
    description: '',
    location: '',
    type: 'Mass'
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const eventsCollection = collection(db, 'events');
    const eventsSnapshot = await getDocs(eventsCollection);
    const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ParishEvent));
    setEvents(eventsList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const { id, ...data } = formData;
      await updateDoc(doc(db, 'events', editingId), data);
      setEditingId(null);
    } else {
      const { id, ...data } = formData;
      await addDoc(collection(db, 'events'), data);
    }
    setFormData({
      title: '',
      date: '',
      time: '',
      description: '',
      location: '',
      type: 'Mass'
    });
    fetchEvents();
  };

  const handleEdit = (event: ParishEvent) => {
    setFormData(event);
    setEditingId(event.id!);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'events', id));
    fetchEvents();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading text-primaryBlue mb-6">Manage Events</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Event Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Mass">Mass</option>
            <option value="Confession">Confession</option>
            <option value="Adoration">Adoration</option>
            <option value="Meeting">Meeting</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border p-2 rounded w-full mt-4"
          rows={3}
          required
        />
        <button type="submit" className="bg-primaryBlue text-white px-4 py-2 rounded mt-4 hover:bg-blue-800">
          {editingId ? 'Update Event' : 'Add Event'}
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-heading text-primaryBlue mb-4">Existing Events</h2>
        {events.map(event => (
          <div key={event.id} className="border-b py-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">
                {format(new Date(event.date), 'PPP')} at {event.time} - {event.location}
              </p>
              <p className="text-sm">{event.description}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(event)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id!)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEvents;
