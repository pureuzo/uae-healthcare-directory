'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Loader, CheckCircle, AlertCircle } from 'lucide-react'

const SPECIALTIES = [
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'General Practice',
  'Dentistry',
  'Ophthalmology',
  'Psychiatry',
  'Gynecology',
  'Surgery',
  'Internal Medicine',
]

const LOCATIONS = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']

const INSURANCE_OPTIONS = ['Daman', 'AXA', 'Allianz', 'Cigna', 'Aetna', 'ADNOC', 'ENOC', 'Other']

export default function DoctorSignup() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    hospital: '',
    location: '',
    experience_years: '',
    qualifications: '',
    insurance_accepted: [] as string[],
    bio: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleInsuranceChange = (insurance: string) => {
    setFormData((prev) => ({
      ...prev,
      insurance_accepted: prev.insurance_accepted.includes(insurance)
        ? prev.insurance_accepted.filter((i) => i !== insurance)
        : [...prev.insurance_accepted, insurance],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: insertError } = await supabase.from('doctors').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          specialty: formData.specialty,
          hospital: formData.hospital,
          location: formData.location,
          experience_years: parseInt(formData.experience_years),
          qualifications: formData.qualifications,
          insurance_accepted: formData.insurance_accepted,
          bio: formData.bio,
          verified: false, // Will be verified by admin
        },
      ])

      if (insertError) throw insertError

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        hospital: '',
        location: '',
        experience_years: '',
        qualifications: '',
        insurance_accepted: [],
        bio: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError('Failed to submit profile. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container-safe py-12 flex-grow">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Your Profile Listed</h1>
            <p className="text-lg text-gray-600">
              Join verified healthcare professionals connecting with patients across the UAE
            </p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 flex items-start gap-4">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-green-900 mb-1">Profile Submitted!</h3>
                <p className="text-green-800">
                  Thank you for registering. We'll verify your information and contact you within 24-48 hours.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 flex items-start gap-4">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-red-900 mb-1">Error</h3>
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="card p-8 space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Dr. Ahmed Mohammed"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="dr.ahmed@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="+971 50 123 4567"
                  />
                </div>

                <div>
                  <label htmlFor="specialty" className="block text-sm font-semibold text-gray-700 mb-2">
                    Specialty *
                  </label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select Specialty</option>
                    {SPECIALTIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="hospital" className="block text-sm font-semibold text-gray-700 mb-2">
                    Hospital/Clinic Name *
                  </label>
                  <input
                    type="text"
                    id="hospital"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Al Noor Hospital"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select Location</option>
                    {LOCATIONS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="experience_years" className="block text-sm font-semibold text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    id="experience_years"
                    name="experience_years"
                    value={formData.experience_years}
                    onChange={handleChange}
                    required
                    min="0"
                    max="60"
                    className="input-field"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label htmlFor="qualifications" className="block text-sm font-semibold text-gray-700 mb-2">
                    Qualifications *
                  </label>
                  <input
                    type="text"
                    id="qualifications"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="MD, DM Cardiology, MRCP"
                  />
                </div>
              </div>
            </div>

            {/* Insurance & Additional */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Insurance & Additional Info</h2>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Insurance Plans Accepted</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {INSURANCE_OPTIONS.map((insurance) => (
                    <label key={insurance} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.insurance_accepted.includes(insurance)}
                        onChange={() => handleInsuranceChange(insurance)}
                        className="w-4 h-4 text-medical-600 rounded"
                      />
                      <span className="text-gray-700">{insurance}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio / About You
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="input-field"
                  placeholder="Tell us about your experience and specialization..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  'Submit Profile'
                )}
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                Your profile will be verified by our team within 24-48 hours. We'll contact you via email or phone.
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
