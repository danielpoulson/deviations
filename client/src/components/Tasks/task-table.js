//SYNC 11/03/2017 DP
import React, { PropTypes } from 'react';
import TaskRow from './task-row';

const TaskTable = (props) => {
  const _tasks = props.tasklist;
  let tasks = [];

  if (_tasks !== undefined) {
    tasks = _tasks.map((task, i) => <TaskRow key={task._id} task={task} getTask={props.handleClick.bind(null, i)} />);
  }

  return (
    <div className="panel panel-success">
      <table className="table table-hover project-table dp_point">
        <thead className="print-table-head">
          <tr>
            <th> Project Id and Task Name </th>
            <th> Target Date </th>
            <th> Champion </th>
            <th> Status </th>
          </tr>
        </thead>
        <tbody className="panel-body dpHand">{tasks}</tbody>
      </table>
    </div>
  );
};

TaskTable.propTypes = {
  tasklist: PropTypes.array,
  handleClick: PropTypes.func.isRequired
};

export default TaskTable;
