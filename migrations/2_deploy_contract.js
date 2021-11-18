const Dyawa = artifacts.require('Dyawa')
const ICO = artifacts.require('ICO')

module.exports = async function (deployer) {
    await deployer.deploy(Dyawa,10000000);
    const token = await Dyawa.deployed()

  // Deploy ICO
  await deployer.deploy(ICO,token.address)
  const ico = await ICO.deployed()

  // Transfer 10% tokens to ICO (1 million)
  await token.transfer(ico.address, '1000000000000000000000000')
  };

