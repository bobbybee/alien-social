(function(ext) {
  ext.queuedMessages = [];
  ext.currentMessage = null;
  ext.readyForNext = true;

  ext._shutdown = function() { // define boilerplate shutdown and status methods

  };

  ext._getStatus = function() {
    return {
      status: 2,
      msg: 'Captured by aliens'
    }
  }

  // connect to Alien Social server at a given host and port

  ext.connect = function(host, port) {
    if(!ext.connected) {
      ext.socket = new WebSocket("ws://"+host+":"+port);

      ext.socket.onopen = function() {
        ext.connected = true;
      }

      ext.socket.onmessage = function(msg) {
        msg = JSON.parse(msg.data);
        ext.queuedMessages.push(msg);
      }

      ext.socket.onclose = function() {
        ext.connected = false;
      }
    }

  }

  ext.isConnected = function() {
    return !!ext.connected; // double inversion causes an undefined value to return false
  }

  // message senders blindly send messages
  // validate beforehand, please :)

  ext.auth = function(username, password) {
    ext.socket.send(JSON.stringify({
      type: "auth",
      username: username,
      password: password
    }))
  }

  ext.moveToXYD = function(x, y, d) {
    ext.socket.send(JSON.stringify({
      type: "player",
      subtype: "move",
      x: x,
      y: y,
      direction: d
    }));
  }

  // message hat block is a confusing beast..
  ext.when_message = function() {
    // there needs to be both a queued message and the ready for next flag
    // to trigger the hat block

    if(ext.queuedMessages.length && ext.readyForNext) {
      ext.currentMessage = ext.queuedMessages[0];
      ext.readyForNext = false; // stop hat block until Scratch is ready for the next message
      return true;
    }

    return false;
  }

  // once in the message hat, there is a queued message
  // getMessageKey lets us access its JSON values

  ext.getMessageKey = function(key) {
    return ext.currentMessage[key];
  }

  ext.arrayLengthOfKey = function(key) {
    return ext.currentMessage[key].length;
  }

  ext.keyOfArrayOfMessage = function(key, index, messageKey) {
    return ext.currentMessage[messageKey][index][key];
  }

  // Scratch has a funny implementation of hat blocks
  // for my sanity, we'll require the end of the hat to have a nextMessage call to continue processing messages

  ext.nextMessage = function() {
    ext.readyForNext = true;
    if(ext.queuedMessages.length) ext.queuedMessages.splice(0, 1);
  }

  // register the extension
  // descriptor is embedded within the function call

  ScratchExtensions.register("Alien Social",
  {
    blocks: [
      [" ", "connect to server %s : %n", "connect", "127.0.0.1", 666],
      ["b", "connected?", "isConnected"],

      ["-"],

      [" ", "authenticate using username %s and password %s", "auth", "foo", "bar"],
      [" ", "move to X: %n Y: %n Direction: %n", "moveToXYD", 50, 50, 90],

      ["-"],

      ["h", "when message received", "when_message"],
      ["r", "message key %s", "getMessageKey", "type"],
      ["r", "array length of message key %s", "arrayLengthOfKey", "users"],
      ["r", "key %s of array element %n of message key %s", "keyOfArrayOfMessage", "username", 0, "users"],
      [" ", "done processing message", "nextMessage"],
    ]
  }, ext);
})({});
