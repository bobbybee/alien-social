var rooms = [];

module.exports.addRoom = function(name) {
  rooms.push({
    name: name,
    id: rooms.length,
    users: []
  });
}

module.exports.getRoom = function(id) {
  return rooms[id];
}

module.exports.joinRoom = function(room, player) {
  room.users.push(player);
  
  return room.users.length - 1;
}

module.exports.sendRoomMessage = function(room, msg) {
  try {
    msg = JSON.stringify(msg);

    for(var i = 0; i < room.users.length; ++i) {
      room.users[i].send(msg);
    }
  } catch(e) {
    console.error(e);
  }
}
