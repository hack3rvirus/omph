// Catholic Church Service Worker
const CACHE_NAME = 'omph-chaplaincy-v1'
const STATIC_CACHE_URLS = [
  '/',
  '/about',
  '/mass-schedule',
  '/prayers',
  '/daily-liturgy',
  '/associations',
  '/events',
  '/news',
  '/contact',
  '/offline',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_CACHE_URLS))
      .then(() => self.skipWaiting())
  )
})

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
      })
      .catch(() => {
        // If both cache and network fail, show offline page
        if (event.request.destination === 'document') {
          return caches.match('/offline')
        }
      })
  )
})

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const action = event.action
  const data = event.notification.data

  if (action === 'pray') {
    event.waitUntil(
      clients.openWindow('/prayers')
    )
  } else if (action === 'view-schedule') {
    event.waitUntil(
      clients.openWindow('/mass-schedule')
    )
  } else if (action === 'view-events') {
    event.waitUntil(
      clients.openWindow('/events')
    )
  } else if (action === 'read-now') {
    event.waitUntil(
      clients.openWindow('/daily-liturgy')
    )
  } else if (data && data.url) {
    event.waitUntil(
      clients.openWindow(data.url)
    )
  } else {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Background sync for prayer requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'prayer-request-sync') {
    event.waitUntil(syncPrayerRequests())
  }
})

async function syncPrayerRequests() {
  // Sync offline prayer requests when connection is restored
  const cache = await caches.open('prayer-requests-cache')
  const requests = await cache.keys()
  
  for (const request of requests) {
    try {
      await fetch(request)
      await cache.delete(request)
    } catch (error) {
      console.error('Failed to sync prayer request:', error)
    }
  }
}

// Push event for server notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon || '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        tag: data.tag,
        data: data.data
      })
    )
  }
})