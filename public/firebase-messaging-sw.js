// Firebase Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Initialize Firebase
firebase.initializeApp({
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Schedule notifications for Angelus, Divine Mercy, etc.
const scheduleNotifications = () => {
  const now = new Date();
  const nigeriaTime = new Date(now.getTime() + (1 * 60 * 60 * 1000)); // UTC+1
  const currentHour = nigeriaTime.getHours();
  const currentMinute = nigeriaTime.getMinutes();

  // Angelus at 6am, 12pm, 6pm
  const angelusTimes = [6, 12, 18];
  if (angelusTimes.includes(currentHour) && currentMinute === 0) {
    self.registration.showNotification('Angelus', {
      body: 'It is time for the Angelus prayer.',
      icon: '/logo192.png'
    });
  }

  // Divine Mercy at 3pm
  if (currentHour === 15 && currentMinute === 0) {
    self.registration.showNotification('Divine Mercy', {
      body: 'It is time for the Divine Mercy Chaplet.',
      icon: '/logo192.png'
    });
  }

  // Check every minute
  setTimeout(scheduleNotifications, 60000);
};

// Start scheduling
scheduleNotifications();
