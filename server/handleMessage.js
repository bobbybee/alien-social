module.exports = function(ws, msg) {
  console.log("Received message " + msg);

  if(msg.type == "auth") {
    console.log("Authentication request using credentials " + msg.username + " " + msg.password);
  } else {
    console.warn("Unknown message type " + msg.type);
  }
}
