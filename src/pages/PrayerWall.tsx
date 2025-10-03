// src/pages/PrayerWall.tsx
import React from 'react';
import useSWR from 'swr';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getApprovedPrayerRequests, addDocument } from '../services/firebaseService';
import { PrayerRequest } from '../types';
import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';

type FormInputs = {
  name: string;
  intention: string;
};

const PrayerWall = () => {
    const { data: prayers, error } = useSWR<PrayerRequest[]>('prayerRequests', getApprovedPrayerRequests);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const newRequest = {
                ...data,
                submittedAt: Timestamp.now(),
                isApproved: false // Requires admin approval
            };
            await addDocument('prayerRequests', newRequest);
            alert('Your prayer request has been submitted for approval. God bless you.');
            reset();
        } catch (e) {
            alert('There was an error submitting your request. Please try again.');
        }
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="font-heading text-5xl text-primaryBlue">Community Prayer Wall</h1>
                <p className="font-body text-lg text-gray-600 mt-2">"For where two or three are gathered together in my name, there am I in the midst of them." - Matthew 18:20</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Prayer List */}
                <div className="lg:col-span-2 space-y-4">
                    {error && <p>Could not load prayer requests.</p>}
                    {!prayers && <p>Loading prayers...</p>}
                    {prayers?.map(prayer => (
                        <div key={prayer.id} className="bg-white p-6 rounded-lg shadow-md">
                            <p className="font-body text-gray-800">"{prayer.intention}"</p>
                            <p className="text-right text-sm text-gray-500 mt-4">- {prayer.name}, {format(prayer.submittedAt.toDate(), 'MMMM dd')}</p>
                        </div>
                    ))}
                </div>

                {/* Submission Form */}
                <div className="p-6 bg-primaryBlue/10 rounded-lg">
                    <h2 className="font-heading text-3xl text-primaryBlue mb-4">Submit a Request</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block font-bold mb-1">Your Name (e.g., "A Parishioner")</label>
                            <input {...register("name", { required: true })} id="name" type="text" className="w-full p-2 border rounded"/>
                            {errors.name && <span className="text-primaryRed">This field is required.</span>}
                        </div>
                        <div>
                            <label htmlFor="intention" className="block font-bold mb-1">Your Intention</label>
                            <textarea {...register("intention", { required: true })} id="intention" rows={5} className="w-full p-2 border rounded"></textarea>
                            {errors.intention && <span className="text-primaryRed">This field is required.</span>}
                        </div>
                        <button type="submit" className="w-full bg-primaryBlue text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors">Submit Prayer</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PrayerWall;