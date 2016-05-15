import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import TextArea from 'components/Common/text-area';
import TextInputTask from 'components/Common/form-text-input';
import DateTimePicker from 'components/Common/date-picker';
import ComboBox from 'components/Common/combo-box';
export const fields = ['TKName', 'TKComp', 'TKTarg', 'TKStat', 'TKChamp', 'TKComment', 'TKCapa'];

const newdata = {
  TKStat: 1,
  TKChamp: null,
  TKComp: new Date(),
  TKCapa: false,
};

const validate = values => {
  const errors = {};
  if (!values.TKName) {
    errors.TKName = 'This field is required';
  } else if (values.TKName.length < 20) {
    errors.TKName = 'Must more than 20 characters';
  }

  if (!values.TKChamp) {
    errors.TKChamp = 'This field is required';
  } else if (values.TKChamp.length < 7) {
    errors.TKChamp = 'Must more than 7 characters';
  }

  if (!values.TKTarg) {
    errors.TKTarg = 'This field is required';
  } else if (values.TKTarg === null) {
    errors.TKTarg = 'This field is required';
  }

  return errors;
};



@reduxForm({
  form: 'task',
  fields,
  validate,
},
state => ({
  initialValues: state.task ? state.task : newdata, // will pull state into form's initialValues
})
)

export default class TaskForm extends React.Component {
  onChangeCheck(){

  }

  render() {
    const {
      fields: { TKName, TKComp, TKTarg, TKStat, TKChamp, TKComment, TKCapa },
      handleSubmit,
      onCancel,
      deleteTask,
      hideDelete,
      submitting,
      status,
      users,
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit} className="form form-horizontal" >
          <TextInputTask
            name="TKName"
            label="Task Name"
            placeholder="Enter Task Name (Required)"
            labelstyle="col-sm-2 control-label"
            inputdiv="col-sm-9"
            {...TKName}
          />

          <DateTimePicker
            name="TKTarg"
            label="Target date"
            labelstyle="col-sm-2 control-label"
            inputdiv="col-sm-2"
            { ...TKTarg } />

          <DateTimePicker
            name="TKComp"
            label="Date Completed"
            labelstyle="col-sm-2 control-label"
            inputdiv="col-sm-2"
            {...TKComp}
          />

          <ComboBox
            label="Status"
            data={status}
            defaultValue={status[0]}
            labelstyle="col-sm-2 control-label"
            inputdiv="col-sm-3"
            { ...TKStat  }
          />

          <ComboBox
            label="Owner"
            data={users}
            defaultValue={users[0]}
            labelstyle="col-sm-2 control-label"
            inputdiv="col-sm-3"
            { ...TKChamp }
          />

          <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                  <div className="checkbox">
                      <label>
                          <input type="checkbox" {...TKCapa} />Preventative Action
                      </label>
                  </div>
              </div>
          </div>

          <TextArea
            name="TKComment"
            label="Comment"
            labelstyle="col-sm-2 control-label"
            inputdiv="col-sm-9"
            value={TKComment.value || ''}
            rows="6"
            { ...TKComment }
          />

          <div className="col-sm-9 col-md-offset-2">
            <button className="btn btn-success pull-left" disabled={submitting} onClick={handleSubmit}>
              {submitting ? <i /> : <i />} Save Task
            </button>
            <button className="btn btn-info dp-margin-10-LR" disabled={submitting} onClick={onCancel}>
            Cancel
            </button>
            <button className={hideDelete} disabled={submitting} onClick={deleteTask}>
              Delete
            </button>
          </div>
        </form>
      </div>
		);
  }
}

TaskForm.propTypes = {
  onChange: PropTypes.func,
  errors: PropTypes.object,
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  hideDelete: PropTypes.string,
  submitting: PropTypes.string,
  status: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
	};
