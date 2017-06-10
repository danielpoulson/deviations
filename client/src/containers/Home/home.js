import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDashboard } from '../../actions/actions_main';
import { loadPage } from '../../actions/actions_deviations';
import { loadPageTask } from '../../actions/actions_tasks';
import BarChart from '../../components/graphs/bar-chart';
import LineChart from '../../components/graphs/line-chart';

/* component styles */
import './styles.css';

class Home extends Component {

  props: {
    allOpenDeviations: number,
    allOpenTasks: number,
    chartData: [],
    countDeviationsUser: number,
    countTasksUser: number,
    fullname: string,
    getUserDashboard: any,
    history: any,
    lineData: [],
    loadPage: any,
    loadPageTask: any
  };

  constructor(props) {
    super(props);
    this.state = {};

    this.getTasks = this.getTasks.bind(this);
    this.getDeviations = this.getDeviations.bind(this);
    this.getAllTasks = this.getAllTasks.bind(this);
    this.getAllDeviations = this.getAllDeviations.bind(this);

  }

  componentWillMount(){
    const username = sessionStorage.getItem('username');
    if (username !== 'false') {
      this.props.getUserDashboard(username);
    }
  }

  getTasks() {
    const action = {};
    action.search = this.props.fullname || null;
    this.props.loadPageTask(action);
    this.props.history.push('/tasks');
  }

  getDeviations() {
    const action = {};
    action.search = this.props.fullname || null;
    this.props.loadPage(action);
    this.props.history.push('/deviations');
  }

  getAllTasks() {
    const action = {};
    action.search = null;
    this.props.loadPageTask(action);
    this.props.history.push('/tasks');
  }

  getAllDeviations() {
    const action = {};
    action.search = null;
    this.props.loadPage(action);
    this.props.history.push('/deviations');
  }

  render(){
    return(
      <div>
        <div className="dashboard"><h1>Dashboard</h1></div>
        <div className="row">
          <div className="col-sm-3">
            <div className="tile green grow" onClick={this.getDeviations}>
              <h2>My Deviations</h2>
              <i className="fa fa-list-alt" />&nbsp; {this.props.countDeviationsUser}
            </div>
          </div>
          <div className="col-sm-3">
            <div className="tile blue grow" onClick={this.getTasks}>
              <h2>My Tasks</h2>
              <i className="fa fa-tasks" />&nbsp; {this.props.countTasksUser}
            </div>
          </div>
          <div className="col-sm-3">
            <div className="tile orange grow" onClick={this.getAllDeviations}>
              <h2>All Deviations</h2>
              <i className="fa fa-list-alt" />&nbsp; {this.props.allOpenDeviations}
            </div>
          </div>
          <div className="col-sm-3">
            <div className="tile purple grow" onClick={this.getAllTasks}>
              <h2>Open Tasks</h2>
              <i className="fa fa-tasks" />&nbsp; {this.props.allOpenTasks}
            </div>
          </div>
        </div>
        <div className="row cc-graph">
          <div className="col-sm-6">
            <h3>Open vs Closed Deviations</h3>
            {this.props.chartData.length > 0 && <BarChart chartData={this.props.chartData} />}
          </div>
          <div className="col-sm-6">
            <h3>Deviations Open > 30 days</h3>
            {this.props.lineData.length > 0 && <LineChart lineData={this.props.lineData} />}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ fullname: state.main.user.fullname,
    countDeviationsUser: state.main.countDeviationsUser,
    allOpenDeviations: state.main.allOpenDeviations,
    allOpenTasks: state.main.allOpenTasks,
    chartData: state.main.chartData,
    lineData: state.main.lineData,
    countTasksUser: state.main.countTasksUser }), { getUserDashboard, loadPage, loadPageTask}
)(Home);
