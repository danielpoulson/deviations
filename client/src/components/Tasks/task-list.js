// @flow

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TaskTable from './task-table';
/* actions */
import { getTask } from '../../actions/actions_tasks';
import { getDeviation, resetDeviation } from '../../actions/actions_deviations';
import { setMain } from '../../actions/actions_main';
import { resetLog, getLog } from '../../actions/actions_logger';


class TaskList extends Component {

  state = {};


  handleClick = (i) => {
    if (this.props.type === 'All') {
      const dvNo:string = this.props.tasklist[i].DevId;
      //This action is linked to container/deviations onGetDeviation function
      if (this.props.MainId !== dvNo ) {
        this.props.resetLog();
        this.props.resetDeviation();
        this.props.getDeviation(dvNo);
        this.props.getLog(dvNo);
        this.props.setMain({ MainId: dvNo, CurrentMode: 'deviation', loading: true, reload: false });
      } else {
        this.props.setMain({ MainId: dvNo, CurrentMode: 'deviation', loading: true, reload: true });
      }

      this.context.router.push(`/deviation/${dvNo}`);
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
            tasklist={this.props.tasklist}
            handleClick={this.handleClick} />
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
  getDeviation: PropTypes.func,
  getLog: PropTypes.func,
  getTask: PropTypes.func,
  resetDeviation: PropTypes.func,
  resetLog: PropTypes.func,
  MainId: PropTypes.string
};

TaskList.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(state => ({ MainId: state.main.MainId }), { getTask, getDeviation, resetDeviation, setMain, resetLog, getLog })(TaskList);
