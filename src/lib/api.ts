import axios from 'axios';
import * as cheerio from 'cheerio';
import { db } from './firebase';
import { doc, getDoc, setDoc, Timestamp, addDoc, collection } from 'firebase/firestore';

// Types for daily content
export interface DailyReading {
  firstReading: string;
  psalm: string;
  gospel: string;
  reflection?: string;
}

export interface DailySaint {
  name: string;
  bio: string;
  patronage: string[];
}

export interface DailyCelebration {
  type: string;
  season: string;
}

export interface IntentionData {
  title: string;
  date: string;
  donor: string;
  message: string;
}

export interface EventData {
  title: string;
  date: string;
  description: string;
}

export interface AnnouncementData {
  title: string;
  content: string;
  date: string;
}

export interface MarketplacePost {
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

// Function to get today's date in YYYY-MM-DD format (UTC+1 for Nigeria)
const getTodayDate = (): string => {
  const now = new Date();
  const nigeriaTime = new Date(now.getTime() + (1 * 60 * 60 * 1000)); // UTC+1
  return nigeriaTime.toISOString().split('T')[0];
};

// Cache key for Firestore
const getCacheKey = (date: string, type: 'readings' | 'saints' | 'celebration'): string => {
  return `daily_${type}_${date}`;
};

// Helper to check if cache is fresh (e.g., 24 hours)
const isCacheFresh = (docData: any): boolean => {
  if (!docData || !docData.timestamp) return false;
  const cacheTime = docData.timestamp.toDate();
  const now = new Date();
  const diff = now.getTime() - cacheTime.getTime();
  return diff < 24 * 60 * 60 * 1000; // 24 hours
};

// Fetch and cache daily readings
export const fetchDailyReadings = async (): Promise<DailyReading> => {
  const date = getTodayDate();
  const cacheKey = getCacheKey(date, 'readings');
  const cacheRef = doc(db, 'daily_cache', cacheKey);

  // Check cache
  const cacheSnap = await getDoc(cacheRef);
  if (cacheSnap.exists() && isCacheFresh(cacheSnap.data())) {
    return cacheSnap.data() as DailyReading;
  }

  try {
    // Primary: EWTN JSON API (assuming endpoint; adjust if needed)
    let readings: DailyReading = await axios.get(`https://api.ewtn.com/dailyreadings?date=${date}`)
      .then(res => res.data)
      .catch(async () => {
        // Fallback: USCCB with Cheerio
        const response = await axios.get('https://bible.usccb.org/readings');
        const $ = cheerio.load(response.data);
        const firstReading = $('.readings-content .card-body h3').first().text().trim();
        const psalm = $('.readings-content .card-body h3').eq(1).text().trim();
        const gospel = $('.readings-content .card-body h3').last().text().trim();
        return { firstReading, psalm, gospel };
      });

    // Add reflection if not present (query chatbot or scrape)
    if (!readings.reflection) {
      readings.reflection = 'A brief reflection on today\'s Gospel: Let us meditate on the Word of God and apply it to our lives.';
    }

    // Cache it
    await setDoc(cacheRef, { ...readings, timestamp: Timestamp.now() }, { merge: true });
    return readings;
  } catch (error) {
    console.error('Error fetching daily readings:', error);
    throw new Error('Failed to fetch daily readings');
  }
};

// Fetch and cache daily saints
export const fetchDailySaints = async (): Promise<DailySaint[]> => {
  const date = getTodayDate();
  const cacheKey = getCacheKey(date, 'saints');
  const cacheRef = doc(db, 'daily_cache', cacheKey);

  // Check cache
  const cacheSnap = await getDoc(cacheRef);
  if (cacheSnap.exists() && isCacheFresh(cacheSnap.data())) {
    return cacheSnap.data() as DailySaint[];
  }

  try {
    // Primary: CalAPI JSON (multi-saints support)
    let saints: DailySaint[] = await axios.get(`https://calapi.inadiutorium.cz/api/v0/en/calendars/default/${date}`)
      .then(res => {
        const data = res.data;
        return data.celebrations.map((c: any) => ({
          name: c.title,
          bio: c.description || 'Saint known for their devotion and service to the Church.',
          patronage: c.rank === 'Feast' ? ['General'] : []
        }));
      })
      .catch(async () => {
        // Fallback: Catholic.org parse
        const response = await axios.get(`https://www.catholic.org/saints/sofd.php`);
        const $ = cheerio.load(response.data);
        const name = $('.sainttitle').text().trim();
        const bio = $('.storytext').text().trim();
        return [{ name, bio, patronage: [] }];
      });

    // Cache it
    await setDoc(cacheRef, { ...saints, timestamp: Timestamp.now() }, { merge: true });
    return saints;
  } catch (error) {
    console.error('Error fetching daily saints:', error);
    throw new Error('Failed to fetch daily saints');
  }
};

// Fetch and cache daily celebration
export const fetchDailyCelebration = async (): Promise<DailyCelebration> => {
  const date = getTodayDate();
  const cacheKey = getCacheKey(date, 'celebration');
  const cacheRef = doc(db, 'daily_cache', cacheKey);

  // Check cache
  const cacheSnap = await getDoc(cacheRef);
  if (cacheSnap.exists() && isCacheFresh(cacheSnap.data())) {
    return cacheSnap.data() as DailyCelebration;
  }

  try {
    // Use CalAPI for celebration
    const response = await axios.get(`https://calapi.inadiutorium.cz/api/v0/en/calendars/default/${date}`);
    const data = response.data;
    const celebration: DailyCelebration = {
      type: data.celebrations[0]?.title || 'Ordinary Time',
      season: data.liturgical_color || 'Green'
    };

    // Cache it
    await setDoc(cacheRef, { ...celebration, timestamp: Timestamp.now() }, { merge: true });
    return celebration;
  } catch (error) {
    console.error('Error fetching daily celebration:', error);
    return { type: 'Ordinary Time', season: 'Green' };
  }
};

// Magisterium AI Query for Chatbot
export const magisteriumQuery = async (prompt: string): Promise<string> => {
  const key = process.env.REACT_APP_MAGISTERIUM_API_KEY;
  if (!key) {
    console.warn('Magisterium API key missing, falling back to scraping');
    return await scrapeCatholic(prompt);
  }

  try {
    const res = await axios.post('https://api.magisterium.ai/v1/chat/completions', {
      model: 'gpt-4',
      messages: [{ role: 'user', content: `As a Catholic priest, answer this question with references to the Bible, Catechism, or Magisterium: ${prompt}` }],
      max_tokens: 500,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data.choices[0].message.content;
  } catch (error) {
    console.error('Magisterium API error:', error);
    return await scrapeCatholic(prompt);
  }
};

// Fallback Scraping from Catholic.com
export const scrapeCatholic = async (query: string): Promise<string> => {
  try {
    const res = await axios.get(`https://www.catholic.com/search?q=${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const $ = cheerio.load(res.data);
    const text = $('.search-result-snippet, .article-body p').first().text().trim();
    return text || 'No information found from Catholic sources. Please try rephrasing your question.';
  } catch (error) {
    console.error('Scraping error:', error);
    return 'Sorry, unable to retrieve information at this time. Consider consulting the Catechism of the Catholic Church.';
  }
};

// Submit Mass Intention (pending approval)
export const submitIntention = async (data: IntentionData) => {
  return addDoc(collection(db, 'intentions'), { ...data, status: 'pending', timestamp: Timestamp.now() });
};

// Submit Event (pending approval)
export const submitEvent = async (data: EventData) => {
  return addDoc(collection(db, 'events'), { ...data, status: 'pending', timestamp: Timestamp.now() });
};

// Submit Announcement (pending approval)
export const submitAnnouncement = async (data: AnnouncementData) => {
  return addDoc(collection(db, 'announcements'), { ...data, status: 'pending', timestamp: Timestamp.now() });
};

// Submit Marketplace Post (pending approval)
export const submitMarketplacePost = async (data: MarketplacePost) => {
  return addDoc(collection(db, 'marketplace'), { ...data, status: 'pending', timestamp: Timestamp.now() });
};
