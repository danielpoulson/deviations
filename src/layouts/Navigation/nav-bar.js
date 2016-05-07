import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getFiles } from 'actions/actions_files';
import { logoutUser } from 'actions/actions_main';

import { styles } from './styles.scss';

@connect(
  state => ({ username: state.main.user.username }),
  { getFiles, logoutUser }
)

export class NavBar extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static childContextTypes = {
    location: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      homeTab: 'active',
      changeTab: null,
      tasksTab: null,
      filesTab: null,
    };
  }

  onLogoutUser = () => {
    sessionStorage.setItem('authorised', false);
    sessionStorage.setItem('username', false);
    this.props.logoutUser();
    this.context.router.push('/');

  };

  getFileList = () => {
    this.props.getFiles('exp');
    this.context.router.push('/export');
  };

  setActiveItem = (e) => {
    const tabPressed = e.target.offsetParent.id;
    this.setState({ homeTab: null });
    this.setState({ changesTab: null });
    this.setState({ tasksTab: null });
    this.setState({ filesTab: null });
    this.setState({ [tabPressed]: 'active' });
  };

  render() {
    return (
        <div className={`${styles}`}>
          <nav className="navbar navbar-default">
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav dpHand">
                <li className={this.state.homeTab} onClick={this.setActiveItem}>
                  <Link id="homeTab" to="/"><i className="fa fa-home fa-fw"></i>&nbsp; Home</Link>
                </li>
                <li className={this.state.changesTab} onClick={this.setActiveItem}>
                  <Link id="changesTab" to="/changes" activeClassName="active"><i className="fa fa-list-ul fa-fw"></i>&nbsp; Changes</Link>
                </li>
                <li className={this.state.tasksTab} onClick={this.setActiveItem}>
                  <Link id="tasksTab" to="/tasks" activeClassName="active"><i className="fa fa-tasks fa-fw"></i>&nbsp; Tasks</Link>
                </li>
                <li className={this.state.filesTab} onClick={this.setActiveItem}>
                  <a id="filesTab" onClick={this.getFileList}><i className="fa fa-file-text-o fa-fw"></i>&nbsp; Files</a>
                </li>
                <li>
                  <a onClick={this.onLogoutUser}><i className="fa fa-sign-out fa-fw"></i>&nbsp; Logout ({this.props.username})</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
    );
  }
}

NavBar.propTypes = {
  username: PropTypes.string,
  getFiles: PropTypes.func,
  logoutUser: PropTypes.func,
};

export default NavBar;
