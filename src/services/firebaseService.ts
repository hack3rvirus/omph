// src/services/firebaseService.ts
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
  } from 'firebase/firestore';
  import { db } from '../lib/firebase';
import { ClergyMember, Society, NewsArticle, ParishEvent, PrayerRequest, MassSchedule } from '../types';
  
  // Generic function to fetch a collection
  export const getCollection = async <T>(collectionName: string, orderField?: string): Promise<T[]> => {
    const collRef = collection(db, collectionName);
    const q = orderField ? query(collRef, orderBy(orderField)) : query(collRef);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  };
  
  // --- Specific Implementations ---
  
  export const getClergy = (): Promise<ClergyMember[]> => getCollection<ClergyMember>('clergy', 'displayOrder');
  export const getSocieties = (): Promise<Society[]> => getCollection<Society>('societies', 'name');
  export const getNews = (): Promise<NewsArticle[]> => getCollection<NewsArticle>('news', 'publishedAt');
  export const getEvents = (): Promise<ParishEvent[]> => getCollection<ParishEvent>('events', 'date');
  export const getMassSchedules = (): Promise<MassSchedule[]> => getCollection<MassSchedule>('mass-schedules', 'day');
  
  // Example of a more complex query
  export const getApprovedPrayerRequests = (): Promise<PrayerRequest[]> => {
      const collRef = collection(db, 'prayerRequests');
      const q = query(collRef, where('isApproved', '==', true), orderBy('submittedAt', 'desc'));
      return getDocs(q).then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PrayerRequest)));
  }
  
  // Functions for the Admin Panel (CRUD)
  export const addDocument = async (collectionName: string, data: object) => {
      return await addDoc(collection(db, collectionName), data);
  }
  
  export const updateDocument = async (collectionName: string, docId: string, data: object) => {
      const docRef = doc(db, collectionName, docId);
      return await updateDoc(docRef, data);
  }
  
  export const deleteDocument = async (collectionName: string, docId: string) => {
      const docRef = doc(db, collectionName, docId);
      return await deleteDoc(docRef);
  }