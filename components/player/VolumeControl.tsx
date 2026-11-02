'use client';

import React, { useState, useRef } from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const displayVolume = isMuted ? 0 : volume;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateVolume(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      updateVolume(e);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const updateVolume = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onVolumeChange(ratio);
  };

  const getVolumeIcon = () => {
    if (isMuted || displayVolume === 0) {
      return <VolumeX className="w-5 h-5 text-spotify-text-subdued hover:text-white transition-colors" />;
    }
    if (displayVolume < 0.5) {
      return <Volume1 className="w-5 h-5 text-spotify-text-subdued hover:text-white transition-colors" />;
    }
    return <Volume2 className="w-5 h-5 text-spotify-text-subdued hover:text-white transition-colors" />;
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggleMute}
        className="p-1 focus:outline-none transition-transform active:scale-90"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {getVolumeIcon()}
      </button>

      <div
        ref={barRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="group relative w-24 h-3 flex items-center cursor-pointer select-none py-1"
      >
        {/* Track bar */}
        <div className="relative w-full h-1 bg-[#4d4d4d] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-colors ${
              isHovering || isDragging ? 'bg-spotify-green' : 'bg-white'
            }`}
            style={{ width: `${displayVolume * 100}%` }}
          />
        </div>

        {/* Knob */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transition-opacity pointer-events-none ${
            isHovering || isDragging ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ left: `calc(${displayVolume * 100}% - 6px)` }}
        />
      </div>
    </div>
  );
};
