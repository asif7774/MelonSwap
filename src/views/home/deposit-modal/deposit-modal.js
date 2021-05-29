import React, { Component } from 'react';
import Modal from 'react-modal';
import './deposit-modal.scss';

import closeIcon from "../../../assets/images/close.svg"

import toastr from 'toastr'
import BigNumber from "bignumber.js";
import { CONTRACT_ABI_POOL, CONTRACT_ADDRESS_POOL, ERC_20_ABI,LP_TOKEN_ADD} from '../../../config/config'


let web3;

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
    constructor(props){
        super(props)
        this.state = {
            modalIsOpen: false,
            secondModalIsOpen: false,
            depositFund: [
                0,0,0,0
            ],
            depositPermission : true,
            widthrawFund: [0,0,0,0,0],
            maxSlipage: 0.1,
            customStyles:{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)'
                }
            }
        }
    }

    componentDidMount(){
        console.log(this.props)
        BigNumber.config({ EXPONENTIAL_AT: 1e+9 })
        BigNumber.config({ DECIMAL_PLACES: 20 })
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    deposit = (e,index) =>{
        if(this.props.name === 'DEPOSIT'){
            let newArr = this.state.depositFund;
            newArr[index] = e.target.value;
            this.setState({depositFund:newArr});
            this.get_minLP()
        }else{

            if(index===4){
                let newArr = this.state.widthrawFund;
                for(let i=0;i<4;++i){
                    newArr[i]=0
                }
                newArr[index]=e.target.value
                this.setState({widthrawFund:newArr})
                //this.getMin_StableFromLp();
            }else{
                let newArr = this.state.widthrawFund;
                newArr[4] = 0;
                newArr[index]=e.target.value;
                this.setState({widthrawFund:newArr})

                //this.getMin_Burn();
            }
        }
        
    }

    

    getApproval = async() =>{
        web3 = this.props.web3
        let approvedX = [];
        let address = null;
        let i=0;
        while(i<4){
            if(this.state.depositFund[i]>0){
                address = this.props.coinList[i].add;
                const erc20abiContract = new web3.eth.Contract(ERC_20_ABI, address);
                let ammount = new BigNumber(parseFloat(this.state.depositFund[i])*Math.pow(10,18));
                let result = null;
                try{
                    result=  await erc20abiContract.methods.approve(CONTRACT_ADDRESS_POOL,ammount.toString(10)).send({from:this.props.account});
                }catch(err){
                    toastr.error('Error Occured while getting Permission.. Please try Again !!!')
                    return [];
                }
                if(result.code !== 4001){
                    approvedX.push(ammount.toString(10));
                    i++;
                }else{
                    toastr.error(result.message)
                    approvedX.push(-1)
                    this.setState({depositPermission:false})
                    return [];
                }
            }else{
                approvedX.push(0);
                i++;
            }
        }
        return approvedX;
        
    }

    depositTransact = async(data) =>{
        let estOutputCal = this.state.depositFund.reduce((acc,val)=>{
            acc = parseFloat(acc)+parseFloat(val);
            return acc;
        },0)
        if(estOutputCal>0.0){
            let minEstOutput = estOutputCal*(parseFloat(1)-this.state.maxSlipage);
            minEstOutput = new BigNumber(minEstOutput).multipliedBy(Math.pow(10,18));
            let depositResult = null;
            try{
                depositResult = await this.props.contract.methods.add_liquidity(data,minEstOutput.toString(10)).send({from:this.props.account});
            }catch(err){
                toastr.error(err.message);
            }
            if(depositResult){
                toastr.success('Transaction Succesful')
                this.props.reloadBalances('both');
                this.setState({depositFund:[0,0,0,0]});
            }
        }else{
            toastr.error('Please enter valid deposit amount')
        }
        
            
    }

    depositFunds = async () =>{
        if(this.props.walletConnected && this.props.loading){
            if(this.props.name.toUpperCase() === 'DEPOSIT'){
                let data= await this.getApproval()
                if(data.length>0){
                     this.depositTransact(data);
                }
            }else{
                let estOutputCal = this.state.widthrawFund.reduce((acc,val)=>{
                    acc = parseFloat(acc)+parseFloat(val);
                    return acc;
                },0) 
                if(this.state.widthrawFund[4]>0){
                    let am = this.state.widthrawFund[4];
                    let sb = this.props.coinList && this.props.coinList.reduce((acc,val)=>{
                        acc=parseFloat(acc)+parseFloat(val.balance)
                        return acc;
                    },0)
                    let ms = (parseFloat(1)-(this.state.maxSlipage/100))
                    let Data = [];
                    this.state.widthrawFund.forEach((val,index)=>{
                        if(index<4){
                            val = am*ms*(this.props.coinList[index].balance/sb)
                            Data.push(new BigNumber(parseFloat(val)).multipliedBy(Math.pow(10,18)).toString(10))
                        }
                    })
                    let result=null;
                    try{
                        result = await this.props.contract.methods.remove_liquidity(new BigNumber(parseFloat(this.state.widthrawFund[4])).multipliedBy(Math.pow(10,18)).toString(10),Data).send({from:this.props.account})
                    }catch(err){
                        toastr.error(err.message)
                    }
                    if(result && result.code !== 4001){
                        toastr.success('Transaction Complete')
                        await this.props.reloadBalances('both')
                        this.setState({widthrawFund:[0,0,0,0,0]})
                    }
                }else{
                    let approvedX = [];
                    this.state.widthrawFund.forEach((val,index)=>{
                        if(index<4){
                            let ammount = new BigNumber(parseFloat(val)).multipliedBy(Math.pow(10,18));
                            approvedX.push(ammount.toString(10));
                        }
                    })
                    let minAmtResult = null
                    try{
                        minAmtResult = await this.props.contract.methods.calc_token_amount(approvedX,false).call();
                    }catch(err){
                        toastr.error(err);
                    }
                    if(minAmtResult){
                        
                        minAmtResult = new BigNumber(minAmtResult);
                        console.log(minAmtResult.toString(10))
                        var inter= minAmtResult.toString() * (this.state.maxSlipage/100);
                        console.log(inter)
                        minAmtResult = minAmtResult.plus(parseInt(inter));
                        let result = null;
                        console.log(approvedX,minAmtResult.toString(10))
                        try{
                            result = await this.props.contract.methods.remove_liquidity_imbalance(approvedX,minAmtResult.toString()).send({from:this.props.account});
                        }catch(err){
                            toastr.error(err.message);
                        }
                        if(result && result.code !== 4001){
                            toastr.success('Transaction Complete')
                            await this.props.reloadBalances('both')
                            this.setState({widthrawFund:[0,0,0,0,0]})
                        }
                    }
                    
                   
                    
                    
                }
            }
        }else{
            toastr.error('Please Connect your wallet')
        }

        
        
    }

    setMaxSlipage = (e) =>{
        console.log(e)
        let dat = document.getElementById(e.target.id);
        document.getElementById(e.target.id).classList.add('selected')
        this.setState({maxSlipage:e.target.innerHTML})
    }



    get_minLP = async () =>{
        let newArr = [];
        this.state.depositFund.forEach((val)=>{
            if(val !== ''){
                newArr.push(new BigNumber(val).multipliedBy(Math.pow(10,18)).toString(10));
            }else{
                newArr.push(new BigNumber(0).multipliedBy(Math.pow(10,18)).toString(10));
            }
            
        })
        console.log(newArr)
        let minAmt = await this.props.contract.methods.calc_token_amount(newArr,true).call();
        console.log(minAmt)
        minAmt = new BigNumber(minAmt).dividedBy(Math.pow(10,18));
        this.setState({estOutput:minAmt.toString(10)});
    }
    render() {
        return (
          
            <React.Fragment>
                <button className="btn block" onClick={this.openModal}>DEPOSIT</button>
                <Modal ariaHideApp={false} style={customStyles} className="modal-cus" isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                    <button onClick={this.closeModal} className="modal-close-icon"><img alt={closeIcon} src={closeIcon} /></button>
                    <div className="modal-body">
                        <div className="row mt-15">
                            <div className="col-sm-6 col-xs-12">
                            {this.props.coinList ? this.props.coinList.map((val,index)=>{
                                if(val.type.toLowerCase() === 'basetoken'){
                                    return (
                                            <div className="listbox-dtl" key={index}>
                                                <div className="listbox-dtl-header">
                                                    <div className="row">
                                                        <div className="col-sm-6 col-xs-6">
                                                            {val.name}
                                                        </div>
                                                        <div className="col-sm-6 col-xs-6">
                                                            Max : {val.walletBalance.toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="listbox-dtl-body">
                                                    <input onChange={(e)=>{this.deposit(e,index)}} value={this.state.depositFund[index]} />
                                                </div>
                                            </div>
                                    )
                                }
                            }):""}
                            </div>
                            <div className="col-sm-6 text-white col-xs-12">
                                <div className="withdrawinput-group text-center">
                                    <button className="btn" onClick={this.depositFunds}>DEPOSIT</button>
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
