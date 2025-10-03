import React, { useState, useEffect } from 'react';
import { getEvents } from '../services/firebaseService';
import { ParishEvent } from '../types';

const EventsPreview = () => {
  const [events, setEvents] = useState<ParishEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getEvents();
        // Filter upcoming events (next 30 days)
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        const upcomingEvents = allEvents.filter(event => {
          const eventDate = event.date.toDate();
          return eventDate >= now && eventDate <= thirtyDaysFromNow;
        }).slice(0, 3); // Limit to 3
        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="bg-liturgicalRed text-white p-8 rounded-lg shadow-lg text-center">
        <h3 className="font-heading text-3xl text-warmGold mb-4">Upcoming Events</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-liturgicalRed text-white p-8 rounded-lg shadow-lg text-center">
      <h3 className="font-heading text-3xl text-warmGold mb-4">Upcoming Events</h3>
      {events.length > 0 ? (
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="text-left">
              <h4 className="font-bold">{event.title}</h4>
              <p className="text-sm">{event.date.toDate().toLocaleDateString()}</p>
              <p className="text-sm">{event.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming events.</p>
      )}
      <button className="mt-6 bg-warmGold text-navyBlue font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition-colors">
        View All Events
      </button>
    </div>
  );
};

export default EventsPreview;
