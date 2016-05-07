import React, { PropTypes } from 'react';
import Combobox from 'components/Common/combo-box';

const UserSelect = (props) => {
  const fnStyle = {
    marginLeft: 40,
    paddingTop: 20,
    paddingBottom: 10,
  };

  return (
    <div className="col-sm-12">
      <div style={fnStyle} className="col-sm-6">
        <Combobox
          name="Full Name"
          label="Select user"
          data={props.users}
          dpInputCol="col-sm-9"
          dpLabelCol="col-sm-3"
          onChange={props.onChange}
          defaultValue={props.users[0]} />
      </div>
      <div style={fnStyle} className="col-sm-3">
        <button className="btn btn-info" onClick={props.newUser}>
          New User
        </button>
      </div>
    </div>
  );
};

UserSelect.propTypes = {
  users: PropTypes.array,
  onChange: PropTypes.func,
  newUser: PropTypes.func.isRequired,
};

export default UserSelect;
