import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

/* containers */
import App from './containers/App';
import Home from './containers/Home/home';
import Deviations from './containers/Deviations/deviations';
import DeviationDetail from './containers/Deviations/deviation-detail';
import DeviationPrintContainer from './containers/Deviations/deviation-print.container';
import TaskDetail from './containers/Tasks/task-details';
import Tasks from './containers/Tasks/tasks';
import User from './containers/User/user-profile';
import Export from './components/Files/file-export';
import { Footer } from './layouts/Footer';

function requireAuth(nextState, replace) {
  const authorised = sessionStorage.getItem('authorised');

  if (authorised === 'false' || !authorised) {
    replace({ pathname: '/', state: { nextPathname: nextState.location.pathname } });
  }
}

const Routes = () => (
  <Router>
    <div className="container">
      <App />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/deviations" component={Deviations} onEnter={requireAuth} />
        <Route path="/deviation/:id" component={DeviationDetail} onEnter={requireAuth} />
        <Route path="/printdeviation" component={DeviationPrintContainer} onEnter={requireAuth} />
        <Route path="/task/:id" component={TaskDetail} onEnter={requireAuth} />
        <Route path="/tasks" component={Tasks} onEnter={requireAuth} />
        <Route path="/user" component={User} onEnter={requireAuth} />
        <Route path="/export" component={Export} onEnter={requireAuth} />
        <Redirect from="/home" to="/" />
        <Route status={404} path="*" component={Home} />
      </Switch>
      <Footer />
    </div>
  </Router>
);
export default Routes;
