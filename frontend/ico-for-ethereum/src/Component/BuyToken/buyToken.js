import React, { Component } from 'react'

class BuyToken extends Component {
	constructor(props) {
		super(props);
		this.state = {
			output: '0 '
		};

	}
	render() {
		return (
			<div className="container-fluid d-flex justify-content-center mt-2">
				<form className="mb-3" onSubmit={(event) => {
					event.preventDefault()
					let etherAmount
					etherAmount = this.input.value.toString()
					etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')

					this.props.buyTokens(etherAmount)

				}}>
					<div className="container-fluid d-flex justify-content-between">
						<label className="float-left"><b>Input</b></label>
						<span className="float-right text-muted">
							Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
						</span>
					</div>
					<div className="input-group mb-4">
						<input
							type="text"
							onChange={(event) => {
								const etherAmount = this.input.value.toString()
								this.setState({
									output: etherAmount * 10
								})
							}}
							ref={(input) => { this.input = input }}
							className="form-control form-control-lg"
							placeholder="0"
							required />
						<div className="input-group-append">
							<div className="input-group-text p-3">
								ETH
				                </div>
						</div>
					</div>
					<div className="container-fluid d-flex justify-content-between">
						<label className="float-left"><b>Output</b></label>
						<span className="float-right text-muted">
							Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
						</span>
					</div>
					<div className="input-group mb-2">
						<input
							type="text"
							className="form-control form-control-lg"
							placeholder="0"
							value={this.state.output}
							disabled
						/>
						<div className="input-group-append">
							<div className="input-group-text p-3">
								Dyawa
				                </div>
						</div>
					</div>
					<div className="container-fluid d-flex justify-content-between" >
						<span className="float-left text-muted">Exchange Rate</span>
						<span className="float-right text-muted">1 ETH = 10 Dyawa</span>
					</div>
					<br></br>
					<button type="submit" className="btn btn-primary btn-lg btn-block" style={{width:"100%"}}>Buy</button>

				</form>
			</div>


		)
	}
}

export default BuyToken