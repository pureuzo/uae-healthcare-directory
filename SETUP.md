# UAE Healthcare Directory MVP - Setup & Deployment Guide

**Status:** Ready for Launch  
**Timeline:** 2 hours to live  
**Cost:** AED 0/month (free tiers)

---

## 🚀 Quick Start (15 minutes)

### Prerequisites
- GitHub account (free)
- Vercel account (free)
- Supabase account (free)
- Node.js 18+ (download from nodejs.org)

---

## Step 1: Clone & Setup Locally (5 minutes)

### 1.1 Create GitHub Repository
```bash
# Option A: If you already have git/GitHub setup
git clone [your-repo-url]
cd uae-healthcare-directory
npm install

# Option B: Create new repo
mkdir uae-healthcare-directory
cd uae-healthcare-directory
npm init -y
npm install
```

### 1.2 Copy all project files into the directory

Place these folders/files in your project root:
```
uae-healthcare-directory/
├── app/                    # Next.js app folder
├── components/            # React components
├── lib/                   # Utilities (Supabase, store)
├── styles/               # CSS
├── public/               # Static assets
├── package.json
├── tailwind.config.js
├── next.config.js
├── postcss.config.js
├── seed_doctors.py       # Database seeder
└── .env.local.example
```

### 1.3 Test Locally
```bash
npm run dev
# Visit http://localhost:3000
```

---

## Step 2: Setup Supabase (Database) - 10 minutes

### 2.1 Create Supabase Project
1. Go to https://supabase.com
2. Sign up / Log in
3. Create new project
   - Name: `uae-healthcare-directory`
   - Database password: Save this securely
   - Region: Select closest to UAE (Europe/Frankfurt or Singapore)
4. Wait 2-3 minutes for project to initialize

### 2.2 Get Your Credentials
1. Go to Project Settings → API
2. Copy:
   - `Project URL` (this is your SUPABASE_URL)
   - `anon public` key (this is your SUPABASE_ANON_KEY)

### 2.3 Create Database Tables

Go to **SQL Editor** in Supabase and run this:

```sql
-- Create doctors table
CREATE TABLE doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  specialty VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  hospital VARCHAR NOT NULL,
  experience_years INTEGER,
  qualifications TEXT,
  email VARCHAR NOT NULL,
  phone VARCHAR,
  google_rating DECIMAL(3,1),
  google_reviews_count INTEGER,
  insurance_accepted TEXT[] DEFAULT '{}',
  bio TEXT,
  image_url VARCHAR,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create hospitals table
CREATE TABLE hospitals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  phone VARCHAR,
  website VARCHAR,
  specialisms TEXT[] DEFAULT '{}',
  emergency_24h BOOLEAN DEFAULT FALSE,
  google_rating DECIMAL(3,1),
  image_url VARCHAR,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (Row Level Security)
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "doctors_public_read" ON doctors FOR SELECT USING (verified = true);
CREATE POLICY "doctors_insert" ON doctors FOR INSERT WITH CHECK (true);

CREATE POLICY "hospitals_public_read" ON hospitals FOR SELECT USING (verified = true);
CREATE POLICY "hospitals_insert" ON hospitals FOR INSERT WITH CHECK (true);
```

### 2.4 Seed Database with Sample Data

```bash
# Install Python dependencies
pip install supabase

# Set environment variables
export SUPABASE_URL="your_supabase_url"
export SUPABASE_KEY="your_supabase_anon_key"

# Run seed script
python seed_doctors.py
```

You should see:
```
✅ Successfully inserted 10 doctors
✅ Successfully inserted 5 hospitals
✨ Seeding completed successfully!
```

---

## Step 3: Environment Variables

### 3.1 Create `.env.local` file
```bash
cp .env.local.example .env.local
```

### 3.2 Fill in your Supabase credentials
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3.3 Test locally again
```bash
npm run dev
# You should now see the search working with real data
```

---

## Step 4: Deploy to Vercel (5 minutes)

### 4.1 Push Code to GitHub
```bash
git add .
git commit -m "Initial MVP setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/uae-healthcare-directory.git
git push -u origin main
```

### 4.2 Deploy on Vercel
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import from GitHub
4. Select your `uae-healthcare-directory` repo
5. Configure:
   - **Framework:** Next.js
   - **Root Directory:** ./
   - **Environment Variables:** Add your Supabase credentials:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

**Wait 2-3 minutes...**

✨ Your app is now LIVE at `your-project.vercel.app`

---

## Step 5: Configure Custom Domain (Optional)

If you have a domain:
1. In Vercel: Settings → Domains
2. Add your domain
3. Update DNS records (Vercel will guide you)

---

## 📊 What You Have Now

✅ **Public-facing search** - Patients can search for doctors  
✅ **Doctor signup** - Doctors can submit profiles  
✅ **Database** - 10+ sample doctors, 5+ hospitals  
✅ **Live URL** - Your own healthcare directory  
✅ **Insurance mapping** - Shows which plans doctors accept  
✅ **Google ratings** - Integrated review system  
✅ **Free hosting** - Scales to 5K+ monthly users  

---

## 🔧 Next Steps (After MVP Launch)

### Week 1-2: Validation
- [ ] Share link with 50 test users
- [ ] Get feedback on search experience
- [ ] Ask doctors: "Would you pay for premium profile?"
- [ ] Ask patients: "How often would you use this?"

### Month 2: Growth
- [ ] Add 50+ real doctors (manual outreach)
- [ ] Set up SEO (Google Search Console)
- [ ] Create landing page for doctor signups
- [ ] Start collecting insurance partnerships

### Month 3: Monetization
- [ ] Launch premium profiles (AED 50-150/month)
- [ ] Set up Stripe/2Checkout for payments
- [ ] Contact 3-5 insurance companies

---

## 🛠️ Troubleshooting

### "Can't connect to Supabase"
```bash
# Check your env variables
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY

# Try connecting directly in Supabase Dashboard
```

### "Search returns no results"
```bash
# Verify data was seeded
# In Supabase → Table Editor → doctors → Should see 10 rows

# Re-run seeder:
python seed_doctors.py
```

### "Deployment failed on Vercel"
1. Check build logs in Vercel dashboard
2. Verify env variables are set correctly
3. Run `npm run build` locally to debug

### "Getting CORS errors"
This shouldn't happen with Supabase + Next.js, but if it does:
1. Check Supabase RLS policies
2. Verify `SUPABASE_ANON_KEY` is correct

---

## 📈 Scalability (You'll Need This)

Your free tier supports:
- **Supabase:** 500MB storage, unlimited API calls
- **Vercel:** 100GB bandwidth/month
- **Monthly users:** 5,000+ MAU

**When you hit limits:**
1. **Supabase:** Move to paid tier (~$25/month) → 8GB + more API
2. **Vercel:** Move to Pro (~$20/month) → unlimited bandwidth
3. **Total:** ~$45/month for 50K+ users

---

## 💡 How to Add More Doctors

### Manual Method (Best for MVP)
1. Open `seed_doctors.py`
2. Add entries to `DOCTORS_SEED_DATA` with real doctor info
3. Run `python seed_doctors.py`

### From Supabase Dashboard
1. Go to Supabase → Table Editor → doctors
2. Click "Insert" and add manually
3. Set `verified: true` to show on platform

### Bulk Import (CSV)
1. Prepare CSV with columns: name, specialty, location, hospital, experience_years, email, phone, insurance_accepted
2. In Supabase: CSV import tool
3. Map columns and import

---

## 🔐 Security Checklist

- [x] RLS policies enabled (public read-only for verified)
- [x] No API keys in code (using .env)
- [x] Database field validation
- [x] Rate limiting on API routes

**For Phase 2:**
- [ ] Admin dashboard to verify doctors
- [ ] Email verification for doctor signups
- [ ] GDPR/PDPL compliance setup
- [ ] Data retention policies

---

## 📱 Mobile Responsive?

Yes! Your MVP is fully responsive:
- Desktop: Full layout
- Tablet: 2-3 column grid
- Mobile: Single column, touch-friendly

Test on phone:
```bash
# Get your local IP
ipconfig getifaddr en0  # Mac
# or
hostname -I  # Linux

# Then visit http://YOUR_IP:3000 from phone
```

---

## 🎯 Key Metrics to Track (Week 1)

- Page views
- Unique visitors
- Search attempts
- Doctor profile signups
- Average session duration

**Track in Vercel Analytics** (built-in) or Google Analytics (add later)

---

## 🚀 You're Done!

Your MVP is live. Now focus on:
1. **Getting feedback** from real users
2. **Recruiting early doctors** for the platform
3. **Understanding what problems to solve next**

---

**Questions?** Check Supabase docs or Vercel docs.  
**Ready to scale?** Come back to this guide when you need it.

Good luck! 🏥
