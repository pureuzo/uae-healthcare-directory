import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UAE Healthcare Directory | Find Verified Doctors & Hospitals',
  description: 'Search verified healthcare professionals in UAE with insurance mapping and Google ratings',
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
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%);
            color: #1f2937;
          }
          
          .container-safe {
            max-width: 80rem;
            margin: 0 auto;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .btn-primary {
            background-color: #0ea5e9;
            color: white;
            font-weight: 600;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            border: none;
          }
          
          .btn-primary:hover {
            background-color: #0284c7;
          }
          
          .btn-secondary {
            border: 2px solid #0ea5e9;
            color: #0ea5e9;
            font-weight: 600;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            background-color: transparent;
            cursor: pointer;
          }
          
          .btn-secondary:hover {
            background-color: #f0f9ff;
          }
          
          .card {
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            border: 1px solid #f3f4f6;
          }
          
          .card:hover {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .input-field {
            width: 100%;
            padding: 0.625rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            font-family: 'Inter', sans-serif;
          }
          
          .input-field:focus {
            outline: none;
            border-color: #0ea5e9;
          }
          
          .badge {
            display: inline-block;
            background-color: #dbeafe;
            color: #1e40af;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
          }
        `}</style>
      </head>
      <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-white">
        {children}
      </body>
    </html>
  )
}