// Modules
const http = require('http')
const push = require('./push')

// Create HTTP Server
http.createServer( (request, response) => {

  // Enable CORS
  response.setHeader('Access-Control-Allow-Origin', '*')

  // Get request vars
  const { url, method } = request

  // Subscribe
  if ( method === 'POST' && url.match(/^\/subscribe\/?/) ) {

    // Get POST Body
    let body = []

    // Read body stream
    request.on( 'data', chunk => body.push(chunk) ).on( 'end', () => {

      response.end('Subscribed')
    })

  // Public Key
  } else if ( url.match(/^\/key\/?/) ) {

    // Respond with public key from push module
    response.end( push.getKey() )

  // Push Notification
  } else if ( method === 'POST' && url.match(/^\/push\/?/) ) {

    // Get POST Body
    let body = []

    // Read body stream
    request.on( 'data', chunk => body.push(chunk) ).on( 'end', () => {

      response.end('Push Sent')
    })
  // Not Found
} else {

  response.status = 404
  response.end('Error: Unknown Request')
}

// Start the Server
}).listen( 3333, () => { console.log('Server Running') })
