'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DoctorSearch from '@/components/DoctorSearch'
import DoctorCard from '@/components/DoctorCard'
import { useStore } from '@/lib/store'
import { Heart, Clock, CheckCircle, Zap } from 'lucide-react'

export default function Home() {
  const { searchResults, loading } = useStore()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="container-safe py-12 md:py-20">
        <div className="text-center mb-12 animate-slideUp">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-medical-700 via-medical-600 to-blue-500 bg-clip-text text-transparent mb-4 leading-tight">
            Find Verified Healthcare Professionals
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Search doctors, check insurance coverage, and read verified reviews—all in one place.
          </p>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4 mt-12 mb-8">
            <div className="card p-6">
              <div className="text-3xl font-bold text-medical-600 mb-2">500+</div>
              <p className="text-gray-600 text-sm">Verified Doctors</p>
            </div>
            <div className="card p-6">
              <div className="text-3xl font-bold text-medical-600 mb-2">100+</div>
              <p className="text-gray-600 text-sm">Hospitals & Clinics</p>
            </div>
            <div className="card p-6">
              <div className="text-3xl font-bold text-medical-600 mb-2">8 UAE</div>
              <p className="text-gray-600 text-sm">Emirates Covered</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="card p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Doctor</h2>
          <DoctorSearch />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Results: {searchResults.length} Doctor{searchResults.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {searchResults.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        )}

        {/* Features Section */}
        {searchResults.length === 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why MediFind?</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="card p-6 text-center hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-medical-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Verified Credentials</h3>
                <p className="text-gray-600 text-sm">
                  All doctors and qualifications are verified
                </p>
              </div>

              <div className="card p-6 text-center hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-medical-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Insurance Mapping</h3>
                <p className="text-gray-600 text-sm">
                  Check which insurance plans are accepted
                </p>
              </div>

              <div className="card p-6 text-center hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-medical-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Real Ratings</h3>
                <p className="text-gray-600 text-sm">
                  Google reviews aggregated in one place
                </p>
              </div>

              <div className="card p-6 text-center hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-medical-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Quick Discovery</h3>
                <p className="text-gray-600 text-sm">
                  Find the right doctor in seconds
                </p>
              </div>
            </div>
          </section>
        )}
      </section>

      <Footer />
    </div>
  )
}
