import React, { Component } from 'react';
import { connect } from 'react-redux';
/* global styles for app */

import 'scss/bootstrap/css/bootstrap.min.css';
import 'scss/font-awesome-4.5.0/css/font-awesome.min.css';
import 'react-widgets/lib/less/react-widgets.less';
import 'scss/react-select.css';
import 'scss/toastr.scss';
import 'scss/styles.scss';

import { getAllTasks } from 'actions/actions_tasks';
import { setUser } from 'actions/actions_main';
import { getUsers } from 'actions/actions_users';


/* application components */
import { Header } from 'layouts/Header';
import { Footer } from 'layouts/Footer';

@connect(null, { getAllTasks, setUser, getUsers })

export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
    getAllTasks: React.PropTypes.func,
    getUsers: React.PropTypes.func,
    setUser: React.PropTypes.func,
  };

  componentWillMount() {
    const authorised = sessionStorage.getItem('authorised');
    this.props.getAllTasks();
    this.props.getUsers();
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
        <div className="">
            {this.props.children}
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    );
  }
}
