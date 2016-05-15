import React, { PropTypes } from 'react';
import ComboBox from 'components/Common/combo-box';
import { labStyle } from './user-style.scss';

const UserSelect = (props) => {
  const fnStyle = {
    marginLeft: 40,
    paddingTop: 20,
    paddingBottom: 10,
  };

  return (
    <div>
      <ComboBox
        label="Full Name"
        data={props.users}
        defaultValue={props.users[0]}
        labelstyle={`col-sm-2 control-label ${labStyle}`}
        inputdiv="col-sm-4"
        onChange={props.onChange}
        { ...props.users  }
      />
    
      <button className="btn btn-info" onClick={props.newUser}>
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
