import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaArrowRight } from 'react-icons/fa';
import { getTodaysReadings } from '../services/readingsService';

interface Reading {
  citation: string;
  content: string;
}

interface DailyReadings {
  first_reading: Reading;
  responsorial_psalm: { citation: string; response: string };
  second_reading?: Reading;
  gospel: Reading;
  liturgical_color?: string;
  season?: string;
}

const DailyReadingsCard: React.FC = () => {
  const [readings, setReadings] = useState<DailyReadings | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadReadings = async () => {
      try {
        const data = await getTodaysReadings();
        setReadings(data);
      } catch (error) {
        console.error('Error loading readings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReadings();
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getColorClass = (color?: string) => {
    const colorMap: { [key: string]: string } = {
      green: 'bg-green-50 border-green-200',
      purple: 'bg-purple-50 border-purple-200',
      red: 'bg-red-50 border-red-200',
      white: 'bg-white border-gray-200',
      rose: 'bg-pink-50 border-pink-200'
    };
    return colorMap[color?.toLowerCase() || 'white'] || 'bg-white border-gray-200';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!readings) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500">
          <FaBook className="mx-auto text-4xl mb-2" />
          <p>Readings not available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg shadow-md p-6 border-2 transition-all duration-300 hover:shadow-xl cursor-pointer ${getColorClass(readings.liturgical_color)}`}
      onClick={() => navigate('/readings')}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaBook className="text-2xl text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Today's Readings</h3>
        </div>
        <FaArrowRight className="text-blue-600" />
      </div>

      {readings.season && (
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {readings.season}
          </span>
        </div>
      )}

      <div className="space-y-3">
        <div className="border-l-4 border-blue-500 pl-3">
          <p className="text-sm font-semibold text-gray-700">First Reading</p>
          <p className="text-sm text-blue-600">{readings.first_reading.citation}</p>
          <p className="text-sm text-gray-600 mt-1">
            {truncateText(readings.first_reading.content, 100)}
          </p>
        </div>

        <div className="border-l-4 border-green-500 pl-3">
          <p className="text-sm font-semibold text-gray-700">Responsorial Psalm</p>
          <p className="text-sm text-green-600">{readings.responsorial_psalm.citation}</p>
          <p className="text-sm italic text-gray-600 mt-1">
            {readings.responsorial_psalm.response}
          </p>
        </div>

        {readings.second_reading && (
          <div className="border-l-4 border-purple-500 pl-3">
            <p className="text-sm font-semibold text-gray-700">Second Reading</p>
            <p className="text-sm text-purple-600">{readings.second_reading.citation}</p>
            <p className="text-sm text-gray-600 mt-1">
              {truncateText(readings.second_reading.content, 100)}
            </p>
          </div>
        )}

        <div className="border-l-4 border-red-500 pl-3">
          <p className="text-sm font-semibold text-gray-700">Gospel</p>
          <p className="text-sm text-red-600">{readings.gospel.citation}</p>
          <p className="text-sm text-gray-600 mt-1">
            {truncateText(readings.gospel.content, 100)}
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center justify-center mx-auto space-x-2">
          <span>Read Full Readings</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default DailyReadingsCard;
