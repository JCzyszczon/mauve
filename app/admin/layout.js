import React from 'react';

export const metadata = {
  title: 'Logowanie | Mauve.pl',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function DashboardLayout({ children }) {
  return(
    <>
        {children}
    </>
  )
}