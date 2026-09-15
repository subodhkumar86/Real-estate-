import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';
import { CurrencyProvider } from '../context/CurrencyContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://invesstinpronoida.com'),
  title: 'InvestInPro Noida | Noida’s Preeminent Luxury Real Estate Advisory',
  description: 'Curating Noida’s most prestigious residential sky mansions, golf estates, and Grade-A commercial developments with verified UP RERA compliance and private advisory.',
  keywords: 'Noida Luxury Real Estate, InvestInPro Noida, M3M The Cullinan, Godrej Tropical Isle, Max Estate 128, ATS Knightsbridge, Sector 150 Noida, Noida Expressway Penthouses',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#07100c] text-white antialiased selection:bg-[#c6a15b] selection:text-[#07100c] font-sans">
        <CurrencyProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-[#c6a15b] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#07100c]">
            Skip to content
          </a>
          <div className="fixed top-0 inset-x-0 z-50">
            <Navbar />
          </div>
          <div id="main-content" className="min-h-screen pt-28">
            {children}
          </div>
          <Footer />
          <FloatingContact />
        </CurrencyProvider>
      </body>
    </html>
  );
}
