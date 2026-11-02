'use client';

import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Heart, 
  CalendarPlus, 
  Share2, 
  Mic2, 
  ListMusic, 
  LayoutList,
  Download,
  Calendar,
  ExternalLink,
  Check
} from 'lucide-react';
import { useAudio } from '@/components/player/AudioContext';
import { generateGoogleCalendarUrl, downloadIcsFile } from '@/lib/calendar';

interface ActionBarProps {
  onShowToast: (msg: string) => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({ onShowToast }) => {
  const { isPlaying, togglePlay, isLiked, toggleLike, activeTab, setActiveTab } = useAudio();
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleLike = () => {
    toggleLike();
    if (!isLiked) {
      onShowToast('Ditambahkan ke "Liked Weddings" Anda ❤️');
    } else {
      onShowToast('Dihapus dari "Liked Weddings"');
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      onShowToast('Tautan undangan berhasil disalin!');
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleGoogleCalendar = () => {
    const url = generateGoogleCalendarUrl();
    window.open(url, '_blank');
    setShowCalendarMenu(false);
    onShowToast('Membuka Google Calendar...');
  };

  const handleIcsDownload = () => {
    downloadIcsFile();
    setShowCalendarMenu(false);
    onShowToast('Mengunduh file kalender (.ics)...');
  };

  return (
    <div className="relative px-4 sm:px-6 md:px-8 py-5 bg-gradient-to-b from-spotify-black/80 to-spotify-black border-b border-[#282828]/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Giant Play Button + Heart + Calendar + Share */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Giant Green Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-spotify-green hover:bg-spotify-green-hover text-black flex items-center justify-center shadow-[0_8px_24px_rgba(29,185,84,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play Kusuma Wijaya'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-black text-black" />
            ) : (
              <Play className="w-7 h-7 fill-black text-black translate-x-0.5" />
            )}
          </button>

          {/* Heart Like Button */}
          <button
            onClick={handleLike}
            className="p-2 text-spotify-text-subdued hover:text-white transition-transform active:scale-125"
            title={isLiked ? 'Unlike' : 'Save to your Liked Weddings'}
          >
            <Heart
              className={`w-8 h-8 transition-colors ${
                isLiked ? 'fill-spotify-green text-spotify-green' : 'hover:text-white'
              }`}
            />
          </button>

          {/* Add to Calendar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCalendarMenu((prev) => !prev)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/20 hover:border-white text-white text-xs font-semibold hover:scale-105 transition-all"
              title="Simpan Tanggal ke Kalender"
            >
              <CalendarPlus className="w-4 h-4 text-spotify-green" />
              <span>Simpan Tanggal</span>
            </button>

            {showCalendarMenu && (
              <div className="absolute left-0 mt-2 w-56 bg-spotify-dark border border-[#3e3e3e] rounded-xl shadow-2xl z-30 py-1.5 animate-fade-in">
                <button
                  onClick={handleGoogleCalendar}
                  className="w-full text-left px-4 py-2.5 text-xs text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-spotify-green" />
                  <span>Google Calendar</span>
                  <ExternalLink className="w-3 h-3 text-spotify-text-subdued ml-auto" />
                </button>
                <button
                  onClick={handleIcsDownload}
                  className="w-full text-left px-4 py-2.5 text-xs text-white hover:bg-white/10 flex items-center gap-2.5 transition-colors"
                >
                  <Download className="w-4 h-4 text-spotify-green" />
                  <span>Download .ICS (Apple/Outlook)</span>
                </button>
              </div>
            )}
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2 text-spotify-text-subdued hover:text-white transition-transform active:scale-110"
            title="Bagikan Tautan Undangan"
          >
            {isCopied ? (
              <Check className="w-6 h-6 text-spotify-green" />
            ) : (
              <Share2 className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Right: Spotify View Mode Tabs */}
        <div className="flex items-center gap-1.5 bg-[#181818] p-1 rounded-full border border-[#282828] self-start md:self-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-spotify-light text-white shadow-sm'
                : 'text-spotify-text-subdued hover:text-white'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span>Tracklist Agenda</span>
          </button>

          <button
            onClick={() => setActiveTab('lyrics')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'lyrics'
                ? 'bg-spotify-light text-spotify-green shadow-sm'
                : 'text-spotify-text-subdued hover:text-white'
            }`}
          >
            <Mic2 className="w-3.5 h-3.5" />
            <span>Lyrics (Kisah & Doa)</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'queue'
                ? 'bg-spotify-light text-spotify-green shadow-sm'
                : 'text-spotify-text-subdued hover:text-white'
            }`}
          >
            <ListMusic className="w-3.5 h-3.5" />
            <span>Queue (Buku Tamu)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
