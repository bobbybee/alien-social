var ws = require('ws').Server;
var wss = new ws({
  port: 666
});

wss.on('connection', function(ws) {
  console.log("Incoming connection");

  ws.on('message', function(msg) {
    try {
      msg = JSON.parse(msg);
      console.log(msg);
    } catch(e) {
      console.log(e);
    }
  });

  ws.on('close', function() {
    console.log("Bye!");
  })
});
