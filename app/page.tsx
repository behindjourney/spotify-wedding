import { WeddingApp } from '@/components/WeddingApp';

export default function HomePage() {
  return (
    <WeddingApp
      guestName="Tamu Undangan"
      customGreeting="Merupakan kehormatan bagi kami atas kehadiran dan doa restu Bapak/Ibu/Saudara/i di hari bahagia kami."
      isCustomSlug={false}
    />
  );
}
