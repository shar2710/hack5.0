module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,  // Change to 9545 if using Hardhat
      network_id: "*", 
    },
  },
  compilers: {
    solc: {
      version: "0.8.19",  // Match your Solidity version
    },
  },
};
