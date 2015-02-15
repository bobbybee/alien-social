// Player is a generic object to represent player data
// many operations are implemented here

// Player constructor takes a JSON key-value DB row for the player data
// it unpacks these properties into itself
// cool, huh?

var RoomManager = require("./RoomManager");

function Player(ws, db) {
  this.ws = ws;

  var keys = Object.keys(db);

  for(var i = 0; i < keys.length; ++i) {
    var key = keys[i];

    this[key] = db[key];
  }

  // init some ram-only fields

  this.x = 0;
  this.y = 0;

  this.room = RoomManager.getRoom(0);
  this.send(RoomManager.describe(this.room));
  RoomManager.joinRoom(this.room, this);
}

Player.prototype.send = function(msg) {
  this.ws.send(JSON.stringify(msg));
}

Player.prototype.disconnected = function() {
  RoomManager.leaveRoom(this);
}

// messages of type player are routed here

Player.prototype.handle = function(msg) {
  if(msg.subtype == "move") {
    // TODO: sanity checking
    // TODO: broadcasting new position
    this.x = msg.x || 0;
    this.y = msg.y || 0;
    this.direction = msg.direction || 0;

    console.log(this.username + " moved to ("+this.x+","+this.y+") pointing "+this.direction);
  }
}

// description methods are for transmitting publically serializable properties

Player.prototype.describe = function() {
  return {
    username: this.username,
    x: this.x,
    y: this.y,
    direction: this.direction
  };
}

module.exports = Player;
