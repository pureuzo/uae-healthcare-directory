#!/usr/bin/env python3
"""
UAE Healthcare Directory - Doctor Data Scraper
Scrapes public healthcare data and seeds the Supabase database
Run with: python seed_doctors.py
"""

import os
import json
from datetime import datetime
from supabase import create_client, Client

# Initialize Supabase client
supabase_url = os.getenv('SUPABASE_URL', 'your_url_here')
supabase_key = os.getenv('SUPABASE_KEY', 'your_key_here')
supabase: Client = create_client(supabase_url, supabase_key)

# Sample seed data - Replace with real scraped data
DOCTORS_SEED_DATA = [
    {
        "name": "Dr. Ahmed Mohammed Al-Mansouri",
        "specialty": "Cardiology",
        "location": "Dubai",
        "hospital": "Al Noor Hospital",
        "experience_years": 15,
        "qualifications": "MD (Egypt), DM Cardiology (AIIMS), MRCP (UK)",
        "email": "ahmed.mansouri@alnoor.ae",
        "phone": "+971 50 123 4567",
        "google_rating": 4.8,
        "google_reviews_count": 142,
        "insurance_accepted": ["Daman", "AXA", "Allianz"],
        "bio": "Experienced cardiologist with 15 years of practice. Specializing in interventional cardiology and cardiac arrhythmias.",
        "verified": True,
    },
    {
        "name": "Dr. Fatima Al-Ketbi",
        "specialty": "Pediatrics",
        "location": "Abu Dhabi",
        "hospital": "Medicana Hospital",
        "experience_years": 12,
        "qualifications": "MD (UAE), FRCPCH (UK), Pediatric Subspecialties",
        "email": "fatima.alketbi@medicana.ae",
        "phone": "+971 50 987 6543",
        "google_rating": 4.9,
        "google_reviews_count": 89,
        "insurance_accepted": ["AXA", "Cigna", "Aetna"],
        "bio": "Dedicated pediatrician with special interest in neonatal care and developmental pediatrics.",
        "verified": True,
    },
    {
        "name": "Dr. Hassan Ibrahim",
        "specialty": "Orthopedics",
        "location": "Dubai",
        "hospital": "Deira Hospital",
        "experience_years": 18,
        "qualifications": "MD, Orthopedic Surgery (Germany), Sports Medicine Fellowship",
        "email": "hassan.ibrahim@deira.ae",
        "phone": "+971 50 444 5555",
        "google_rating": 4.7,
        "google_reviews_count": 156,
        "insurance_accepted": ["Daman", "Allianz", "Cigna"],
        "bio": "Orthopedic surgeon with expertise in joint replacement and sports injuries. 18 years of experience.",
        "verified": True,
    },
    {
        "name": "Dr. Sarah Al-Mansoori",
        "specialty": "General Practice",
        "location": "Sharjah",
        "hospital": "Al Zahra Hospital",
        "experience_years": 10,
        "qualifications": "MD (India), FRCS General Practice (UK)",
        "email": "sarah.mansoori@alzahra.ae",
        "phone": "+971 50 222 3333",
        "google_rating": 4.6,
        "google_reviews_count": 120,
        "insurance_accepted": ["AXA", "Aetna"],
        "bio": "General practitioner with comprehensive approach to family health. Fluent in Arabic and English.",
        "verified": True,
    },
    {
        "name": "Dr. Rajesh Sharma",
        "specialty": "Dermatology",
        "location": "Dubai",
        "hospital": "German Medical Center",
        "experience_years": 14,
        "qualifications": "MBBS, MD Dermatology (India), Fellowship Cosmetic Dermatology",
        "email": "rajesh.sharma@gmc.ae",
        "phone": "+971 50 666 7777",
        "google_rating": 4.8,
        "google_reviews_count": 210,
        "insurance_accepted": ["Daman", "AXA", "Allianz", "Cigna"],
        "bio": "Experienced dermatologist offering clinical and cosmetic services. Advanced laser treatments available.",
        "verified": True,
    },
    {
        "name": "Dr. Mariam Al-Falasi",
        "specialty": "Gynecology",
        "location": "Abu Dhabi",
        "hospital": "Cleveland Clinic Abu Dhabi",
        "experience_years": 16,
        "qualifications": "MD, FRCOG (UK), Reproductive Medicine Fellowship",
        "email": "mariam.falasi@clevelandclinic.ae",
        "phone": "+971 50 888 9999",
        "google_rating": 4.9,
        "google_reviews_count": 178,
        "insurance_accepted": ["Daman", "AXA", "Cigna", "Aetna"],
        "bio": "Obstetrician-gynecologist with specialized training in reproductive medicine and high-risk pregnancy.",
        "verified": True,
    },
    {
        "name": "Dr. Mohammed Ali Al-Noor",
        "specialty": "Neurology",
        "location": "Dubai",
        "hospital": "Al Noor Hospital",
        "experience_years": 13,
        "qualifications": "MD, Neurology (USA), Sleep Medicine Fellowship",
        "email": "mohammed.alnoor@alnoor.ae",
        "phone": "+971 50 111 2222",
        "google_rating": 4.7,
        "google_reviews_count": 95,
        "insurance_accepted": ["Daman", "Allianz"],
        "bio": "Neurologist specializing in sleep disorders, headaches, and neurological complications.",
        "verified": True,
    },
    {
        "name": "Dr. Noor Al-Hashemi",
        "specialty": "Dentistry",
        "location": "Dubai",
        "hospital": "Smile Care Dental",
        "experience_years": 9,
        "qualifications": "BDS (USA), MSD Prosthodontics (Canada)",
        "email": "noor.hashemi@smilecare.ae",
        "phone": "+971 50 333 4444",
        "google_rating": 4.8,
        "google_reviews_count": 267,
        "insurance_accepted": ["AXA", "Cigna"],
        "bio": "Prosthodontist offering comprehensive dental and cosmetic services. Latest technology available.",
        "verified": True,
    },
    {
        "name": "Dr. Karim El-Sayed",
        "specialty": "Ophthalmology",
        "location": "Abu Dhabi",
        "hospital": "Eye Care Center",
        "experience_years": 11,
        "qualifications": "MD, Ophthalmology (Egypt), Corneal and Refractive Surgery Fellowship",
        "email": "karim.elsayed@eyecare.ae",
        "phone": "+971 50 555 6666",
        "google_rating": 4.9,
        "google_reviews_count": 189,
        "insurance_accepted": ["Daman", "AXA", "Allianz", "Cigna", "Aetna"],
        "bio": "Ophthalmologist with expertise in LASIK, corneal disease, and cataract surgery.",
        "verified": True,
    },
    {
        "name": "Dr. Layla Al-Dhaheri",
        "specialty": "Psychiatry",
        "location": "Dubai",
        "hospital": "Wellbeing Clinic",
        "experience_years": 12,
        "qualifications": "MD, Psychiatry (Canada), Psychotherapy Certification",
        "email": "layla.dhaheri@wellbeing.ae",
        "phone": "+971 50 777 8888",
        "google_rating": 4.7,
        "google_reviews_count": 112,
        "insurance_accepted": ["AXA", "Cigna", "Aetna"],
        "bio": "Psychiatrist offering comprehensive mental health services including therapy and medication management.",
        "verified": True,
    },
]

HOSPITALS_SEED_DATA = [
    {
        "name": "Al Noor Hospital",
        "location": "Dubai",
        "phone": "+971 4 308 7700",
        "website": "https://www.alnoorhospital.com",
        "specialisms": ["Cardiology", "Orthopedics", "Neurology", "General Surgery"],
        "emergency_24h": True,
        "google_rating": 4.6,
        "verified": True,
    },
    {
        "name": "Cleveland Clinic Abu Dhabi",
        "location": "Abu Dhabi",
        "phone": "+971 2 810 2000",
        "website": "https://www.clevelandclinicabudhabi.ae",
        "specialisms": ["Gynecology", "Cardiology", "Orthopedics", "Neurology"],
        "emergency_24h": True,
        "google_rating": 4.8,
        "verified": True,
    },
    {
        "name": "German Medical Center",
        "location": "Dubai",
        "phone": "+971 4 308 8888",
        "website": "https://www.germanmedical.ae",
        "specialisms": ["Dermatology", "Orthopedics", "General Surgery"],
        "emergency_24h": False,
        "google_rating": 4.7,
        "verified": True,
    },
    {
        "name": "Medicana Hospital",
        "location": "Abu Dhabi",
        "phone": "+971 2 444 5555",
        "website": "https://www.medicana.ae",
        "specialisms": ["Pediatrics", "Gynecology", "General Practice"],
        "emergency_24h": True,
        "google_rating": 4.5,
        "verified": True,
    },
    {
        "name": "Al Zahra Hospital",
        "location": "Sharjah",
        "phone": "+971 6 531 3111",
        "website": "https://www.alzahra.ae",
        "specialisms": ["General Practice", "Pediatrics", "Cardiology"],
        "emergency_24h": True,
        "google_rating": 4.4,
        "verified": True,
    },
]


def seed_doctors():
    """Insert doctor data into Supabase"""
    print("🏥 Seeding doctors...")
    try:
        response = supabase.table("doctors").insert(DOCTORS_SEED_DATA).execute()
        print(f"✅ Successfully inserted {len(DOCTORS_SEED_DATA)} doctors")
        return True
    except Exception as e:
        print(f"❌ Error seeding doctors: {e}")
        return False


def seed_hospitals():
    """Insert hospital data into Supabase"""
    print("🏢 Seeding hospitals...")
    try:
        response = supabase.table("hospitals").insert(HOSPITALS_SEED_DATA).execute()
        print(f"✅ Successfully inserted {len(HOSPITALS_SEED_DATA)} hospitals")
        return True
    except Exception as e:
        print(f"❌ Error seeding hospitals: {e}")
        return False


def clear_existing_data():
    """Clear existing data (optional, for fresh start)"""
    print("🗑️  Clearing existing data...")
    try:
        supabase.table("doctors").delete().neq("id", "").execute()
        supabase.table("hospitals").delete().neq("id", "").execute()
        print("✅ Cleared existing data")
    except Exception as e:
        print(f"⚠️  Could not clear data: {e}")


def main():
    print("🚀 UAE Healthcare Directory - Database Seeder")
    print("=" * 50)

    # Verify connection
    try:
        result = supabase.table("doctors").select("count", count="exact").execute()
        current_count = result.count
        print(f"📊 Current doctors in database: {current_count}")
    except Exception as e:
        print(f"❌ Failed to connect to Supabase: {e}")
        print("Please check your SUPABASE_URL and SUPABASE_KEY")
        return

    # Ask user if they want to clear existing data
    if current_count > 0:
        response = input("\n⚠️  Database has existing data. Clear it? (y/n): ")
        if response.lower() == 'y':
            clear_existing_data()

    # Seed data
    print("\n📥 Starting seed process...")
    success = True
    success = seed_doctors() and success
    success = seed_hospitals() and success

    if success:
        print("\n✨ Seeding completed successfully!")
        print("Your MVP database is ready to use.")
    else:
        print("\n❌ Seeding completed with errors")

    print("=" * 50)


if __name__ == "__main__":
    main()
