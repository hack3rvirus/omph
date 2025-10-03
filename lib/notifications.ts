// Catholic Prayer Notifications System
export interface PrayerNotification {
  id: string
  title: string
  body: string
  time: string // HH:MM format
  icon: string
  badge: string
  tag: string
  requiresPermission: boolean
}

export const DAILY_PRAYER_NOTIFICATIONS: PrayerNotification[] = [
  {
    id: 'angelus-morning',
    title: 'The Angelus',
    body: 'The Angel of the Lord declared unto Mary... Join us in praying the Angelus.',
    time: '06:00',
    icon: '/icons/angelus-icon.png',
    badge: '/icons/badge-72x72.png',
    tag: 'angelus-morning',
    requiresPermission: true
  },
  {
    id: 'angelus-noon',
    title: 'The Angelus',
    body: 'And she conceived of the Holy Spirit... Time for the midday Angelus.',
    time: '12:00',
    icon: '/icons/angelus-icon.png',
    badge: '/icons/badge-72x72.png',
    tag: 'angelus-noon',
    requiresPermission: true
  },
  {
    id: 'divine-mercy',
    title: 'Divine Mercy Chaplet',
    body: 'Jesus, I trust in You. Join us in praying the Divine Mercy Chaplet at 3 PM.',
    time: '15:00',
    icon: '/icons/divine-mercy-icon.png',
    badge: '/icons/badge-72x72.png',
    tag: 'divine-mercy',
    requiresPermission: true
  },
  {
    id: 'angelus-evening',
    title: 'The Angelus',
    body: 'And the Word was made Flesh... Evening Angelus prayer time.',
    time: '18:00',
    icon: '/icons/angelus-icon.png',
    badge: '/icons/badge-72x72.png',
    tag: 'angelus-evening',
    requiresPermission: true
  },
  {
    id: 'evening-prayer',
    title: 'Evening Prayer',
    body: 'As the day ends, let us give thanks to God. Time for evening prayers.',
    time: '19:00',
    icon: '/icons/evening-prayer-icon.png',
    badge: '/icons/badge-72x72.png',
    tag: 'evening-prayer',
    requiresPermission: true
  }
]

export class CatholicNotificationService {
  private static instance: CatholicNotificationService
  private registration: ServiceWorkerRegistration | null = null
  private permission: NotificationPermission = 'default'

  private constructor() {
    if (typeof window !== 'undefined') {
      this.permission = Notification.permission
    }
  }

  public static getInstance(): CatholicNotificationService {
    if (!CatholicNotificationService.instance) {
      CatholicNotificationService.instance = new CatholicNotificationService()
    }
    return CatholicNotificationService.instance
  }

  async initialize(): Promise<boolean> {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return false
    }

    try {
      // Register service worker
      this.registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered successfully')

      // Request notification permission
      await this.requestPermission()

      // Schedule daily notifications
      if (this.permission === 'granted') {
        this.scheduleDailyNotifications()
        return true
      }

      return false
    } catch (error) {
      console.error('Failed to initialize notification service:', error)
      return false
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'denied'
    }

    if (this.permission === 'default') {
      this.permission = await Notification.requestPermission()
    }

    return this.permission
  }

  private scheduleDailyNotifications(): void {
    DAILY_PRAYER_NOTIFICATIONS.forEach(notification => {
      this.scheduleNotification(notification)
    })
  }

  private scheduleNotification(notification: PrayerNotification): void {
    const now = new Date()
    const [hours, minutes] = notification.time.split(':').map(Number)
    
    const scheduledTime = new Date()
    scheduledTime.setHours(hours, minutes, 0, 0)

    // If the time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1)
    }

    const timeUntilNotification = scheduledTime.getTime() - now.getTime()

    setTimeout(() => {
      this.showNotification(notification)
      // Schedule for next day
      setInterval(() => {
        this.showNotification(notification)
      }, 24 * 60 * 60 * 1000) // 24 hours
    }, timeUntilNotification)
  }

  private async showNotification(notification: PrayerNotification): Promise<void> {
    if (this.permission !== 'granted' || !this.registration) {
      return
    }

    try {
      await this.registration.showNotification(notification.title, {
        body: notification.body,
        icon: notification.icon,
        badge: notification.badge,
        tag: notification.tag,
        requireInteraction: false,
        silent: false,
        vibrate: [200, 100, 200],
        actions: [
          {
            action: 'pray',
            title: 'Pray Now',
            icon: '/icons/pray-action.png'
          },
          {
            action: 'dismiss',
            title: 'Dismiss',
            icon: '/icons/dismiss-action.png'
          }
        ],
        data: {
          url: '/prayers',
          prayerType: notification.tag
        }
      })
    } catch (error) {
      console.error('Failed to show notification:', error)
    }
  }

  async showMassReminder(massTime: string, massType: string = 'Holy Mass'): Promise<void> {
    if (this.permission !== 'granted' || !this.registration) {
      return
    }

    await this.registration.showNotification('Mass Reminder', {
      body: `${massType} begins in 30 minutes at ${massTime}. Don't forget to join us!`,
      icon: '/icons/mass-reminder-icon.png',
      badge: '/icons/badge-72x72.png',
      tag: 'mass-reminder',
      requireInteraction: true,
      actions: [
        {
          action: 'view-schedule',
          title: 'View Schedule',
          icon: '/icons/schedule-action.png'
        }
      ],
      data: {
        url: '/mass-schedule'
      }
    })
  }

  async showEventReminder(eventTitle: string, eventTime: string): Promise<void> {
    if (this.permission !== 'granted' || !this.registration) {
      return
    }

    await this.registration.showNotification('Event Reminder', {
      body: `${eventTitle} starts at ${eventTime}. We look forward to seeing you!`,
      icon: '/icons/event-reminder-icon.png',
      badge: '/icons/badge-72x72.png',
      tag: 'event-reminder',
      requireInteraction: true,
      actions: [
        {
          action: 'view-events',
          title: 'View Events',
          icon: '/icons/events-action.png'
        }
      ],
      data: {
        url: '/events'
      }
    })
  }

  async showDailyReadingNotification(): Promise<void> {
    if (this.permission !== 'granted' || !this.registration) {
      return
    }

    await this.registration.showNotification('Daily Readings Available', {
      body: 'Today\'s Mass readings and saint of the day are now available.',
      icon: '/icons/readings-icon.png',
      badge: '/icons/badge-72x72.png',
      tag: 'daily-readings',
      requireInteraction: false,
      actions: [
        {
          action: 'read-now',
          title: 'Read Now',
          icon: '/icons/read-action.png'
        }
      ],
      data: {
        url: '/daily-liturgy'
      }
    })
  }
}

// Initialize notification service
export const notificationService = CatholicNotificationService.getInstance()