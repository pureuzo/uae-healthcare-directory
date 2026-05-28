import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'UAE Healthcare Directory | Find Verified Doctors & Hospitals',
  description: 'Search verified healthcare professionals in UAE with insurance mapping and Google ratings',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-white">
        {children}
      </body>
    </html>
  )
}
