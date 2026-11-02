import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Guest, Wish } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Safely create Supabase client if keys are present
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial mock wishes if database is not connected
export const initialMockWishes: Wish[] = [
  {
    id: 'w-1',
    guest_name: 'Budi & Partner',
    message: 'Selamat untuk Alif & Widi! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu sampai akhir hayat!',
    attendance: 'attending',
    song_request: 'Teman Hidup - Tulus',
    created_at: '2026-11-01T10:30:00Z',
  },
  {
    id: 'w-2',
    guest_name: 'Sarah Salsabila',
    message: 'Barakallahu lakum wa baraka alaikum! Happy wedding Alif & Widi! Playlist-nya keren banget berasa di konser cinta!',
    attendance: 'attending',
    song_request: 'Di Akhir Perang - Nadin Amizah',
    created_at: '2026-11-01T14:15:00Z',
  },
  {
    id: 'w-3',
    guest_name: 'Dimas Pratama',
    message: 'Happy Wedding brother Alif dan Kak Widi! Semoga lancar sampai hari H dan selamanya kompak menjadi partner hidup terhebat!',
    attendance: 'attending',
    song_request: 'Tangguh - Petra Sihombing',
    created_at: '2026-11-02T08:00:00Z',
  },
  {
    id: 'w-4',
    guest_name: 'Ayu & Rian',
    message: 'Selamat menempuh hidup baru berdua. Semoga cinta kalian selalu bertumbuh tiap harinya dan selalu dalam lindungan-Nya. Aamiin!',
    attendance: 'attending',
    song_request: 'Kusuma Wijaya - Pawestri',
    created_at: '2026-11-02T11:45:00Z',
  },
];

/**
 * Fetch guest details by slug from Supabase, or generate fallback from formatted slug
 */
export async function getGuestBySlug(slug: string): Promise<Guest> {
  const formattedDefaultName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(' And ', ' & ');

  if (!isSupabaseConfigured || !supabase) {
    return {
      name: formattedDefaultName || 'Tamu Undangan',
      slug: slug,
      custom_greeting: 'Merupakan kehormatan bagi kami atas kehadiran dan doa restu Anda di hari bahagia kami.',
      plus_one_count: 2,
    };
  }

  const client = supabase;
  try {
    const { data, error } = await client
      .from('guests')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      return {
        name: formattedDefaultName || 'Tamu Undangan',
        slug: slug,
        custom_greeting: 'Merupakan kehormatan bagi kami atas kehadiran dan doa restu Anda di hari bahagia kami.',
        plus_one_count: 2,
      };
    }

    return data as Guest;
  } catch (err) {
    console.warn('Failed to query guest from Supabase, fallback used:', err);
    return {
      name: formattedDefaultName || 'Tamu Undangan',
      slug: slug,
      custom_greeting: 'Merupakan kehormatan bagi kami atas kehadiran dan doa restu Anda di hari bahagia kami.',
      plus_one_count: 2,
    };
  }
}

/**
 * Fetch all wishes from Supabase, or retrieve from localStorage / mock
 */
export async function fetchWishes(): Promise<Wish[]> {
  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('spotify_wedding_wishes');
      if (local) {
        try {
          return JSON.parse(local);
        } catch {
          // ignore parsing error
        }
      }
    }
    return initialMockWishes;
  }

  const client = supabase;
  try {
    const { data, error } = await client
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.warn('Supabase wishes query returned error, using fallback:', error);
      return initialMockWishes;
    }

    return data as Wish[];
  } catch (err) {
    console.warn('Error fetching wishes from Supabase:', err);
    return initialMockWishes;
  }
}

/**
 * Submit a new wish to Supabase or save to local storage
 */
export async function submitWish(newWish: Omit<Wish, 'id' | 'created_at'>): Promise<Wish> {
  const wishRecord: Wish = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `w-${Date.now()}`,
    guest_name: newWish.guest_name,
    message: newWish.message,
    attendance: newWish.attendance || 'attending',
    song_request: newWish.song_request || '',
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const client = supabase;
    try {
      const { data, error } = await client
        .from('wishes')
        .insert([
          {
            guest_name: newWish.guest_name,
            message: newWish.message,
            attendance: newWish.attendance || 'attending',
            song_request: newWish.song_request || null,
          },
        ])
        .select()
        .single();

      if (!error && data) {
        return data as Wish;
      }
      console.warn('Supabase insert wish error, saving locally:', error);
    } catch (err) {
      console.warn('Supabase insert wish exception, saving locally:', err);
    }
  }

  // Local fallback persistence
  if (typeof window !== 'undefined') {
    try {
      const current = localStorage.getItem('spotify_wedding_wishes');
      const parsed: Wish[] = current ? JSON.parse(current) : initialMockWishes;
      const updated = [wishRecord, ...parsed];
      localStorage.setItem('spotify_wedding_wishes', JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving wish to localStorage:', err);
    }
  }

  return wishRecord;
}
