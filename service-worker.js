// Событие установки (необязательно, но можно для логов)
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Установлен');
    self.skipWaiting(); // активируем сразу, без ожидания
  });
  
  // Событие активации
  self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Активирован');
  });
  
  // Слушаем push-событие (сюда приходит уведомление)
  self.addEventListener('push', (event) => {
    console.log('[ServiceWorker] Push получен');
    
    const data = event.data ? event.data.text() : 'Напоминание от BioGarden!';
    
    const options = {
      body: data,
      icon: '/logo192.png',  // путь к иконке уведомления
      badge: '/favicon.ico', // маленькая иконка
    };
  
    event.waitUntil(
      self.registration.showNotification('BioGarden 🌱', options)
    );
  });
  
  // (Необязательно) обработка клика по уведомлению
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('/') // открывает сайт при клике на уведомление
    );
  });
  