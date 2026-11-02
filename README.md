# 🎵 Spotify-Themed Web Wedding Invitation (Next.js 14 + Supabase)

Sebuah website undangan pernikahan modern, interaktif, dan mobile-first yang dirancang persis dengan UI/UX **Spotify Web Player & Mobile App**. Dibuat untuk pernikahan **Naufal Alif Nurfaizi (Alif)** & **Tri Widiyanti (Widi)** pada **30 Desember 2026**.

---

## 🌟 Fitur Utama

1. **Dynamic Guest Personalization & Entry Gate (`/to/[slug]`)**:
   - URL khusus per tamu (contoh: `/to/budi-and-partner`, `/to/sarah-salsabila`).
   - Modal pembuka bergaya **Spotify "Start Session"** dengan tombol besar **"Play Invitation"** hijau Spotify yang meng-unlock audio context browser dan langsung memutar lagu utama (*Kusuma Wijaya* - Pawestri).
   - Dynamic OpenGraph metadata untuk pratinjau tautan WhatsApp/iMessage yang dipersonalisasi.

2. **Persistent Audio Player (HTML5 Audio API + useRef)**:
   - State management kustom berbasis React Context (`components/player/AudioContext.tsx`).
   - Kontrol pemutaran: Play, Pause, Next, Previous, Seekable Slider, Volume Slider dengan Mute Toggle, Shuffle, Repeat, dan Like button (dengan notifikasi toast *"Added to your Liked Weddings"*).
   - **100% Responsif**:
     - *Desktop*: 3-column Spotify web player klasik di bagian bawah.
     - *Mobile*: Floating bottom player overlay dengan progress bar tipis di tepi atas, cover putar, dan tombol aksi cepat.

3. **3 Tab Tampilan Spotify**:
   - **Tracklist Agenda (Overview)**: Jadwal Akad Nikah (09:00 WIB), Resepsi (13:00 WIB), Sungkeman, dan Live Acoustic dipetakan seperti tracklist album Spotify dengan nomor track, durasi, dan tombol navigasi langsung ke koordinat Google Maps (`-7.774023971504282, 109.6707848427757`).
   - **Real-Time Synchronized Lyrics View**: Teks vertikal dinamis bergaya lirik Spotify yang bergerak dan menyorot baris aktif sesuai timestamp lagu. Berisi salam, Surah Ar-Rum: 21, profil mempelai, dan kisah cinta. Baris lirik dapat diklik untuk melompat ke timestamp audio.
   - **Wishes Queue (Buku Tamu Audio)**: Daftar ucapan & doa restu yang disusun seperti antrean lagu Spotify (*Up Next*), dilengkapi konfirmasi kehadiran (RSVP), request lagu cinta, dan integrasi real-time Supabase.

4. **Integrasi Kalender**:
   - Simpan langsung ke Google Calendar atau unduh berkas `.ics` untuk Apple Calendar & Outlook.

---

## 🛠️ Tech Stack & Color Palette

- **Framework:** Next.js 14+ (App Router, Server Components + Client Components)
- **Styling:** Tailwind CSS dengan Spotify Dark Palette:
  - `spotify-black`: `#121212`
  - `spotify-dark`: `#181818`
  - `spotify-light`: `#282828`
  - `spotify-green`: `#1DB954`
  - `spotify-green-hover`: `#1ed760`
  - `spotify-text-subdued`: `#a7a7a7`
- **Icons:** `lucide-react`
- **Database:** Supabase (`@supabase/supabase-js`)
- **Deployment:** Vercel

---

## 📁 Struktur Modular

```text
spotify-wedding/
├── app/
│   ├── globals.css              # Custom styling & Spotify scrollbars
│   ├── layout.tsx               # Root layout & AudioProvider wrapper
│   ├── page.tsx                 # Default invitation landing page
│   └── to/
│       └── [slug]/
│           └── page.tsx         # Dynamic guest invitation route
├── components/
│   ├── WeddingApp.tsx           # Main application coordinator
│   ├── player/
│   │   ├── AudioContext.tsx     # HTML5 Audio API state management (useRef)
│   │   ├── BottomPlayer.tsx     # 100% responsive bottom player bar
│   │   ├── ProgressBar.tsx      # Spotify seekable progress bar
│   │   └── VolumeControl.tsx    # Interactive volume slider & mute
│   ├── lyrics/
│   │   └── LyricsView.tsx       # Spotify synced scrolling lyrics UI
│   ├── wishes/
│   │   ├── WishesQueue.tsx      # Up Next queue list for guest wishes
│   │   └── WishFormModal.tsx    # RSVP & wish submission modal
│   ├── overview/
│   │   ├── HeroBanner.tsx       # Album cover art & vinyl disk effect
│   │   ├── ActionBar.tsx        # Giant Play/Pause, Like & Calendar
│   │   ├── TracklistAgenda.tsx  # Event agenda table & Google Maps embed
│   │   └── CoupleProfile.tsx    # Verified Artist profiles (Alif & Widi)
│   ├── navigation/
│   │   ├── TopNav.tsx           # Header bar with back/forward & guest pill
│   │   └── Sidebar.tsx          # Desktop Spotify navigation sidebar
│   └── modal/
│       ├── InvitationGateModal.tsx # "Play Invitation" entry gate
│       └── Toast.tsx            # Floating toast notification
├── lib/
│   ├── supabase.ts              # Supabase client with safe fallback
│   ├── tracks.ts                # Audio tracks configuration
│   ├── agenda.ts                # Wedding agenda & coordinates
│   ├── lyricsData.ts            # Synced lyric timestamps & Quranic text
│   ├── calendar.ts              # Google Calendar & .ics utilities
│   └── utils.ts                 # Formatting & class merging helpers
├── types/
│   └── index.ts                 # TypeScript type definitions
├── schema.sql                   # Supabase database schema & seed SQL
├── tailwind.config.js           # Spotify custom colors & animations
└── package.json
```

---

## 🚀 Panduan Menjalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Konfigurasi Environment (Opsional)
Salin `.env.example` ke `.env.local` dan masukkan kredensial Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
> **Catatan:** Jika variabel Supabase tidak diisi, aplikasi tetap akan berjalan 100% normal dengan menggunakan mock storage lokal dan nama tamu otomatis dari slug URL!

### 3. Setup Database Supabase
Jalankan isi file `schema.sql` di Supabase SQL Editor untuk membuat tabel `guests` dan `wishes`, mengaktifkan Row Level Security (RLS), serta memasukkan data awal.

### 4. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di `http://localhost:3000` atau coba rute personalisasi seperti:
`http://localhost:3000/to/budi-and-partner`
