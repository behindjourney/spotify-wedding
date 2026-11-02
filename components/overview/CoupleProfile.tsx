'use client';

import React from 'react';
import Image from 'next/image';
import { COUPLE_DATA } from '@/lib/agenda';
import { CheckCircle2, Heart, Instagram, Users, Sparkles } from 'lucide-react';

export const CoupleProfile: React.FC = () => {
  const { groom, bride } = COUPLE_DATA;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 border-t border-[#282828]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-spotify-green mb-1">
            <Users className="w-3.5 h-3.5" />
            About The Artists
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Kedua Mempelai
          </h2>
        </div>
        <span className="text-xs text-spotify-text-subdued hidden sm:inline">
          Infinity Listeners • Forever Duet
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GROOM CARD */}
        <div className="group relative bg-[#181818] hover:bg-[#202020] border border-[#282828] hover:border-[#383838] rounded-2xl p-6 transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Groom Photo */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-spotify-green/50 shadow-xl">
              <Image
                src={groom.photoUrl}
                alt={groom.fullName}
                width={128}
                height={128}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute bottom-1 right-1 bg-spotify-green text-black rounded-full p-1 shadow-md">
                <CheckCircle2 className="w-4 h-4 fill-black text-spotify-green" />
              </div>
            </div>

            {/* Groom Details */}
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-spotify-green uppercase tracking-wider bg-spotify-green/10 px-2.5 py-0.5 rounded-full mb-1.5">
                The Groom • Pengantin Pria
              </div>
              <h3 className="text-xl font-bold text-white">
                {groom.fullName}
              </h3>
              <p className="text-xs text-spotify-text-subdued font-medium mt-0.5">
                Panggilan: <strong className="text-white">{groom.nickName}</strong>
              </p>

              <div className="my-3 text-xs text-spotify-text-subdued leading-relaxed bg-black/30 p-2.5 rounded-lg border border-white/5">
                <p className="text-white/90 font-medium">Putra tercinta dari:</p>
                <p>{groom.fatherName}</p>
                <p>{groom.motherName}</p>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                <a
                  href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-spotify-text-subdued hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>{groom.instagram}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BRIDE CARD */}
        <div className="group relative bg-[#181818] hover:bg-[#202020] border border-[#282828] hover:border-[#383838] rounded-2xl p-6 transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Bride Photo */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-spotify-green/50 shadow-xl">
              <Image
                src={bride.photoUrl}
                alt={bride.fullName}
                width={128}
                height={128}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute bottom-1 right-1 bg-spotify-green text-black rounded-full p-1 shadow-md">
                <CheckCircle2 className="w-4 h-4 fill-black text-spotify-green" />
              </div>
            </div>

            {/* Bride Details */}
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-spotify-green uppercase tracking-wider bg-spotify-green/10 px-2.5 py-0.5 rounded-full mb-1.5">
                The Bride • Pengantin Wanita
              </div>
              <h3 className="text-xl font-bold text-white">
                {bride.fullName}
              </h3>
              <p className="text-xs text-spotify-text-subdued font-medium mt-0.5">
                Panggilan: <strong className="text-white">{bride.nickName}</strong>
              </p>

              <div className="my-3 text-xs text-spotify-text-subdued leading-relaxed bg-black/30 p-2.5 rounded-lg border border-white/5">
                <p className="text-white/90 font-medium">Putri tercinta dari:</p>
                <p>{bride.fatherName}</p>
                <p>{bride.motherName}</p>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                <a
                  href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-spotify-text-subdued hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>{bride.instagram}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
