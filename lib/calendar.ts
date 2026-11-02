/**
 * Calendar utilities to generate Google Calendar URLs and downloadable .ics files
 */

export function generateGoogleCalendarUrl(): string {
  const title = encodeURIComponent('The Wedding of Alif & Widi');
  // 30 December 2026: 09:00 WIB is 02:00 UTC
  // Ends at 17:00 WIB which is 10:00 UTC
  const dates = '20261230T020000Z/20261230T100000Z';
  const details = encodeURIComponent(
    'Pernikahan Naufal Alif Nurfaizi (Alif) & Tri Widiyanti (Widi).\n' +
    'Akad: 09:00 WIB | Resepsi: 13:00 WIB\n' +
    'Lokasi: Graha Kencana, Kebumen - Purworejo\n' +
    'Google Maps: https://www.google.com/maps?q=-7.774023971504282,109.6707848427757'
  );
  const location = encodeURIComponent('Graha Kencana, Jl. Raya Kebumen - Purworejo (-7.774023971504282, 109.6707848427757)');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function downloadIcsFile(): void {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Alif and Widi Wedding//ID',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'SUMMARY:The Wedding of Alif & Widi (Naufal Alif Nurfaizi & Tri Widiyanti)',
    'DESCRIPTION:Pernikahan Naufal Alif Nurfaizi & Tri Widiyanti.\\nAkad Nikah: 09:00 WIB\\nResepsi: 13:00 WIB\\nMaps: https://www.google.com/maps?q=-7.774023971504282,109.6707848427757',
    'LOCATION:Graha Kencana, Jl. Raya Kebumen - Purworejo',
    'GEO:-7.774023971504282;109.6707848427757',
    'DTSTART:20261230T020000Z',
    'DTEND:20261230T100000Z',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Alif-Widi-Wedding.ics';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
}
