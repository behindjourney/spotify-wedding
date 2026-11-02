'use client';

import React, { useState } from 'react';
import { Wish } from '@/types';
import { submitWish } from '@/lib/supabase';
import { X, Send, Music2, User, MessageSquare, CheckCircle2 } from 'lucide-react';

interface WishFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGuestName?: string;
  onWishSubmitted: (newWish: Wish) => void;
}

export const WishFormModal: React.FC<WishFormModalProps> = ({
  isOpen,
  onClose,
  defaultGuestName = '',
  onWishSubmitted,
}) => {
  const [guestName, setGuestName] = useState(defaultGuestName);
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'uncertain' | 'declined'>('attending');
  const [songRequest, setSongRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const created = await submitWish({
        guest_name: guestName.trim(),
        message: message.trim(),
        attendance,
        song_request: songRequest.trim() || undefined,
      });

      onWishSubmitted(created);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setMessage('');
        onClose();
      }, 1400);
    } catch (err) {
      console.error('Error submitting wish:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-spotify-dark border border-[#333333] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#282828] bg-spotify-black/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-spotify-green animate-pulse" />
            <h3 className="text-white font-bold text-lg">Add to Queue: Ucapan & Doa</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-spotify-text-subdued hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-spotify-green/20 flex items-center justify-center text-spotify-green mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Tersimpan di Queue!</h4>
            <p className="text-spotify-text-subdued text-sm">
              Doa restu Anda telah masuk ke daftar antrean pernikahan Alif & Widi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Guest Name */}
            <div>
              <label className="block text-xs font-semibold text-spotify-text-subdued uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-spotify-green" />
                Nama Anda
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Contoh: Budi & Partner"
                className="w-full bg-spotify-light border border-[#3e3e3e] focus:border-spotify-green text-white text-sm rounded-lg px-3.5 py-2.5 outline-none transition-colors"
              />
            </div>

            {/* Attendance Status */}
            <div>
              <label className="block text-xs font-semibold text-spotify-text-subdued uppercase tracking-wider mb-1.5">
                Konfirmasi Kehadiran (RSVP)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAttendance('attending')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                    attendance === 'attending'
                      ? 'bg-spotify-green/20 border-spotify-green text-spotify-green font-semibold'
                      : 'bg-spotify-light border-[#3e3e3e] text-spotify-text-subdued hover:text-white'
                  }`}
                >
                  💚 Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('uncertain')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                    attendance === 'uncertain'
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400 font-semibold'
                      : 'bg-spotify-light border-[#3e3e3e] text-spotify-text-subdued hover:text-white'
                  }`}
                >
                  💛 Masih Ragu
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('declined')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                    attendance === 'declined'
                      ? 'bg-red-500/20 border-red-500 text-red-400 font-semibold'
                      : 'bg-spotify-light border-[#3e3e3e] text-spotify-text-subdued hover:text-white'
                  }`}
                >
                  🤍 Berhalangan
                </button>
              </div>
            </div>

            {/* Message / Wish */}
            <div>
              <label className="block text-xs font-semibold text-spotify-text-subdued uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-spotify-green" />
                Pesan & Doa Restu
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan doa tulus dan harapan baik untuk Alif & Widi..."
                className="w-full bg-spotify-light border border-[#3e3e3e] focus:border-spotify-green text-white text-sm rounded-lg px-3.5 py-2.5 outline-none transition-colors resize-none"
              />
            </div>

            {/* Optional Song Request */}
            <div>
              <label className="block text-xs font-semibold text-spotify-text-subdued uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Music2 className="w-3.5 h-3.5 text-spotify-green" />
                Request Lagu Favorit (Opsional)
              </label>
              <input
                type="text"
                value={songRequest}
                onChange={(e) => setSongRequest(e.target.value)}
                placeholder="Contoh: Teman Hidup - Tulus"
                className="w-full bg-spotify-light border border-[#3e3e3e] focus:border-spotify-green text-white text-sm rounded-lg px-3.5 py-2.5 outline-none transition-colors"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-spotify-text-subdued hover:text-white font-medium transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="flex items-center gap-2 bg-spotify-green hover:bg-spotify-green-hover disabled:opacity-50 text-black font-bold text-sm px-5 py-2.5 rounded-full transition-transform active:scale-95 shadow-md"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Menyimpan...' : 'Tambahkan ke Queue'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
