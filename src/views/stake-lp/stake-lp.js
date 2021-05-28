import React, { Component } from 'react';
import { HeaderView, FooterView } from '../../component/layouts';
import './stake-lp.scss';
import HarvestModal from "./harvest-modal/harvest-modal"
import DepositModal from "./deposit-modal/deposit-modal";

import logoImage from "../../assets/images/logo.png"

class StakeLpView extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <HeaderView />
                    <div className="content-view stakelp-section">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="stakelp-left">
                                    <img src={logoImage} alt="Melonswap" /> <h1>STAKE LP</h1>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="box-wrapper">
                                    <div className="stakelp-right ">
                                        <input className="melon-input" placeholder="0.0" />
                                        <div>
                                            <p>mELON Balance :</p>
                                            <p className="text-secondary">43,451</p>
                                        </div>
                                    </div>
                                    <div className="text-center p-2">
                                        <HarvestModal />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row stakelp-bottom">
                            <div className="col-lg-4 col-md-6">
                                <div className="box-wrapper">
                                    <p className="headings">4ME Pool Staking</p>
                                    <div className="stakelp-box">
                                        <input className="melon-input" placeholder="0.0" />
                                        <div>
                                            <p>4ME Balance :</p>
                                            <p className="text-secondary">453,452</p>
                                        </div>
                                    </div>
                                    <div className="text-center p-2">
                                        <DepositModal />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="box-wrapper">
                                    <p className="headings">Pool 2 Staking</p>
                                    <div className="stakelp-box">
                                        <input className="melon-input" placeholder="0.0" />
                                        <div>
                                            <p>2Pool Balance :</p>
                                            <p className="text-secondary">234,323</p>
                                        </div>
                                    </div>
                                    <div className="text-center p-2">
                                        <DepositModal />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="box-wrapper">
                                    <p className="headings">Pool 3 Staking</p>
                                    <div className="stakelp-box">
                                        <input className="melon-input" placeholder="0.0" />
                                        <div>
                                            <p>3Pool Balance :</p>
                                            <p className="text-secondary">434,657</p>
                                        </div>
                                    </div>
                                    <div className="text-center p-2">
                                        <DepositModal />
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

export default StakeLpView
