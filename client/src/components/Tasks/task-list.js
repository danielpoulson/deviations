// @flow
import React, { Component } from 'react';
import TaskTable from './task-table';


class TaskList extends Component {

  props: {
    history: any,
    onSelectTask: any,
    newTask: any,
    tasklist: [],
    tasksTab: string,
    type: string
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
            tasklist={this.props.tasklist}
            onSelectTask={this.props.onSelectTask} />
        </div>
        <div className={hideButton}>
            <input type="submit" value="New Task" className="btn btn-success pull-left" onClick={this.props.newTask} />
        </div>
      </div>
    );
  }
}

export default TaskList;
