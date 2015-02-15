(function(ext) {
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
        msg = JSON.parse(msg);
        console.log(msg);
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

  // register the extension
  // descriptor is embedded within the function call

  ScratchExtensions.register("Alien Social",
  {
    blocks: [
      [" ", "connect to server %s : %n", "connect", "127.0.0.1", 666],
      ["b", "connected?", "isConnected"],

      ["-"],

      [" ", "authenticate using username %s and password %s", "auth", "foo", "bar"],
    ]
  }, ext);
})({});
