import React from 'react';
import { HeaderView, FooterView } from '../../component/layouts';
import './home.scss';
import DepositModal from "./deposit-modal/deposit-modal";
import WithdrawModal from "./withdraw-modal/withdraw-modal";

import swapIcon from "../../assets/images/swap-white.svg"

export default function () {
    return(
        <React.Fragment>
                <div className="main-wrapper">
                    <HeaderView props={this.state.walletConnected} account={this.state.account} />
                    <div className="content-view">
                        <div className="content-view-inner">
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-8">
                                <div className="box-wrapper home-left">
                                    <h4>Swap using all Melonswap pools</h4>
                                    <div className="select-group-section">
                                        <div className="select-group">
                                            <select onChange={(e)=>this.onInputChange(e)}>
                                                {this.state.basePoolCoins.map((val,index)=>{
                                                    if(val.type.toLowerCase() === 'basetoken'){
                                                        return <option key={index} value={val.name}>{val.name}</option>
                                                    }
                                                })}
                                            </select>
                                            <input placeholder="Enter amount here" onBlur={(e)=>this.getPriceEstimate(e)} onChange={(e)=>{this.setState({inputValue:e.target.value})}}value={this.state.inputValue} />
                                        </div>
                                    </div>
                                    <div className="swap-icon">
                                        <img src={swapIcon} alt="Swap" />
                                    </div>
                                    <div className="select-group-section">
                                        <div className="select-group">
                                            <select value={this.state.outPutCoin} onChange={(e)=>{this.setState({outPutCoin:e.target.value})}}>
                                                {this.state.secondaryCoin.map((val,index)=>{
                                                    if(val.type.toLowerCase() === 'basetoken'){
                                                        return <option key={index} value={val.name}>{val.name}</option>
                                                    }
                                                })}
                                            </select>
                                            <input disbaled="true" placeholder="0"  value={this.state.expectedOutput} readOnly="true" />
                                        </div>
                                    </div>
                                    <div className="row text-white details-text text-right mt-15">
                                        <div className="col-xs-11">
                                            <b>Price Impact {this.state.inputCoin} / {this.state.outPutCoin}  : <span className="text-secondary">{this.state.priceImpact.toFixed(4)}</span></b>
                                        </div>
                                        <div className="col-xs-11 mt-15">
                                            <b>Trade routed through : <span className="text-secondary">4ME pool</span></b>
                                        </div>
                                    </div>
                                    <div className="swap-btn mt-15">
                                        <button className="btn" onClick={this.swap}>SWAP</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 col-lg-4 home-right">
                                <div className="box-wrapper home-right-card">
                                    <div className="row text-white details-text">
                                        <div className="col-xs-7 text-right">
                                            <b>Total Pool Deposits :</b>
                                        </div>
                                        <div className="col-xs-5">
                                            <b className="text-secondary">${this.state.basePoolCoins.reduce((acc,val)=>{
                                                acc=acc+val.balance
                                                return acc;
                                            },0).toFixed(2)}</b>
                                        </div>
                                    </div>
                                    <div className="row text-white details-text">
                                        <div className="col-xs-7 text-right">
                                            <b>Daily Volume :</b>
                                        </div>
                                        <div className="col-xs-5">
                                            <b className="text-secondary">$2,304,337</b>
                                        </div>
                                    </div>
                                    <div className="row text-white details-text">
                                        <div className="col-xs-7 text-right">
                                            <b>mELON price :</b>
                                        </div>
                                        <div className="col-xs-5">
                                            <b className="text-secondary">$4.20</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="home-right-btns">
                                    <DepositModal name="DEPOSIT" web3={this.state.web3} account={this.state.account} coinList={this.state.basePoolCoins} selectedPool={this.state.selectedPool} contract={this.state.contract} slipage={this.state.maxSlipage} reloadBalances={(mode)=>{this.loadBlockchainData()}} walletConnected={this.state.walletConnected} loading={this.state.loading}/>
                                    <WithdrawModal name="WITHDRAW" web3={this.state.web3} account={this.state.account} coinList={this.state.basePoolCoins} selectedPool={this.state.selectedPool} contract={this.state.contract} slipage={this.state.maxSlipage} reloadBalances={(mode)=>{this.loadBlockchainData()}} walletConnected={this.state.walletConnected} loading={this.state.loading} />
                                </div>
                                <div className="box-wrapper home-right-card">
                                    <p className="text-white">4ME Pool Reserves</p>
                                    <div className="row text-white details-text">
                                        <div className="col-xs-6 text-right">
                                            <b>{this.state.basePoolCoins[0].name} :</b>
                                        </div>
                                        <div className="col-xs-6">
                                            <b className="text-secondary">${this.state.basePoolCoins[0].balance=== -1 ? (0).toFixed(2):this.state.basePoolCoins[0].balance.toFixed(2)}</b>
                                        </div>
                                    </div>
                                    <div className="row text-white details-text">
                                        <div className="col-xs-6 text-right">
                                            <b>{this.state.basePoolCoins[1].name} :</b>
                                        </div>
                                        <div className="col-xs-6">
                                            <b className="text-secondary">${this.state.basePoolCoins[1].balance=== -1 ? (0).toFixed(2):this.state.basePoolCoins[1].balance.toFixed(2)}</b>
                                        </div>
                                    </div>
                                    <div className="row text-white details-text">
                                        <div className="col-xs-6 text-right">
                                            <b>{this.state.basePoolCoins[2].name} :</b>
                                        </div>
                                        <div className="col-xs-6">
                                            <b className="text-secondary">${this.state.basePoolCoins[2].balance=== -1 ? (0).toFixed(2):this.state.basePoolCoins[2].balance.toFixed(2)}</b>
                                        </div>
                                    </div>
                                    <div className="row text-white details-text">
                                        <div className="col-xs-6 text-right">
                                            <b>{this.state.basePoolCoins[3].name} :</b>
                                        </div>
                                        <div className="col-xs-6">
                                            <b className="text-secondary">${this.state.basePoolCoins[3].balance=== -1 ? (0).toFixed(2):this.state.basePoolCoins[3].balance.toFixed(2)}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        </div>
                        
                    </div>
                    <FooterView />
                </div>
            </React.Fragment>
    ); 
}