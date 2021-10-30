const Dyawa = artifacts.require('Dyawa')

module.exports = function (deployer) {
    deployer.deploy(Dyawa,10000000);
  };