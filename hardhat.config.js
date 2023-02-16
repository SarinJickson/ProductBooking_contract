require("@nomicfoundation/hardhat-toolbox");
require ('dotenv').config();
/* @type import('hardhat/config').HardhatUserConfig */
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY ? process.env.ETHERSCAN_API_KEY: ''
const PRIVATE_KEY= process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY: ''
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL


module.exports = {
  
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 180,
      },
    },
  },
  networks: {
    development: {
      url: "http://127.0.0.1:7545",
      port:7545,
      network_id: "*",
      gas: 6721975,
    },
    hardhat: {
      chainId: 31337
    },
    goerli:{

      url:GOERLI_RPC_URL,
      accounts:[PRIVATE_KEY]
    }
  
},
etherscan: {
  apiKey: ETHERSCAN_API_KEY,
}
}
