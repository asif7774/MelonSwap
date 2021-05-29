import React, { Component } from 'react';
import HomeHtml from './home.html'

import toastr from 'toastr'
import BigNumber from "bignumber.js";
import { CONTRACT_ABI_POOL, CONTRACT_ADDRESS_POOL, ERC_20_ABI,LP_TOKEN_ADD} from '../../config/config'
import Web3 from "web3";

let web3;

const precision = 10**18;

class HomeView extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            basePoolCoins:[{name:'USDT',balance:-1,walletBalance:0,index:0,add:'0x1233ce9e6f492c12c4d76a248cb35db7ccff8c48',type:'baseToken'},{name:'DAI',balance:-1,walletBalance:0,index:1,add:'0x1416595fcdc0e03e06cec02f69446903664e1efb',type:'baseToken'},{name:'BUSD',balance:-1,walletBalance:0,index:2,add:'0x69d3c174a0e284c189a58fcfec43adc37737b681',type:'baseToken'},{name:'USDC',balance:-1,walletBalance:0,index:3,add:'0x7a3294500b45b4e9aa35d11f367a0f5042ab589a',type:'baseToken'},{name:'4ME',balance:-1,walletBalance:0,index:4,add:LP_TOKEN_ADD,type:'lpToken'}],
            metaPoolVaiCoins : [{name:'VAI',balance:0},{name:'BUSD',balance:0},{name:'USDT',balance:0},{name:'DAI',balance:0},{name:'USDC',balance:0}],
            secondaryCoin : [{name:'DAI',balance:-1,walletBalance:0,index:1,add:'0x1416595fcdc0e03e06cec02f69446903664e1efb',type:'baseToken'},{name:'USDC',balance:-1,walletBalance:0,index:3,add:'0x7a3294500b45b4e9aa35d11f367a0f5042ab589a',type:'baseToken'},{name:'BUSD',balance:-1,walletBalance:0,index:2,add:'0x69d3c174a0e284c189a58fcfec43adc37737b681',type:'baseToken'}],
            inputCoin : 'USDT',
            outPutCoin : 'DAI',
            poolInfo : [{poolIndex:0,name:"4 POOL",type:'base'},{poolIndex:1,name:"VAI POOL",type:"meta"}],
            selectedPool : 0,
            BUSD:0,
            USDT:0,
            DAI:0,
            VAI:0,
            USDC:0,
            walletConnected:false,
            expectedOutput:0,
            inputValue:0,
            maxSlipage : 0.1,
            priceImpact:0,
            chainId : '',
            loading:false,
            web3:null,
            contractError:false

        }
        

    }

    componentDidMount(){
        BigNumber.config({ EXPONENTIAL_AT: 1e+9 })
        console.log(this.props);
        window.scrollTo(0, 0);
        if(this.props.metamsk.account.length === 0 && this.props.metamsk.chain.id===null){
            this.setState({walletConnected:false})
        }else if(this.props.metamsk.account.length>0 && this.props.metamsk.chain.id==='97'){
            this.setState({account:this.props.metamsk.account[0],chainId:this.props.metamsk.chain.id,walletConnected:true})
        }
        this.changeWeb3()

    }

    changeWeb3=()=>{
        if(this.props.metamsk.chain.id === '97'){
            web3 = new Web3(Web3.givenProvider) 
            toastr.success('Wallet Connected')
            this.loadBlockchainData();
        }else{
            web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/")
            this.setState({walletConnected:false})
            this.loadBlockchainData();
        }
        this.setState({web3:web3})
        
    }

    componentDidUpdate(prevProps){
        if(this.state.walletConnected && this.props.metamsk.chain.id!=='97'){
            if(prevProps.metamsk.chain.id!==this.props.metamsk.chain.id){
                window.location.reload();
            }
        }
        if(prevProps.metamsk.account!==this.props.metamsk.account || prevProps.metamsk.chain.id !== this.props.metamsk.chain.id ){
            if(this.props.metamsk.chain.id === '97'){
                this.setState({account:this.props.metamsk.account[0],chainId:this.props.metamsk.chain.id,walletConnected:true});
                this.changeWeb3()
            }else{
                if(this.props.metamsk.chain.id !== null){
                    toastr.error('Please connect to Binance Smart Chain')
                }
            }
        }
        
    }

    loadBlockchainData = async ()=>{
        this.setState({loading:false})
        let contract= null;
        switch(this.state.selectedPool){
            case 0 :  contract = new web3.eth.Contract(CONTRACT_ABI_POOL, CONTRACT_ADDRESS_POOL);
                        this.setState({ contract })
                        let balances = this.state.basePoolCoins;
                        
                            for(let i=0;i<this.state.basePoolCoins.length;++i){
                                let val = null;
                                try{
                                    val = await contract.methods.balances(i).call();
                                }catch(err){
                                        this.setState({contractError:true})
                                }
                                if(val){
                                val = new BigNumber(val).dividedBy(precision);
                                balances[i].balance = parseFloat(val.toString(10));
                                }
                            }
                       
                       
                        if(this.state.walletConnected ){
                            var contractData = ('0x70a08231000000000000000000000000' + this.state.account.substring(2));
                            for(let i=0;i<this.state.basePoolCoins.length;++i){
                                let val = await web3.eth.call({to:this.state.basePoolCoins[i].add,data:contractData});
                                val = new BigNumber(val).dividedBy(precision);
                                console.log(this.state.account,val.toString(10));
                                balances[i].walletBalance = parseFloat(val.toString(10));
                            }
                        }
                        
                       this.setState({basePoolCoins:balances})
                        break;
        }
        if(this.state.contractError){
            this.setState({loading:false});
        }else{
            this.setState({loading:true});
        }
        this.setState({loading:true});
        
    }

    getXY = () =>{
        let result= {x:-1,y:-1}
        console.log(this.state.inputCoin,this.state.outPutCoin)
        console.log(this.state.basePoolCoins.find((val)=>{
            console.log(val.name,this.state.inputCoin)
            return val.name.toLowerCase() === this.state.inputCoin.toLowerCase();
        }).index)
        switch(this.state.selectedPool){
            case 0: result.x= this.state.basePoolCoins.find((val)=>{
                        return val.name.toLowerCase() === this.state.inputCoin.toLowerCase();
                    }).index
                    result.y=this.state.basePoolCoins.find((val)=>{
                        return val.name.toLowerCase() === this.state.outPutCoin.toLowerCase();
                    }).index
        }

        return result

    }

    getPriceEstimate= async(e)=>{
        let estOutput = null;
        try{
            estOutput = await this.getPriceEstimateFunction(e.target.value);
        }catch(err){
            estOutput = await  this.getPriceEstimateFunction(e.target.value)
            console.log(err)
        }
        let inputVal = new BigNumber(parseFloat(e.target.value)).multipliedBy(precision);
        let bigEstOutput = new BigNumber(estOutput);
        let priceImpact = inputVal.minus(bigEstOutput);
        priceImpact = priceImpact.dividedBy(inputVal);
        priceImpact = priceImpact.multipliedBy(100)
        this.setState({priceImpact:parseFloat(priceImpact.toString(10))});
        this.setState({expectedOutput:bigEstOutput.dividedBy(precision).toString(10)});
        
    }

    getPriceEstimateFunction = async (input) =>{
        let contract = new web3.eth.Contract(CONTRACT_ABI_POOL, CONTRACT_ADDRESS_POOL);
        let xy = this.getXY() 
        console.log(xy)
        if(contract){
            let inputVal = new BigNumber(parseFloat(input)).multipliedBy(precision);
            let estOutput = null
            try{
                estOutput = await contract.methods.get_dy(xy.x,xy.y,inputVal.toString(10)).call()
            }catch(err){
                toastr.error('Network Error')
            }
            return estOutput 
        }
    }

    swap = async() =>{
        console.log(this.state.walletConnected,this.state.loading)
        if(this.state.walletConnected && this.state.loading){
            let xy = this.getXY();
            let address = null;
            let walletBalance =0;
            switch(this.state.selectedPool){
                case 0 : address = this.state.basePoolCoins[xy.x].add
                        walletBalance = this.state.basePoolCoins[xy.x].walletBalance
                        break;
            }
            if(parseFloat(this.state.inputValue) < walletBalance ){
                const erc20abiContract = new web3.eth.Contract(ERC_20_ABI, address);
                let ammount = new BigNumber(parseFloat(this.state.inputValue)).multipliedBy(precision);
                let result = null;
                try{
                    result = await erc20abiContract.methods.approve(CONTRACT_ADDRESS_POOL,ammount.toString(10)).send({from:this.state.account});
                }catch(err){
                    toastr.error(err.message)
                }
                if(result && result.code !== 4001){
                    let inputValue= new BigNumber(parseFloat(this.state.inputValue)*precision)
                    let minOutput = parseFloat(this.state.inputValue)*(1-(this.state.maxSlipage/100))
                    minOutput=new BigNumber(minOutput*Math.pow(10,18))
                    let finalResult = null;
                    try{
                        finalResult = await this.state.contract.methods.exchange(xy.x,xy.y,inputValue.toString(10),minOutput.toString(10)).send({from:this.state.account});
                    }catch(err){
                        this.setState({inputValue:0,expectedOutput:0,priceImpact:0.0})
                    toastr.error(err.message)
                    }
                    if(finalResult){
                        this.setState({inputValue:0,expectedOutput:0,priceImpact:0.0})
                        this.loadBlockchainData('pool');
                        toastr.success('transaction Successful')
                    }
                }
            }else{
                toastr.error('Insufficient Balance')
            }
            
        }else{
            toastr.error('Please Connect your wallet')
        }
        
        
    }

    onInputChange=(e)=>{
        this.setState({inputCoin:e.target.value})
        switch(this.state.selectedPool){
            case 0: this.setState({inputCoin:e.target.value},function() {
                console.log(this.state.inputCoin);
                let arr = this.state.basePoolCoins.filter(val=>val.name.toLowerCase()!==this.state.inputCoin.toLowerCase())
                this.setState({secondaryCoin:arr,outPutCoin:arr[0].name});
                
                }) 
                break;
            case 1 : this.setState({inputCoin:e.target.value},function() {
                console.log(this.state.inputCoin);
                let arr = this.state.metaPoolVaiCoins.filter(val=>val.name.toLowerCase()!==this.state.inputCoin.toLowerCase())
                this.setState({secondaryCoin:arr,outPutCoin:arr[0].name});
                
                }) 
                break;
        }
        
            this.getPriceEstimate({target:{value:this.state.inputValue}});
        
    }

    manageContract = (index)=>{

       
        switch(index){
            case 0 : this.setState({inputCoin:this.state.basePoolCoins[0].name,selectedPool:0},function() {
                        console.log(this.state.inputCoin);
                        this.setState({secondaryCoin:this.state.basePoolCoins.filter(val=>val.name.toLowerCase()!==this.state.inputCoin.toLowerCase())});
                        
            });
            break;
            case 1 : this.setState({inputCoin:this.state.metaPoolVaiCoins[0].name,selectedPool:1},function() {
                console.log(this.state.inputCoin);
                this.setState({secondaryCoin:this.state.metaPoolVaiCoins.filter(val=>val.name.toLowerCase()!==this.state.inputCoin.toLowerCase())});});
                break;
                
        }
        
       
    }
    
    render() {
        return HomeHtml.call(this);
    }
}

export default HomeView
