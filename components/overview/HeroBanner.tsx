'use client';

import React from 'react';
import Image from 'next/image';
import { Disc3, CheckCircle2, Music, Sparkles } from 'lucide-react';
import { COUPLE_DATA } from '@/lib/agenda';
import { useAudio } from '@/components/player/AudioContext';

interface HeroBannerProps {
  guestName?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ guestName }) => {
  const { isPlaying } = useAudio();

  return (
    <div className="relative pt-6 pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#3a2e1d] via-[#1a1815] to-spotify-black transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
        {/* Album Artwork with Vinyl Rotation effect */}
        <div className="relative group flex-shrink-0">
          {/* Main Cover */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.8)] z-10 bg-spotify-dark border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
              alt="Alif & Widi Wedding Cover"
              width={260}
              height={260}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              priority
              unoptimized
            />
            {/* Glossy gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
          </div>

          {/* Vinyl disk sliding out animation behind album */}
          <div 
            className={`absolute top-0 right-[-18px] sm:right-[-26px] w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-full bg-[#111111] border-[6px] border-[#222222] shadow-2xl flex items-center justify-center transition-all duration-700 pointer-events-none z-0 ${
              isPlaying ? 'translate-x-6 sm:translate-x-10 animate-spin-slow' : 'opacity-80 group-hover:translate-x-4'
            }`}
          >
            {/* Vinyl grooves */}
            <div className="w-36 h-36 rounded-full border border-white/5 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-spotify-green/80 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#111111]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Playlist / Single Metadata */}
        <div className="flex flex-col text-center md:text-left z-10 min-w-0">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-white/10 px-2 py-0.5 rounded-sm">
              Public Playlist • Wedding Invitation
            </span>
            <div className="flex items-center gap-1 text-[11px] text-[#3b82f6] font-semibold bg-[#3b82f6]/10 px-2 py-0.5 rounded-sm">
              <CheckCircle2 className="w-3 h-3 fill-[#3b82f6] text-black" />
              Verified Couple
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-3">
            Alif & Widi
          </h1>

          <p className="text-spotify-text-subdued text-xs sm:text-sm font-medium mb-3">
            {COUPLE_DATA.groom.fullName} &amp; {COUPLE_DATA.bride.fullName}
          </p>

          {/* Guest Personalization Pill */}
          {guestName && (
            <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="bg-spotify-green/15 border border-spotify-green/40 px-3 py-1.5 rounded-full flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-spotify-green animate-pulse" />
                <span className="text-xs text-spotify-green font-semibold">
                  Spesial untuk: <strong className="text-white font-bold">{guestName}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Subtitle / Stat row */}
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-white/80 font-medium flex-wrap">
            <span className="font-bold text-white">Naufal &amp; Tri</span>
            <span>•</span>
            <span>30 Des 2026</span>
            <span>•</span>
            <span>4 agenda, 1 hr 30 mins</span>
            <span>•</span>
            <span className="text-spotify-green flex items-center gap-1 font-semibold">
              <Music className="w-3 h-3" /> Graha Kencana
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
