'use client';

import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';
import { Track, ViewTab } from '@/types';
import { TRACKS } from '@/lib/tracks';

interface AudioContextType {
  tracks: Track[];
  currentTrackIndex: number;
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  isLiked: boolean;
  hasStarted: boolean;
  activeTab: ViewTab;
  audioRef: React.RefObject<HTMLAudioElement>;
  setActiveTab: (tab: ViewTab) => void;
  playTrack: (index?: number) => Promise<void>;
  pauseTrack: () => void;
  togglePlay: () => Promise<void>;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
  changeVolume: (vol: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLike: () => void;
  startSession: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(TRACKS[0]?.durationSeconds || 215);
  const [volume, setVolume] = useState<number>(0.85);
  const [prevVolume, setPrevVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ViewTab>('overview');

  const currentTrack = TRACKS[currentTrackIndex] || TRACKS[0];

  // Sync volume state with HTML5 Audio Element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Update track source when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.audioUrl;
    audio.load();

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback error or user gesture required:', err);
          setIsPlaying(false);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  const playTrack = useCallback(async (index?: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (index !== undefined && index !== currentTrackIndex) {
      setCurrentTrackIndex(index);
      // Wait for audio src to load via index effect
      setIsPlaying(true);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('Audio play request interrupted or blocked:', err);
      setIsPlaying(false);
    }
  }, [currentTrackIndex]);

  const pauseTrack = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      await playTrack();
    }
  }, [isPlaying, pauseTrack, playTrack]);

  const nextTrack = useCallback(() => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * TRACKS.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    }
    setIsPlaying(true);
  }, [isShuffle]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const changeVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(prevVolume > 0 ? prevVolume : 0.8);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
    }
  }, [isMuted, volume, prevVolume]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setIsRepeat((prev) => !prev);
  }, []);

  const toggleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
  }, []);

  // Unlocks audio context on initial modal interaction
  const startSession = useCallback(async () => {
    setHasStarted(true);
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('Initial autoplay error:', err);
      // Even if autoplay policy blocks, audio context is primed
      setIsPlaying(false);
    }
  }, []);

  // Audio event listeners
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const d = audioRef.current.duration;
      if (!isNaN(d) && d > 0) {
        setDuration(d);
      }
    }
  };

  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      nextTrack();
    }
  };

  return (
    <AudioContext.Provider
      value={{
        tracks: TRACKS,
        currentTrackIndex,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        isRepeat,
        isLiked,
        hasStarted,
        activeTab,
        audioRef,
        setActiveTab,
        playTrack,
        pauseTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        seek,
        changeVolume,
        toggleMute,
        toggleShuffle,
        toggleRepeat,
        toggleLike,
        startSession,
      }}
    >
      {/* Persistent standard HTML5 Audio element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {children}
    </AudioContext.Provider>
  );
};

export function useAudio(): AudioContextType {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
