import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import TextArea from 'components/Common/text-area';
import TextInputTask from 'components/Common/text-input-task';
import DateTimePicker from 'components/Common/date-picker';
import ComboBox from 'components/Common/combo-box';
export const fields = ['TKName', 'TKStart', 'TKTarg', 'TKStat', 'TKChamp', 'TKComment', 'TKChampNew'];

const newdata = {
  TKStat: 1,
  TKChamp: null,
  TKStart: new Date(),
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
  render() {
    const {
      fields: { TKName, TKStart, TKTarg, TKStat, TKChamp, TKComment },
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
            dpInputCol="col-sm-9"
            dpLabelCol="col-sm-2"
            error={TKName.error}
            touched={TKName.touched}
            { ...TKName } />

          <DateTimePicker
            label="Start date"
            dpLabelCol="col-sm-2"
            dpInputCol="col-sm-3"
            onChange={this.handleStartDateChange}
            { ...TKStart } />

          <DateTimePicker
            label="Target Date"
            dpLabelCol="col-sm-2"
            dpInputCol="col-sm-3"
            onChange={this.handleStartDateChange}
            { ...TKTarg } />

          <ComboBox
            label="Status"
            data={status}
            dpInputCol="col-sm-4"
            dpLabelCol="col-sm-2"
            { ...TKStat }
          />

          <ComboBox
            label="Owner"
            data={users}
            dpInputCol="col-sm-4"
            dpLabelCol="col-sm-2"
            { ...TKChamp }
          />

          <TextArea
            name="TKComment"
            label="Comment"
            rows="6"
            inputstyle="form-control"
            dpInputCol="col-sm-9"
            dpLabelCol="col-sm-2"
            { ...TKComment }
            value={TKComment.value || ''} />

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
