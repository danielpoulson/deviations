import React, { PropTypes } from 'react';
import moment from 'moment';
import { getStatus } from 'utils/status';

const TaskRow = (props) => {
  const task = props.task;
  const minColTarget = {
    minWidth: 100
  }
  const minColChamp = {
    minWidth: 140
  }
  return (
    <tr onClick={props.getTask}>
      <td>{task.DevId} - {task.TKName}</td>
      <td style={minColTarget}>{moment(task.TKTarg).format('DD/MM/YYYY')}</td>
      <td style={minColChamp}>{task.TKChamp}</td>
      <td><i className={getStatus(task.TKStat)}></i></td>
    </tr>
  );
};

TaskRow.propTypes = {
  task: PropTypes.object,
  getTask: PropTypes.func.isRequired,
};

export default TaskRow;
