'use client';

import React, { useState, useRef } from 'react';
import { formatTime } from '@/lib/utils';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  className?: string;
  showTimers?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
  className = '',
  showTimers = true,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  const effectiveDuration = duration > 0 ? duration : 1;
  const progressPercent = isDragging
    ? dragProgress * 100
    : Math.min(100, Math.max(0, (currentTime / effectiveDuration) * 100));

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateProgressFromEvent(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      updateProgressFromEvent(e);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
      const targetTime = dragProgress * effectiveDuration;
      onSeek(targetTime);
    }
  };

  const updateProgressFromEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setDragProgress(ratio);
  };

  return (
    <div className={`flex items-center gap-2 w-full select-none ${className}`}>
      {showTimers && (
        <span className="text-[11px] font-mono text-spotify-text-subdued w-9 text-right tabular-nums">
          {formatTime(isDragging ? dragProgress * effectiveDuration : currentTime)}
        </span>
      )}

      <div
        ref={barRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="group relative flex-1 h-3 flex items-center cursor-pointer py-1"
      >
        {/* Track background */}
        <div className="relative w-full h-1 bg-[#4d4d4d] rounded-full overflow-hidden">
          {/* Progress fill */}
          <div
            className={`h-full rounded-full transition-colors ${
              isHovering || isDragging ? 'bg-spotify-green' : 'bg-white'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Thumb knob */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transition-opacity pointer-events-none ${
            isHovering || isDragging ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ left: `calc(${progressPercent}% - 6px)` }}
        />
      </div>

      {showTimers && (
        <span className="text-[11px] font-mono text-spotify-text-subdued w-9 text-left tabular-nums">
          {formatTime(effectiveDuration)}
        </span>
      )}
    </div>
  );
};
