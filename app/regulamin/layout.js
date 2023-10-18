import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export const metadata = {
  title: 'Regulamin | Mauve.pl',
  alternates: {
    canonical: 'https://www.mauve.pl/regulamin',
  },
}

export default function DashboardLayout({ children }) {
  return(
    <>
      <Navbar/>
        {children}
      <Footer/>
    </>
  )
}