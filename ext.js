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
    alert(host+":"+port); // TODO: connect to server
  }

  // register the extension
  // descriptor is embedded within the function call

  ScratchExtensions.register("Alien Social",
  {
    blocks: [
      [" ", "connect to server %s : %n", "connect", "127.0.0.1", 666],
    ]
  }, ext);
})({});
