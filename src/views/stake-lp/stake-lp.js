import React, { Component } from 'react';
import HarvestModal from "./harvest-modal/harvest-modal"
import DepositModal from "./deposit-modal/deposit-modal";
import toastr from 'toastr'
import BigNumber from "bignumber.js";
import { CONTRACT_ABI_POOL_GAUGE, CONTRACT_ADDRESS_POOL_GAUGE, ERC_20_ABI,LP_TOKEN_ADD,ELON_ABI,ELON_ADD,MINTER_ABI, MINTER_ADD} from '../../config/config'
import Web3 from "web3";
import StakeLp from './stakelp.html'



let web3;

const precision = 10**18;


class StakeLpView extends Component {
    constructor(props){
        super(props)
        this.state = {
            walletConnected:false,
            expectedOutput:0,
            inputValue:0,
            chainId : '',
            loading:false,
            web3:null,
            contractError:false,
            userBalance:0,
            pendingBalance:0,
            balance4ME:0,
            vestedTokens:0,
            totalVested:0,
            poolInfo : [{poolIndex:0,name:"4 POOL",type:'base'},{poolIndex:1,name:"VAI POOL",type:"meta"}],

        }
        

    }
    componentDidMount() {
        BigNumber.config({ EXPONENTIAL_AT: 1e+9 })
        window.scrollTo(0, 0);
        if(this.props.metamsk.account.length === 0 && this.props.metamsk.chain.id===null){
            this.setState({walletConnected:false},()=>{this.changeWeb3()})
        }else if(this.props.metamsk.account.length>0 && this.props.metamsk.chain.id==='97'){
            this.setState({account:this.props.metamsk.account[0],chainId:this.props.metamsk.chain.id,walletConnected:true},()=>{this.changeWeb3()})
        }
    }

    componentDidUpdate(prevProps){
        if(this.state.walletConnected && this.props.metamsk.chain.id!=='97'){
            if(prevProps.metamsk.chain.id!==this.props.metamsk.chain.id){
                window.location.reload();
            }
        }
        if(prevProps.metamsk.account!==this.props.metamsk.account || prevProps.metamsk.chain.id !== this.props.metamsk.chain.id ){
            if(this.props.metamsk.chain.id === '97'){
                this.setState({account:this.props.metamsk.account[0],chainId:this.props.metamsk.chain.id,walletConnected:true},()=>{ this.loadBlockchainData();});
            }else{
                if(this.props.metamsk.chain.id !== null){
                    toastr.error('Please connect to Binance Smart Chain')
                }
            }
        }
        
    }

    mint = async () => {
        if(this.state.walletConnected && this.state.loading){
            let result = null;
            const minterContract = new this.state.web3.eth.Contract(MINTER_ABI, MINTER_ADD);
            try{
                result = await minterContract.methods.mint(CONTRACT_ADDRESS_POOL_GAUGE).send({from:this.state.account})
            }catch(err){
                toastr.error(err.message)
            }
            if(result){
                console.log(result.code)
                toastr.success('Transaction Succesful')
                this.loadBlockchainData();
            }
        }else{
            toastr.error('Please Connect your wallet')
        }
    };

    changeWeb3=()=>{
        if(this.props.metamsk.chain.id === '97'){
            web3 = new Web3(Web3.givenProvider) 
            toastr.success('Wallet Connected')
            this.loadBlockchainData();
        }else{
            web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/")
            this.setState({walletConnected:false},()=>{ this.loadBlockchainData();})
           
        }
        this.setState({web3:web3})
        
    }

    loadBlockchainData = async ()=>{
        this.setState({loading:false})
        let contract= null,elonTokenContract=null;
        console.log("load",this.state.walletConnected)
        contract = new web3.eth.Contract(CONTRACT_ABI_POOL_GAUGE, CONTRACT_ADDRESS_POOL_GAUGE);
        elonTokenContract = new web3.eth.Contract(ELON_ABI,ELON_ADD);
        this.setState({ contract })
        if(this.state.walletConnected ){
            var contractData = ('0x70a08231000000000000000000000000' + this.state.account.substring(2));
            var userBalance = null;
            var runningBalance = null;
            var pendingBalance = null;
            var vestedTokens = null;
            var totalVested = null;
            let val = null;
            try{
                userBalance = await contract.methods.integrate_fraction(this.state.account).call(); 
                runningBalance = await elonTokenContract.methods.balanceOf(this.state.account).call();
                vestedTokens= await contract.methods.balanceOf(this.state.account).call();
                totalVested= await contract.methods.totalSupply().call();
                val = await web3.eth.call({to:LP_TOKEN_ADD,data:contractData});
            }catch(err){
                console.log(err)
            }
            if(userBalance && runningBalance && val && vestedTokens && totalVested ){
                userBalance = new BigNumber(userBalance).dividedBy(precision);
                runningBalance = new BigNumber(runningBalance).dividedBy(precision);
                vestedTokens = new BigNumber(vestedTokens).dividedBy(precision);
                totalVested = new BigNumber(totalVested).dividedBy(precision)
                console.log(runningBalance.toString(10),userBalance.toString(10))
                console.log(runningBalance.comparedTo(0))
                if(!runningBalance.comparedTo(0)){
                    pendingBalance = 0;
                }else{
                    pendingBalance = userBalance.minus(runningBalance);
                }
                console.log('i am done')
                val = new BigNumber(val).dividedBy(precision);
                val = parseFloat(val.toString(10)); 
                this.setState({userBalance:parseFloat(userBalance.toString(10)),pendingBalance:parseFloat(pendingBalance.toString(10)),balance4ME:val,vestedTokens:parseFloat(vestedTokens.toString(10)),totalVested:parseFloat(totalVested.toString(10))})
            }
        }
                    
        
        this.setState({loading:true});
        console.log(this.state)
        
    }



    render() {
        return StakeLp.call(this);
    }
}

export default StakeLpView
