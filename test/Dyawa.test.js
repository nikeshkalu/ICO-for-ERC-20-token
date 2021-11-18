const Dyawa = artifacts.require("Dyawa");
const ICO = artifacts.require("ICO");

//For COntract DYawa
contract("Dyawa", accounts => {

    before(async()=>{
        dyawa = await Dyawa.deployed()
    })


    it("Deployer must have 9000000",async()=>{
   

        let balance = web3.utils.fromWei(await dyawa.balanceOf(accounts[0]),'ether')
        // console.log(balance)

        assert.equal(
            balance,
            '9000000',
            "10000000 wasn't in the deployer account"
            )
    })

    // it("Correct Deployer Address",async()=>{
    //     assert.equal(
    //         accounts[0],
    //         '0x90f0954392478bAC12d6c375cc5B2FADA069a131',
    //         'Address doesnot match with deployer address'
    //     )
    // })




});


function tokens(n) {
    return web3.utils.toWei(n, 'ether');
  }

//For contract ICO
contract("ICO",([deployer,investor])=>{

    let token, ico

    before(async()=>{
        token = await Dyawa.new(10000000);
        ico = await ICO.new(token.address);

        // Transfer 10% tokens to EthSwap (1 million)
        await token.transfer(ico.address, tokens('1000000'))
    })

    describe('buyTokens()',async()=>{
        let result; 
    
        before(async () => {
          result = await ico.buyTokens({from: investor, value:web3.utils.toWei('2', 'ether')})
          // console.log(await web3.eth.getBalance(ethSwap.address))
          // console.log(await web3.eth.getBalance(investor))
          
      })
        it('Allow user to buy token for a fixed price',async()=>{
          //checking investor balance after purchase
          
          let investorBalance = await token.balanceOf(investor)
          console.log(investorBalance.toString())
          assert.equal(investorBalance.toString(),tokens('20'))
    
          //checking ICO balance after purchase
          let icoBalance = await token.balanceOf(ico.address)
          assert.equal(icoBalance.toString(),tokens('999980'))//1000000-100
    
          //check for ether in ICO account
          icoBalance = await web3.eth.getBalance(ico.address)
          assert.equal(icoBalance.toString(),web3.utils.toWei('0', 'ether'))
    
    
          // console.log(result.logs)
         
    
    
          const event = result.logs[0].args
          assert.equal(event.account, investor)
          assert.equal(event.token, token.address)
          assert.equal(event.amount.toString(), tokens('20').toString())
          assert.equal(event.rate.toString(), '10')
     
    
        })
      })
    

  
   


})
