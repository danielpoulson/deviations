import React, { Component } from 'react';
import { connect } from 'react-redux';
/* global styles for app */

import '../../styles/bootstrap/css/bootstrap.min.css';
import '../../styles/font-awesome/css/font-awesome.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import '../../styles/react-select.css';
import 'toastr/build/toastr.min.css';
import '../../styles/styles.css';

import { getAllTasks } from '../../actions/actions_tasks';
import { setUser, getGraphData } from '../../actions/actions_main';
import { getUsers } from '../../actions/actions_users';


/* application components */
import Header from '../../layouts/Header';

class App extends Component {
  props: {
    children: any,
    getAllTasks: any,
    getChanges: any,
    getUsers: any,
    setUser: any
  }

  componentWillMount() {
    const authorised = sessionStorage.getItem('authorised');
    this.props.getAllTasks();
    this.props.getUsers();
    this.props.getGraphData();
    if (authorised === 'true') {
      this.props.setUser();
    }
  }

  render() {
    return <Header />;
  }
}

export default connect(null, { getAllTasks, setUser, getGraphData, getUsers })(App);
