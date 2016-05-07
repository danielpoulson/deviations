import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import TextInputTask from 'components/Common/text-input-task';
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
        roleSelect,
      } = this.props;

    return (
      <div>
        <form className="form form-horizontal" onSubmit={handleSubmit}>

          <div className="col-sm-12">
            <TextInputTask
              name="username"
              label="User Name"
              placeholder="Enter Users username (Required)"
              dpInputCol="col-sm-4"
              dpLabelCol="col-sm-2"
              error={username.error}
              touched={username.touched}
              { ...username } />
          </div>

          <div className="col-sm-12">
            <TextInputTask
              name="fullname"
              label="Full Name"
              placeholder="Enter Full Name (Required)"
              dpInputCol="col-sm-5"
              dpLabelCol="col-sm-2"
              error={fullname.error}
              touched={fullname.touched}
              { ...fullname } />
          </div>

          <div className="col-sm-12">
            <TextInputTask
              name="email"
              label="Email"
              placeholder="Enter Email Address (Required)"
              dpInputCol="col-sm-5"
              dpLabelCol="col-sm-2"
              error={email.error}
              touched={email.touched}
              { ...email } />
          </div>

          <div className="col-sm-12">
            <ComboBox
              label="Role"
              name="role"
              data={roleSelect}
              dpInputCol="col-sm-4"
              dpLabelCol="col-sm-2"
              { ...role }
              />
          </div>

          <div className="col-sm-12">
            <TextInputTask
              name="password"
              label="Password"
              type="password"
              placeholder="***************"
              dpInputCol="col-sm-5"
              dpLabelCol="col-sm-2"
              error={password.error}
              touched={password.touched}
              { ...password } />
          </div>

          <div className="col-sm-9 col-md-offset-2">
            <button type="submit" className="btn btn-success pull-left">
              Save
            </button>
            <button className="btn btn-danger dp-margin-10-LR" onClick={deleteUser}>
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
  deleteUser: PropTypes.func.isRequired,
  roleSelect: PropTypes.array.isRequired,
};
