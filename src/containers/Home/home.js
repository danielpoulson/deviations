import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUserDashboard } from 'actions/actions_main';
import { loadPage } from 'actions/actions_changes';
import { loadPageTask } from 'actions/actions_tasks';
import BarChart from 'components/graphs/bar-chart';
import LineChart from 'components/graphs/line-chart';

/* component styles */
import { tile, dashboard } from './styles.scss';

@connect(
  state => ({ fullname: state.main.user.fullname,
    countChangesUser: state.main.countChangesUser,
    allOpenChanges: state.main.allOpenChanges,
    allOpenTasks: state.main.allOpenTasks,
    countTasksUser: state.main.countTasksUser }), { getUserDashboard, loadPage, loadPageTask}
)

export default class Home extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  componentWillMount(){
    const username = sessionStorage.getItem('username');
    this.props.getUserDashboard(username);
  }

  getTasks = () => {
    const action = {};
    action.search = this.props.fullname || null;
    this.props.loadPageTask(action);
    this.context.router.push('/tasks');
  };

  getChanges = () => {
    const action = {};
    action.search = this.props.fullname || null;
    this.props.loadPage(action);
    this.context.router.push('/changes');
  };

  getAllTasks = () => {
    const action = {};
    action.search = null;
    this.props.loadPageTask(action);
    this.context.router.push('/tasks');
  };

  getAllChanges = () => {
    const action = {};
    action.search = null;
    this.props.loadPage(action);
    this.context.router.push('/changes');
  };

  render(){
    return(
      <div>
        <div className={`${dashboard}`}><h1>Dashboard</h1></div>
        <div className="row">
          <div className="col-sm-3">
            <div className={`${tile} green grow`} onClick={this.getChanges}>
              <h2>My Changes</h2>
              <i className="fa fa-list-alt"></i>&nbsp; {this.props.countChangesUser}
            </div>
          </div>
          <div className="col-sm-3">
            <div className={`${tile} blue grow`} onClick={this.getTasks}>
              <h2>My Tasks</h2>
              <i className="fa fa-tasks">&nbsp; </i>{this.props.countTasksUser}
            </div>
          </div>
          <div className="col-sm-3">
            <div className={`${tile} orange grow`} onClick={this.getAllChanges}>
              <h2>Open Changes</h2>
              <i className="fa fa-list-alt"></i>&nbsp; {this.props.allOpenChanges}
            </div>
          </div>
          <div className="col-sm-3">
            <div className={`${tile} purple grow`} onClick={this.getAllTasks}>
              <h2>Open Tasks</h2>
              <i className="fa fa-tasks"></i>&nbsp; {this.props.allOpenTasks}
            </div>
          </div>
        </div>
        <div className="row cc-graph">
          <div className="col-sm-6">
            <h3>Open vs Closed Change Controls</h3>
            <BarChart />
          </div>
          <div className="col-sm-6">
            <h3>Overdue Tasks</h3>
            <LineChart />
          </div>
        </div>
      </div>
    )
  }
};
