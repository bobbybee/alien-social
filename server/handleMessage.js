var AuthenticationManager = require("./AuthenticationManager");

module.exports = function(ws, msg) {
  console.log("Received message " + msg);

  if(msg.type == "auth") {
    if(!ws.player) {
      ws.player = AuthenticationManager(msg.username, msg.password);

      if(ws.player) {
        console.log("Login success");
        // TODO: alert client of success
      } else {
        console.log("Login fail");
        // TODO: alert client of failure
      }
    } else {
      console.log("Already logged in");
      // TODO: kick client
    }
  } else {
    console.warn("Unknown message type " + msg.type);
  }
}
