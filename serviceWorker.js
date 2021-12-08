self.addEventListener('push', function (e) {
  let data = e.data.json()
  console.log(data)
  const options = {
    title: data.notification.title,
    body: data.notification.body,
    icon: data.notification.icon,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
  }
})
