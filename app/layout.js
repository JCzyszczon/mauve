import './globals.css';
import { Inter } from 'next/font/google';
import CookieConsent from './components/cookies';
import AuthProvider from './context/authProvider';
import LogOutButton from './components/logOutButton';
import { Analytics } from '@vercel/analytics/react';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  generator: 'Next.js',
  applicationName: 'Mauve',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Dagmara Misiewicz', url:'https://www.facebook.com/mauvebeautypl/?locale=pl_PL' }, { name: 'Jakub Czyszczoń', url: 'https://github.com/JCzyszczon' }],
  colorScheme: 'light',
  creator: 'Jakub Czyszczoń',
  publisher: 'Dagmara Misiewicz',
  title: 'Strona główna | Mauve.pl',
  description: "Profesjonalny makijaż permanentny brwi w Krakowie. Odwiedź nas już dziś i podkreśl swoje piękno w Mauve.",
  keywords: ['Makijaż', 'Makijaż permanentny', 'Makijaż permanentny brwi', 'Usługi kosmetyczne', 'Uroda', 'Kraków', 'Salon kosmetyczny Kraków', 'Makijaż Kraków', 'Makijaż permanentny brwi Kraków', 'Makijaż permanentny Kraków', 'Makijaż okolicznościowy', 'Brwi', 'Mauve.pl', 'Mauve', 'Mauve Beauty', 'Dagmara', 'Dagmara Misiewicz', 'Jordanów', 'Małopolska', 'Makijaż ślubny', 'Makijaż próbny ślubny', 'Laminacja z koloryzacją i regulacją brwi', 'Koloryzacja z regulacją brwi', 'Laminacja z regulacją brwi'],
  alternates: {
    canonical: 'https://www.mauve.pl',
  },
  openGraph: {
    title: 'Profesjonalny makijaż na wyjątkowe okazje | Mauve.pl',
    description: 'Odwiedź nas już dziś w Krakowie!',
    url: 'https://www.mauve.pl',
    siteName: 'Mauve',
    images: [
      {
        url: '/mauve.png',
        width: 800,
        height: 600,
      },
      {
        url: '/mauve.png',
        width: 1800,
        height: 1600,
        alt: 'Mauve Image',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <NextTopLoader color='#705555'/>
        <AuthProvider>
          <LogOutButton/>
          {children}
          <Analytics/>
          <CookieConsent/>
        </AuthProvider>
      </body>
    </html>
  )
}
