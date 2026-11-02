export type ViewTab = 'overview' | 'lyrics' | 'queue';

export interface LyricLine {
  id: string;
  timeMs: number; // in milliseconds for sync
  text: string;
  translation?: string;
  section?: 'verse1' | 'chorus' | 'verse2' | 'outro';
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  durationSeconds: number;
  durationFormatted: string;
  audioUrl: string;
  coverUrl: string;
  isHero?: boolean;
}

export interface AgendaItem {
  id: string;
  trackNumber: number;
  title: string;
  type: string; // e.g. "Akad Nikah", "Resepsi Pernikahan"
  date: string;
  time: string;
  locationName: string;
  address: string;
  coordinates: string;
  mapsUrl: string;
  description: string;
  durationFormatted: string;
}

export interface Guest {
  id?: string;
  name: string;
  slug: string;
  custom_greeting?: string;
  plus_one_count?: number;
  created_at?: string;
}

export interface Wish {
  id: string;
  guest_name: string;
  message: string;
  attendance?: 'attending' | 'uncertain' | 'declined';
  song_request?: string;
  created_at: string;
}

export interface CoupleInfo {
  groom: {
    fullName: string;
    nickName: string;
    fatherName: string;
    motherName: string;
    instagram: string;
    bio: string;
    photoUrl: string;
  };
  bride: {
    fullName: string;
    nickName: string;
    fatherName: string;
    motherName: string;
    instagram: string;
    bio: string;
    photoUrl: string;
  };
  eventDateFormatted: string;
  eventDateIso: string;
  coordinates: string;
  mapsUrl: string;
}
