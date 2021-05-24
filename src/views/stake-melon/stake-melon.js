import React, { Component } from 'react';
import { HeaderView, FooterView } from '../../component/layouts';
import './stake-melon.scss';


class StakeMelonView extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <HeaderView />
                    <div className="content-view stakemelon-section">
                        <div className="row stakemelon-top">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="box-wrapper">
                                    <p className="headings">Stake mELON</p>
                                    <div className="stakelp-box">
                                        <div className="left">
                                            <input className="melon-input" placeholder="Enter amount here" />
                                            <p className="mt-3">mELON Balance :</p>
                                            <p className="text-secondary">43,451</p>
                                        </div>
                                        <div className="right">
                                            <button className="btn btn-primary block">DEPOSIT</button>
                                            <button className="btn secondary-btn mt-3 block">WITHDRAW</button>
                                        </div>
                                    </div>
                                    <div className="text-center p-2 stakelp-box-bottom">
                                        <p>Earn staking fees and penalty fees</p>
                                        <p>APY: <span className="text-secondary">4.5%</span> in BUSD + <span className="text-secondary">54%</span> in mELON</p>
                                        <p>Total Staked: 64,786,148 mELON</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="box-wrapper">
                                    <p className="headings">Stake and Lock mELON</p>
                                    <div className="stakelp-box">
                                        <div className="left">
                                            <input className="melon-input" placeholder="Enter amount here" />
                                            <p className="mt-3">mELON Balance :</p>
                                            <p className="text-secondary">43,451</p>
                                        </div>
                                        <div className="right">
                                            <button className="btn btn-primary block">LOCK</button>
                                            <button className="btn secondary-btn mt-3 block">UNLOCK</button>
                                        </div>
                                    </div>
                                    <div className="text-center p-2 stakelp-box-bottom">
                                        <p>Earn staking fees without lock-up</p>
                                        <p>APY: <span className="text-secondary">4.5%</span> in BUSD (trading fees only)</p>
                                        <p>Total Staked: <span className="text-secondary">54,586,343 mELON</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="box-wrapper stakemelon-bottom">
                                    <p className="text-center">Stake your mELON and start earning fees and penalty fees</p>
                                    <div className="pl-4">
                                        <p> Available to withdraw without penalty : 0 mELON</p>
                                        <p>Available to withdraw: 0 mELON with early exit penalty of 0 mELON</p>
                                    </div>
                                    <ul>
                                        <li>Instruction 1</li>
                                        <li>Instruction 2</li>
                                    </ul>
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

export default StakeMelonView
