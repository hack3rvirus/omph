# Technical Documentation: Our Mother of Perpetual Help Chaplaincy Website

## Project Overview

This is a comprehensive Catholic church website built with modern web technologies to serve the spiritual and administrative needs of Our Mother of Perpetual Help Chaplaincy at Adekunle Ajasin University, Akungba-Akoko (AAUA).

## Technology Stack

### Frontend Framework
- **Next.js 14** with App Router
  - Server-side rendering (SSR) for optimal SEO
  - Static site generation (SSG) for fast loading
  - Incremental Static Regeneration (ISR) for dynamic content
  - Built-in API routes for backend functionality

### Styling & UI
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations and transitions
- **Lucide React** for consistent iconography
- **Custom CSS variables** for easy theme customization

### Backend & Database
- **Firebase** for authentication and real-time database
  - Firestore for document-based data storage
  - Firebase Auth for secure user management
  - Firebase Storage for file uploads
- **Next.js API Routes** for server-side logic

### PWA & Notifications
- **next-pwa** for Progressive Web App functionality
- **Workbox** for service worker management
- **Web Push API** for prayer notifications
- **Background Sync** for offline functionality

### Data Sources
- **CalAPI** (inadiutorium.cz) for liturgical calendar and saints
- **EWTN** website scraping for Mass readings
- **USCCB** website scraping as fallback for readings
- **Cheerio** for HTML parsing and web scraping

## Architecture Overview

### File Structure
```
our-mother-of-perpetual-help-chaplaincy/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Authentication pages
│   ├── admin/                    # Admin dashboard
│   ├── api/                      # API routes
│   ├── associations/             # Association pages
│   └── [other-pages]/           # Public pages
├── components/                   # Reusable React components
├── lib/                         # Utility functions and configurations
├── public/                      # Static assets
├── styles/                      # Global styles
└── types/                       # TypeScript type definitions
```

### Key Components

#### 1. Daily Liturgical Content System
**File**: `app/api/daily-content/route.ts`

This system automatically fetches and displays daily Catholic content:

```typescript
// Fetches saints and celebrations from CalAPI
async function fetchSaintsAndCelebrations(date: string)

// Scrapes Mass readings from EWTN and USCCB
async function fetchReadings(date: string)

// Combines all data into structured format
interface DailyContent {
  date: string
  saints: Saint[]
  celebration: string
  readings: {
    firstReading: Reading
    psalm: Reading
    secondReading?: Reading
    gospel: Reading
    reflection: string
  }
}
```

**How it works**:
1. Runs automatically at midnight via Vercel cron jobs
2. Fetches liturgical calendar from CalAPI
3. Scrapes readings from EWTN (primary) and USCCB (fallback)
4. Caches results for 6 hours to improve performance
5. Provides admin override for local feast days

#### 2. Authentication System
**File**: `lib/auth.ts`

Role-based access control with four permission levels:

```typescript
interface UserRole {
  uid: string
  email: string
  role: 'super_admin' | 'admin' | 'editor' | 'moderator'
  name: string
  association?: string
  createdAt: Date
  lastLogin: Date
}
```

**Roles and Permissions**:
- **Super Admin (Priest)**: Full site management
- **Admin (Catechist/Sacristan)**: Content management
- **Editor (Society Representatives)**: Limited to their association
- **Moderator**: Advertisement and event approval

#### 3. ASK A PADRE AI Chatbot
**File**: `app/api/chat/route.ts`

Catholic-focused AI assistant with comprehensive knowledge base:

```typescript
const catholicKnowledge = [
  {
    keywords: ['sacraments', 'seven sacraments'],
    response: "The seven sacraments of the Catholic Church are..."
  }
  // ... extensive Catholic doctrine database
]
```

**Features**:
- Scriptural references and citations
- Catechism-based responses
- Fallback to reliable Catholic resources
- Real-time chat interface

#### 4. Progressive Web App (PWA)
**Files**: `public/manifest.json`, `public/sw.js`, `lib/notifications.ts`

Full PWA implementation with:
- **Offline functionality** for prayers and basic content
- **Push notifications** for daily prayers (Angelus, Divine Mercy)
- **Background sync** for prayer requests
- **App-like experience** on mobile devices

**Prayer Notification Schedule**:
- 6:00 AM - Morning Angelus
- 12:00 PM - Noon Angelus
- 3:00 PM - Divine Mercy Chaplet
- 6:00 PM - Evening Angelus
- 7:00 PM - Evening Prayer

#### 5. Content Management System
**File**: `app/admin/page.tsx`

Comprehensive admin dashboard with:
- Real-time content editing
- Member directory management
- Event and news publishing
- Prayer request management
- Site customization tools

## Data Flow

### 1. Daily Content Update Process
```
Midnight Cron Job → CalAPI (Saints) → EWTN (Readings) → USCCB (Fallback) → Cache → Display
```

### 2. User Authentication Flow
```
Login Form → Firebase Auth → Role Verification → Dashboard Access → Content Management
```

### 3. Prayer Notification Flow
```
Service Worker → Scheduled Notifications → User Interaction → Prayer Pages
```

## API Integrations

### CalAPI (Liturgical Calendar)
- **Endpoint**: `https://calapi.inadiutorium.cz/api/v0/en/calendars/default/{date}`
- **Purpose**: Saints, feast days, liturgical seasons
- **Rate Limit**: Unlimited (free)
- **Fallback**: Local saint database

### EWTN (Mass Readings)
- **Method**: Web scraping with Cheerio
- **URL Pattern**: `https://www.ewtn.com/catholicism/daily-readings/{date}`
- **Purpose**: Primary source for Mass readings
- **Fallback**: USCCB scraping

### USCCB (Backup Readings)
- **Method**: Web scraping with Cheerio
- **URL Pattern**: `https://bible.usccb.org/bible/readings/{date}.cfm`
- **Purpose**: Fallback for Mass readings
- **Fallback**: Structured default readings

## Performance Optimizations

### 1. Caching Strategy
- **API responses**: 6-hour cache for daily content
- **Static assets**: 1-year cache for images and fonts
- **Service worker**: Offline caching for essential pages

### 2. Image Optimization
- Next.js Image component for automatic optimization
- WebP format support with fallbacks
- Lazy loading for below-the-fold content

### 3. Code Splitting
- Automatic code splitting with Next.js
- Dynamic imports for heavy components
- Tree shaking to eliminate unused code

## Security Implementation

### 1. Authentication Security
- Firebase Auth with secure token management
- Role-based access control (RBAC)
- Session management with automatic expiration

### 2. Data Protection
- Input validation and sanitization
- XSS protection for user-generated content
- CSRF protection for forms
- HTTPS enforcement

### 3. API Security
- Rate limiting for API endpoints
- CORS configuration for cross-origin requests
- Environment variable protection

## Deployment Architecture

### Production Environment
- **Hosting**: Vercel (free tier)
- **Database**: Firebase Firestore
- **CDN**: Vercel Edge Network
- **SSL**: Automatic HTTPS with Vercel

### Environment Variables
```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CHURCH_NAME="Our Mother of Perpetual Help Chaplaincy"
```

## Customization for Other Churches

### 1. Theme Customization
**File**: `lib/config.ts`

```typescript
export const churchConfig: ChurchConfig = {
  name: "Your Parish Name",
  patron: "Your Patron Saint",
  colors: {
    primary: "#YOUR_PRIMARY_COLOR",
    secondary: "#YOUR_SECONDARY_COLOR",
    accent: "#YOUR_ACCENT_COLOR"
  }
}
```

### 2. Content Customization
- Update parish information in configuration files
- Replace logo and images in `/public` directory
- Modify association data in respective page files
- Update contact information and Mass schedules

### 3. Branding Guidelines
- **Logo**: Replace with parish patron saint image
- **Colors**: Use parish or patron saint colors
- **Typography**: Maintain professional Catholic appearance
- **Content**: Adapt to local customs and traditions

## Maintenance and Updates

### 1. Daily Maintenance
- Monitor API integrations for failures
- Check notification delivery
- Review prayer request submissions
- Update local feast day overrides

### 2. Weekly Maintenance
- Review admin dashboard usage
- Update event and news content
- Check member directory accuracy
- Monitor site performance metrics

### 3. Monthly Maintenance
- Update association executive information
- Review and update prayer content
- Check for security updates
- Backup Firebase data

## Troubleshooting Common Issues

### 1. Daily Content Not Loading
- Check CalAPI and EWTN/USCCB availability
- Verify cron job execution in Vercel
- Check Firebase connection
- Review API rate limits

### 2. Notifications Not Working
- Verify service worker registration
- Check notification permissions
- Confirm PWA installation
- Review notification scheduling

### 3. Authentication Issues
- Check Firebase configuration
- Verify environment variables
- Review user role assignments
- Check network connectivity

## Future Enhancements

### 1. Planned Features
- Multi-language support (Igbo, Yoruba)
- Live streaming integration
- Online donation processing
- Advanced analytics dashboard

### 2. Technical Improvements
- GraphQL API implementation
- Advanced caching strategies
- Performance monitoring
- Automated testing suite

## Contributing Guidelines

### 1. Code Standards
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write descriptive commit messages
- Include JSDoc comments for functions

### 2. Testing Requirements
- Unit tests for utility functions
- Integration tests for API routes
- E2E tests for critical user flows
- Performance testing for key pages

### 3. Documentation
- Update technical documentation for changes
- Include inline code comments
- Maintain README files
- Document API changes

This technical documentation provides a comprehensive overview of the website's architecture, implementation details, and maintenance procedures. It serves as a guide for developers, administrators, and anyone interested in understanding or contributing to the project.