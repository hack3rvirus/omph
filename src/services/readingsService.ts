import axios from 'axios';
import * as cheerio from 'cheerio';
import { supabase } from '../lib/supabase';

interface Reading {
  title?: string;
  citation: string;
  content: string;
}

interface ResponsorialPsalm {
  citation: string;
  response: string;
  verses: string;
}

interface DailyReadings {
  reading_date: string;
  first_reading: Reading;
  responsorial_psalm: ResponsorialPsalm;
  second_reading?: Reading;
  gospel: Reading;
  reflection?: string;
  liturgical_color?: string;
  season?: string;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatUSCCBDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

export const scrapeEWTNReadings = async (date: Date): Promise<DailyReadings | null> => {
  try {
    const formattedDate = formatDate(date);
    const url = `https://www.ewtn.com/catholicism/daily-readings/${formattedDate}`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const readings: Partial<DailyReadings> = {
      reading_date: formattedDate
    };

    const readingElements = $('.daily-readings-content .reading');

    readingElements.each((index, element) => {
      const $el = $(element);
      const title = $el.find('.reading-title').text().trim();
      const citation = $el.find('.reading-citation').text().trim();
      const content = $el.find('.reading-text').text().trim();

      if (title.toLowerCase().includes('first reading')) {
        readings.first_reading = { title, citation, content };
      } else if (title.toLowerCase().includes('responsorial psalm')) {
        const response = $el.find('.psalm-response').text().trim();
        const verses = $el.find('.psalm-verses').text().trim();
        readings.responsorial_psalm = { citation, response, verses };
      } else if (title.toLowerCase().includes('second reading')) {
        readings.second_reading = { title, citation, content };
      } else if (title.toLowerCase().includes('gospel')) {
        readings.gospel = { title, citation, content };
      }
    });

    const reflection = $('.daily-reflection').text().trim();
    if (reflection) {
      readings.reflection = reflection;
    }

    const liturgicalColor = $('.liturgical-color').text().trim();
    if (liturgicalColor) {
      readings.liturgical_color = liturgicalColor;
    }

    const season = $('.liturgical-season').text().trim();
    if (season) {
      readings.season = season;
    }

    if (readings.first_reading && readings.responsorial_psalm && readings.gospel) {
      return readings as DailyReadings;
    }

    return null;
  } catch (error) {
    console.error('Error scraping EWTN readings:', error);
    return null;
  }
};

export const scrapeUSCCBReadings = async (date: Date): Promise<DailyReadings | null> => {
  try {
    const formattedDate = formatUSCCBDate(date);
    const url = `https://bible.usccb.org/bible/readings/${formattedDate}.cfm`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const readings: Partial<DailyReadings> = {
      reading_date: formatDate(date)
    };

    const contentSections = $('.content-body');

    contentSections.each((index, section) => {
      const $section = $(section);
      const heading = $section.find('h3').first().text().trim();
      const citation = $section.find('.address').first().text().trim();
      const content = $section.find('.content').text().trim();

      if (heading.toLowerCase().includes('first reading') || index === 0) {
        readings.first_reading = { citation, content };
      } else if (heading.toLowerCase().includes('responsorial psalm') || heading.toLowerCase().includes('psalm')) {
        const response = $section.find('.psalm-response').text().trim() ||
                        $section.find('strong').first().text().trim();
        readings.responsorial_psalm = {
          citation,
          response: response || 'R.',
          verses: content
        };
      } else if (heading.toLowerCase().includes('second reading')) {
        readings.second_reading = { citation, content };
      } else if (heading.toLowerCase().includes('gospel')) {
        readings.gospel = { citation, content };
      }
    });

    if (readings.first_reading && readings.responsorial_psalm && readings.gospel) {
      return readings as DailyReadings;
    }

    return null;
  } catch (error) {
    console.error('Error scraping USCCB readings:', error);
    return null;
  }
};

export const fetchAndStoreDailyReadings = async (date: Date = new Date()): Promise<boolean> => {
  try {
    const formattedDate = formatDate(date);

    const { data: existing } = await supabase
      .from('daily_readings')
      .select('id')
      .eq('reading_date', formattedDate)
      .maybeSingle();

    if (existing) {
      console.log('Readings already exist for', formattedDate);
      return true;
    }

    let readings = await scrapeEWTNReadings(date);

    if (!readings) {
      console.log('Trying USCCB fallback...');
      readings = await scrapeUSCCBReadings(date);
    }

    if (!readings) {
      console.error('Failed to fetch readings from both sources');
      return false;
    }

    const { error } = await supabase
      .from('daily_readings')
      .insert([readings]);

    if (error) {
      console.error('Error storing readings:', error);
      return false;
    }

    console.log('Successfully stored readings for', formattedDate);
    return true;
  } catch (error) {
    console.error('Error in fetchAndStoreDailyReadings:', error);
    return false;
  }
};

export const getTodaysReadings = async (): Promise<DailyReadings | null> => {
  try {
    const today = formatDate(new Date());

    const { data, error } = await supabase
      .from('daily_readings')
      .select('*')
      .eq('reading_date', today)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      await fetchAndStoreDailyReadings();
      return await getTodaysReadings();
    }

    return data as DailyReadings;
  } catch (error) {
    console.error('Error getting todays readings:', error);
    return null;
  }
};

export const getReadingsByDate = async (date: Date): Promise<DailyReadings | null> => {
  try {
    const formattedDate = formatDate(date);

    const { data, error } = await supabase
      .from('daily_readings')
      .select('*')
      .eq('reading_date', formattedDate)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      await fetchAndStoreDailyReadings(date);
      const { data: newData } = await supabase
        .from('daily_readings')
        .select('*')
        .eq('reading_date', formattedDate)
        .maybeSingle();

      return newData as DailyReadings;
    }

    return data as DailyReadings;
  } catch (error) {
    console.error('Error getting readings by date:', error);
    return null;
  }
};
