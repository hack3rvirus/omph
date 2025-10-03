import React, { useState, useEffect } from 'react';
import { getMassSchedules } from '../services/firebaseService';
import { MassSchedule } from '../types';

const MassSchedulePreview = () => {
  const [schedules, setSchedules] = useState<MassSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const allSchedules = await getMassSchedules();
        setSchedules(allSchedules.slice(0, 3)); // Limit to 3 for preview
      } catch (error) {
        console.error('Error fetching mass schedules:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  if (loading) {
    return (
      <div className="bg-primaryBlue text-white p-8 rounded-lg shadow-lg text-center">
        <h3 className="font-heading text-3xl text-accentGold mb-4">Mass Schedule</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-primaryBlue text-white p-8 rounded-lg shadow-lg text-center">
      <h3 className="font-heading text-3xl text-accentGold mb-4">Mass Schedule</h3>
      <div className="space-y-2 font-body">
        {schedules.length > 0 ? (
          schedules.map(schedule => (
            <p key={schedule.id}><span className="font-bold">{schedule.day}:</span> {schedule.time} ({schedule.type})</p>
          ))
        ) : (
          <p>No schedules available.</p>
        )}
      </div>
      <button className="mt-6 bg-accentGold text-primaryBlue font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition-colors">
        View Full Schedule
      </button>
    </div>
  );
};

export default MassSchedulePreview;