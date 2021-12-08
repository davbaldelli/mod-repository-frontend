
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging-compat.js'
)
firebase.initializeApp({"apiKey":"AIzaSyDIYM65D5DNLNsOSUToov_JcJEh6AupUlg","authDomain":"ac-mod-repo.firebaseapp.com","projectId":"ac-mod-repo","storageBucket":"ac-mod-repo.appspot.com","messagingSenderId":"315180351715","appId":"1:315180351715:web:d5bef233ddee49100b05d6","measurementId":"${config.measurementId}"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// Setup event listeners for actions provided in the config:
self.addEventListener('notificationclick', function(e) {
  const actions = [{"action":"car_updated","url":"\u002Flogs"},{"action":"car_added","url":"\u002Flogs"}]
  const action = actions.find(x => x.action === e.action)
  const notification = e.notification

  if (!action) return

  if (action.url) {
    clients.openWindow(action.url)
    notification.close()
  }
})

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
