import React from 'react';
import { useMetamask }         from "use-metamask";

import Web3                    from "web3";


function ConnectorButton ({props,account}) {
    console.log(props,account)
  const { connect } = useMetamask();
    return (
        !props? <button className="btn secondary-btn header-connect" onClick={()=>connect(Web3)} >Connect</button> : <button className="btn secondary-btn header-connect">{account.substring(0,7)+'...'}</button>
    );
}




export default ConnectorButton;