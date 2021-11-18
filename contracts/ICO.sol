// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Dyawa.sol";

contract ICO {
    string public name = "ICO";

    Dyawa public token;

	uint public rate = 10;


	  constructor(Dyawa _token){
	    token = _token;
		}


  event TokensPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  //  event TokensSold(
  //   address account,
  //   address token,
  //   uint amount,
  //   uint rate
  // );

  // ...
address payable EthReceiver = payable(0x3754905761a53f183897160b4F8307a3cac7D57d);

  function buyTokens() public payable {
    // Calculate the number of tokens to buy
  
    uint tokenAmount = msg.value * rate;

    // Require that ICO has enough tokens
    require(token.balanceOf(address(this)) >= tokenAmount);

    // Transfer tokens to the user
    token.transfer(msg.sender, tokenAmount); 
    // msg.sender.transfer(msg.value);
    
     EthReceiver.transfer(msg.value);
     
  
    // Emit an event
    emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
  }

  

  function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
  function getTokenAmount() public view returns (uint) {
        return token.balanceOf(address(this));
    }


	
}
