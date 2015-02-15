// Player is a generic object to represent player data
// many operations are implemented here

// Player constructor takes a JSON key-value DB row for the player data
// it unpacks these properties into itself
// cool, huh?

function Player(ws, db) {
  this.ws = ws;

  for(var key in Object.keys(db)) {
    this[key] = db[key];
  }

  // init some ram-only fields

  this.x = 0;
  this.y = 0;
}

Player.prototype.send = function(msg) {
  this.ws.send(JSON.stringify(msg));
}

// messages of type player are routed here

Player.prototype.handle = function(msg) {
  if(msg.subtype == "move") {
    // TODO: sanity checking
    // TODO: broadcasting new position
    this.x = msg.x || 0;
    this.y = msg.y || 0;
  }
}

module.exports = Player;
