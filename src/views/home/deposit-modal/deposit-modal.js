import React, { Component } from 'react';
import Modal from 'react-modal';
import './deposit-modal.scss';

import closeIcon from "../../../assets/images/close.svg"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: { zIndex: 9 }
};

class DepositModal extends Component {
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
                <button className="btn block" onClick={this.openModal}>DEPOSIT</button>
                <Modal ariaHideApp={false} style={customStyles} className="modal-cus" isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                    <button onClick={this.closeModal} className="modal-close-icon"><img alt={closeIcon} src={closeIcon} /></button>
                    <div className="modal-body">
                        <div className="row mt-15">
                            <div className="col-sm-6 col-xs-12">
                                <div className="listbox-dtl">
                                    <div className="listbox-dtl-header">
                                        <div className="row">
                                            <div className="col-sm-6 col-xs-6">
                                                4ME
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
                            <div className="col-sm-6 text-white col-xs-12">
                                <div className="withdrawinput-group text-center">
                                    <button className="btn">WITHDRAW</button>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-15">
                            <div className="col-sm-6 col-xs-12">
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
                            </div>
                            <div className="col-sm-6 text-white col-xs-12">
                                <div className="withdrawinput-group text-center">
                                    <button className="btn">WITHDRAW</button>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-15">
                            <div className="col-sm-6 col-xs-12">
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
                            </div>
                            <div className="col-sm-6 text-white col-xs-12">
                                <div className="withdrawinput-group text-center">
                                    <button className="btn">WITHDRAW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
           
        )
    }
}

export default DepositModal
