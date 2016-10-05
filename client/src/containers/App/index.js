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
import { Footer } from '../../layouts/Footer';

class App extends Component {

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
    return (
      <div className="container">
        <div className="">
          <Header />
        </div>
        <div>
            {this.props.children}
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.any,
  getAllTasks: React.PropTypes.func,
  getGraphData: React.PropTypes.func,
  getUsers: React.PropTypes.func,
  setUser: React.PropTypes.func
};

export default connect(null, { getAllTasks, setUser, getGraphData, getUsers })(App);
