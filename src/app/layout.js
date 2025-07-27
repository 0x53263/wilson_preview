import './globals.css';
import '@fontsource/league-spartan/400.css';
import '@fontsource/league-spartan/700.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'ArtEng - Bringing Art & Engineering Together',
  description: 'Bringing creatives and inventors together to transform ideas into unforgettable experiences.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-spartan flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-14 sm:pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}