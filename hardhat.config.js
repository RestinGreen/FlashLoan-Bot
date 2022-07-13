require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000
      }
    }
  },
  networks: {
    polygonMainnet: {
      url: 'http://127.0.0.1:8545',
      accounts: [process.env.WALLET_PRIVATE_KEY]
    },
    test: {
      url: 'http://127.0.0.1:8888',
      accounts: [process.env.WALLET_PRIVATE_KEY]
    },
    hardhat: {

      forking: {
        url: "https://polygon-mainnet.g.alchemy.com/v2/kLQlGBCvwKLhyFtlglA117qDFHjxURUD"
      },
      mining: {
        auto: false,
        interval: 10000
      },
      
    }
  },
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts"
  },
  gasReporter: {
    enabled: true,
    // token: 'MATIC',
    currency: "USD",
    gasPrice: 500,
    // gasPriceApi: 'https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice'
  },
  etherscan: {
    apiKey: {
      polygon: 'YB6QMVU7GJTPATJ9RZ5X4XH9S8I81GWV85'
    }
  }
};