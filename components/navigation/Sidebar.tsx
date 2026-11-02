'use client';

import React from 'react';
import { 
  Home, 
  Search, 
  Library, 
  Heart, 
  Music, 
  Mic2, 
  ListMusic, 
  Sparkles,
  Disc3,
  Calendar
} from 'lucide-react';
import { useAudio } from '@/components/player/AudioContext';

interface SidebarProps {
  onOpenGateModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenGateModal }) => {
  const { activeTab, setActiveTab, isLiked } = useAudio();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-spotify-black border-r border-[#222222] p-3 gap-2 flex-shrink-0 select-none">
      {/* Top Box: Main Nav */}
      <div className="bg-[#121212] rounded-xl p-4 flex flex-col gap-4">
        {/* Spotify Wedding Logo */}
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-full bg-spotify-green flex items-center justify-center text-black font-black text-lg shadow-[0_0_15px_rgba(29,185,84,0.5)]">
            <Disc3 className="w-5 h-5 animate-spin-slow" />
          </div>
          <span className="font-bold text-white text-base tracking-tight">
            Spotify <span className="text-spotify-green text-sm font-semibold">Wedding</span>
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-4 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
              activeTab === 'overview'
                ? 'text-white bg-white/10'
                : 'text-spotify-text-subdued hover:text-white'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Overview &amp; Agenda</span>
          </button>

          <button
            onClick={() => setActiveTab('lyrics')}
            className={`flex items-center gap-4 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
              activeTab === 'lyrics'
                ? 'text-spotify-green bg-white/10'
                : 'text-spotify-text-subdued hover:text-white'
            }`}
          >
            <Mic2 className="w-5 h-5" />
            <span>Lyrics (Kisah Cinta)</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`flex items-center gap-4 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
              activeTab === 'queue'
                ? 'text-spotify-green bg-white/10'
                : 'text-spotify-text-subdued hover:text-white'
            }`}
          >
            <ListMusic className="w-5 h-5" />
            <span>Wishes Queue</span>
          </button>
        </nav>
      </div>

      {/* Bottom Box: Your Library & Playlists */}
      <div className="flex-1 bg-[#121212] rounded-xl p-4 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between text-spotify-text-subdued hover:text-white px-2 mb-4 cursor-pointer">
          <div className="flex items-center gap-3">
            <Library className="w-5 h-5" />
            <span className="text-sm font-bold">Your Library</span>
          </div>
        </div>

        {/* Liked Songs / Wedding Playlist Cards */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {/* Liked Weddings */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded bg-gradient-to-br from-[#450af5] to-[#8e8ee5] flex items-center justify-center flex-shrink-0 shadow">
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-white text-white' : 'text-white'}`} />
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate group-hover:text-spotify-green">
                Liked Weddings
              </p>
              <p className="text-spotify-text-subdued text-[11px] truncate">
                Playlist • {isLiked ? '1 couple' : '0 couple'}
              </p>
            </div>
          </div>

          {/* Alif & Widi Special Album */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded bg-spotify-green/20 border border-spotify-green/30 flex items-center justify-center flex-shrink-0 text-spotify-green">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate group-hover:text-spotify-green">
                Alif &amp; Widi: The Wedding
              </p>
              <p className="text-spotify-text-subdued text-[11px] truncate">
                Rabu, 30 Des 2026
              </p>
            </div>
          </div>

          {/* Akad & Resepsi */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded bg-[#282828] flex items-center justify-center flex-shrink-0 text-spotify-text-subdued group-hover:text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate group-hover:text-spotify-green">
                Akad &amp; Resepsi Graha Kencana
              </p>
              <p className="text-spotify-text-subdued text-[11px] truncate">
                Waktu &amp; Rangkaian
              </p>
            </div>
          </div>
        </div>

        {/* Trigger re-open guest card */}
        {onOpenGateModal && (
          <button
            onClick={onOpenGateModal}
            className="mt-3 w-full py-2 px-3 rounded-lg border border-spotify-green/30 text-spotify-green text-xs font-semibold hover:bg-spotify-green/10 transition-colors text-center"
          >
            Buka Kartu Undangan
          </button>
        )}
      </div>
    </aside>
  );
};
