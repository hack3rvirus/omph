# Our Mother of Perpetual Help Chaplaincy Website

A complete, production-ready Catholic church website built with Next.js, featuring real-time liturgical content, AI-powered Catholic Q&A, comprehensive parish management, and Progressive Web App capabilities.

## 🌟 Features

### 📅 Real-Time Liturgical Content
- **Automatic daily updates** of saints, celebrations, and Mass readings from EWTN and USCCB
- **Dynamic hero section** displaying today's liturgical information
- **Admin override** capabilities for local feast days and special celebrations
- **Second readings** automatically included for Sundays and major feasts

### 🤖 ASK A PADRE AI Chatbot
- **Catholic-focused AI assistant** with comprehensive doctrine knowledge
- **Scriptural references** and proper citations from the Catechism
- **Real-time chat interface** with beautiful Catholic styling
- **Fallback to reliable Catholic resources** for complex questions

### 📱 Progressive Web App (PWA)
- **Offline functionality** for prayers and essential content
- **Push notifications** for daily prayers:
  - 6:00 AM & 6:00 PM - The Angelus
  - 12:00 PM - Noon Angelus
  - 3:00 PM - Divine Mercy Chaplet
  - 7:00 PM - Evening Prayer
- **App-like experience** with home screen installation
- **Background sync** for prayer requests when offline

### 👥 Complete Parish Management
- **Association directory** with individual pages for each organization
- **Admin dashboard** with role-based access control
- **Event management** with filterable calendar
- **News system** with categories and search functionality
- **Prayer request** submission and management

### 🎨 Authentic Catholic Design
- **Vatican-inspired color palette** (Gold #FFD700, White #FFFFFF)
- **Our Mother of Perpetual Help accents** (Blue #1E3A8A, Red #B91C1C)
- **USCCB-style clean backgrounds** with subtle Catholic iconography
- **Professional typography** (Playfair Display + Inter)
- **Smooth animations** with Framer Motion

### 💰 Production-Ready Architecture
- **Zero-cost hosting** on Vercel with Firebase backend
- **Real-time data fetching** with proper error handling
- **SEO optimized** with comprehensive meta tags
- **Mobile-first responsive design**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase project
- Vercel account (free)

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd our-mother-of-perpetual-help-chaplaincy
   npm install
   ```

2. **Firebase Setup**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication, Firestore, and Storage
   - Copy your Firebase configuration

3. **Environment Configuration**
   Create `.env.local` in the root directory:
   ```env
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

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Deploy to Production**
   ```bash
   npm run build
   vercel --prod
   ```

## 🔐 Admin Dashboard

### Default Admin Access
- **Email**: `chaplain@aaua.edu.ng`
- **Password**: `OurMotherOfPerpetualHelp2025!`

### Admin Roles & Permissions

#### Super Admin (Priest)
- **Full site management** including user creation and system configuration
- **Content override** for daily liturgical content
- **All association management** and member directories
- **System customization** and branding

#### Admin (Catechist/Sacristan)
- **Content management** for news, events, and announcements
- **Association member** updates and directory management
- **Prayer request** management and responses
- **Advertisement** approval and management

#### Editor (Society Representatives)
- **Limited editing** for their specific association
- **Member directory** updates for their group only
- **Event creation** for their association
- **Basic content** management

#### Moderator
- **Advertisement** review and approval
- **Content moderation** for user submissions
- **Basic event** management
- **Prayer request** oversight

### Admin Dashboard Features

#### 📊 Dashboard Overview
- **Real-time statistics** (members, events, prayer requests)
- **Recent activity** feed with user actions
- **Quick actions** for common administrative tasks
- **System health** monitoring and alerts

#### 📝 Content Management
- **Rich text editor** for creating and editing content
- **Image upload** and media library management
- **SEO optimization** tools for all pages
- **Content scheduling** and automatic publishing

#### 👥 Association Management
- **Complete member directories** with contact information
- **Executive listings** by year with role management
- **CSV import/export** for bulk member data operations
- **Historical records** and membership archives

#### 📅 Event Management
- **Event calendar** with category filtering and search
- **RSVP tracking** and attendee management
- **Recurring event** setup with flexible scheduling
- **Email notifications** for event updates and reminders

#### 📰 News & Announcements
- **Article creation** with rich text editing capabilities
- **Category management** and tagging system
- **Featured article** selection and homepage display
- **Publication scheduling** and automatic posting

#### 🙏 Prayer Request Management
- **Request review** and categorization system
- **Privacy settings** and anonymization options
- **Prayer team** assignment and response tracking
- **Urgent request** handling and notifications

## 📱 Complete Page Structure

### 🏠 Homepage
- **Dynamic liturgical hero** with daily saints and readings
- **Quick navigation** to essential parish resources
- **Upcoming events** preview with direct links
- **Latest news** highlights and announcements
- **Call-to-action** sections for engagement

### ℹ️ About Page
- **Chaplaincy history** and founding story
- **Mission and vision** statements
- **Patron saint** information (Our Mother of Perpetual Help)
- **Contact details** and office hours
- **Staff directory** and leadership team

### ⛪ Mass Schedule
- **Complete liturgical timetable** for all services
- **Special devotions** and prayer services
- **Holy day** schedules and celebrations
- **Location information** and directions

### 📅 Events
- **Filterable event calendar** with category organization
- **Detailed event** pages with full descriptions
- **RSVP functionality** for event registration
- **Event search** and date filtering

### 📰 News
- **Article listing** with search and filtering
- **Category-based** organization system
- **Featured articles** and homepage highlights
- **Newsletter signup** and subscription management

### 🤝 Associations & Societies
- **Complete directory** of all parish organizations
- **Individual pages** for each association including:
  - Mission and vision statements
  - Executive member listings with contact information
  - Activity schedules and meeting times
  - Membership requirements and application process
  - Historical information and achievements

#### Featured Associations:
- **Catholic Men Organization (CMO)** - Patron: St. Joseph
- **Catholic Women Organization (CWO)** - Patron: Blessed Virgin Mary
- **Catholic Youth Organization of Nigeria (CYON)** - Patron: St. John Bosco
- **Nigeria Federation of Catholic Students (NFCS)** - Patron: St. Thomas Aquinas
- **Legion of Mary** - Patron: Blessed Virgin Mary
- **Federation of Catholic Medical and Dental Students (FECAMDS)** - Patron: St. Luke

### 🙏 Prayers
- **Traditional Catholic prayers** with expandable sections
- **The Holy Rosary** with complete mysteries
- **Marian devotions** and special prayers
- **Daily prayer** guides and spiritual resources

### 📖 Daily Liturgy
- **Complete Mass readings** with tabbed interface
- **Saint of the day** with detailed biography
- **Liturgical calendar** information and seasons
- **Daily reflection** and meditation

### 💝 Prayer Requests
- **Secure submission** form with category selection
- **Anonymous options** for sensitive requests
- **Urgent request** handling with immediate attention
- **Prayer team** assignment and response system

### 🎁 Sacraments
- **Complete information** on all seven sacraments
- **Preparation requirements** and schedules
- **Contact information** for sacramental needs
- **Special ceremonies** and celebrations

### 💰 Donations
- **Multiple payment** options (Paystack, Flutterwave, Bank Transfer)
- **Category-based** giving with specific purposes
- **Recurring donation** setup and management
- **Transparency reporting** and fund usage

### 📞 Contact
- **Contact form** with categorized inquiries
- **Office information** and business hours
- **Emergency pastoral** care contact numbers
- **Location map** and directions

## 🛠 Customization for Other Churches

### Church Branding
Edit `/lib/config.ts` to customize for your parish:

```typescript
export const yourChurchConfig: ChurchConfig = {
  name: "Your Parish Name",
  patron: "Your Patron Saint",
  colors: {
    primary: "#YOUR_PRIMARY_COLOR",
    secondary: "#YOUR_SECONDARY_COLOR",
    accent: "#YOUR_ACCENT_COLOR",
    background: "#FFFFFF",
    text: "#1F2937"
  },
  contact: {
    address: "Your Church Address",
    phone: "Your Phone Number",
    email: "your-email@church.org"
  },
  massSchedule: {
    sunday: ["8:00 AM", "10:00 AM"],
    weekday: ["6:00 AM", "6:00 PM"],
    saturday: ["6:00 PM"]
  }
}
```

### Color Theme Templates
The website includes pre-configured themes:
- **Vatican Theme**: Gold (#FFD700) + White (#FFFFFF)
- **Our Mother of Perpetual Help**: Blue (#1E3A8A) + Red (#B91C1C)
- **Sacred Heart**: Red (#B22222) + Gold (#FFD700)
- **St. Mary's**: Navy (#191970) + Gold (#FFD700)

### Logo and Images
- Replace `/public/icons/` with your church's logo and patron saint images
- Update hero images in `/public/images/` directory
- Modify association logos and banners as needed

## 🔧 API Integration Details

### Daily Content Sources
1. **CalAPI** (inadiutorium.cz) - Saints and liturgical calendar
2. **EWTN** - Primary source for Mass readings via web scraping
3. **USCCB** - Fallback for Mass readings via web scraping
4. **Local Database** - Backup content and admin overrides

### Content Processing
- **Automatic filtering** for doctrinal accuracy
- **HTML parsing** with Cheerio for clean text extraction
- **Error handling** with graceful fallbacks
- **Caching system** for improved performance

### Notification System
- **Service Worker** registration for push notifications
- **Scheduled notifications** for daily prayers
- **Background sync** for offline functionality
- **Custom notification** actions and interactions

## 📊 Performance & SEO

### Performance Optimizations
- **Next.js ISR** for optimal loading speeds
- **Image optimization** with automatic WebP conversion
- **Font optimization** with proper fallbacks
- **Code splitting** and lazy loading
- **Service Worker** caching strategies

### SEO Features
- **Structured data** for search engines
- **Meta tags** and Open Graph optimization
- **Sitemap generation** for better indexing
- **RSS feeds** for content syndication
- **Mobile-first** responsive design

## 🔒 Security & Privacy

### Data Protection
- **Firebase Security Rules** for role-based access
- **Environment variables** for sensitive configuration
- **HTTPS encryption** through Vercel
- **Input validation** and sanitization
- **XSS protection** for user-generated content

### Privacy Compliance
- **Prayer request** confidentiality
- **Member directory** privacy controls
- **Cookie policy** and user consent
- **Data retention** policies

## 🌍 Multi-Language Support (Future)

Ready for internationalization with:
- **English** (default implementation)
- **Hooks for additional languages** (Igbo, Yoruba, French)
- **Liturgical content** in local languages
- **Cultural customization** options

## 💡 Advanced Features

### Progressive Web App
- **Offline access** to prayers and essential content
- **Home screen installation** for mobile devices
- **Push notifications** for important announcements
- **Background sync** for seamless user experience

### Live Streaming Integration (Future)
- **YouTube embed** for Mass streaming
- **Event broadcasting** capabilities
- **Recording archive** management
- **Interactive chat** during live events

### Payment Integration
- **Nigerian payment gateways** (Paystack, Flutterwave)
- **International options** (Stripe, PayPal)
- **Offline donation** information and bank details
- **Transparency reporting** and fund tracking

## 🚨 Important Notes

### API Usage and Licensing
- **NABRE translation** requires proper attribution
- **Liturgical content** should link to official sources
- **Saints' biographies** from public domain sources
- **Always provide** source attribution for content

### Free Tier Limitations
- **Vercel**: 100GB bandwidth/month (typically sufficient)
- **Firebase**: 1GB storage, 10K authentications/month
- **Monitor usage** through respective dashboards
- **Upgrade plans** available when needed

## 🤝 Support & Maintenance

### Regular Maintenance Tasks
- **Daily content** updates automatically via cron jobs
- **Security patches** applied through dependency updates
- **Feature updates** based on parish feedback
- **Backup systems** for data protection and recovery

### Technical Support
- **Comprehensive documentation** for common tasks
- **Video tutorials** for admin functions (planned)
- **Email support** for technical issues
- **Community forum** for user questions (planned)

### Monitoring and Analytics
- **Performance monitoring** with Core Web Vitals
- **Error tracking** and automatic reporting
- **Usage analytics** for content optimization
- **Security monitoring** and threat detection

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Built with ❤️ and 🙏 for the Catholic Church community.

---

## 🎯 Perfect For:

- ✅ **University Chaplaincies** (like AAUA)
- ✅ **Parish Churches** of any size
- ✅ **Mission Churches** and outposts  
- ✅ **Catholic Communities** worldwide
- ✅ **Diocesan Websites** (with customization)

**Start building your parish's digital home today!** 🏡⛪

## 📞 Getting Help

If you need assistance with setup, customization, or have questions about the website:

1. **Check the documentation** in this README and TECHNICAL_DOCUMENTATION.md
2. **Review the customization guide** in CUSTOMIZATION_GUIDE.md
3. **Contact the development team** for specific technical issues
4. **Join our community** for ongoing support and updates

This website represents the future of Catholic parish digital presence - combining traditional faith with modern technology to serve God's people better.