import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from "react-router-dom";
import '../src/assets/scss/common.scss';

import { useEffect, useState } from "react";
import { useMetamask }         from "use-metamask";

import './toastr.min.css'

import HomeView from './views/home/home';
import AboutView from './views/about/about';
import DocsView from './views/docs/docs';
import StakeLpView from './views/stake-lp/stake-lp';
import StakeMelonView from './views/stake-melon/stake-melon';

function App () {
  const { getAccounts, getChain,metaState } = useMetamask();
  const [ web3interface ] = useState("web3");

  useEffect(() => {
    if (metaState.isAvailable && !metaState.isConnected) {
      (async () => {
        try {
          // await getAccounts();
          // await getChain();
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [metaState.isAvailable, web3interface]);

  return (
    <Router>
        <Switch>
          <Route exact={true} path="/home" render={()=><HomeView metamsk={metaState} />}/>
          <Route
            exact
            path="/"
            render={() => {
              return (
                
                  <Redirect to="/home" />  
                   
              )
            }}
          />
          <Route exact path="/about" component={AboutView} />
          <Route exact path="/docs" component={DocsView} />
          <Route exact path="/stake-lp" render={()=><StakeLpView metamsk={metaState} />}/>
          <Route exact path="/stake-melon" component={StakeMelonView} />
        </Switch>
    </Router>
  );
}

export default App;
