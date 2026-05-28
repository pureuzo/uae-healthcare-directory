# API Reference - UAE Healthcare Directory MVP

Quick reference for the key functions and API endpoints in your MVP.

---

## 🗂️ File Structure Map

```
uae-healthcare-directory/
├── app/                           # Next.js App Router (new style)
│   ├── layout.tsx                 # Root layout + metadata
│   ├── page.tsx                   # Home page
│   └── signup/
│       └── page.tsx               # Doctor signup page
├── components/
│   ├── Header.tsx                 # Navigation header
│   ├── Footer.tsx                 # Footer with links
│   ├── DoctorSearch.tsx           # Search filters + logic
│   └── DoctorCard.tsx             # Doctor profile card
├── lib/
│   ├── supabase.ts                # Supabase client + types
│   └── store.ts                   # Zustand state management
├── styles/
│   └── globals.css                # Tailwind + custom styles
└── seed_doctors.py                # Python data seeder
```

---

## 🔌 Supabase Integration

### Client Setup
**File:** `lib/supabase.ts`

```typescript
import { supabase } from '@/lib/supabase'

// Query doctors
const { data, error } = await supabase
  .from('doctors')
  .select('*')
  .eq('verified', true)
  .limit(50)
```

### Database Schema

#### Doctors Table
```sql
doctors {
  id: UUID              -- Auto-generated primary key
  name: VARCHAR         -- Full name
  specialty: VARCHAR    -- Cardiology, Pediatrics, etc.
  location: VARCHAR     -- Dubai, Abu Dhabi, etc.
  hospital: VARCHAR     -- Hospital/clinic name
  experience_years: INT -- Years of practice
  qualifications: TEXT  -- Degrees and certifications
  email: VARCHAR        -- Contact email
  phone: VARCHAR        -- Phone number
  google_rating: DECIMAL(3,1) -- 0-5 star rating
  google_reviews_count: INT    -- Number of reviews
  insurance_accepted: TEXT[]   -- Array of insurance plans
  bio: TEXT             -- Doctor biography
  image_url: VARCHAR    -- Profile picture URL
  verified: BOOLEAN     -- Approved by admin
  created_at: TIMESTAMP -- Auto timestamp
  updated_at: TIMESTAMP -- Auto timestamp
}
```

#### Hospitals Table
```sql
hospitals {
  id: UUID              -- Auto-generated primary key
  name: VARCHAR         -- Hospital name
  location: VARCHAR     -- Location/emirate
  phone: VARCHAR        -- Contact number
  website: VARCHAR      -- Hospital website
  specialisms: TEXT[]   -- Array of specializations
  emergency_24h: BOOLEAN -- Has 24h emergency
  google_rating: DECIMAL(3,1) -- Rating
  image_url: VARCHAR    -- Logo/image URL
  verified: BOOLEAN     -- Approved by admin
  created_at: TIMESTAMP -- Auto timestamp
  updated_at: TIMESTAMP -- Auto timestamp
}
```

---

## 🎯 State Management (Zustand)

**File:** `lib/store.ts`

### Store Interface
```typescript
interface Store {
  filters: SearchFilters
  searchResults: DoctorResult[]
  loading: boolean
  setFilters(filters: SearchFilters): void
  setSearchResults(results: DoctorResult[]): void
  setLoading(loading: boolean): void
  resetFilters(): void
}
```

### Usage in Components
```typescript
'use client'
import { useStore } from '@/lib/store'

export default function MyComponent() {
  const { filters, setFilters } = useStore()
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }
  
  return <div>{/* component */}</div>
}
```

---

## 🔍 Search Implementation

### DoctorSearch Component
**File:** `components/DoctorSearch.tsx`

```typescript
// Filter options
const SPECIALTIES = [
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  // ... more
]

const LOCATIONS = ['Dubai', 'Abu Dhabi', 'Sharjah', /* ... */]

const INSURANCE = ['Daman', 'AXA', 'Allianz', /* ... */]

// Search logic
const handleSearch = async () => {
  let query = supabase
    .from('doctors')
    .select('*')
    .eq('verified', true)
  
  if (filters.specialty) {
    query = query.ilike('specialty', `%${filters.specialty}%`)
  }
  if (filters.location) {
    query = query.ilike('location', `%${filters.location}%`)
  }
  if (filters.insurance) {
    query = query.contains('insurance_accepted', [filters.insurance])
  }
  
  const { data } = await query.limit(50)
  setSearchResults(data)
}
```

---

## 📝 Forms & Validation

### Doctor Signup Form
**File:** `app/signup/page.tsx`

```typescript
interface DoctorFormData {
  name: string                 // Required
  email: string               // Required, email format
  phone: string               // Required
  specialty: string           // Required, select from list
  hospital: string            // Required
  location: string            // Required, select from list
  experience_years: number    // Required, 0-60
  qualifications: string      // Required
  insurance_accepted: string[] // Multi-select array
  bio: string                 // Optional
}

// Submission
const handleSubmit = async (formData) => {
  const { error } = await supabase
    .from('doctors')
    .insert([{
      ...formData,
      verified: false // Admin approval required
    }])
  
  if (!error) {
    setSubmitted(true) // Show success message
  }
}
```

---

## 🎨 Component Examples

### Doctor Card
**File:** `components/DoctorCard.tsx`

Props:
```typescript
interface DoctorCardProps {
  doctor: {
    id: string
    name: string
    specialty: string
    hospital: string
    google_rating?: number
    insurance_accepted: string[]
    // ... other fields
  }
}
```

Usage:
```typescript
<DoctorCard doctor={doctorData} />
```

### Header Navigation
**File:** `components/Header.tsx`

Links:
- `/` - Home/Search
- `/signup` - Doctor signup
- `/about` - About page

---

## 🌐 Pages & Routes

### Home Page (`/`)
- **File:** `app/page.tsx`
- **Components:** Header, DoctorSearch, DoctorCard, Footer
- **Features:** Search, filter, view results

### Doctor Signup (`/signup`)
- **File:** `app/signup/page.tsx`
- **Features:** Form submission, validation, database insert

### About (`/about`)
- **File:** `app/about/page.tsx`
- **Features:** Company info, mission, values

---

## 🚀 Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Note:** `NEXT_PUBLIC_*` variables are exposed to browser (safe for anon API key)

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "lucide-react": "^0.263.0",
    "framer-motion": "^10.16.0",
    "zustand": "^4.4.0"
  }
}
```

---

## 🎯 Key Data Flows

### 1. Doctor Search Flow
```
User inputs filters
     ↓
DoctorSearch component
     ↓
handleSearch() function
     ↓
Query Supabase with filters
     ↓
setSearchResults() in Zustand
     ↓
Map results to DoctorCard components
     ↓
Display in grid
```

### 2. Doctor Signup Flow
```
User fills form at /signup
     ↓
handleSubmit() validates data
     ↓
Insert into doctors table
     ↓
Set verified = false (pending admin review)
     ↓
Show success message
     ↓
Clear form
```

### 3. Admin Verification Flow
```
Doctor submits profile (verified=false)
     ↓
Admin reviews in Supabase dashboard
     ↓
Update verified = true
     ↓
Profile becomes searchable by patients
```

---

## 🔐 Security & RLS Policies

### Row Level Security (RLS)

#### Doctors Table
```sql
-- Public users can read verified doctors
CREATE POLICY "doctors_public_read" ON doctors 
  FOR SELECT USING (verified = true);

-- Anyone can insert (for signups)
CREATE POLICY "doctors_insert" ON doctors 
  FOR INSERT WITH CHECK (true);
```

#### Hospitals Table
```sql
CREATE POLICY "hospitals_public_read" ON hospitals 
  FOR SELECT USING (verified = true);

CREATE POLICY "hospitals_insert" ON hospitals 
  FOR INSERT WITH CHECK (true);
```

---

## 🧪 Testing Queries

### Test in Supabase SQL Editor

```sql
-- Get all verified doctors
SELECT * FROM doctors WHERE verified = true;

-- Count doctors by specialty
SELECT specialty, COUNT(*) as count 
FROM doctors 
GROUP BY specialty;

-- Find doctors accepting specific insurance
SELECT * FROM doctors 
WHERE verified = true 
  AND 'Daman' = ANY(insurance_accepted);

-- Recent doctor signups (pending verification)
SELECT * FROM doctors 
WHERE verified = false 
ORDER BY created_at DESC;
```

---

## 🚀 Deployment Checklist

### Before Deploying
- [ ] Run `npm run build` locally (no errors)
- [ ] Test all forms
- [ ] Test search filters
- [ ] Test mobile responsive
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Push code to GitHub

### Vercel Deployment
- [ ] Import from GitHub
- [ ] Set environment variables
- [ ] Trigger deployment
- [ ] Verify live site works

### Post-Deployment
- [ ] Test live search
- [ ] Test live form submission
- [ ] Verify Supabase connection
- [ ] Check Lighthouse score

---

## 📊 Performance Tips

### Database
- Use `.limit(50)` on searches to avoid large payloads
- Add indexes on frequently filtered columns (specialty, location)
- Cache common queries

### Frontend
- Use dynamic imports for unused pages
- Optimize images before upload
- Leverage Next.js image optimization

### Vercel
- Enable edge caching headers
- Use ISR (Incremental Static Regeneration) for static pages

---

## 🔄 Common Updates

### Add New Specialty
1. Update `SPECIALTIES` array in `DoctorSearch.tsx`
2. Update `DoctorSignup.tsx`
3. Update `seed_doctors.py` if adding test data

### Add New Insurance Plan
1. Update `INSURANCE` array in `DoctorSearch.tsx`
2. Update `INSURANCE_OPTIONS` in `DoctorSignup.tsx`
3. Update seeder script

### Add New Location
1. Update `LOCATIONS` array in both components
2. Re-run seeder if needed

---

## 📚 Resources

- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Zustand:** https://github.com/pmndrs/zustand
- **Lucide Icons:** https://lucide.dev

---

## 🆘 Debug Modes

### Browser Console
```javascript
// Check Supabase connection
import { supabase } from '@/lib/supabase'
const { data } = await supabase.from('doctors').select('count')
console.log(data)
```

### Supabase Dashboard
- SQL Editor: Run raw queries
- Table Editor: View/edit data
- Logs: Check RLS violations
- API: Test endpoints

### Next.js
- `npm run dev` with `DEBUG=*` for verbose logging
- Check Network tab in DevTools
- Use React DevTools extension

---

## 📞 Support

For issues:
1. Check error message in console
2. Review relevant component file
3. Check Supabase logs for DB errors
4. Review environment variables
5. Test in Supabase playground first

---

**Last Updated:** May 26, 2026  
**Version:** MVP 0.1.0  
**Status:** Ready for production

