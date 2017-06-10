import PropTypes from 'prop-types';
import React from 'react';
import TextArea from '../../components/Common/text-area';
import TextInputTask from '../../components/Common/form-text-input';
import DateTimePicker from '../../components/Common/date-picker';
import SelectInput from '../../components/Common/select-input';

const TaskForm = ({
  errors, task, status, users, onSaveTask, hideDelete, onDeleteTask,
  onChange, onDateChange, onCheckChange, onCancel, submitting}) => {

  return (
      <form className="form form-horizontal" >
        <TextInputTask
          name="TKName"
          label="Task Name"
          value={task.TKName}
          onChange={onChange}
          placeholder="Enter Task Name (Required)"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-9"
          error={errors.TKName}
        />

        <DateTimePicker
          name="TKStart"
          label="Start date"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-2"
          value={task.TKStart}
          onChange={onDateChange.bind(null, "TKStart")}
          error={errors.TKStart}
        />

        <DateTimePicker
          name="TKTarg"
          label="Target date"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-2"
          value={task.TKTarg}
          onChange={onDateChange.bind(null, "TKTarg")}
          error={errors.TKTarg} />

        <SelectInput
          name="TKStat"
          label="Status"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-3"
          value={task.TKStat}
          defaultOption="Select Status"
          options={status}
          onChange={onChange}
          error={errors.TKStat}/>

        <SelectInput
          name="TKChamp"
          label="Owner"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-3"
          value={task.TKChamp}
          defaultOption="Select Task Owner"
          options={users}
          onChange={onChange}
          error={errors.TKChamp}/>

        <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
                <div className="checkbox">
                    <label>
                        <input type="checkbox" name="TKCapa" checked={task.TKCapa}
                          onChange={onCheckChange}/>Preventative Action
                    </label>
                </div>
            </div>
        </div>

        <TextArea
          name="TKComment"
          label="Comment"
          labelstyle="col-sm-2 control-label"
          inputdiv="col-sm-9"
          value={task.TKComment || ''}
          onChange={onChange}
          rows="6"
        />

        <div className="col-sm-9 col-md-offset-2">
          <button className="btn btn-success pull-left" disabled={submitting} onClick={onSaveTask}>
            {submitting ? <i /> : <i />} Save Task
          </button>
          <button className="btn btn-info dp-margin-10-LR" disabled={submitting} onClick={onCancel}>
          Cancel
          </button>
          <button className={hideDelete} disabled={submitting} onClick={onDeleteTask}>
            Delete
          </button>
        </div>
      </form>
	);
};

TaskForm.propTypes = {
  onChange: PropTypes.func,
  task: PropTypes.object.isRequired,
  errors: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onCheckChange: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  hideDelete: PropTypes.string,
  submitting: PropTypes.bool,
  status: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
	};

export default TaskForm;
