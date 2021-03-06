import PropTypes from 'prop-types';
import React from 'react';
import SelectInput from '../Common/select-input';
import './user-style.css';

const UserSelect = (props) => {
  // const fnStyle = {
  //   marginLeft: 40,
  //   paddingTop: 20,
  //   paddingBottom: 10
  // };

  return (
    <div>
      <SelectInput
        name="user"
        label="Fullname"
        labelstyle="col-sm-2 control-label labStyle"
        inputdiv="col-sm-4"
        value={props.user}
        defaultOption="Select User"
        options={props.users}
        onChange={props.onChange}/>
    
      <button className="btn btn-info dp-margin-5-LR" onClick={props.newUser}>
        New User
      </button>

    </div>
  );
};

UserSelect.propTypes = {
  users: PropTypes.array,
  user: PropTypes.object,
  onChange: PropTypes.func,
  newUser: PropTypes.func.isRequired
};

export default UserSelect;
