import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      daily_readings: {
        Row: {
          id: string;
          reading_date: string;
          first_reading: any;
          responsorial_psalm: any;
          second_reading: any | null;
          gospel: any;
          reflection: string | null;
          liturgical_color: string | null;
          season: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['daily_readings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['daily_readings']['Insert']>;
      };
      saints_of_the_day: {
        Row: {
          id: string;
          celebration_date: string;
          saint_name: string;
          title: string | null;
          rank: string | null;
          biography: string;
          patronage: string[];
          birth_year: number | null;
          death_year: number | null;
          feast_day: string | null;
          image_url: string | null;
          source: string | null;
          created_at: string;
        };
      };
      mass_intentions: {
        Row: {
          id: string;
          requester_name: string;
          requester_email: string;
          requester_phone: string;
          intention_for: string;
          intention_type: string;
          intention_details: string;
          preferred_date: string;
          payment_status: string;
          payment_amount: number;
          payment_reference: string | null;
          status: string;
          admin_notes: string | null;
          approved_by: string | null;
          approved_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      prayer_requests: {
        Row: {
          id: string;
          requester_name: string;
          requester_email: string | null;
          prayer_intention: string;
          is_urgent: boolean;
          is_anonymous: boolean;
          status: string;
          prayer_count: number;
          approved_by: string | null;
          approved_at: string | null;
          created_at: string;
        };
      };
      marketplace_listings: {
        Row: {
          id: string;
          business_name: string;
          owner_name: string;
          owner_email: string;
          owner_phone: string;
          category: string;
          description: string;
          location: string | null;
          website: string | null;
          social_media: any | null;
          image_url: string | null;
          is_featured: boolean;
          featured_until: string | null;
          status: string;
          approved_by: string | null;
          approved_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      associations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          type: string;
          overview: string;
          history: string;
          patron_saint: string | null;
          requirements: string[];
          how_to_join: string;
          meeting_schedule: string;
          contact_person: string | null;
          contact_email: string | null;
          image_url: string | null;
          fun_facts: string[] | null;
          created_at: string;
          updated_at: string;
        };
      };
      doctrine_qa: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string;
          subcategory: string | null;
          difficulty_level: string;
          citations: string[] | null;
          related_questions: string[] | null;
          tags: string[];
          view_count: number;
          helpful_count: number;
          created_at: string;
          updated_at: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          announcement_type: string;
          display_from: string;
          display_until: string | null;
          is_active: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          event_date: string;
          end_date: string | null;
          location: string;
          category: string;
          image_url: string | null;
          registration_required: boolean;
          registration_link: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      news_articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          image_url: string | null;
          author: string;
          published_date: string | null;
          is_published: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: string;
          permissions: any;
          is_active: boolean;
          last_login: string | null;
          created_at: string;
        };
      };
    };
  };
};
