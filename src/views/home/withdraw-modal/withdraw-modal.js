import React, { Component } from 'react';
import Modal from 'react-modal';
import './withdraw-modal.scss';

import closeIcon from "../../../assets/images/close.svg"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
    overlay: { zIndex: 9 }
};

class WithdrawModal extends Component {
    state = {
        modalIsOpen: false,
        secondModalIsOpen: false
    };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };
    render() {
        return (
          
            <React.Fragment>
                <button className="btn secondary-btn block" onClick={this.openModal}>WITHDRAW</button>
                <Modal ariaHideApp={false} style={customStyles} className="modal-cus" isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                    <button onClick={this.closeModal} className="modal-close-icon"><img alt={closeIcon} src={closeIcon} /></button>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-6 col-xs-12">
                                <div className="listbox-dtl">
                                    <div className="listbox-dtl-header">
                                        <div className="row">
                                            <div className="col-sm-6 col-xs-6">
                                                ABC
                                            </div>
                                            <div className="col-sm-6 col-xs-6">
                                                Max : 00
                                            </div>
                                        </div>
                                    </div>
                                    <div className="listbox-dtl-body">
                                        <input />
                                    </div>
                                </div>
                                <div className="listbox-dtl">
                                    <div className="listbox-dtl-header">
                                        <div className="row">
                                            <div className="col-sm-6 col-xs-6">
                                                BUSD
                                            </div>
                                            <div className="col-sm-6 col-xs-6">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="listbox-dtl-body">
                                        <input />
                                    </div>
                                </div>
                                <div className="listbox-dtl">
                                    <div className="listbox-dtl-header">
                                        <div className="row">
                                            <div className="col-sm-6 col-xs-6">
                                                USDT
                                            </div>
                                            <div className="col-sm-6 col-xs-6">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="listbox-dtl-body">
                                        <input />
                                    </div>
                                </div>
                                <div className="listbox-dtl">
                                    <div className="listbox-dtl-header">
                                        <div className="row">
                                            <div className="col-sm-6 col-xs-6">
                                                DAI
                                            </div>
                                            <div className="col-sm-6 col-xs-6">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="listbox-dtl-body">
                                        <input />
                                    </div>
                                </div>
                                <div className="listbox-dtl">
                                    <div className="listbox-dtl-header">
                                        <div className="row">
                                            <div className="col-sm-6 col-xs-6">
                                                USDC
                                            </div>
                                            <div className="col-sm-6 col-xs-6">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="listbox-dtl-body">
                                        <input />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 text-white modal-right col-xs-12">
                                <div className="withdrawinput-group">
                                    <button className="btn">WITHDRAW</button>
                                </div>
                                <div>
                                    <p>Max Shippage : 0.1%</p>

                                    <p>RESERVES </p>
                                    <p></p>
                                    <p>Total : 683145</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
           
        )
    }
}

export default WithdrawModal
