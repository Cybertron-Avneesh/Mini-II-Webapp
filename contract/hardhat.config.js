require("@nomiclabs/hardhat-waffle");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 const ALCHEMY_API_KEY = "ZCGXjmxx52-xsJId_1_YDrgzUhYFlFxH";

 // Replace this private key with your Ropsten account private key
 // To export your private key from Metamask, open Metamask and
 // go to Account Details > Export Private Key
 // Be aware of NEVER putting real Ether into testing accounts
 const ROPSTEN_PRIVATE_KEY = "ROPSTEN_PRIVATE KEY";

module.exports = {
  solidity: "0.8.11",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/ZCGXjmxx52-xsJId_1_YDrgzUhYFlFxH`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
