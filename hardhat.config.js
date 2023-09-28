require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const Private_Key = "fa27394e98fadce31d62e0ef49adad668abd76abbd953d46f1b2c7f1d23d6e62"
module.exports = {
  solidity: "0.8.19",

  networks: {
    matic: {
      url: `https://polygon-mumbai.infura.io/v3/2d1b1045fecd4885be926e261d15644f`,
      accounts: [`0x${Private_Key}`],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: "2MTPM72IFXXRE9UZ7X6Y56BVD2W6BRY2IK",
    },
  },
};
