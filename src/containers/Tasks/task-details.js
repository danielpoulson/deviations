import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TaskForm from 'components/Tasks/task-form';
import toastr from 'toastr';

import { addTask, editTask, deleteTask } from 'actions/actions_tasks';
import { setLoading } from 'actions/actions_main';

class TaskDetail extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static childContextTypes = {
    location: React.PropTypes.object,
  };

  state = {
    dirty: false,
    errors: {},
    hideDelete: null,
    newTask: false,
    taskId: '',
    status: [
      { id: 1, name: 'Task - Not Started (New)' },
      { id: 2, name: 'Task - On Track' },
      { id: 3, name: 'Task - In Concern' },
      { id: 4, name: 'Task - Behind Schedule' },
      { id: 5, name: 'Task - Completed' },
    ],
  };

  componentDidMount() {
    const _taskId = this.props.location.pathname.split('/')[2];
    const _hideDelete = this.props.main.user.role !== 'admin' || this.props.newTask === true ? 'hidden' : 'btn btn-danger';
    this.setState({ taskId: _taskId });
    this.setState({ hideDelete: _hideDelete });
  }

  cancelTask = (event) => {
    event.preventDefault();
    this.props.setLoading({ loading: false });
    this.taskNav(this.props.main.MainId);
  };

  deleteTask = (event) => {
    event.preventDefault();
    this.props.setLoading({ loading: false });
    const _id = this.state.taskId;
    this.props.deleteTask(_id);
    toastr.error('Task has been deleted', 'Task Detail', { timeOut: 1000 });
    this.taskNav(this.props.main.MainId);
  };

  saveTask = (data) => {
    const _SourceId = this.props.main.MainId;
    const _data = data;

    if (this.state.taskId !== 'new') {
      _data.TKChampNew = _data.TKChamp !== this.props.task.TKChamp;
      _data._id = this.state.taskId;
      _data.TKStat = typeof _data.TKStat === 'object' ? _data.TKStat.id : _data.TKStat;
      _data.SourceId = _SourceId;
      this.props.editTask(_data);
    } else {
      _data.TKStat = _data.TKStat.id || 1;
      _data.SourceId = _SourceId;
      this.props.addTask(_data);
    }

    toastr.success('Task has been saved', 'Task Detail', { timeOut: 1000 });
    this.taskNav(_SourceId);
  };

  taskNav(id) {
    if (this.props.main.CurrentMode === 'project') {
      this.context.router.push(`/project/${id}`);
    } else {
      this.context.router.push(`/change/${id}`);
    }
  }

  render() {

    const formStyle = {
      backgroundColor: '#fcfffc',
      border: 'solid 1px',
      borderRadius: 4,
      paddingTop: 10,
      paddingBottom: 50,
    };

    const taskTitle = this.state.taskTitle ? this.state.taskTitle : 'New Task';

    return (
        <div>
          <div className="">
            <div className="section-header">
              <p className="section-header-text-sub">{taskTitle}</p>
            </div>
          </div>

          <div style={formStyle}>
            <TaskForm
              onSubmit={this.saveTask}
              status={this.state.status}
              users={this.props.users}
              deleteTask={this.deleteTask}
              hideDelete={this.state.hideDelete}
              onCancel={this.cancelTask} />
            </div>
        </div>
    );
  }
}

TaskDetail.propTypes = {
  location: PropTypes.object,
  deleteTask: PropTypes.func,
  main: PropTypes.object,
  newTask: PropTypes.func,
  setLoading: PropTypes.func,
  editTask: PropTypes.func,
  addTask: PropTypes.func,
  users: PropTypes.array,
};

export default connect(state => ({ main: state.main, task: state.task, users: state.users }),
 { addTask, editTask, deleteTask, setLoading })(TaskDetail);
