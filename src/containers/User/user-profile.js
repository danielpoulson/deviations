import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserProfileForm from 'components/User/user-profile-form';
import UserSelect from 'components/User/user-select';
import {usersFormattedForDropdown} from '../../selectors/selectors';
import {userFormIsValid} from './user-form-validation';
import toastr from 'toastr';

import { getUser, getUsers, createUser, resetUser, saveUser, deleteUser } from 'actions/actions_users';

class UserProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isNewUser: false,
      user: Object.assign({}, props.user),
      errors: {}
    };

    this.saveUser = this.saveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.newUser = this.newUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user._id != nextProps.user._id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({user: Object.assign({}, nextProps.user)});
    }
  }

  onChange(event) {
    this.props.getUser(event.target.value);
  }

  newUser() {
    this.setState({ isNewUser: true });
    this.props.resetUser();
  }

  onCancel(event) {
    event.preventDefault();
    this.setState({ isNewUser: false });
  }

  deleteUser(event) {
    event.preventDefault();
    this.props.deleteUser(this.props.user._id);
    toastr.warning('User account has been deleted', 'User Account', { timeOut: 1000 });
    // TODO: LOW 3 Remove server call to repopulate user after delete
    // When the action to delteUser is call the action does not remove the user from the state tree.
    // See Actions Users deleteUser
    this.props.getUsers();
    this.props.resetUser();
  }

  saveUser(event) {
    event.preventDefault();
    let _user = this.state.user;

    let validation = userFormIsValid(_user);
    this.setState({errors: validation.errors});

    if(!validation.formIsValid) {
      return; 
    }

    if (this.state.isNewUser) {
      this.props.createUser(_user);
      this.setState({ isNewUser: false });
      toastr.success('New user account has been created', 'User Account', { timeOut: 1000 });
    } else {
      this.props.saveUser(_user);
      toastr.success('User account has been saved', 'User Account', { timeOut: 1000 });
    }
    this.props.resetUser();
    this.props.getUsers();
  }

  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  render() {

    const panelStyle = {
      backgroundColor: '#fcfffc',
      border: 'solid 1px',
      height: 370,
      borderRadius: 4,
      marginRight: 0,
      marginLeft: 0,
      padding: 15
    };

    const formStyle = {
      paddingTop: 15
    };

    const roleSelect = [{value: 'user', text: 'user'}, {value: 'admin', text: 'admin'}];

    return (

      <div>
        <div className="section-header">
          <div className="col-sm-6 pull-left">
            <p className="section-header-text-main">User Profiles </p>
          </div>
        </div>

        <div style={panelStyle}>
            {this.state.isNewUser ? null :
              <UserSelect users={this.props.users} onChange={this.onChange} newUser={this.newUser} />
            }
          <div style={formStyle}>
            <UserProfileForm
              errors={this.state.errors}
              user={this.state.user}
              newUser={this.state.isNewUser}
              onSave={this.saveUser}
              deleteUser={this.deleteUser}
              onCancel={this.onCancel}
              onChange={this.updateUserState}
              roleSelect={roleSelect} />
          </div>
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
  deleteUser: PropTypes.func

};

UserProfile.contextTypes = {
  router: React.PropTypes.object.isRequired
};

UserProfile.childContextTypes = {
  location: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,  
    users: usersFormattedForDropdown(state.users)
  };
}

export default connect(mapStateToProps,
{ getUser, createUser, resetUser, saveUser, deleteUser, getUsers })(UserProfile);
