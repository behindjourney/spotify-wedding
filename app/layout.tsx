import type { Metadata } from 'next';
import './globals.css';
import { AudioProvider } from '@/components/player/AudioContext';

export const metadata: Metadata = {
  title: 'Alif & Widi | The Wedding Playlist',
  description: 'Pernikahan Naufal Alif Nurfaizi (Alif) & Tri Widiyanti (Widi) - 30 Desember 2026 di Graha Kencana. Dengarkan melodi cinta kami.',
  keywords: ['Wedding', 'Alif & Widi', 'Undangan Pernikahan', 'Spotify Wedding', 'Graha Kencana'],
  openGraph: {
    title: 'The Wedding of Alif & Widi',
    description: 'Special Spotify Wedding Invitation for our beloved family and friends.',
    url: 'https://alif-widi-wedding.vercel.app',
    siteName: 'Alif & Widi Wedding',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Alif & Widi Wedding Invitation Cover',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Wedding of Alif & Widi',
    description: 'Special Spotify Wedding Invitation - 30 Desember 2026',
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="bg-spotify-black text-white antialiased min-h-screen">
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
