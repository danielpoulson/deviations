import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from 'components/Login/login';
import NavBar from 'layouts/Navigation/nav-bar';

import { getUserDashboard, login } from 'actions/actions_main';

/* component styles */
import './styles.scss';

@connect(
  state => ({ fullname: state.main.user.fullname }), { getUserDashboard, login }
)

export class Header extends Component {

  state = {
    login: {},
  };

  onLogin = (e) => {
    e.preventDefault();
    this.props.login(this.state.login);
    this.props.getUserDashboard(this.state.login.username);
  };

  setStateLogin = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    this.state.login[name] = value;
    return this.setState({ login: this.state.login });
  };

  render() {
    const textStyle = {
      color: 'white',
    };

    const loginStyle = {
      marginTop: 5,
    };


    return (
        <div>
            <div className="topband">
                <section className="col-sm-12 dp-nav-section ">
                    <div className="col-sm-5">
                        <h3 className="topband_h1">Change Control</h3>
                    </div>
                    <div className="col-sm-7" style={loginStyle}>
                        { !this.props.fullname ?
                          <Login
                            login={this.state.login}
                            onChange={this.setStateLogin}
                            onLogin={this.onLogin}
                          /> :
                            <p style={textStyle} className="pull-right">Welcome: {this.props.fullname}</p>
                        }
                    </div>
                </section>

            </div>
            <NavBar />
        </div>
      );
  }
}

Header.propTypes = {
  login: React.PropTypes.object,
  fullname: React.PropTypes.string,
};
