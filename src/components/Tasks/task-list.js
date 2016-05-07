import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TaskTable from './task-table';
import { getTask } from 'actions/actions_tasks';
import { getChange } from 'actions/actions_changes';
import { setMain } from 'actions/actions_main';

@connect(null, { getTask, getChange, setMain })

class TaskList extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  handleClick = (i) => {
    if (this.props.type === 'All') {
      const ccNo = this.props.tasklist[i].SourceId;
      this.props.setMain({ MainId: ccNo, CurrentMode: 'change', loading: true });
      this.props.getChange(ccNo);
      this.context.router.push(`/change/${ccNo}`);
    } else {
      const _id = this.props.tasklist[i]._id;
      this.props.getTask(_id);
      this.context.router.push(`/task/${_id}`);
    }
  };

  newTask = () => {
    this.props.getTask('new');
    this.context.router.push('/task/new');
  };

  render() {

    let hideButton = '';

    if (this.props.type === 'All') {
      hideButton = 'hidden';
    }

    return (
      <div className={this.props.tasksTab}>
        <div>
          <TaskTable
            tasklist = {this.props.tasklist}
            handleClick = {this.handleClick} />
        </div>
        <div className={hideButton}>
            <input type="submit" value="New Task" className="btn btn-success pull-left" onClick={this.newTask} />
        </div>
      </div>
    );
  }
}

TaskList.propTypes = {
  type: PropTypes.string,
  tasksTab: PropTypes.string,
  tasklist: PropTypes.array,
  setMain: PropTypes.func,
  getChange: PropTypes.func,
  getTask: PropTypes.func,
};

export default TaskList;
