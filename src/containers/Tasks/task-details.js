import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import TaskForm from 'components/Tasks/task-form';
import toastr from 'toastr';
import {usersFormattedForDropdown} from '../../selectors/selectors';

import * as taskActions from 'actions/actions_tasks';
import * as mainActions from 'actions/actions_main';

class TaskDetail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dirty: false,
      errors: {},
      hideDelete: null,
      newTask: false,
      task: Object.assign({}, props.task),
      taskId: '',
      taskTitle: '',
      status: [
        { value: 1, text: 'Task - Not Started (New)' },
        { value: 2, text: 'Task - On Track' },
        { value: 3, text: 'Task - In Concern' },
        { value: 4, text: 'Task - Behind Schedule' },
        { value: 5, text: 'Task - Completed' },
      ],
    };

    this.saveTask = this.saveTask.bind(this);
    this.updateTaskState = this.updateTaskState.bind(this);
    this.updateTaskStateDate = this.updateTaskStateDate.bind(this);
  }

  componentDidMount() {
    const _taskId = this.props.location.pathname.split('/')[2];
    const _hideDelete = this.props.main.user.role !== 'admin' || this.props.newTask === true ? 'hidden' : 'btn btn-danger';
    this.setState({ taskId: _taskId });
    this.setState({ hideDelete: _hideDelete });
    this.setState({ taskTitle: this.props.main.MainId });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.task._id != nextProps.task._id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({task: Object.assign({}, nextProps.task)});
    }
  }

  cancelTask = (event) => {
    event.preventDefault();
    this.props.mainActions.setLoading({ loading: false });
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

  saveTask(event) {
    event.preventDefault();
    const _DevId = this.props.main.MainId;

    if (this.state.taskId !== 'new') {
      // _data.TKChampNew = _data.TKChamp !== this.props.task.TKChamp;
      // _data._id = this.state.taskId;
      // _data.TKStat = typeof _data.TKStat === 'object' ? _data.TKStat.id : _data.TKStat;
      // _data.DevId = _DevId;
      // Coverts from true : 1 and false to 0
      // _data.TKCapa = _data.TKCapa ? +_data.TKCapa : 0;
      this.props.taskActions.editTask(this.state.task);
    } else {
      _data.TKStat = _data.TKStat.id || 1;
      _data.DevId = _DevId;
      _data.TKCapa = _data.TKCapa ? +_data.TKCapa : 0;
      this.props.addTask(_data);
    }
    toastr.success('Task has been saved', 'Task Detail', { timeOut: 1000 });
    this.taskNav(_DevId);
  }

  saveTaskOld = (data) => {
    const _DevId = this.props.main.MainId;
    const _data = data;

    if (this.state.taskId !== 'new') {
      _data.TKChampNew = _data.TKChamp !== this.props.task.TKChamp;
      _data._id = this.state.taskId;
      _data.TKStat = typeof _data.TKStat === 'object' ? _data.TKStat.id : _data.TKStat;
      _data.DevId = _DevId;
      // Coverts from true : 1 and false to 0
      _data.TKCapa = _data.TKCapa ? +_data.TKCapa : 0;
      console.log(_data.TKCapa);
      this.props.editTask(_data);
    } else {
      _data.TKStat = _data.TKStat.id || 1;
      _data.DevId = _DevId;
      _data.TKCapa = _data.TKCapa ? +_data.TKCapa : 0;
      this.props.addTask(_data);
    }

    toastr.success('Task has been saved', 'Task Detail', { timeOut: 1000 });
    this.taskNav(_DevId);
  };

  updateTaskState(event) {
    const field = event.target.name;
    let task = this.state.task;
    task[field] = event.target.value;
    return this.setState({task: task});
  }

  updateTaskStateDate(field, value) {
    // this.setState({dirty: true});
    let task = this.state.task;
    task[field] = value;
    return this.setState({task: task});
  }

  taskNav(id) {
    if (this.props.main.CurrentMode === 'project') {
      this.context.router.push(`/project/${id}`);
    } else {
      this.context.router.push(`/deviation/${id}`);
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

    const taskTitle = this.state.taskTitle ? `Deviation Task - ${this.state.taskTitle}` : 'New Task';

    return (
        <div>
          <div className="">
            <div className="section-header">
              <div className="section-header-text-minor"><p>{taskTitle}</p></div>
            </div>
          </div>

          <div style={formStyle}>
            <TaskForm
              task={this.state.task}
              onSubmit={this.saveTask}
              status={this.state.status}
              users={this.props.users}
              deleteTask={this.deleteTask}
              hideDelete={this.state.hideDelete}
              onChange={this.updateTaskState}
              onDateChange={this.updateTaskStateDate}
              onCancel={this.cancelTask}
              submitting={false} />
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

//Pull in the React Router context so router is available on this.context.router.
TaskDetail.contextTypes = {
  router: PropTypes.object
};

TaskDetail.childContextTypes = {
    location: React.PropTypes.object,
};

function getTaskById(cour, id) {
  const course = courses.filter(course => course.id == id);
  if (course) return course[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const taskId = ownProps.params.id;

  return {
    main: state.main,
    task: state.task, 
    users: usersFormattedForDropdown(state.users)
  };
};

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(taskActions, dispatch),
    mainActions: bindActionCreators(mainActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
