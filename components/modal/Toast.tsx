'use client';

import React from 'react';
import { CheckCircle2, Heart } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-spotify-light border border-white/10 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-fade-in pointer-events-auto">
      <div className="w-2 h-2 rounded-full bg-spotify-green animate-ping" />
      <span>{message}</span>
    </div>
  );
};
