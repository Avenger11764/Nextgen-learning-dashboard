import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export const MOCK_COURSES: Course[] = [
  {
    id: 'mock-1',
    title: 'Offline Module: Basic HTML & DOM',
    progress: 25,
    icon_name: 'Code2',
    created_at: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    title: 'Offline Module: Styling Foundations',
    progress: 40,
    icon_name: 'Cpu',
    created_at: new Date().toISOString(),
  },
  {
    id: 'mock-3',
    title: 'Offline Module: Local Fallback Engine',
    progress: 15,
    icon_name: 'Database',
    created_at: new Date().toISOString(),
  },
];

export async function getCourses(): Promise<{ data: Course[]; error: string | null; isMock: boolean }> {
  if (!supabase) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { data: MOCK_COURSES, error: null, isMock: true };
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      return { data: [], error: error.message, isMock: false };
    }

    if (!data || data.length === 0) {
      return { data: [], error: 'No courses found in database.', isMock: false };
    }

    return { data: data as Course[], error: null, isMock: false };
  } catch (err: any) {
    return { data: [], error: err.message || 'Unknown network error', isMock: false };
  }
}
