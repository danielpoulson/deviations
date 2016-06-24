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
      hideDelete: props.main.user.role !== 'admin' || props.newTask === true ? 'hidden' : 'btn btn-danger',
      newTask: false,
      task: Object.assign({}, props.task),
      taskId: props.location.pathname.split('/')[2],
      taskTitle: props.main.MainId,
      submitting: false,
      status: [
        { value: 1, text: 'Task - Not Started (New)' },
        { value: 2, text: 'Task - On Track' },
        { value: 3, text: 'Task - In Concern' },
        { value: 4, text: 'Task - Behind Schedule' },
        { value: 5, text: 'Task - Completed' }
      ]
    };

    this.cancelTask = this.cancelTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.updateTaskState = this.updateTaskState.bind(this);
    this.updateTaskStateDate = this.updateTaskStateDate.bind(this);
    this.updateTaskStateCheck = this.updateTaskStateCheck.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.task._id != nextProps.task._id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({task: Object.assign({}, nextProps.task)});
    }
  }

  cancelTask(event) {
    event.preventDefault();
    this.props.mainActions.setLoading({ loading: false });
    this.taskNav(this.props.main.MainId);
  }

  deleteTask(event) {
    event.preventDefault();
    this.props.mainActions.setLoading({ loading: false });
    const _id = this.state.taskId;
    this.props.taskActions.deleteTask(_id);
    toastr.error('Task has been deleted', 'Task Detail', { timeOut: 1000 });
    this.taskNav(this.props.main.MainId);
  }

  taskFormIsValid() {
    let formIsValid = true;
    // this.state.errors = {}; //Clears any previous errors
    let _errors = {};

    if (this.state.task.TKName) {
        if (this.state.task.TKName.length < 10) {
        _errors.TKName = "Task description must be greater than 10 characters!";
        this.setState({formIsValid: false});
        }
    } else {
        _errors.TKName = "Task description cannot be empty!";
        this.setState({formIsValid: false});
    }

    if (typeof this.state.task.TKTarg == 'undefined'){
        _errors.TKTarg = "Please enter a target date!!";
         this.setState({formIsValid: false});
     }

    if (this.state.task.TKChamp) {
        if (this.state.task.TKChamp.length < 7) {
        _errors.TKChamp = "Task owner must be greater than 7 characters!";
        this.setState({formIsValid: false});
        }
    } else {
        _errors.TKChamp = "Task owner cannot be empty!";
        this.setState({formIsValid: false});
    }

    this.setState({errors: _errors});

    return formIsValid;
  }

  saveTask(event) {
    event.preventDefault();
    const _DevId = this.props.main.MainId;

    if(!this.taskFormIsValid()) {
      return; 
    }

    if (this.state.taskId !== 'new') {
      const TKChampNew = this.state.TKChamp !== this.props.task.TKChamp;
      this.props.taskActions.editTask(this.state.task);
    } else {
      let _task = this.state.task;
      _task.TKStat = this.state.TKStat || 1;
      _task.TKCapa = this.state.TKCapa || 0;
      _task.DevId = _DevId;
      this.props.taskActions.addTask(_task);
    }

    toastr.success('Task has been saved', 'Task Detail', { timeOut: 1000 });
    this.taskNav(_DevId);
  }

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

  updateTaskStateCheck(event) {
    const field = event.target.name;
    let task = this.state.task;
    let check = task.TKCapa || 0;
    check ^= 1;

    task[field] = check;
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
      paddingBottom: 50
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
              errors={this.state.errors}
              onSubmit={this.saveTask}
              status={this.state.status}
              users={this.props.users}
              deleteTask={this.deleteTask}
              hideDelete={this.state.hideDelete}
              onChange={this.updateTaskState}
              onDateChange={this.updateTaskStateDate}
              onCheckChange={this.updateTaskStateCheck}
              onCancel={this.cancelTask}
              submitting={this.state.submitting} />
          </div>
        </div>
    );
  }
}

TaskDetail.propTypes = {
  location: PropTypes.object,
  deleteTask: PropTypes.func,
  main: PropTypes.object,
  mainActions: PropTypes.object,
  newTask: PropTypes.func,
  setLoading: PropTypes.func,
  editTask: PropTypes.func,
  addTask: PropTypes.func,
  task: PropTypes.array,
  taskActions: PropTypes.object,
  tasks: PropTypes.object,
  users: PropTypes.array
};

//Pull in the React Router context so router is available on this.context.router.
TaskDetail.contextTypes = {
  router: PropTypes.object
};

TaskDetail.childContextTypes = {
    location: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const taskId = ownProps.params.id;

  return {
    main: state.main,
    task: state.task, 
    users: usersFormattedForDropdown(state.users)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(taskActions, dispatch),
    mainActions: bindActionCreators(mainActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
