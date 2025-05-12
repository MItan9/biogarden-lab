import { useEffect, useState } from "react";

export default function NotificationManager() {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    // Request notification permission on component mount
    if ('Notification' in window && permission !== 'granted') {
      Notification.requestPermission().then((perm) => {
        setPermission(perm);
        console.log(`🔔 Notification permission: ${perm}`);
      });
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log("✅ Service Worker registered"))
        .catch(err => console.error("❌ Service Worker registration failed:", err));
    }
  }, []);

  const sendNotification = () => {
    if (permission !== 'granted') {
      alert('Notifications are not allowed');
      return;
    }

    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification('Water your plants!', {
        body: 'Time to water your ficus 🌿',
        icon: '/logo192.png',
        badge: '/favicon.ico',
      });
    });
  };

  return (
    <div style={{ padding: "1rem" }}>
     
    </div>
  );
}
