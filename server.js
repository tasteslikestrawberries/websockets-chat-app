const express = require('express');
const http = require('http');
const WebSocket = require('ws')

const port = 6161;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) { //listen for a connection on the newly initialised WebSocket 
    ws.on('message', function incoming(data) { 
        //listen for a message from the client
        //function incoming gives us data which is the users' messages from the fron-end
      wss.clients.forEach(function each(client) { 
          //broadcasting the message to each client (apart from the sending client)
          //running forEach loop over each connected client
        if (client !== ws && client.readyState === WebSocket.OPEN) { 
            //using if statement to make sure that the client is connected and the socket is open
            //an important aspect of this if statement is that we are also checking that we are not sending the message back to the client who sent the message!
          client.send(data); //if statement comes back as true, we broadcast the message
        }
    })
})
})

server.listen(port, function() { //listen on port set above
    console.log(`Server is listening on ${port}!`)
  })