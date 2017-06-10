import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getFiles } from '../../actions/actions_files';
import { logoutUser } from '../../actions/actions_main';

import './styles.css';

class NavBar extends React.Component {
  props: {
    username: string,
    getFiles: any,
    logoutUser: any
  }

  constructor(props) {
    super(props);
    this.state = {
      homeTab: 'active',
      devTab: null,
      tasksTab: null,
      filesTab: null
    };

    this.onLogoutUser = this.onLogoutUser.bind(this);
    this.getFileList = this.getFileList.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
  }

  onLogoutUser() {
    sessionStorage.setItem('authorised', false);
    sessionStorage.setItem('username', false);
    this.props.logoutUser();
  }

  getFileList() {
    this.props.getFiles('exp');
  }

  setActiveItem(e) {
    const tabPressed = e.target.offsetParent.id;
    this.setState({ homeTab: null });
    this.setState({ devTab: null });
    this.setState({ tasksTab: null });
    this.setState({ filesTab: null });
    this.setState({ [tabPressed]: 'active' });
  }

  render() {
    return (
        <div className="styles">
          <nav className="navbar navbar-default">
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav dpHand">
                <li className={this.state.homeTab} onClick={this.setActiveItem}>
                  <Link id="homeTab" to="/"><i className="fa fa-home fa-fw"></i>&nbsp; Home</Link>
                </li>
                <li className={this.state.devTab} onClick={this.setActiveItem}>
                  <Link id="devTab" to="/deviations" ><i className="fa fa-list-ul fa-fw"></i>&nbsp; Deviations</Link>
                </li>
                <li className={this.state.tasksTab} onClick={this.setActiveItem}>
                  <Link id="tasksTab" to="/tasks" ><i className="fa fa-tasks fa-fw"></i>&nbsp; Tasks</Link>
                </li>
                <li className={this.state.filesTab} onClick={this.setActiveItem}>
                  <Link to="/export" id="filesTab" onClick={this.getFileList}><i className="fa fa-file-text-o fa-fw"></i>&nbsp; Files</Link>
                </li>
                <li>
                  <Link to="/" onClick={this.onLogoutUser}><i className="fa fa-sign-out fa-fw"></i>&nbsp; Logout ({this.props.username})</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
    );
  }
}

export default connect(
  state => ({ username: state.main.user.username }),
  { getFiles, logoutUser }
)(NavBar);
