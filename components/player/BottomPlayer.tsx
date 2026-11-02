'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Heart, 
  Mic2, 
  ListMusic, 
  Disc,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useAudio } from './AudioContext';
import { ProgressBar } from './ProgressBar';
import { VolumeControl } from './VolumeControl';

interface BottomPlayerProps {
  onHeartClick?: () => void;
}

export const BottomPlayer: React.FC<BottomPlayerProps> = ({ onHeartClick }) => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    isRepeat,
    isLiked,
    activeTab,
    setActiveTab,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    changeVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
  } = useAudio();

  const handleHeart = () => {
    toggleLike();
    if (onHeartClick) onHeartClick();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-spotify-black border-t border-[#282828] select-none">
      {/* Mini Progress Bar line for mobile */}
      <div className="md:hidden w-full h-[2px] bg-[#333333]">
        <div 
          className="h-full bg-spotify-green transition-all"
          style={{ width: `${Math.min(100, Math.max(0, (currentTime / (duration || 1)) * 100))}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
        {/* DESKTOP LAYOUT */}
        <div className="hidden md:grid md:grid-cols-3 items-center">
          {/* LEFT: Track Info */}
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div className="relative w-14 h-14 rounded overflow-hidden flex-shrink-0 bg-[#282828] shadow-md group">
              <Image
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                width={56}
                height={56}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isPlaying ? 'rotate-1' : ''
                }`}
                unoptimized
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                  <Disc className="w-5 h-5 text-spotify-green animate-spin-slow" />
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-white text-sm font-semibold truncate hover:underline cursor-pointer">
                {currentTrack.title}
              </span>
              <span className="text-spotify-text-subdued text-xs truncate hover:underline hover:text-white cursor-pointer">
                {currentTrack.artist}
              </span>
            </div>

            <button
              onClick={handleHeart}
              className="p-1 ml-2 text-spotify-text-subdued hover:text-white transition-transform active:scale-125"
              title={isLiked ? 'Unlike' : 'Save to Liked Weddings'}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isLiked ? 'fill-spotify-green text-spotify-green' : 'hover:text-white'
                }`}
              />
            </button>
          </div>

          {/* CENTER: Player Controls & Progress Bar */}
          <div className="flex flex-col items-center max-w-xl mx-auto w-full px-2">
            <div className="flex items-center gap-5 mb-1">
              <button
                onClick={toggleShuffle}
                className={`transition-colors ${
                  isShuffle ? 'text-spotify-green' : 'text-spotify-text-subdued hover:text-white'
                }`}
                title="Shuffle"
              >
                <Shuffle className="w-4 h-4" />
              </button>

              <button
                onClick={prevTrack}
                className="text-spotify-text-subdued hover:text-white transition-colors"
                title="Previous Track"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-black text-black" />
                ) : (
                  <Play className="w-4 h-4 fill-black text-black translate-x-[1px]" />
                )}
              </button>

              <button
                onClick={nextTrack}
                className="text-spotify-text-subdued hover:text-white transition-colors"
                title="Next Track"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={toggleRepeat}
                className={`transition-colors ${
                  isRepeat ? 'text-spotify-green' : 'text-spotify-text-subdued hover:text-white'
                }`}
                title="Repeat"
              >
                <Repeat className="w-4 h-4" />
              </button>
            </div>

            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onSeek={seek}
              showTimers={true}
            />
          </div>

          {/* RIGHT: View Selectors & Volume */}
          <div className="flex items-center justify-end gap-3 pl-4">
            <button
              onClick={() => setActiveTab(activeTab === 'lyrics' ? 'overview' : 'lyrics')}
              className={`p-2 rounded-full transition-colors ${
                activeTab === 'lyrics'
                  ? 'text-spotify-green bg-white/10'
                  : 'text-spotify-text-subdued hover:text-white'
              }`}
              title="Lyrics View (Our Story)"
            >
              <Mic2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'queue' ? 'overview' : 'queue')}
              className={`p-2 rounded-full transition-colors ${
                activeTab === 'queue'
                  ? 'text-spotify-green bg-white/10'
                  : 'text-spotify-text-subdued hover:text-white'
              }`}
              title="Wishes Queue"
            >
              <ListMusic className="w-5 h-5" />
            </button>

            <div className="w-[1px] h-6 bg-[#333333] mx-1" />

            <VolumeControl
              volume={volume}
              isMuted={isMuted}
              onVolumeChange={changeVolume}
              onToggleMute={toggleMute}
            />
          </div>
        </div>

        {/* MOBILE OVERLAY LAYOUT */}
        <div className="flex md:hidden items-center justify-between gap-3">
          {/* Left info & art */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="relative w-11 h-11 rounded overflow-hidden flex-shrink-0 bg-[#282828]">
              <Image
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                width={44}
                height={44}
                className={`w-full h-full object-cover ${isPlaying ? 'rotate-1' : ''}`}
                unoptimized
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-semibold truncate">
                {currentTrack.title}
              </span>
              <span className="text-spotify-text-subdued text-[11px] truncate">
                {currentTrack.artist}
              </span>
            </div>
          </div>

          {/* Right quick actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleHeart}
              className="p-1.5 text-spotify-text-subdued"
            >
              <Heart
                className={`w-5 h-5 ${
                  isLiked ? 'fill-spotify-green text-spotify-green' : 'text-spotify-text-subdued'
                }`}
              />
            </button>

            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center active:scale-95 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-black text-black" />
              ) : (
                <Play className="w-4 h-4 fill-black text-black translate-x-[1px]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'lyrics' ? 'overview' : 'lyrics')}
              className={`p-1.5 ${
                activeTab === 'lyrics' ? 'text-spotify-green' : 'text-spotify-text-subdued'
              }`}
              title="Lyrics"
            >
              <Mic2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'queue' ? 'overview' : 'queue')}
              className={`p-1.5 ${
                activeTab === 'queue' ? 'text-spotify-green' : 'text-spotify-text-subdued'
              }`}
              title="Wishes Queue"
            >
              <ListMusic className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
