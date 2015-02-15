// AuthenticationManager takes a username and password pair
// and returns either a player object if the auth was successfull
// or null if it fails
// TODO: error codes

var Player = require("./Player");

module.exports = function(ws, username, password) {
  // TODO: hook up DB
  // for now, we just authenticate all requests blindly
  // random ID until we have a DB.. cross your fingers we won't have a collision haha

  return new Player(ws, {
    username: username,
    id: (Math.floor(Math.random() * 100000000))
  });
}
