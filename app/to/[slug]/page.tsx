import { Metadata } from 'next';
import { getGuestBySlug } from '@/lib/supabase';
import { WeddingApp } from '@/components/WeddingApp';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guest = await getGuestBySlug(params.slug);

  return {
    title: `Undangan Spesial untuk ${guest.name} | Alif & Widi Wedding`,
    description: `Kepada Yth. ${guest.name}, kami mengundang Anda untuk merayakan pernikahan Naufal Alif Nurfaizi & Tri Widiyanti pada 30 Desember 2026 di Graha Kencana.`,
    openGraph: {
      title: `Undangan Pernikahan Alif & Widi - Spesial untuk ${guest.name}`,
      description: `Rabu, 30 Desember 2026 di Graha Kencana. Klik untuk memutar melodi undangan.`,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          width: 1200,
          height: 630,
          alt: `Undangan Spesial untuk ${guest.name}`,
        },
      ],
    },
  };
}

export default async function GuestInvitationPage({ params }: PageProps) {
  const guest = await getGuestBySlug(params.slug);

  return (
    <WeddingApp
      guestName={guest.name}
      customGreeting={guest.custom_greeting}
      isCustomSlug={true}
    />
  );
}
