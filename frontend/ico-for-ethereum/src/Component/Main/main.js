import Token from '../../build/contracts/Dyawa.json'
import ICO from '../../build/contracts/ICO.json'
import BuyToken from '../BuyToken/buyToken'
import Web3 from 'web3'
import React,{Component} from 'react'

class Main extends Component{

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
      }

    async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Install metamask in the browser')
        }
      } 


  
    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        const ethBalance = await web3.eth.getBalance(accounts[0])
    
        // console.log(accounts[0])
        this.setState({
          accounts : accounts[0],
          ethBalance 
        })
    
         // Load Dyawa
      // const networkId = await web3.eth.net.getId()
      // console.log(networkId)
      // console.log(Token)
      // const tokenData = Token.networks[networkId]
      // console.log(tokenData)
      if(Token) {
    
        const token = new web3.eth.Contract(Token.abi,'0x23ed09a4b8d9331558585bfb689d2b59088175a5')
        // console.log(tokenData.address)
        this.setState({ token })
    
        let tokenBalance = await token.methods.balanceOf(this.state.accounts).call()
    
        if(tokenBalance==null){
          tokenBalance = 0
        }
        this.setState({ tokenBalance: tokenBalance.toString() })
      } 
      else {
        window.alert('Dyawa contract not deployed to detected network.')
      }
    
      //Load ICO
      // const ICOData= ICO.networks[networkId]
      if( ICO) {
    
        const ico = new web3.eth.Contract(ICO.abi,'0x2fAf141C9714484DDFBE3b21ea1d295671B00340')
        
        this.setState({ ico })
    
    
      } 
      else {
        window.alert('ICO contract not deployed to detected network.')
      }
    
 }

    buyTokens = (etherAmount) =>{
        this.setState({ loading: true })
        console.log('xax')
        console.log(this.state.ico.methods.buyTokens())
        console.log(this.state.tokenBalance)

        this.state.ico.methods.buyTokens().send({value:etherAmount,from:this.state.accounts}).on('transactionHash',(hash)=>{

        setTimeout(function(){   
        alert('Successfully Bought Token')
        window.location.reload(false)
        }, 10000);

        this.setState({
        loading: false
        }) 

        
    
        })
        // console.log('Balnce of ico')
        // console.log(this.state.ico.methods.getTokenAmount())

        // console.log(this.state.ico.methods.getBalance())


        
    }

    constructor(props) {
        super(props);
        this.state = { 
          accounts : '',
          token:{},
          ico:{},
          ethBalance : '0',
          tokenBalance: '0',
          loading: false
        };
        
      }
      
      

 render(){
    let content

    if(this.state.loading){
        content = <p id="loader" className="text-center"><br/><br/><br/><br/><br/>Loading...</p>
    }
    else{
        content = <BuyToken
                         ethBalance={this.state.ethBalance}
                         tokenBalance={this.state.tokenBalance}
                         buyTokens={this.buyTokens}
                         />
    }
    
        return(
            <div>
               {content}

               {/* {this.getBalance()} */}
               {/* {this.getTokenAmount()} */}
            </div>
        )
}


 }

export default Main