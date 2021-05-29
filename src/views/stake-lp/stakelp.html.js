import React from 'react';
import { HeaderView, FooterView } from '../../component/layouts';
import '../stake-melon/stake-melon.scss';

export default function () {
    return(
        <React.Fragment>
                <div className="main-wrapper">
                    <HeaderView />
                    <div className="content-view stakemelon-section">
                        <div className="row stakemelon-top">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="box-wrapper">
                                    <p className="headings">Stake 4Me</p>
                                    <div className="stakelp-box">
                                        <div className="left">
                                            <input className="melon-input" placeholder="Enter amount here" />
                                            <p className="mt-3">mELON Balance :</p>
                                            <p className="text-secondary">{this.state.vestedTokens.toFixed(4)}</p>
                                        </div>
                                        <div className="right">
                                            <button className="btn btn-primary block">DEPOSIT</button>
                                            <button className="btn secondary-btn mt-3 block">WITHDRAW</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="box-wrapper">
                                    <p className="headings">Harvest mELON</p>
                                    <div className="stakelp-box harvest">
                                        <div className="left specialInput">
                                            <input className="melon-input" placeholder="0" disabled={true} value={this.state.pendingBalance.toFixed(4)} />
                                        </div>
                                        <div className="right zerPadding">
                                            <button className="btn secondary-btn mt-3 block" onClick={this.mint}>HARVEST</button>
                                        </div>
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
    ); 
}