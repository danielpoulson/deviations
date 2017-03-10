//SYNC 11/03/2017 DP
import React, { PropTypes } from 'react';
import moment from 'moment';
import { getTraffic } from '../../utils/status';

const TaskRow = (props) => {
  const task = props.task;
  const minColTarget = {
    minWidth: 100
  };
  const minColChamp = {
    minWidth: 140
  };
  const capa = task.TKCapa === 1 ? 'fa fa-product-hunt' : '';
  return (
    <tr onClick={props.getTask}>
      <td>{task.SourceId} - {task.TKName} <i className={capa}></i></td>
      <td style={minColTarget}>{moment(task.TKTarg).format('DD/MM/YYYY')}</td>
      <td style={minColChamp}>{task.TKChamp}</td>
      <td><i className={getTraffic(task.TKTarg, task.TKStat)}></i></td>
    </tr>
  );
};

TaskRow.propTypes = {
  task: PropTypes.object,
  getTask: PropTypes.func.isRequired
};

export default TaskRow;
