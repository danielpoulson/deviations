import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from 'containers/App';
import Home from 'containers/Home/home';
import Changes from 'containers/Changes';
import ChangeDetail from 'containers/ChangeDetail';
import TaskDetail from 'containers/Tasks/task-details';
import Tasks from 'containers/Tasks/tasks';
import User from 'containers/User/user-profile';
import Export from 'components/Files/file-export';

function requireAuth(nextState, replace) {
  const authorised = sessionStorage.getItem('authorised');

  if (authorised === 'false' || !authorised) {
    replace({ pathname: '/', state: { nextPathname: nextState.location.pathname } });
  }
}

export default (
  <Route path="/" component={App}>
    <Route path="changes" component={Changes} onEnter={requireAuth} />
    <Route path="change/:id" component={ChangeDetail} onEnter={requireAuth} />
    <Route path="task/:id" component={TaskDetail} onEnter={requireAuth} />
    <Route path="tasks" component={Tasks} onEnter={requireAuth} />
    <Route path="user" component={User} onEnter={requireAuth} />
    <Route path="export" component={Export} onEnter={requireAuth} />
     <IndexRoute component={Home} />
    <Route status={404} path="*" component={Home} />
  </Route>
);
