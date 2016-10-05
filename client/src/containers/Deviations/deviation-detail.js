import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DevDetailForm from '../../components/Deviations/deviation-detail.form';
import DevInvestForm from '../../components/Deviations/deviation-invest.form';
import TaskList from '../../components/Tasks/task-list';
import FileList from '../../containers/Files/file-list';
import DeviationLog from '../../components/Deviations/deviation-log';
import {usersFormattedForDropdown} from '../../selectors/selectors';
import {devFormIsValid} from './dev-form-validation';
import {statusData, outcomesData, categoriesData, classifiesData} from './select-data';
import classNames from 'classnames';
import toastr from 'toastr';

/* actions */
import { addDeviation, createLog, editDeviation, closeDeviation, getDeviation } from '../../actions/actions_deviations';
import { getProjectTasks } from '../../actions/actions_tasks';
import { setMain } from '../../actions/actions_main';

class DeviationDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deviationTitle: 'Get the main title',
      _dvNo: '',
      dirty: false,
      deviation: Object.assign({}, props.deviation),
      DetailTab: 'show',
      InvestTab: 'hidden',
      errors: {},
      FilesTab: 'hidden',
      fCount: 0,
      LogTab: 'hidden',
      notnew: true,
      tasks: [],
      TasksTab: 'hidden',
      tCount: 0,
      status: statusData,
      outcomes: outcomesData,
      categories: categoriesData,
      classifies: classifiesData
    };

    this.cancelDeviation = this.cancelDeviation.bind(this);
    this.onApprove = this.onApprove.bind(this);
    this.onFinal = this.onFinal.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCloseDev = this.onCloseDev.bind(this);
    this.onPrintDev = this.onPrintDev.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.saveDetail = this.saveDetail.bind(this);
    this.updateDevState = this.updateDevState.bind(this);
    this.updateDevStateDate = this.updateDevStateDate.bind(this);
  }

  componentWillMount() {
    // TODO: (1) @Medium Only call for new data when loading a new deviation
    // The record should not get data from the server when the deviaiton has not changed
    const dvNo = this.props.location.pathname.split('/')[2];
    if (this.props.main.loading === true) {
      this.props.getProjectTasks(dvNo);
    }
    this.setState({ _dvNo: dvNo });

    if(dvNo === 'new'){
      this.setState({ notnew: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.deviation._id !== nextProps.deviation._id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({deviation: Object.assign({}, nextProps.deviation)});
    }
  }

  onRefresh() {
    this.props.getDeviation(this.state._dvNo);
  }

  onCancel() {
    this.logMessage('Deviation Cancelled');
  }

  onCloseDev(e) {
    e.preventDefault();

    if(this.props.main.user.role !== 'admin') {
      toastr.warning('Only QA can closed a deviation! If deviation is complete notify QA.',
        'Deviation Detail', { timeOut: 2000 });
      return; 
    }

    let _data = this.state.deviation;
    
    _data.dvClosed = 1;
    _data.dvLog = this.logMessage('Deviation Completed');

    this.props.closeDeviation(_data);
    toastr.success('Deviation has been Closed', 'Deviation Detail', { timeOut: 1000 });
    this.setState({ dirty: false });
    this.context.router.push('/deviations');

  }

  onPrintDev(e) {
    e.preventDefault();
    this.context.router.push('/printdeviation');
  }

  onApprove() {
    this.logMessage('Approved to Implement');
  }

  onFinal() {
    this.logMessage('Deviation Closed');
  }

  logMessage(message) {

    // let _dvLog = this.props.deviation.dvLog;
    const _dvLog = {
      SourceId: this.state._dvNo,  
      LogType: 'DEV',
      LogMessage : message,
      LogBy: this.props.main.user.fullname,
      LogDate: new Date()
    };

    return _dvLog;

  }

  cancelDeviation(e) {
    e.preventDefault();
    this.context.router.push('/deviations');
  }

  // TODO: (1) @Medium Deviation list displays full list on new deviation
  // Example On save the state is paged: 43, alldata: 43, total:42 Note paged should be 15
  // When a new deviation is loaded the pagination goes a bit strange in that the hold list is displayed instead of the first page.

  saveDetail(event, closed) {
    event.preventDefault();
    let _dev = this.state.deviation;

    let validation = devFormIsValid(_dev);
    this.setState({errors: validation.errors});

    if(!validation.formIsValid) {
      return; 
    }

    if (this.state._dvNo !== 'new') {
      _dev.dvLog = this.logMessage('Deviation Edit');
      _dev.dvNotChanged = _dev.dvAssign === this.props.deviation.dvAssign;
      _dev.dvClosed = 0;
      this.props.editDeviation(_dev);    
    } else {
      _dev.dvLog = this.logMessage('Deviation Created');
      _dev.dvClosed = 0;
      _dev.dvAssign = 'Quality Assurance';
      _dev.dvClass = 'Not Assigned';
      this.props.addDeviation(_dev);
    }

    toastr.success('Deviation has been saved', 'Deviation Detail', { timeOut: 1000 });
    this.setState({ dirty: false });
    this.context.router.push('/deviations');

  }

  showTab(value) {
    this.setState({ DetailTab: 'hidden' });
    this.setState({ InvestTab: 'hidden' });
    this.setState({ TasksTab: 'hidden' });
    this.setState({ FilesTab: 'hidden' });
    this.setState({ LogTab: 'hidden' });
    this.setState({ [value]: 'show' });
  }

  updateDevState(event) {
    const field = event.target.name;
    let _dev = this.state.deviation;
    _dev[field] = event.target.value;
    return this.setState({deviation: _dev});
  }

  updateDevStateDate(field, value) {
    // this.setState({dirty: true});
    let _dev = this.state.deviation;
    _dev[field] = value;
    return this.setState({deviation: _dev});
  }


  render() {

    const _title = this.props.deviation.dvNo !== '' ? `${this.state.deviation.dvNo} - ${this.state.deviation.dvMatName}` : 'New - Deviation';

    const detailTabClass = classNames({
      active: this.state.DetailTab === 'show'
    });

    const investTabClass = classNames({
      active: this.state.InvestTab === 'show',
      hidden: this.props.main.MainId === 'new'
    });

    const tasksTabClass = classNames({
      active: this.state.TasksTab === 'show',
      hidden: this.props.main.MainId === 'new'
    });

    const fileTabClass = classNames({
      active: this.state.FilesTab === 'show',
      hidden: this.props.main.MainId === 'new'
    });

    const logTabClass = classNames({
      active: this.state.LogTab === 'show',
      hidden: this.props.main.MainId === 'new'
    });

    // TODO (1) The title for a new deviation is undefined - undefined needs to state "New Deviaiton"

    return (
    <div>
          <div className="">
            <div className="section-header">
              <div className="section-header-text-minor"><p>{_title} </p></div>
            </div>
          </div>
          <ul className="nav nav-tabs dpHand">
            <li className={detailTabClass}>
              <a onClick={this.showTab.bind(this, 'DetailTab')} data-toggle="tab">Detail</a>
            </li>
            <li className={investTabClass}>
              <a onClick={this.showTab.bind(this, 'InvestTab')} data-toggle="tab">Investigation</a>
            </li>
            <li className={tasksTabClass}>
              <a onClick={this.showTab.bind(this, 'TasksTab')} refs="TasksTab" data-toggle="tab">Tasks <span className="badge"> {this.props.ctTotal} </span></a>
            </li>
            <li className={fileTabClass}>
              <a onClick={this.showTab.bind(this, 'FilesTab')} data-toggle="tab">Files <span className="badge"> {this.props.main.fileTabCount} </span></a>
            </li>
            <li className={logTabClass}>
              <a onClick={this.showTab.bind(this, 'LogTab')} data-toggle="tab">Log</a>
            </li>
          </ul>

          <div className={this.state.DetailTab}>
            <div className="panel panel-default">
              <div className="panel-body">
                <DevDetailForm
                  dev={this.state.deviation}
                  onSave={this.saveDetail}
                  onCancel={this.cancelDeviation}
                  onChange={this.updateDevState}
                  onDateChange={this.updateDevStateDate}
                  errors={this.state.errors} />
              </div>
            </div>
          </div>

          <div className={this.state.InvestTab}>
            <div className="panel panel-default">
              <div className="panel-body">
                {this.state.notnew && <DevInvestForm
                  dev={this.state.deviation} 
                  onSave={this.saveDetail}
                  onCloseDev={this.onCloseDev}
                  onPrintDev={this.onPrintDev}
                  status={this.state.status}
                  outcomes={this.state.outcomes}
                  categories={this.state.categories}
                  classifies={this.state.classifies}
                  users={this.props.users}
                  onCancel={this.cancelDeviation}
                  onChange={this.updateDevState}
                  onDateChange={this.updateDevStateDate}
                  errors={this.state.errors} />}
              </div>
            </div>
          </div>
          
          
          {this.state.notnew && <DeviationLog
            logTab={this.state.LogTab}
            onApprove={this.onApprove}
            onFinal={this.onFinal}
            onCancel={this.onCancel}
            log={this.props.log} />}

          {this.state.notnew && <TaskList
            tasklist={this.props.tasklist}
            tasksTab={this.state.TasksTab}
            title={this.state.deviationTitle} />}

          {this.state.notnew && <FileList
            filesTab={this.state.FilesTab}
            refreshDeviation={this.onRefresh}
            dvNo={this.props.location.pathname.split('/')[2]} />}

      </div>
    );
  }
}

DeviationDetail.propTypes = {
  addDeviation: PropTypes.func,
  closeDeviation: PropTypes.func,
  ctTotal: PropTypes.number,
  dev: PropTypes.object,
  deviation: PropTypes.object,
  editDeviation: PropTypes.func,
  getDeviation: PropTypes.func,
  getProjectTasks: PropTypes.func,
  location: PropTypes.object,
  log: PropTypes.array,
  main: PropTypes.object,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  onDateChange: PropTypes.func,
  errors: PropTypes.object,
  tasklist: PropTypes.array,
  users: PropTypes.array
};

DeviationDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
};

DeviationDetail.childContextTypes = {
  location: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {

  return {
    deviation: state.deviation,
    main: state.main,
    log: state.log,
    tasklist: state.tasks.ctlist,
    ctTotal: state.tasks.ctTotal,
    users: usersFormattedForDropdown(state.users)
  };
}

export default connect(mapStateToProps, {
  addDeviation, createLog, editDeviation, closeDeviation, getDeviation, getProjectTasks, setMain
})(DeviationDetail);
