module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545, // Must match your Ganache GUI port
      network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.8.19", // Change this based on your Solidity version
    },
  },
};
