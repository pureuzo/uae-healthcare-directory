import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UAE Healthcare Directory | Find Verified Doctors & Hospitals',
  description: 'Search verified healthcare professionals in UAE',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}