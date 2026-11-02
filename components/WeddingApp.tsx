'use client';

import React, { useState, useEffect } from 'react';
import { TopNav } from '@/components/navigation/TopNav';
import { Sidebar } from '@/components/navigation/Sidebar';
import { HeroBanner } from '@/components/overview/HeroBanner';
import { ActionBar } from '@/components/overview/ActionBar';
import { TracklistAgenda } from '@/components/overview/TracklistAgenda';
import { CoupleProfile } from '@/components/overview/CoupleProfile';
import { LyricsView } from '@/components/lyrics/LyricsView';
import { WishesQueue } from '@/components/wishes/WishesQueue';
import { BottomPlayer } from '@/components/player/BottomPlayer';
import { InvitationGateModal } from '@/components/modal/InvitationGateModal';
import { Toast } from '@/components/modal/Toast';
import { useAudio } from '@/components/player/AudioContext';

interface WeddingAppProps {
  guestName?: string;
  customGreeting?: string;
  isCustomSlug?: boolean;
}

export const WeddingApp: React.FC<WeddingAppProps> = ({
  guestName = 'Tamu Undangan',
  customGreeting,
  isCustomSlug = false,
}) => {
  const { activeTab, hasStarted } = useAudio();
  const [isGateOpen, setIsGateOpen] = useState<boolean>(!hasStarted);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenInvitation = () => {
    setIsGateOpen(false);
    showToast(`Selamat mendengarkan melodi pernikahan Alif & Widi! 🎵`);

    // Smooth scroll down slightly to reveal tracklist
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-spotify-black select-none">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Spotify Desktop Left Sidebar */}
      <Sidebar onOpenGateModal={() => setIsGateOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-spotify-black">
        {/* Top Header Bar */}
        <TopNav
          guestName={guestName}
          onOpenGateModal={() => setIsGateOpen(true)}
        />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto pb-28 md:pb-24">
          {/* Hero Banner with vinyl disc effect */}
          <HeroBanner guestName={guestName} />

          {/* Action Bar (Giant Play button, Like, Calendar, Tab Selectors) */}
          <ActionBar onShowToast={showToast} />

          {/* Conditional View Tabs */}
          {activeTab === 'overview' && (
            <div className="animate-fade-in space-y-8">
              <TracklistAgenda onShowToast={showToast} />
              <CoupleProfile />
            </div>
          )}

          {activeTab === 'lyrics' && (
            <div className="animate-fade-in">
              <LyricsView />
            </div>
          )}

          {activeTab === 'queue' && (
            <div className="animate-fade-in">
              <WishesQueue currentGuestName={guestName} />
            </div>
          )}
        </main>
      </div>

      {/* Persistent HTML5 Sticky Bottom Player Bar (100% Responsive) */}
      <BottomPlayer onHeartClick={() => showToast('Disimpan ke Liked Weddings ❤️')} />

      {/* Entry Gate Modal (Play Invitation) */}
      <InvitationGateModal
        isOpen={isGateOpen}
        guestName={guestName}
        customGreeting={customGreeting}
        onOpenInvitation={handleOpenInvitation}
      />
    </div>
  );
};
