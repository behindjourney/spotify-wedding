'use client';

import React, { useState } from 'react';
import { AGENDA_TRACKS } from '@/lib/agenda';
import { useAudio } from '@/components/player/AudioContext';
import { 
  Clock, 
  MapPin, 
  ExternalLink, 
  Play, 
  Pause, 
  Sparkles, 
  Calendar,
  Navigation,
  Copy,
  Check
} from 'lucide-react';

interface TracklistAgendaProps {
  onShowToast: (msg: string) => void;
}

export const TracklistAgenda: React.FC<TracklistAgendaProps> = ({ onShowToast }) => {
  const { currentTrackIndex, isPlaying, playTrack, pauseTrack } = useAudio();
  const [selectedAgendaId, setSelectedAgendaId] = useState<string>(AGENDA_TRACKS[0].id);
  const [copiedCoords, setCopiedCoords] = useState(false);

  const selectedAgenda = AGENDA_TRACKS.find((a) => a.id === selectedAgendaId) || AGENDA_TRACKS[0];

  const handleRowClick = (index: number) => {
    setSelectedAgendaId(AGENDA_TRACKS[index].id);
    if (currentTrackIndex === index && isPlaying) {
      pauseTrack();
    } else {
      playTrack(index);
    }
  };

  const copyCoordinates = (coords: string) => {
    navigator.clipboard.writeText(coords);
    setCopiedCoords(true);
    onShowToast('Koordinat GPS disalin ke clipboard!');
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-10">
      {/* SECTION 1: AGENDA TRACKLIST TABLE */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span>Rangkaian Acara (Event Tracklist)</span>
          </h2>
          <span className="text-xs text-spotify-text-subdued font-mono">
            Rabu, 30 Desember 2026
          </span>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 text-xs font-semibold text-spotify-text-subdued uppercase tracking-wider pb-2 px-3 border-b border-[#282828] select-none">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-6 md:col-span-5">Acara &amp; Deskripsi</div>
          <div className="hidden md:block md:col-span-3">Waktu &amp; Tanggal</div>
          <div className="col-span-5 md:col-span-3 text-right">Lokasi / Aksi</div>
        </div>

        {/* Table Body */}
        <div className="mt-2 space-y-1">
          {AGENDA_TRACKS.map((item, index) => {
            const isCurrentPlayingRow = currentTrackIndex === index && isPlaying;
            const isSelected = selectedAgendaId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleRowClick(index)}
                className={`group grid grid-cols-12 items-center px-3 py-3 rounded-lg text-sm transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-white/10'
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Column 1: Index / Play Icon */}
                <div className="col-span-1 flex items-center justify-center text-spotify-text-subdued font-mono">
                  {isCurrentPlayingRow ? (
                    <span className="w-4 h-4 flex items-center justify-center text-spotify-green">
                      <Pause className="w-3.5 h-3.5 fill-spotify-green" />
                    </span>
                  ) : (
                    <>
                      <span className="group-hover:hidden">{item.trackNumber}</span>
                      <Play className="hidden group-hover:block w-3.5 h-3.5 fill-white text-white" />
                    </>
                  )}
                </div>

                {/* Column 2: Title & Description */}
                <div className="col-span-6 md:col-span-5 pr-2">
                  <div className="flex items-center gap-2">
                    <p
                      className={`font-semibold truncate ${
                        isCurrentPlayingRow ? 'text-spotify-green' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </p>
                    <span className="hidden sm:inline-block text-[10px] font-medium bg-[#282828] text-spotify-text-subdued px-1.5 py-0.5 rounded">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-spotify-text-subdued truncate mt-0.5">
                    {item.description}
                  </p>
                </div>

                {/* Column 3: Date & Time */}
                <div className="hidden md:flex md:col-span-3 items-center gap-2 text-xs text-spotify-text-subdued">
                  <Clock className="w-3.5 h-3.5 text-spotify-green flex-shrink-0" />
                  <span className="text-white font-medium">{item.time}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>

                {/* Column 4: Location & Maps Action */}
                <div className="col-span-5 md:col-span-3 flex items-center justify-end gap-2">
                  <span className="text-xs text-spotify-text-subdued hidden sm:inline truncate max-w-[140px]">
                    {item.locationName}
                  </span>

                  <a
                    href={item.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-full hover:bg-white/10 text-spotify-text-subdued hover:text-spotify-green transition-colors"
                    title="Buka di Google Maps"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>

                  <a
                    href={item.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-spotify-green hover:underline"
                  >
                    <span>Navigasi</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: VENUE LOCATION & GOOGLE MAPS SHOWCASE */}
      <div className="bg-[#181818] border border-[#282828] rounded-2xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-spotify-green uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4" />
              Lokasi Acara Pernikahan
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {selectedAgenda.locationName}
            </h3>
            <p className="text-spotify-text-subdued text-sm mt-1">
              {selectedAgenda.address}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => copyCoordinates(selectedAgenda.coordinates)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-spotify-light hover:bg-[#333333] text-white text-xs font-medium transition-colors"
            >
              {copiedCoords ? (
                <Check className="w-3.5 h-3.5 text-spotify-green" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>Salin Koordinat</span>
            </button>

            <a
              href={selectedAgenda.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-spotify-green hover:bg-spotify-green-hover text-black text-xs font-bold transition-transform active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Petunjuk Arah (Maps)</span>
            </a>
          </div>
        </div>

        {/* Embedded Interactive Map Card */}
        <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-[#333333] bg-[#121212]">
          <iframe
            title="Lokasi Pernikahan Alif & Widi"
            src="https://maps.google.com/maps?q=-7.774023971504282,109.6707848427757&hl=id&z=15&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'contrast(1.05) brightness(0.95)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating coordinates badge */}
          <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-white font-mono flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-spotify-green animate-ping" />
            <span>GPS: {selectedAgenda.coordinates}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
