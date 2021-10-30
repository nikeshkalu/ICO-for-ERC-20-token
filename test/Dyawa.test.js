const Dyawa = artifacts.require("Dyawa");

contract("Dyawa", accounts => {

    before(async()=>{
        dyawa = await Dyawa.deployed()
    })


    it("Deployer must have 10000000",async()=>{
   

        let balance = web3.utils.fromWei(await dyawa.balanceOf(accounts[0]),'ether')
        // console.log(balance)

        assert.equal(
            balance,
            '10000000',
            "10000000 wasn't in the deployer account"
            )
    })

    it("Correct Deployer Address",async()=>{
        assert.equal(
            accounts[0],
            '0x90f0954392478bAC12d6c375cc5B2FADA069a131',
            'Address doesnot match with deployer address'
        )
    })




});
