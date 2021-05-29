import React, { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import { HeaderView, FooterView } from '../../component/layouts';
import "react-datepicker/dist/react-datepicker.css";
import './stake-melon.scss';


const DateTimePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <React.Fragment>
            <DatePicker
                className="datepicker-melon"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
            />
        </React.Fragment>
    );
};


export default function () {
        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <HeaderView props={this.state.walletConnected} account={this.state.account}/>
                    <div className="content-view stakemelon-section">
                        <div className="content-view-inner">
                            <div className="row stakemelon-top">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="box-wrapper">
                                        <p className="headings">Stake mELON</p>
                                        <div className="stakelp-box">
                                            <div className="left">
                                                <input className="melon-input" placeholder="Enter amount here" value={this.state.depositMelonUnlocked} onChange={(e)=>{this.handleUnlockedDepositChange(e)}}/>
                                                <p className="mt-3">mELON Balance :</p>
                                                <p className="text-secondary">43,451</p>
                                            </div>
                                            <div className="right">
                                                <button className="btn btn-primary block" onClick={this.depositMelonUnlocked}>DEPOSIT</button>
                                                <button className="btn secondary-btn mt-3 block" onClick={(e)=>{this.widthrawMelon('unlocked')}}>WITHDRAW</button>
                                            </div>
                                        </div>
                                        <div className="text-center p-2 stakelp-box-bottom mt-1">
                                            <p>Earn staking fees and penalty fees</p>
                                            <p>APY: <span className="text-secondary">4.5%</span> in BUSD + <span className="text-secondary">54%</span> in mELON</p>
                                            <p>Total Staked: 64,786,148 mELON</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="box-wrapper">
                                        <p className="headings">Stake and Lock mELON</p>
                                        <div className="stakelp-box pb-3">
                                            <div className="left">
                                                <input className="melon-input" placeholder="Enter amount here" value={this.state.depositMelonLocked} onChange={(e) => { this.handleLockedDepositChange(e) }} />
                                                <div className="mt-3">
                                                    <DateTimePicker />
                                                </div>
                                            </div>
                                            <div className="right">
                                                <button className="btn btn-primary block" onClick={this.depositMelonLocked}>LOCK</button>
                                                <button className="btn secondary-btn mt-3 block" onClick={(e)=>{this.widthrawMelon('unlocked')}}>UNLOCK</button>
                                            </div>
                                        </div>

                                        <div className="text-center stakelp-box-price">
                                            <p className="mt-0 mb-2">mELON Balance : <span className="text-secondary">43,451</span></p>
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
                    </div>
                    <FooterView />
                </div>
            </React.Fragment>
        )
}

