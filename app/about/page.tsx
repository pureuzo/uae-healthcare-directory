'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Users, Target, Award, Zap } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container-safe py-12 flex-grow">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About MediFind</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're building the UAE's most trusted healthcare discovery platform. Our mission is to connect
            patients with verified healthcare professionals and make finding the right doctor as simple as
            possible.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To centralize fragmented healthcare information and empower patients to make informed decisions
              about their healthcare. Every patient deserves access to verified doctor credentials, insurance
              compatibility, and real patient feedback—all in one place.
            </p>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              A future where finding verified healthcare professionals is as easy as searching for a restaurant.
              Where insurance confusion is eliminated, and where trust is built through transparency and real
              patient experiences.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-medical-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Verified</h3>
              <p className="text-gray-600 text-sm">
                All credentials are verified and kept up-to-date
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-medical-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Transparent</h3>
              <p className="text-gray-600 text-sm">
                Real patient reviews and honest ratings
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-medical-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Fast</h3>
              <p className="text-gray-600 text-sm">
                Find the right doctor in seconds
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-medical-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Patient-First</h3>
              <p className="text-gray-600 text-sm">
                Everything we build serves the patient
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Team</h2>
          <div className="card p-8">
            <p className="text-gray-600 text-center mb-6">
              We're a lean, bootstrapped team of healthcare enthusiasts and technologists building for the UAE.
            </p>
            <div className="bg-medical-50 border-2 border-medical-200 rounded-lg p-6 text-center">
              <p className="text-medical-900 font-semibold mb-2">Currently Hiring</p>
              <p className="text-medical-700 text-sm">
                Looking for healthcare consultants, data researchers, and early-stage advisors. Join us in
                building healthcare's future. DM for more info.
              </p>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Problem We're Solving</h2>
          <div className="space-y-4">
            <div className="card p-6 border-l-4 border-medical-500">
              <h3 className="font-bold text-lg mb-2">Fragmented Information</h3>
              <p className="text-gray-600">
                Doctor qualifications are scattered across hospital websites, LinkedIn, and Google. There's no
                central source of truth.
              </p>
            </div>

            <div className="card p-6 border-l-4 border-medical-500">
              <h3 className="font-bold text-lg mb-2">Insurance Confusion</h3>
              <p className="text-gray-600">
                Patients can't easily determine which doctors accept their insurance plan without calling each
                clinic individually.
              </p>
            </div>

            <div className="card p-6 border-l-4 border-medical-500">
              <h3 className="font-bold text-lg mb-2">Trust Gaps</h3>
              <p className="text-gray-600">
                Limited access to verified reviews. Most patients rely on word-of-mouth recommendations or
                outdated hospital websites.
              </p>
            </div>

            <div className="card p-6 border-l-4 border-medical-500">
              <h3 className="font-bold text-lg mb-2">Inefficient Discovery</h3>
              <p className="text-gray-600">
                No single platform to search by specialty, location, insurance, and patient experience.
              </p>
            </div>
          </div>
        </section>

        {/* How We're Different */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How We're Different</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-bold">Feature</th>
                  <th className="text-center py-3 px-4 font-bold">Google</th>
                  <th className="text-center py-3 px-4 font-bold">Hospital Sites</th>
                  <th className="text-center py-3 px-4 font-bold">MediFind</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">Verified Credentials</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">Insurance Mapping</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">Cross-Hospital Search</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">Real Patient Reviews</td>
                  <td className="text-center">✅</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">Healthcare Specialization</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-4xl mx-auto text-center">
          <div className="card p-12 bg-gradient-to-r from-medical-50 to-blue-50">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Want to Get Involved?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're a doctor, hospital administrator, or healthcare professional—we'd love to hear from
              you.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="/signup" className="btn-primary px-8 py-3">
                Get Listed as a Doctor
              </a>
              <a href="mailto:hello@medifind.ae" className="btn-secondary px-8 py-3">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
