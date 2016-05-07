import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserProfileForm from 'components/User/user-profile-form';
import UserSelect from 'components/User/user-select';
import toastr from 'toastr';

import { getUser, getUsers, createUser, resetUser, saveUser, deleteUser } from 'actions/actions_users';

class UserProfile extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static childContextTypes = {
    location: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isNewUser: false,
    };

    this.saveUser = this.saveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.newUser = this.newUser.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.props.getUser(value);
  }

  newUser() {
    this.setState({ isNewUser: true });
    this.props.resetUser();
  }

  deleteUser(event) {
    event.preventDefault();
    this.props.deleteUser(this.props.user._id);
    toastr.warning('User account has been deleted', 'User Account', { timeOut: 1000 });
    // TODO: LOW 3 Remove server call to repopulate user after delete
    // When the action to delteUser is call the action does not remove the user from the state tree.
    // See Actions Users deleteUser
    this.props.getUsers();
  }

  saveUser(data) {
    if (this.state.isNewUser) {
      this.props.createUser(data);
      this.setState({ isNewUser: false });
      toastr.success('New user account has been created', 'User Account', { timeOut: 1000 });
    } else {
      this.props.saveUser(data);
      toastr.success('User account has been saved', 'User Account', { timeOut: 1000 });
    }
  }

  render() {

    const formStyle = {
      backgroundColor: '#fcfffc',
      border: 'solid 1px',
      borderRadius: 4,
      marginRight: 0,
      marginLeft: 0,
      padding: 15,

    };

    const roleSelect = ['user', 'admin'];

    return (

      <div>
        <div>
          <div className="section-header">
            <div className="col-sm-6 pull-left">
              <p className="section-header-text-main">User Profiles </p>
            </div>
          </div>
        </div>

        { this.state.isNewUser ? null :
          <UserSelect users={this.props.users} onChange={this.onChange} newUser={this.newUser} />
        }

        <div className="row" style={formStyle}>
          <UserProfileForm
            onSubmit={this.saveUser}
            deleteUser={this.deleteUser}
            roleSelect={roleSelect} />
        </div>

      </div>
    );

  }
}

UserProfile.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
  resetUser: PropTypes.func,
  getUser: PropTypes.func,
  getUsers: PropTypes.func,
  createUser: PropTypes.func,
  saveUser: PropTypes.func,
  deleteUser: PropTypes.func,

};

export default connect(state => ({ users: state.users, user: state.user }),
{ getUser, createUser, resetUser, saveUser, deleteUser, getUsers })(UserProfile);
