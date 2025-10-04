# OMP Chaplaincy - Complete Implementation Plan

## Project Overview
A comprehensive Catholic chaplaincy website with real-time data integration, no mock data, built as a PWA.

## Database Schema ✅ COMPLETED
- All 11 tables created in Supabase
- Row Level Security enabled
- Proper indexes and relationships

## Core Features Implementation Status

### 1. Daily Readings System
**Status**: Services Created
**Components Needed**:
- ✅ `readingsService.ts` - EWTN and USCCB scrapers
- ✅ `DailyReadingsCard.tsx` - Home page preview card
- ⏳ `/readings` page - Full readings display
- ⏳ Cron job for midnight scraping

**API Endpoints**:
- EWTN: `https://www.ewtn.com/catholicism/daily-readings/{YYYY-MM-DD}`
- USCCB: `https://bible.usccb.org/bible/readings/{YYYYMMDD}.cfm`

### 2. Saints of the Day
**Status**: Services Created
**Components Needed**:
- ✅ `saintsService.ts` - Multiple source scrapers
- ⏳ `SaintCard.tsx` - Home page preview card
- ⏳ `/saints/{date}` page - Full saint details
- ⏳ Cron job for midnight updates

**API Sources**:
- Liturgical Calendar API: `https://litcal.johnromanodorazio.com/api/v3`
- Franciscan Media scraping
- Catholic Online scraping

### 3. Mass Intentions Booking
**Status**: Not Started
**Features**:
- Public submission form
- Payment modal (bank details)
- Admin approval workflow
- Display approved intentions
- Payment confirmation tracking

**Database**: `mass_intentions` table

### 4. Prayer Wall
**Status**: Not Started
**Features**:
- Public prayer request form
- Anonymous option
- Urgent flag
- Prayer counter (increment on pray)
- Admin approval
- Public display of approved requests

**Database**: `prayer_requests` table

### 5. Associations & Societies
**Status**: Not Started
**Required Pages**:
- CYO, CWO, CYON, NFCS, FECAMDS
- Altar Knights, Decorators, Choir, Church Wardens
- Legion of Mary (Curia + Praesidiums)
- Sacred Heart, OMPH, St. Anthony, Rosa Mystica
- CCRN, Bloc Rosary, Divine Mercy

**Each Page Needs**:
- Overview
- History
- Patron Saint
- Requirements
- How to Join
- Meeting Schedule
- Contact Info
- Fun Facts

**Database**: `associations` table

### 6. Doctrine Q&A Bank
**Status**: Not Started
**Features**:
- Comprehensive Catholic Q&A database
- Categories: Theology, Liturgy, Sacraments, Bible, Catechism, History, Saints
- Difficulty levels: Basic, Intermediate, Advanced
- Search functionality
- Related questions
- View/helpful counters

**Database**: `doctrine_qa` table

**Required Content**: 100+ real Catholic questions and answers

### 7. AI Chatbot
**Status**: Not Started
**Integration Steps**:
1. Magisterium AI API (primary)
2. Fallback to web scraping
3. Fallback to doctrine Q&A database

**API**: Magisterium AI (research needed for API access)

### 8. Parishioners Marketplace
**Status**: Not Started
**Features**:
- Business/service submission form
- Admin approval workflow
- Featured listings (admin selects daily)
- Categories: Services, Products, Crafts, etc.
- Business details display

**Database**: `marketplace_listings` table

### 9. Admin Dashboard
**Status**: Partial (login exists)
**Required Features**:
- Approve/reject mass intentions
- Approve/reject prayer requests
- Approve/reject marketplace listings
- Feature marketplace listings
- Manage announcements
- Manage events
- Manage news articles
- View analytics

**Pages Needed**:
- ✅ Login
- ✅ Dashboard
- ✅ Manage Announcements
- ✅ Manage Events
- ✅ Manage News
- ⏳ Manage Mass Intentions (functional)
- ⏳ Manage Prayer Requests (functional)
- ⏳ Manage Marketplace (functional)

### 10. News & Events
**Status**: Components exist but need Supabase integration
**Features**:
- News articles (admin created)
- Events calendar
- Registration links
- Image uploads

**Database**: `news_articles`, `events`, `announcements` tables

### 11. PWA Features
**Status**: Basic structure exists
**Required**:
- Service worker for offline
- App manifest
- Push notifications
- Install prompt
- Cache strategies

## Design Requirements

### Typography
- Use Google Fonts: Crimson Text (headings), Open Sans (body)
- Proper hierarchy and line spacing
- Readable contrast ratios

### Colors
- Primary: Deep blue (#1e40af)
- Secondary: Gold (#d97706)
- Accent: Warm earth tones
- NO purple/indigo unless requested

### Animations
- Fade-in on scroll
- Hover effects on cards
- Smooth transitions
- Loading skeletons

### Layout
- Clean, modern Catholic aesthetic
- Ample white space
- Mobile-first responsive
- Accessible navigation

## Cron Jobs Required

### Midnight Data Updates
```typescript
// Run daily at 12:00 AM
- Scrape and store daily readings
- Fetch and store saint of the day
- Refresh featured marketplace listings
```

## Environment Variables

```env
REACT_APP_SUPABASE_URL=your_url
REACT_APP_SUPABASE_ANON_KEY=your_key
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_id
REACT_APP_FIREBASE_APP_ID=your_id
```

## Next Steps

1. Complete daily readings and saints card components
2. Build full readings and saints detail pages
3. Implement mass intentions system
4. Implement prayer wall system
5. Populate associations data
6. Create doctrine Q&A database
7. Integrate chatbot
8. Build marketplace
9. Enhance admin dashboard
10. Add PWA features
11. Implement design polish
12. Set up cron jobs
13. Testing and deployment

## Notes
- All scrapers have fallback mechanisms
- No mock or placeholder data
- Real-time Supabase integration
- Admin approval workflows for user submissions
- Mobile-responsive design
- Accessibility compliant
- SEO optimized
