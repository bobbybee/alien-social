// Player is a generic object to represent player data
// many operations are implemented here

// Player constructor takes a JSON key-value DB row for the player data
// it unpacks these properties into itself
// cool, huh?

function Player(db) {
  for(var key in Object.keys(db)) {
    this[key] = db[key];
  }
}

module.exports = Player;
