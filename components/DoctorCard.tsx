'use client'

import { Star, MapPin, Phone, Mail, Award, Shield } from 'lucide-react'

interface DoctorCardProps {
  doctor: any
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all">
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{doctor.name || 'Dr. Name'}</h3>
            <p className="text-blue-600 font-semibold text-sm">{doctor.specialty || 'Specialty'}</p>
          </div>
          {doctor.verified && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">✓ Verified</span>
          )}
        </div>
      </div>

      {doctor.google_rating && (
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < Math.round(doctor.google_rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
            ))}
          </div>
          <span className="text-sm font-semibold">{doctor.google_rating?.toFixed(1)}</span>
          <span className="text-xs text-gray-500">({doctor.google_reviews_count || 0})</span>
        </div>
      )}

      <div className="space-y-3 mb-4">
        {doctor.hospital && (
          <div className="flex items-start gap-3">
            <Award className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-xs text-gray-500 uppercase">Hospital</p>
              <p className="text-sm font-semibold">{doctor.hospital}</p>
            </div>
          </div>
        )}

        {doctor.location && (
          <div className="flex items-start gap-3">
            <MapPin className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-xs text-gray-500 uppercase">Location</p>
              <p className="text-sm font-semibold">{doctor.location}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-6 pt-4 border-t border-gray-100">
        {doctor.phone && (
          <a href={`tel:${doctor.phone}`} className="flex-1 border border-blue-500 text-blue-500 py-2 rounded text-sm text-center">Call</a>
        )}
        {doctor.email && (
          <a href={`mailto:${doctor.email}`} className="flex-1 border border-blue-500 text-blue-500 py-2 rounded text-sm text-center">Email</a>
        )}
      </div>
    </div>
  )
}