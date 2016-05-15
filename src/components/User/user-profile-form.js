import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import TextInputTask from 'components/Common/form-text-input';
import ComboBox from 'components/Common/combo-box';
export const fields = ['_id', 'fullname', 'username', 'email', 'dept', 'role', 'password'];

const newdata = {  // used to populate "account" reducer when "Load" is clicked
  role: 'user',
};

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'This field is required';
  } else if (values.username.length < 5) {
    errors.username = 'Must more than 6 characters';
  }

  if (!values.fullname) {
    errors.fullname = 'This field is required';
  } else if (values.fullname.length < 8) {
    errors.fullname = 'Must more than 8 characters';
  }

  if (!values.email) {
    errors.email = 'This field is required';
  } else if (values.email.length < 8) {
    errors.email = 'Must more than 8 characters';
  }

  return errors;
};

@reduxForm({
  form: 'user',
  fields,
  validate
}, state => ({
  initialValues: state.user ? state.user : newdata,
})
)

export default class UserProfileForm extends React.Component {

  render() {
    const {
      fields: { fullname, username, email, role, password },
        handleSubmit,
        deleteUser,
        onCancel,
        roleSelect,
        newUser,
      } = this.props;

    return (
      <div>
        <form className="form form-horizontal" onSubmit={handleSubmit}>

          <TextInputTask
            name="username"
            label="User Name"
            placeholder="Enter Users username (Required)"
            labelstyle="col-sm-2 control-label"
            inputdiv="col-sm-3"
            {...username}
          />

          <TextInputTask
            name="fullname"
            label="Full Name"
            placeholder="Enter Users fullname (Required)"
            labelstyle="col-sm-2 control-label"
            inputdiv="col-sm-3"
            {...fullname}
          />

          <TextInputTask
            name="email"
            label="Email"
            placeholder="Enter Users email (Required)"
            labelstyle="col-sm-2 control-label"
            inputdiv="col-sm-3"
            {...email}
          />

          <ComboBox
            label="Role"
            data={roleSelect}
            defaultValue={role[0]}
            labelstyle="col-sm-2 control-label"
            inputdiv="col-sm-3"
            { ...role  }
          />

          <TextInputTask
            name="password"
            label="Password"
            placeholder="***************"
            labelstyle="col-sm-2 control-label"
            inputdiv="col-sm-3"
            type="password"
            { ...password }
          />

          <div className="col-sm-9 col-md-offset-2">
            <button type="submit" className="btn btn-success pull-left">
              Save
            </button>
            <button className="btn btn-info dp-margin-10-LR" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-danger dp-margin-10-LR" disabled={newUser} onClick={deleteUser}>
              Delete
            </button>
          </div>
          </form>
      </div>
		);
  }
}

UserProfileForm.propTypes = {
  fields: PropTypes.object,
  errors: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  deleteUser: PropTypes.func.isRequired,
  newUser: PropTypes.bool,
  roleSelect: PropTypes.array.isRequired,
};
