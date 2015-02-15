var AuthenticationManager = require("./AuthenticationManager");

module.exports = function(ws, msg) {
  console.log("Received message " + msg);

  if(msg.type == "auth") {
    if(!ws.player) {
      ws.player = AuthenticationManager(ws, msg.username, msg.password);

      if(ws.player) {
        console.log(msg.username + " successfully logged in");

        ws.send(JSON.stringify({
          type: "auth",
          status: 0
        }));
      } else {
        console.log(msg.username + " failed to login");

        ws.send(JSON.stringify({
          type: "auth",
          status: -1
        }));
      }
    } else {
      console.log("Already logged in");
      // TODO: kick client
    }
  } else if(msg.type == "player") {
    if(ws.player) {
      ws.player.handle(msg);
    } else {
      console.log("Not logged in");
    }
  } else {
    console.warn("Unknown message type " + msg.type);
  }
}
