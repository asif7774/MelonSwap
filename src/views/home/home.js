import React, { Component } from 'react';
import { HeaderView, FooterView } from '../../component/layouts';
import './home.scss';
import DepositModal from "./deposit-modal/deposit-modal";
import WithdrawModal from "./withdraw-modal/withdraw-modal";

import swapIcon from "../../assets/images/swap-white.svg"

class HomeView extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <HeaderView />
                    <div className="content-view">
                        <div className="content-view-inner">
                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-8">
                                    <div className="box-wrapper home-left">
                                        <h4>Swap using all Melonswap pools</h4>
                                        <div className="select-group-section">
                                            <div className="select-group">
                                                <select>
                                                    <option value="usdt">ASSET A</option>
                                                    <option value="usdt">ASSET A</option>
                                                    <option value="usdt">ASSET A</option>
                                                </select>
                                                <input placeholder="Enter amount here" />
                                            </div>
                                        </div>
                                        <div className="swap-icon">
                                            <img src={swapIcon} alt="Swap" />
                                        </div>
                                        <div className="select-group-section">
                                            <div className="select-group">
                                                <select>
                                                    <option value="usdt">ASSET B</option>
                                                    <option value="usdt">ASSET B</option>
                                                    <option value="usdt">ASSET B</option>
                                                </select>
                                                <input placeholder="0" />
                                            </div>
                                        </div>
                                        <div className="row text-white details-text text-right mt-15">
                                            <div className="col-xs-11">
                                                <b>Exchange rate Asset A / Asset B (Including Fees) : <span className="text-secondary">0.997</span></b>
                                            </div>
                                            <div className="col-xs-11 mt-15">
                                                <b>Trade routed through : <span className="text-secondary">4ME poo</span></b>
                                            </div>
                                        </div>
                                        <div className="swap-btn mt-15">
                                            <button className="btn">SWAP</button>
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
                                                <b className="text-secondary">$2,304,337</b>
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
                                        <DepositModal />
                                        <WithdrawModal />
                                    </div>
                                    <div className="box-wrapper home-right-card">
                                        <p className="text-white">4ME Pool Reserves</p>
                                        <div className="row text-white details-text">
                                            <div className="col-xs-6 text-right">
                                                <b>USDT :</b>
                                            </div>
                                            <div className="col-xs-6">
                                                <b className="text-secondary">$234,559</b>
                                            </div>
                                        </div>
                                        <div className="row text-white details-text">
                                            <div className="col-xs-6 text-right">
                                                <b>DAI :</b>
                                            </div>
                                            <div className="col-xs-6">
                                                <b className="text-secondary">$453,989</b>
                                            </div>
                                        </div>
                                        <div className="row text-white details-text">
                                            <div className="col-xs-6 text-right">
                                                <b>USDC :</b>
                                            </div>
                                            <div className="col-xs-6">
                                                <b className="text-secondary">$550,326</b>
                                            </div>
                                        </div>
                                        <div className="row text-white details-text">
                                            <div className="col-xs-6 text-right">
                                                <b>BUSD :</b>
                                            </div>
                                            <div className="col-xs-6">
                                                <b className="text-secondary">$354,693</b>
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
        )
    }
}

export default HomeView
