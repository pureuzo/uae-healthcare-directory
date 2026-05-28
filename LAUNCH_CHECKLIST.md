# 🚀 MVP Launch Checklist (2 Hours to Live)

Use this checklist to deploy your MVP in 2 hours. Check off each step as you complete it.

---

## ⏱️ PHASE 1: LOCAL SETUP (30 minutes)

### Step 1: Prerequisites ✅
- [ ] Download Node.js 18+ from nodejs.org
- [ ] Create GitHub account (github.com)
- [ ] Create Vercel account (vercel.com)
- [ ] Create Supabase account (supabase.com)

### Step 2: Clone Project ✅
```bash
# Create folder
mkdir uae-healthcare-directory
cd uae-healthcare-directory

# Initialize git
git init
```
- [ ] Copy all project files into this folder
- [ ] Verify these folders exist:
  - [ ] `app/`
  - [ ] `components/`
  - [ ] `lib/`
  - [ ] `styles/`
  - [ ] `public/` (create if missing)

### Step 3: Install Dependencies ✅
```bash
npm install
```
- [ ] Wait for installation to complete (~2 minutes)
- [ ] No errors in console

### Step 4: Test Locally ✅
```bash
npm run dev
```
- [ ] Open http://localhost:3000
- [ ] See "Find Verified Healthcare Professionals" hero
- [ ] Dropdown filters visible
- [ ] No JavaScript errors in console

**Time: 30 min ⏱️**

---

## ⏱️ PHASE 2: SUPABASE DATABASE SETUP (30 minutes)

### Step 1: Create Supabase Project ✅
1. Go to https://supabase.com
2. Sign in or create account
3. Click "New Project"
   - [ ] Name: `uae-healthcare-directory`
   - [ ] Password: Save securely (you'll need it)
   - [ ] Region: Choose closest (Frankfurt or Singapore)
4. Wait 2-3 minutes for initialization

### Step 2: Get Your API Credentials ✅
1. Project created → Go to Settings → API
2. Copy these EXACTLY:
   - [ ] `Project URL` (format: `https://xxxxx.supabase.co`)
   - [ ] `anon public` key (looks like a long string)
3. Save these in a safe place temporarily

### Step 3: Create Database Tables ✅
1. In Supabase dashboard → SQL Editor
2. Click "New Query"
3. Copy-paste this entire SQL script:

```sql
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

ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "doctors_public_read" ON doctors FOR SELECT USING (verified = true);
CREATE POLICY "doctors_insert" ON doctors FOR INSERT WITH CHECK (true);

CREATE POLICY "hospitals_public_read" ON hospitals FOR SELECT USING (verified = true);
CREATE POLICY "hospitals_insert" ON hospitals FOR INSERT WITH CHECK (true);
```

4. Click "Run"
- [ ] No errors
- [ ] See "Successfully created table" messages

### Step 4: Seed Sample Data ✅
```bash
# Install Python Supabase library
pip install supabase

# Set environment variables (replace with YOUR values)
export SUPABASE_URL="https://xxxxx.supabase.co"
export SUPABASE_KEY="your_anon_key_here"

# Run seeder
python seed_doctors.py
```
- [ ] See "Successfully inserted 10 doctors"
- [ ] See "Successfully inserted 5 hospitals"

### Step 5: Verify Data in Supabase ✅
1. Back in Supabase dashboard
2. Table Editor → Select "doctors" table
- [ ] See 10 doctor rows
3. Table Editor → Select "hospitals" table
- [ ] See 5 hospital rows

**Time: 30 min ⏱️**

---

## ⏱️ PHASE 3: CONNECT APP TO DATABASE (15 minutes)

### Step 1: Create `.env.local` ✅
1. In your project folder, create file: `.env.local`
2. Copy this template:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_long_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Replace:
   - `https://xxxxx.supabase.co` → Your Project URL
   - `your_long_key_here` → Your anon key

- [ ] File saved as `.env.local` (not `.env`)
- [ ] No quotes around values
- [ ] No spaces around `=`

### Step 2: Test Connection Locally ✅
```bash
# Kill previous npm process (Ctrl+C)
npm run dev
```
- [ ] Open http://localhost:3000
- [ ] Click "Search" button without filters
- [ ] You should see a list of 10 doctors!
- [ ] Click on a doctor card → Shows details
- [ ] Try filtering by specialty
- [ ] Results update correctly

### Step 3: Test Doctor Signup Form ✅
- [ ] Navigate to `/signup`
- [ ] Fill out form with test data
- [ ] Click "Submit Profile"
- [ ] See success message
- [ ] Go to Supabase → doctors table
- [ ] See your test doctor in the list

**Time: 15 min ⏱️**

---

## ⏱️ PHASE 4: DEPLOY TO VERCEL (25 minutes)

### Step 1: Push Code to GitHub ✅
```bash
# Create GitHub repo first at github.com/new
# Name it: uae-healthcare-directory

# Then run:
git add .
git commit -m "Initial MVP - Ready to deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/uae-healthcare-directory.git
git push -u origin main
```
- [ ] Code successfully pushed to GitHub
- [ ] Visit your repo → See all files there

### Step 2: Deploy on Vercel ✅
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New..."
4. Select "Project"
5. Find and import your `uae-healthcare-directory` repo
6. Click "Import"

### Step 3: Configure Environment Variables ✅
Vercel shows environment setup screen:
1. Add Variable 1:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://xxxxx.supabase.co`
   - [ ] Added

2. Add Variable 2:
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `your_long_key_here`
   - [ ] Added

3. Click "Deploy"
- [ ] Deployment starts (shows progress)

### Step 4: Wait for Deployment ✅
Vercel will:
- Build your Next.js app (2-3 minutes)
- Run tests
- Deploy to CDN

Status should change from:
- "Building..." → "Ready" ✅

### Step 5: Access Your Live App ✅
- [ ] Deployment complete
- [ ] Click "Visit" button OR
- [ ] Go to the URL shown (like `uae-healthcare-directory.vercel.app`)
- [ ] App loads successfully
- [ ] Search works
- [ ] Doctor cards visible
- [ ] Signup form functional

**Time: 25 min ⏱️**

---

## 🎉 PHASE 5: FINAL CHECKS (5 minutes)

### Mobile Check ✅
- [ ] Open your Vercel URL on mobile phone
- [ ] Layout is responsive
- [ ] Search filters stack vertically
- [ ] Doctor cards are readable
- [ ] Buttons are tap-friendly

### Search Functionality ✅
- [ ] Filter by specialty → Results change
- [ ] Filter by location → Results change
- [ ] Filter by insurance → Results change
- [ ] No filters → Shows all doctors

### Doctor Signup ✅
- [ ] Can access `/signup`
- [ ] Form validates (try empty submit)
- [ ] Can submit profile successfully
- [ ] Success message appears

### Performance ✅
```bash
# Lighthouse audit in Chrome DevTools
# Target: 90+ score
```
- [ ] Lighthouse score 90+
- [ ] Page loads under 3 seconds

---

## 🚀 YOUR MVP IS LIVE! 

### Share Your URL
- [ ] Copy your Vercel URL
- [ ] Share with 5-10 test users
- [ ] Ask for feedback
- [ ] Note any issues

### Next Steps (Week 1)
- [ ] Get 50+ user interviews
- [ ] Ask patients: "Would you use this?"
- [ ] Ask doctors: "Would you pay for a profile?"
- [ ] Document all feedback

### Time Breakdown
| Phase | Time | Status |
|-------|------|--------|
| Local Setup | 30 min | ✅ |
| Database | 30 min | ✅ |
| Environment | 15 min | ✅ |
| Deployment | 25 min | ✅ |
| Final Checks | 5 min | ✅ |
| **TOTAL** | **105 min** | **~2 hours** |

---

## 🆘 TROUBLESHOOTING

### "npm install fails"
```bash
# Clear cache
npm cache clean --force
# Try again
npm install
```

### "Can't connect to Supabase"
1. Check `.env.local` has correct credentials
2. Copy from Supabase Settings → API (not elsewhere)
3. No extra spaces or quotes

### "Search returns no results"
1. Go to Supabase dashboard
2. Table Editor → doctors
3. Should see 10 rows
4. If empty, run `python seed_doctors.py` again

### "Vercel deployment failed"
1. Check Vercel build logs (Deployment section)
2. Verify env variables are set
3. Run `npm run build` locally to debug

### "Mobile layout broken"
This shouldn't happen, but:
1. Clear browser cache
2. Hard refresh (Cmd+Shift+R on Mac)
3. Test in incognito window

---

## ✅ Success Criteria

You're done when:
- ✅ Local app runs on http://localhost:3000
- ✅ Database has 10+ doctors
- ✅ Search filters work
- ✅ App deployed to Vercel
- ✅ Live URL is publicly accessible
- ✅ Can see 10 doctors on live site
- ✅ Doctor signup form works
- ✅ Mobile responsive

---

## 📞 Quick Reference

| Component | Status |
|-----------|--------|
| Frontend | Next.js + React |
| Database | Supabase PostgreSQL |
| Hosting | Vercel |
| Domain | vercel.app (free) |
| Cost | AED 0 |
| Users Supported | 5,000+ MAU |

---

**Congratulations! 🎉 You've built and launched an MVP in 2 hours.**

Now focus on:
1. Getting user feedback
2. Recruiting early doctors
3. Understanding what to build next

Good luck! 🏥
