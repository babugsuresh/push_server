
// Service Worker Registration
let swReg

// Push Server url
const serverUrl = 'http://localhost:3333'

// Update UI for subscribed status
const setSubscribedStatus = (state) => {

  if (state) {
    document.getElementById('subscribe').className = 'hidden'
    document.getElementById('unsubscribe').className = ''
  } else {
    document.getElementById('subscribe').className = ''
    document.getElementById('unsubscribe').className = 'hidden'
  }
}

// Register Service Worker
navigator.serviceWorker.register('sw.js').then( registration => {

  // Reference registration globally
  swReg = registration

  // Check if a subscription exists, and if so, update the UI
  swReg.pushManager.getSubscription().then( setSubscribedStatus )

// Log errors
}).catch(console.error)


// Get public key
const getApplicationServerKey = () => {

  // Fetch from server
  return fetch(`${serverUrl}/key`)

    // Parse response body as arrayBuffer
    .then( res => res.arrayBuffer() )

    // Return arrayBuffer as new UInt8Array
    .then( key => new Uint8Array(key) )
}

// Subscribe for push notifications
const subscribe = () => {

  // Check registration is available
  if ( !swReg ) return console.error('Service Worker Registration Not Found')

  // Get applicationServerKey from push server
  getApplicationServerKey().then( key => {

    // swReg.pushManager.subscribe( {userVisibleOnly: true, applicationServerKey: publicKey} )
  })
}
