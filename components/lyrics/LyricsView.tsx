'use client';

import React, { useEffect, useRef, useState } from 'react';
import { WEDDING_LYRICS } from '@/lib/lyricsData';
import { useAudio } from '@/components/player/AudioContext';
import { LyricLine } from '@/types';
import { Sparkles, Share2, Check, Music2, Info } from 'lucide-react';

export const LyricsView: React.FC = () => {
  const { currentTime, isPlaying, seek } = useAudio();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  const currentMs = currentTime * 1000;

  // Determine active lyric line index based on current playback time
  const activeIndex = WEDDING_LYRICS.reduce((acc, line, idx) => {
    if (currentMs >= line.timeMs) {
      return idx;
    }
    return acc;
  }, 0);

  // Smooth scroll container to keep active line centered
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeIndex]);

  const handleLineClick = (line: LyricLine) => {
    seek(line.timeMs / 1000);
  };

  const handleShareLine = (e: React.MouseEvent, line: LyricLine) => {
    e.stopPropagation();
    const textToCopy = `"${line.text}" - Pernikahan Alif & Widi (30 Des 2026)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(line.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSectionBadge = (section?: string) => {
    switch (section) {
      case 'verse1':
        return 'VERSE 1 • SALAM & AYAT SUCI';
      case 'chorus':
        return 'CHORUS • MEMPELAI BERBAHAGIA';
      case 'verse2':
        return 'VERSE 2 • OUR STORY & HARAPAN';
      case 'outro':
        return 'OUTRO • TERIMA KASIH';
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto px-4 py-8 pb-32 overflow-y-auto min-h-[70vh] select-none"
    >
      {/* Header Info */}
      <div className="mb-8 flex items-center justify-between border-b border-[#282828] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-spotify-green/20 flex items-center justify-center text-spotify-green">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              Lyrics: Kisah & Doa Pernikahan
            </h2>
            <p className="text-xs text-spotify-text-subdued flex items-center gap-1.5 mt-0.5">
              <Music2 className="w-3.5 h-3.5 text-spotify-green" />
              Sinkronisasi waktu nyata dengan audio yang sedang diputar • Klik baris untuk melompat
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center text-xs text-spotify-text-subdued bg-[#1e1e1e] px-3 py-1.5 rounded-full border border-white/5">
          <Info className="w-3.5 h-3.5 mr-1.5 text-spotify-green" />
          QS. Ar-Rum: 21 & Kisah Cinta
        </div>
      </div>

      {/* Lyrics Stream */}
      <div className="space-y-6 md:space-y-8">
        {WEDDING_LYRICS.map((line, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          const showSectionHeader = index === 0 || line.section !== WEDDING_LYRICS[index - 1]?.section;

          return (
            <div key={line.id} className="relative">
              {/* Section Header */}
              {showSectionHeader && (
                <div className="pt-4 pb-2">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-spotify-green/90 bg-spotify-green/10 px-2.5 py-1 rounded-md border border-spotify-green/20">
                    {getSectionBadge(line.section)}
                  </span>
                </div>
              )}

              {/* Lyric Card */}
              <div
                ref={isActive ? activeLineRef : null}
                onClick={() => handleLineClick(line)}
                className={`group relative rounded-xl p-3 md:p-4 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white/10 scale-[1.01] shadow-lg border-l-4 border-spotify-green backdrop-blur-sm'
                    : 'hover:bg-white/5 border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Primary Text */}
                    <p
                      className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight transition-all duration-300 ${
                        isActive
                          ? 'text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]'
                          : isPast
                          ? 'text-[#8c8c8c] hover:text-white'
                          : 'text-[#505050] hover:text-[#909090]'
                      }`}
                    >
                      {line.text}
                    </p>

                    {/* Indonesian Translation / Context */}
                    {line.translation && (
                      <p
                        className={`mt-2 text-xs sm:text-sm md:text-base leading-relaxed transition-colors ${
                          isActive
                            ? 'text-spotify-green font-medium'
                            : isPast
                            ? 'text-spotify-text-subdued/80'
                            : 'text-[#484848]'
                        }`}
                      >
                        {line.translation}
                      </p>
                    )}
                  </div>

                  {/* Quick Share / Copy Snippet */}
                  <button
                    onClick={(e) => handleShareLine(e, line)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-white/10 text-spotify-text-subdued hover:text-white flex-shrink-0"
                    title="Salin lirik ini"
                  >
                    {copiedId === line.id ? (
                      <Check className="w-4 h-4 text-spotify-green" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="mt-16 text-center text-xs text-spotify-text-subdued border-t border-[#282828] pt-6">
        <p>Alif & Widi • Pernikahan 30 Desember 2026</p>
        <p className="mt-1">Diberdayakan oleh cinta, doa restu keluarga, dan berkah Yang Maha Esa.</p>
      </div>
    </div>
  );
};
