import axios from 'axios';
import * as cheerio from 'cheerio';
import { supabase } from '../lib/supabase';

interface Saint {
  celebration_date: string;
  saint_name: string;
  title?: string;
  rank?: string;
  biography: string;
  patronage: string[];
  birth_year?: number;
  death_year?: number;
  feast_day?: string;
  image_url?: string;
  source: string;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDateForAPI = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};

export const fetchFromLiturgicalCalendarAPI = async (date: Date): Promise<Saint | null> => {
  try {
    const year = date.getFullYear();
    const url = `https://litcal.johnromanodorazio.com/api/v3/calendar?year=${year}`;

    const response = await axios.get(url);
    const formattedDate = formatDateForAPI(date);

    const celebrations = response.data.litcal;
    const todaysCelebration = Object.values(celebrations).find((celebration: any) => {
      const celebrationDate = new Date(celebration.date);
      return formatDateForAPI(celebrationDate) === formattedDate;
    }) as any;

    if (!todaysCelebration) return null;

    const saint: Saint = {
      celebration_date: formatDate(date),
      saint_name: todaysCelebration.name,
      title: todaysCelebration.grade || todaysCelebration.type,
      rank: todaysCelebration.rank,
      biography: todaysCelebration.common || '',
      patronage: [],
      feast_day: todaysCelebration.grade,
      source: 'litcal_api'
    };

    return saint;
  } catch (error) {
    console.error('Error fetching from Liturgical Calendar API:', error);
    return null;
  }
};

export const scrapeFranciscanMediaSaint = async (date: Date): Promise<Saint | null> => {
  try {
    const month = date.toLocaleString('en-US', { month: 'long' }).toLowerCase();
    const day = date.getDate();
    const url = `https://www.franciscanmedia.org/saint-of-the-day/`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    let saintName = '';
    let biography = '';
    let feastDay = '';

    $('.saint-name, .entry-title').each((_, el) => {
      const text = $(el).text().trim();
      if (text) saintName = text;
    });

    $('.saint-content, .entry-content').each((_, el) => {
      const text = $(el).text().trim();
      if (text) biography = text;
    });

    $('.feast-day').each((_, el) => {
      const text = $(el).text().trim();
      if (text) feastDay = text;
    });

    if (!saintName) return null;

    const saint: Saint = {
      celebration_date: formatDate(date),
      saint_name: saintName,
      biography: biography || 'Biography not available',
      patronage: [],
      feast_day: feastDay,
      source: 'franciscan_media'
    };

    return saint;
  } catch (error) {
    console.error('Error scraping Franciscan Media:', error);
    return null;
  }
};

export const scrapeCatholicOnlineSaint = async (date: Date): Promise<Saint | null> => {
  try {
    const url = 'https://www.catholic.org/saints/sofd.php';

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    let saintName = '';
    let biography = '';
    let patronage: string[] = [];

    $('h1, .saint-name').first().each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.toLowerCase().includes('saint')) {
        saintName = text;
      }
    });

    $('.saint-bio, .content p').each((_, el) => {
      const text = $(el).text().trim();
      if (text) biography += text + '\n\n';
    });

    $('.patron, .patronage').each((_, el) => {
      const text = $(el).text().trim();
      if (text) {
        patronage.push(text);
      }
    });

    if (!saintName) return null;

    const saint: Saint = {
      celebration_date: formatDate(date),
      saint_name: saintName,
      biography: biography.trim() || 'Biography not available',
      patronage,
      source: 'catholic_online'
    };

    return saint;
  } catch (error) {
    console.error('Error scraping Catholic Online:', error);
    return null;
  }
};

export const fetchAndStoreSaintOfDay = async (date: Date = new Date()): Promise<boolean> => {
  try {
    const formattedDate = formatDate(date);

    const { data: existing } = await supabase
      .from('saints_of_the_day')
      .select('id')
      .eq('celebration_date', formattedDate)
      .maybeSingle();

    if (existing) {
      console.log('Saint already exists for', formattedDate);
      return true;
    }

    let saint = await fetchFromLiturgicalCalendarAPI(date);

    if (!saint || !saint.biography) {
      console.log('Trying Franciscan Media fallback...');
      const franciscanSaint = await scrapeFranciscanMediaSaint(date);
      if (franciscanSaint) {
        saint = { ...saint, ...franciscanSaint };
      }
    }

    if (!saint || !saint.biography || saint.biography === '') {
      console.log('Trying Catholic Online fallback...');
      const catholicOnlineSaint = await scrapeCatholicOnlineSaint(date);
      if (catholicOnlineSaint) {
        saint = { ...saint, ...catholicOnlineSaint };
      }
    }

    if (!saint) {
      console.error('Failed to fetch saint from all sources');
      return false;
    }

    const { error } = await supabase
      .from('saints_of_the_day')
      .insert([saint]);

    if (error) {
      console.error('Error storing saint:', error);
      return false;
    }

    console.log('Successfully stored saint for', formattedDate);
    return true;
  } catch (error) {
    console.error('Error in fetchAndStoreSaintOfDay:', error);
    return false;
  }
};

export const getTodaysSaint = async (): Promise<Saint | null> => {
  try {
    const today = formatDate(new Date());

    const { data, error } = await supabase
      .from('saints_of_the_day')
      .select('*')
      .eq('celebration_date', today)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      await fetchAndStoreSaintOfDay();
      return await getTodaysSaint();
    }

    return data as Saint;
  } catch (error) {
    console.error('Error getting todays saint:', error);
    return null;
  }
};

export const getSaintByDate = async (date: Date): Promise<Saint | null> => {
  try {
    const formattedDate = formatDate(date);

    const { data, error } = await supabase
      .from('saints_of_the_day')
      .select('*')
      .eq('celebration_date', formattedDate)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      await fetchAndStoreSaintOfDay(date);
      const { data: newData } = await supabase
        .from('saints_of_the_day')
        .select('*')
        .eq('celebration_date', formattedDate)
        .maybeSingle();

      return newData as Saint;
    }

    return data as Saint;
  } catch (error) {
    console.error('Error getting saint by date:', error);
    return null;
  }
};
