import React, { PropTypes } from 'react';
import SelectInput from 'components/Common/select-input';
import { labStyle } from './user-style.scss';

const UserSelect = (props) => {
  const fnStyle = {
    marginLeft: 40,
    paddingTop: 20,
    paddingBottom: 10,
  };

  return (
    <div>
      <SelectInput
        name="user"
        label="Fullname"
        labelstyle={`col-sm-2 control-label ${labStyle}`}
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
  onChange: PropTypes.func,
  newUser: PropTypes.func.isRequired,
};

export default UserSelect;
