'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Stethoscope } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold text-blue-600">MediFind - UAE</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700">Search</Link>
            <Link href="/signup" className="text-gray-700">For Doctors</Link>
            <Link href="/about" className="text-gray-700">About</Link>
            <Link href="/signup" className="bg-blue-500 text-white px-6 py-2 rounded">Get Listed</Link>
          </nav>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}