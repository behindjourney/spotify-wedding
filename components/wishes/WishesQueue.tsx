'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Wish } from '@/types';
import { fetchWishes, supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAudio } from '@/components/player/AudioContext';
import { WishFormModal } from './WishFormModal';
import { formatRelativeTime } from '@/lib/utils';
import { 
  PlusCircle, 
  Music, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Disc3,
  Heart,
  Share2
} from 'lucide-react';

interface WishesQueueProps {
  currentGuestName?: string;
}

export const WishesQueue: React.FC<WishesQueueProps> = ({ currentGuestName = '' }) => {
  const { currentTrack, isPlaying } = useAudio();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Load initial wishes
  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await fetchWishes();
        if (isMounted) {
          setWishes(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching wishes queue:', err);
        if (isMounted) setIsLoading(false);
      }
    }
    load();

    // Subscribe to Supabase real-time updates if configured
    if (isSupabaseConfigured && supabase) {
      const channel = supabase
        .channel('realtime_wishes')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'wishes' },
          (payload) => {
            const newWish = payload.new as Wish;
            setWishes((prev) => [newWish, ...prev.filter((w) => w.id !== newWish.id)]);
          }
        )
        .subscribe();

      return () => {
        isMounted = false;
        supabase.removeChannel(channel);
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleWishSubmitted = (newWish: Wish) => {
    setWishes((prev) => [newWish, ...prev.filter((w) => w.id !== newWish.id)]);
  };

  const getAttendanceBadge = (status?: string) => {
    switch (status) {
      case 'attending':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Akan Hadir
          </span>
        );
      case 'uncertain':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Masih Ragu
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-300 bg-rose-950/60 border border-rose-800/40 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Berhalangan
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 pb-32">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#282828] pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            Queue: Buku Tamu & Doa
          </h2>
          <p className="text-spotify-text-subdued text-xs sm:text-sm mt-1">
            Daftar antrean doa restu dan request lagu cinta dari para tamu undangan terhormat
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-spotify-green hover:bg-spotify-green-hover text-black font-bold text-sm px-5 py-2.5 rounded-full shadow-lg transition-transform active:scale-95"
        >
          <PlusCircle className="w-4 h-4 fill-black text-white" />
          Kirim Ucapan / Doa
        </button>
      </div>

      {/* NOW PLAYING SECTION (SPOTIFY QUEUE REPLICA) */}
      <div className="mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-spotify-text-subdued mb-3">
          Now Playing
        </h3>
        <div className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-colors">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-spotify-light">
              <Image
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Disc3 className="w-5 h-5 text-spotify-green animate-spin-slow" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate flex items-center gap-2">
                <span className="text-spotify-green">▶</span> {currentTrack.title}
              </p>
              <p className="text-spotify-text-subdued text-xs truncate">
                {currentTrack.artist} • {currentTrack.album}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-spotify-green bg-spotify-green/10 px-3 py-1 rounded-full border border-spotify-green/20">
            <span className="w-2 h-2 rounded-full bg-spotify-green animate-ping" />
            Sedang Berputar
          </div>
        </div>
      </div>

      {/* NEXT IN QUEUE SECTION */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-spotify-text-subdued">
            Next in Queue ({wishes.length} Doa Masuk)
          </h3>
          <span className="text-xs text-spotify-text-subdued">Urutan Terbaru</span>
        </div>

        {isLoading ? (
          <div className="space-y-3 py-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-20 bg-spotify-dark/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-xl bg-spotify-dark border border-[#282828]">
            <MessageSquare className="w-10 h-10 text-spotify-text-subdued mx-auto mb-3" />
            <p className="text-white font-medium">Antrean masih kosong</p>
            <p className="text-spotify-text-subdued text-xs mt-1">
              Jadilah yang pertama mengirimkan ucapan dan doa untuk Alif & Widi!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 bg-spotify-green text-black font-semibold text-xs px-4 py-2 rounded-full"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Tulis Ucapan Pertama
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {wishes.map((wish, index) => (
              <div
                key={wish.id}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-spotify-dark/60 hover:bg-[#202020] border border-[#262626] transition-all hover:border-[#383838]"
              >
                {/* Left: Index + Avatar + Wish details */}
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <span className="text-spotify-text-subdued text-xs font-mono pt-1 w-5 text-right flex-shrink-0 group-hover:text-white">
                    {index + 1}
                  </span>

                  {/* Initial Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#282828] to-[#1a1a1a] border border-white/10 flex items-center justify-center text-spotify-green font-bold text-sm flex-shrink-0 shadow-inner">
                    {wish.guest_name ? wish.guest_name.charAt(0).toUpperCase() : 'G'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-white font-semibold text-sm truncate">
                        {wish.guest_name}
                      </span>
                      {getAttendanceBadge(wish.attendance)}
                    </div>

                    <p className="text-spotify-text-subdued text-xs sm:text-sm leading-relaxed break-words">
                      "{wish.message}"
                    </p>

                    {wish.song_request && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-spotify-green">
                        <Music className="w-3 h-3" />
                        <span>Request: {wish.song_request}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Timestamp */}
                <div className="flex items-center justify-between sm:justify-end gap-2 text-[11px] text-spotify-text-subdued pl-8 sm:pl-0 flex-shrink-0">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#666666]" />
                    {formatRelativeTime(wish.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      <WishFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultGuestName={currentGuestName}
        onWishSubmitted={handleWishSubmitted}
      />
    </div>
  );
};
