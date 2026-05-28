'use client'

import { useState } from 'react'
import { Search, MapPin, Briefcase, Shield, Loader } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const SPECIALTIES = ['Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics', 'Neurology', 'General Practice', 'Dentistry', 'Ophthalmology']

const LOCATIONS = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman']

const INSURANCE = ['Daman', 'AXA', 'Allianz', 'Cigna', 'Aetna']

export default function DoctorSearch() {
  const [filters, setFilters] = useState({
    specialty: '',
    location: '',
    insurance: '',
  })
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    try {
      setLoading(true)
      setError('')
      setHasSearched(true)

      let query = supabase.from('doctors').select('*').eq('verified', true)

      if (filters.specialty) {
        query = query.ilike('specialty', `%${filters.specialty}%`)
      }
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }

      if (filters.insurance) {
  query = query.overlaps('insurance_accepted', [filters.insurance])
      }

      const { data, error: fetchError } = await query.limit(50)

      if (fetchError) {
        console.error('Error:', fetchError)
        setError('Failed to fetch doctors. Please try again.')
        return
      }

      setSearchResults(data || [])
      console.log('Found doctors:', data)
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to fetch doctors. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFilters({ specialty: '', location: '', insurance: '' })
    setSearchResults([])
    setHasSearched(false)
    setError('')
  }

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Briefcase size={16} className="inline mr-2" />
            Specialty
          </label>
          <select
            value={filters.specialty}
            onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Specialties</option>
            {SPECIALTIES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin size={16} className="inline mr-2" />
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Locations</option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Shield size={16} className="inline mr-2" />
            Insurance
          </label>
          <select
            value={filters.insurance}
            onChange={(e) => setFilters({ ...filters, insurance: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Insurance</option>
            {INSURANCE.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button 
            onClick={handleSearch} 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Search size={18} />
            Search
          </button>
          <button 
            onClick={handleReset} 
            className="flex-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {hasSearched && (
        <div className="text-center py-8">
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="animate-spin" size={20} />
              <span>Searching doctors...</span>
            </div>
          ) : searchResults.length === 0 ? (
            <p className="text-gray-500">No doctors found. Try adjusting your filters or click Search with no filters.</p>
          ) : (
            <p className="text-gray-600 font-semibold">Found {searchResults.length} doctor(s)</p>
          )}
        </div>
      )}

      {/* Display Results */}
      {searchResults.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {searchResults.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
              <p className="text-blue-600 font-semibold text-sm mb-3">{doctor.specialty}</p>
              
              {doctor.google_rating && (
                <p className="text-sm text-gray-600 mb-2">
                  ⭐ {doctor.google_rating} ({doctor.google_reviews_count} reviews)
                </p>
              )}
              
              <p className="text-sm text-gray-600 mb-1"><strong>Hospital:</strong> {doctor.hospital}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {doctor.location}</p>
              <p className="text-sm text-gray-600 mb-3"><strong>Experience:</strong> {doctor.experience_years}+ years</p>
              
              {doctor.insurance_accepted && doctor.insurance_accepted.length > 0 && (
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Insurance:</strong> {doctor.insurance_accepted.join(', ')}
                </p>
              )}
              
              <div className="flex gap-2 mt-4">
                {doctor.phone && (
                  <a href={`tel:${doctor.phone}`} className="flex-1 bg-blue-500 text-white py-2 rounded text-center text-sm hover:bg-blue-600 transition-colors">
                    Call
                  </a>
                )}
                {doctor.email && (
                  <a href={`mailto:${doctor.email}`} className="flex-1 border border-blue-500 text-blue-500 py-2 rounded text-center text-sm hover:bg-blue-50 transition-colors">
                    Email
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}