// src/types/index.ts
import { Timestamp } from 'firebase/firestore';

export interface ClergyMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  displayOrder: number;
}

export interface Society {
  id: string;
  name: string;
  slug: string;
  category: 'Organization' | 'Pious Society';
  patron: string;
  history: string;
  purpose: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: Timestamp;
}

export interface ParishEvent {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: Timestamp;
}

export interface PrayerRequest {
    id: string;
    name: string;
    intention: string;
    submittedAt: Timestamp;
    isApproved: boolean;
}

export interface MassSchedule {
  id: string;
  day: string;
  time: string;
  type: string;
}
