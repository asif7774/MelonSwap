import React, { Component } from 'react';
import toastr from 'toastr'
import BigNumber from "bignumber.js";
import { CONTRACT_ABI_POOL_GAUGE, CONTRACT_ADDRESS_POOL_GAUGE, ERC_20_ABI,LP_TOKEN_ADD,ELON_ABI,ELON_ADD,MELON_VESTING_ABI, MELON_VESTING,LP_TOKEN_ABI} from '../../config/config'
import Web3 from "web3";
import StakeMelon from './stakemelon.html'

let web3;

const precision = 10**18;


class StakeMelonView extends Component {
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
            depositMelonUnlocked : null,
            depositMelonLocked : null

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
                if(!userBalance.comparedTo(0)){
                    pendingBalance = 0;
                }else{
                    pendingBalance = userBalance.minus(runningBalance);
                }
                console.log('i am done',pendingBalance.toString(10))
                val = new BigNumber(val).dividedBy(precision);
                val = parseFloat(val.toString(10)); 
                this.setState({userBalance:parseFloat(userBalance.toString(10)),pendingBalance:parseFloat(pendingBalance.toString(10)),balance4ME:val,vestedTokens:parseFloat(vestedTokens.toString(10)),totalVested:parseFloat(totalVested.toString(10))})
            }
        }
                    
        
        this.setState({loading:true});
        console.log(this.state)
        
    }

    handleLockedDepositChange = (e) =>{
        if(e.target.value !=''){
            this.setState({depositMelonLocked:parseFloat(e.target.value)})
        }else{
            this.setState({depositMelonLocked:(e.target.value)})
        }
        
    }

    handleUnlockedDepositChange = (e) =>{
        if(e.target.value !=''){
            this.setState({depositMelonUnlocked:parseFloat(e.target.value)})
        }else{
            this.setState({depositMelonUnlocked:(e.target.value)})
        }
        
    }

    depositMelonUnlocked = async () => {
        if(this.state.walletConnected && this.state.loading){
            let data = await this.getLpTokenApproval('unlocked')
            if(data>0){
                this.depositTransact(data,'unlocked');
           }
        }else{
            toastr.error('Please Connect your wallet')
        }
    }

    depositMelonLocked = async () => {
        if(this.state.walletConnected && this.state.loading){
            let data = await this.getLpTokenApproval('locked')
            if(data>0){
                this.depositTransact(data,'locked');
           }
        }else{
            toastr.error('Please Connect your wallet')
        }
    }

    getLpTokenApproval =async (mode) => {
        console.log(this.state.account)
        web3 = this.props.metamsk.web3
        let approvedX = -1;
        let address = null;
        let i=0;
        if(this.state.depositMelonUnlocked >= 0.0 || this.state.depositMelonLocked >= 0.0){
            address = ELON_ADD;
            const erc20abiContract = new this.props.metamsk.web3.eth.Contract(ELON_ABI, address);
            let ammount = null;
            if(mode.toLowerCase() === 'locked'){
                ammount = new BigNumber(this.state.depositMelonLocked).multipliedBy(Math.pow(10,18));
            }else{
                ammount = new BigNumber(this.state.depositMelonUnlocked).multipliedBy(Math.pow(10,18));
            }
            let result = null;
            try{
                result =  await erc20abiContract.methods.approve(MELON_VESTING,ammount.toString(10)).send({from:this.state.account});
            }catch(err){
                console.log(err)
                toastr.error('Error Occured while getting Permission.. Please try Again !!!')
                return [];
            }
            if(result.code !== 4001){
                approvedX = (ammount.toString(10));
            }else{
                toastr.error(result.message)
                approvedX = -1;
                this.setState({depositPermission:false})
            }
        }
        return approvedX;
    }

    depositTransact = async(data,mode) =>{
        if(data>0.0){
            let contract = null
            let depositResult = null;
            data = new BigNumber(data)
            contract = new this.props.metamsk.web3.eth.Contract(MELON_VESTING_ABI, MELON_VESTING);
            console.log(data.toString(10))
            if(mode.toLowerCase() === 'unlocked'){
                try{
                    depositResult = await contract.methods.lock_create(data.toString(10),1622907004).send({from:this.state.account});
                }catch(err){
                    console.log(err)
                    toastr.error(err.message);
                }
                if(depositResult){
                    toastr.success('Transaction Succesful')
                    this.loadBlockchainData('both');
                    this.setState({depositMelonUnlocked:0,depositMelonLocked:0});
                }
            }else{
                try{
                    depositResult = await contract.methods.lock_create(data.toString(10),1655137804).send({from:this.state.account});
                }catch(err){
                    console.log(err)
                    toastr.error(err.message);
                }
                if(depositResult){
                    toastr.success('Transaction Succesful')
                    this.loadBlockchainData('both');
                    this.setState({depositMelonUnlocked:0,depositMelonLocked:0});
                }
            }
            
        }else{
            toastr.error('Please enter valid deposit amount')
        }
        
            
    }

    widthrawMelon = async (mode) => {
        if(this.state.walletConnected && this.state.loading){
            if(this.state.depositMelonUnlocked>0){
                let contract = null
                let result=null;
                contract = new this.props.metamsk.web3.eth.Contract(MELON_VESTING_ABI, MELON_VESTING);
                try{
                    result = await contract.methods.withdraw().send({from:this.state.account});
                }catch(err){
                    toastr.error(err.message)
                }
                if(result && result.code !== 4001){
                    toastr.success('Transaction Complete')
                    await this.loadBlockchainData('both')
                    this.setState({depositMelonUnlocked:0,depositMelonLocked:0})
                }
            }else{
                toastr.error('Please Enter valid amount')
                
            }
        }else{
            toastr.error('Please Connect your wallet')
        }
    }

    render() {
        return StakeMelon.call(this);
    }
}

export default StakeMelonView
