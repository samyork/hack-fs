import logo from './logo.svg';
import './App.css';
import React, { Component }  from 'react';
import web3 from "./web3";
import vault from './vault';
import minty from './minty';
import dai from './dai';
import BigNumber from "bignumber.js";
class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    account: '',
    balance: '',
    balance2: '',
    supplied: '',
    status: '',
    value2: '',
    status2: '',
    value3: '',
    status3: ''
  };
  async componentDidMount() {
    document.body.style.backgroundColor = "#4B0082";
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    this.getNFT();
    this.getBeneficiaryNFT();
    const daiBalance = await dai.methods.balanceOf(accounts[0]).call();
    const bigBalance = new BigNumber(daiBalance);
    const balance = bigBalance.shiftedBy(-18).toString();
    this.setState({balance: balance});
    const pdaiBalance = await vault.methods.balanceOf(accounts[0]).call();
    const bigpBalance = new BigNumber(pdaiBalance);
    const pbalance = bigpBalance.shiftedBy(-18).toString();
    this.setState({balance2: pbalance});
    const maticInVault = await vault.methods.getMaticAccrued.call().toString();
    const bigMatic = new BigNumber(maticInVault);
    const wMatic = bigMatic.shiftedBy(-18).toString();
    this.setState({wmatic: wMatic});
  };
  onSubmit = async (event) => {
  event.preventDefault();
  const accounts = await web3.eth.getAccounts();
  const amountToDeposit = this.state.value;
  const bigDeposit = new BigNumber(amountToDeposit);
  const amount = bigDeposit.shiftedBy(18);
  console.log(amount);
  const account = accounts[0];
  this.setState({status: "Approving DAI..."});
  await dai.methods.approve('0xc6A480889F7B0D58a41D515C5047a2edbCeaea9e', amount).send({from:account});
  this.setState({status: "Approved!"});
  await vault.methods.depositDAI(amount).send({from:account});
  this.setState({status: "Success!"});
};
  onWithdrawl = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const amountToWithdrawl = this.state.value2;
    const bigWithdrawl = new BigNumber(amountToWithdrawl);
    const amount = bigWithdrawl.shiftedBy(18);
    this.setState({status2: "Confirm transaction..."})
    await vault.methods.withdrawTokens(amount).send({from: account});
    this.setState({status2: "Success!"});
  };
  onHarvest = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const amountToWithdrawl = this.state.value3;
    const bigWithdrawl = new BigNumber(amountToWithdrawl);
    const amount = bigWithdrawl.shiftedBy(18);
    this.setState({status3: "Confirm transaction..."})
    await vault.methods.harvest().send({from: account});
    this.setState({status3: "Harvesting rewards..."})
    await vault.methods.withdrawMatic('0x9c3c9283d3e44854697cd22d3faa240cfb032889', account, amount).send({from: account});
  }
  getNFT = async (event) => {
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    const account = this.state.account;
    const token = await minty.methods.tokenOfOwnerByIndex(account, 0).call();
    console.log("Your token index: ", token);
    const hash = await minty.methods.tokenURI(token).call();
    const baseURL = hash.replace("ifps://", "https://") + ".ipfs.dweb.link/image.png";
    console.log("Your NFT on IPFS: ", baseURL);
    this.setState({img: baseURL});
  }
  getBeneficiaryNFT = async (event) => {
    const account = '0x54022De0c0002ECe4F83eEf6A2c59f6cb8440515';
    const token = await minty.methods.tokenOfOwnerByIndex(account, 0).call();
    console.log("Beneficiary token index: ", token);
    const hash = await minty.methods.tokenURI(token).call();
    const baseURL = hash.replace("ifps://", "https://") + ".ipfs.dweb.link/image.png";
    console.log("Beneficiary NFT on IPFS: ", baseURL);
    this.setState({img2: baseURL});
  }
  render() {
    return (
      <div>
      <div className="container">
      <h1>Polytopia Vault</h1>
      <p>Beneficiary: 0x54022De0c0002ECe4F83eEf6A2c59f6cb8440515</p>
      <div><img src={this.state.img2} className="cutout"></img></div>
      <p>Your account: {this.state.account}</p><br></br>
      <div><img src={this.state.img} className="cutout"></img></div>
      <h3>Your DAI Balance: {this.state.balance}</h3><br></br>
      <p>Deposit DAI tokens to a Polytopia Vault to earn interest from AAVE.  Your Beneficiary will claim the accrued MATIC rewards.</p>
      <form className="form" onSubmit={this.onSubmit}>
        <h4>Deposit DAI tokens:</h4>
        <div>
          <input
          className="input"
          value= {this.state.value}
          onChange= {event => this.setState({value: event.target.value})}
          />
        </div>
        <br></br>
        <button className="button">Deposit</button><br></br>
        {this.state.status}
        </form>
        <form className="form" onSubmit={this.onWithdrawl}>
          <h4>Withdawl DAI tokens:</h4>
          <h4>Available: {this.state.balance2}</h4>
          <div>
            <input
            className="input"
            value= {this.state.value2}
            onChange= {event => this.setState({value2: event.target.value})}
            />
          </div>
          <br></br>
          <button className="button">Withdrawl </button><br></br>
          {this.state.status2}
          </form>
          <form className="form" onSubmit={this.onHarvest}>
            <h4>Beneficiary Withdrawl WMATIC: </h4>
            <div>
              <input
              className="input"
              value= {this.state.value3}
              onChange= {event => this.setState({value3: event.target.value})}
              />
            </div>
            <br></br>
            <button className="button">Harvest</button><br></br>
            {this.state.status3}
            </form>
            </div>

      </div>
    );
  };
}

export default App;
