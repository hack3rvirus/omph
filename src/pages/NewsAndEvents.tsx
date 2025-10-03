// src/pages/NewsAndEvents.tsx
import React from 'react';
import useSWR from 'swr';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getNews, getEvents } from '../services/firebaseService';
import { NewsArticle, ParishEvent } from '../types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const NewsAndEvents = () => {
    const { data: news, error: newsError } = useSWR<NewsArticle[]>('news', getNews);
    const { data: events, error: eventsError } = useSWR<ParishEvent[]>('events', getEvents);
    
    // Custom tile content for react-calendar
    const tileContent = ({ date, view }: { date: Date, view: string }) => {
        if (view === 'month' && events) {
            const eventOnDay = events.find(event => format(event.date.toDate(), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
            if (eventOnDay) {
                return <p className="text-xs text-primaryRed mt-1">● Event</p>;
            }
        }
        return null;
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="font-heading text-5xl text-primaryBlue">News & Events</h1>
                <p className="font-body text-lg text-gray-600 mt-2">Stay up to date with the life of our parish.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* News Section */}
                <div className="lg:col-span-2">
                    <h2 className="font-heading text-3xl text-primaryRed mb-6">Parish News</h2>
                    <div className="space-y-8">
                        {newsError && <p>Failed to load news.</p>}
                        {!news && <p>Loading news...</p>}
                        {news?.map(article => (
                            <div key={article.id} className="flex flex-col md:flex-row gap-6">
                                <img src={article.imageUrl} alt={article.title} className="w-full md:w-1/3 h-48 object-cover rounded-lg"/>
                                <div>
                                    <p className="text-sm text-gray-500">{format(article.publishedAt.toDate(), 'MMMM dd, yyyy')}</p>
                                    <h3 className="font-heading text-2xl text-primaryBlue mt-1">{article.title}</h3>
                                    <p className="font-body text-gray-700 mt-2">{article.content.substring(0, 150)}...</p>
                                    <Link to={`/news/${article.id}`} className="text-primaryBlue font-bold hover:underline mt-2 inline-block">Read More</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Events Calendar Section */}
                <div>
                    <h2 className="font-heading text-3xl text-primaryRed mb-6">Parish Calendar</h2>
                    <Calendar
                        className="w-full border-primaryBlue rounded-lg shadow-lg"
                        tileContent={tileContent}
                    />
                     <div className="mt-6">
                        <h3 className="font-heading text-2xl mb-4">Upcoming Events</h3>
                        {eventsError && <p>Failed to load events.</p>}
                        {!events && <p>Loading events...</p>}
                        <ul className="space-y-3">
                            {events?.slice(0, 5).map(event => (
                                <li key={event.id} className="p-3 bg-gray-100 rounded">
                                    <p className="font-bold">{format(event.date.toDate(), 'MMM dd')}: <span className="font-normal">{event.title}</span></p>
                                </li>
                            ))}
                        </ul>
                     </div>
                </div>
            </div>
        </div>
    );
}

export default NewsAndEvents;