import { Track } from '@/types';

// High quality audio streams for browser HTML5 Audio API compatibility
export const TRACKS: Track[] = [
  {
    id: 'track-kusuma-wijaya',
    title: 'Kusuma Wijaya',
    artist: 'Pawestri',
    album: 'Alif & Widi: The Wedding Playlist',
    durationSeconds: 215, // 3:35
    durationFormatted: '3:35',
    // High reliability royalty-free romantic acoustic instrumental track
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113271.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    isHero: true,
  },
  {
    id: 'track-di-akhir-perang',
    title: 'Di Akhir Perang',
    artist: 'Nadin Amizah',
    album: 'Untuk Dunia, Cinta, dan Kotornya',
    durationSeconds: 242, // 4:02
    durationFormatted: '4:02',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=acoustic-guitars-ambient-uplifting-10820.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'track-tangguh',
    title: 'Tangguh',
    artist: 'Petra Sihombing',
    album: 'Semenjak Ada Kamu',
    durationSeconds: 198, // 3:18
    durationFormatted: '3:18',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=soft-piano-melody-ambient-14732.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'track-teman-hidup',
    title: 'Teman Hidup',
    artist: 'Tulus',
    album: 'Tulus',
    durationSeconds: 236, // 3:56
    durationFormatted: '3:56',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=warm-acoustic-guitar-love-123498.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
  },
];
