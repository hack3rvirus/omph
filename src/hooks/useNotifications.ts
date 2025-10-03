import { useEffect, useState } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { app } from '../lib/firebase';

const messaging = getMessaging(app);

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Request permission
    if ('Notification' in window) {
      Notification.requestPermission().then((perm) => {
        setPermission(perm);
        if (perm === 'granted') {
          // Get FCM token
          getToken(messaging, { vapidKey: 'your-vapid-key' }).then((currentToken) => {
            if (currentToken) {
              setToken(currentToken);
              console.log('FCM token:', currentToken);
            } else {
              console.log('No registration token available.');
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
          });
        }
      });
    }

    // Handle foreground messages
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      new Notification(payload.notification?.title || 'Notification', {
        body: payload.notification?.body,
        icon: '/logo192.png'
      });
    });
  }, []);

  return { permission, token };
};
