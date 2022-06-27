
importScripts(
  'https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/7.20.0/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyDIYM65D5DNLNsOSUToov_JcJEh6AupUlg","authDomain":"ac-mod-repo.firebaseapp.com","projectId":"ac-mod-repo","storageBucket":"ac-mod-repo.appspot.com","messagingSenderId":"315180351715","appId":"1:315180351715:web:d5bef233ddee49100b05d6","measurementId":"G-KFQQFD5MJW"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// Setup event listeners for actions provided in the config:
self.addEventListener('notificationclick', function(e) {
  const actions = [{"action":"car_updated","url":"\u002Flogs"},{"action":"car_added","url":"\u002Flogs"},{"action":"track_updated","url":"\u002Flogs"},{"action":"track_added","url":"\u002Flogs"}]
  const action = actions.find(x => x.id === e.action.action)
  const notification = e.notification

  if (!action) return

  if (action.url) {
    clients.openWindow(action.url)
    notification.close()
  }
})
