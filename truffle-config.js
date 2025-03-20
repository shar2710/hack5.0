module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Ganache GUI Host
      port: 7545,        // Ganache GUI Port
      network_id: "5777" // Ganache GUI Network ID
    },
  },
  compilers: {
    solc: {
      version: "0.8.19", // or another 0.8.x version
      // No IR pipeline, no optimizer
      // settings: { ... } // Leave this out entirely for now
    },
  },
};
