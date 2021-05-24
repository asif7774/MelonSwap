import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from "react-router-dom";
import '../src/assets/scss/common.scss';

import HomeView from './views/home/home';
import AboutView from './views/about/about';
import DocsView from './views/docs/docs';
import StakeLpView from './views/stake-lp/stake-lp';
import StakeMelonView from './views/stake-melon/stake-melon';

function App () {
  return (
    <Router>
        <Switch>
          <Route exact={true} path="/home" component={HomeView} />
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
          <Route exact path="/stake-lp" component={StakeLpView} />
          <Route exact path="/stake-melon" component={StakeMelonView} />
        </Switch>
    </Router>
  );
}

export default App;
