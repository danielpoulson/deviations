import React, { PropTypes } from 'react';
import moment from 'moment';
import { getStatus } from 'utils/status';

const TaskRow = (props) => {
  const task = props.task;
  return (
    <tr onClick={props.getTask}>
      <td>{task.SourceId} - {task.TKName}</td>
      <td>{moment(task.TKTarg).format('DD/MM/YYYY')}</td>
      <td>{task.TKChamp}</td>
      <td><i className={getStatus(task.TKStat)}></i></td>
    </tr>
  );
};

TaskRow.propTypes = {
  task: PropTypes.object,
  getTask: PropTypes.func.isRequired,
};

export default TaskRow;
