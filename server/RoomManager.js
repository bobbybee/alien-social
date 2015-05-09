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
  module.exports.sendRoomMessage(room, {
      type: "room",
      users: [
        player.describe()
      ]
  });

  room.users.push(player);
}

module.exports.leaveRoom = function(player) {
  player.room.users.splice(player.room.users.indexOf(player), 1);
}

module.exports.sendRoomMessage = function(room, msg) {
  try {
    msg = JSON.stringify(msg);

    for(var i = 0; i < room.users.length; ++i) {
      room.users[i].ws.send(msg);
    }
  } catch(e) {
    console.error(e);
  }
}

module.exports.describe = function(room) {
  var message = {
    type: 'room',
    users: []
  };

  for(var i = 0; i < room.users.length; ++i) {
    message.users.push(room.users[i].describe());
  }

  return message;
}
