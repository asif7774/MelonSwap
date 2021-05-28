import React, { Component } from 'react';
import Modal from 'react-modal';
import './harvest-modal.scss';

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

class HarvestModal extends Component {
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
                <button className="btn block" onClick={this.openModal}>Harvest</button>
                <Modal ariaHideApp={false} style={customStyles} className="modal-cus" isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                    <button onClick={this.closeModal} className="modal-close-icon"><img alt={closeIcon} src={closeIcon} /></button>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <h1 className="text-white">Harvest Modal</h1>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
           
        )
    }
}

export default HarvestModal
