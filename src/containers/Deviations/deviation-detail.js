import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {getValues} from 'redux-form';
import DevDetailForm from 'components/Deviations/deviation-detail.form';
import DevInvestForm from 'components/Deviations/deviation-invest.form';
import TaskList from 'components/Tasks/task-list';
import FileList from 'containers/Files/file-list';
import DeviationLog from 'components/Deviations/deviation-log';
import classNames from 'classnames';
import toastr from 'toastr';

/* actions */
import { addDeviation, createLog, editDeviation, closeDeviation, getDeviation } from 'actions/actions_deviations';
import { getProjectTasks } from 'actions/actions_tasks';
import { setMain } from 'actions/actions_main';

class DeviationDetail extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    location: React.PropTypes.object
  };

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
      status: [
        { id: 1, name: 'Review' },
        { id: 2, name: 'Approved' },
        { id: 3, name: 'On-hold' },
        { id: 4, name: 'Closed' },
        { id: 5, name: 'Cancelled' }
      ],
      outcomes: [ 'Accept', 'Rework', 'Repair', 'Reject', ''],
      categories: [ 'Bulk', 'Finished Goods', 'Packaging / Labels', 'Raw Materials', 'other', ''],
      classifies: [ 'Contamination', 'Customer Complaint', 'Documentation', 'Formulation Difficulty', 'Leakers', 'Not Assigned',
      'Out of Specification', 'Operator Error', 'Procedure', 'Transport Issue', 'Stock Discrepancy', 'Other', '' ]};

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
    if (this.props.deviation._id != nextProps.deviation._id) {
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
    const _devform = this.props.devform;
    const _data = {
      dvNo: this.state._dvNo,
      dvAssign: _devform.dvAssign.value,
      dvBatchNo: _devform.dvBatchNo.value,
      dvCat: _devform.dvCat.value,
      dvClass: _devform.dvClass.value,
      dvCreated: _devform.dvCreated.value,
      dvCust: _devform.dvCust.value,
      dvCustSend: _devform.dvCustSend.value,
      dvDOM: _devform.dvDOM.value,
      dvDescribe: _devform.dvDescribe.value,
      dvInvest: _devform.dvInvest.value,
      dvMatName: _devform.dvMatName.value,
      dvMatNo: _devform.dvMatNo.value,
      dvOutCome: _devform.dvOutCome.value,
      dvSupplier: _devform.dvSupplier.value,
      dvClosed: 1,
    }

    _data.dvLog = this.logMessage('Deviation Completed');

    this.props.closeDeviation(_data);
    toastr.success('Deviation has been Closed', 'Deviation Detail', { timeOut: 1000 });
    this.setState({ dirty: false });
    this.context.router.push('/deviations');

  }

  onPrintDev(e) {
    e.preventDefault()
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

  cancelDeviation = (e) => {
    e.preventDefault();
    this.context.router.push('/deviations');
  };

  saveDetail() {
    let _data = {};

    if (this.state._dvNo !== 'new') {
      _data.dvLog = this.logMessage('Deviation Edit');     
    } else {
      _data.dvLog = this.logMessage('Deviation Created');
    }

    _data.dvClosed = 0;

    this.saveDeviation(_data)

  }


// TODO: LOW Remove CC_ActDept : this.prop.main.user.dept
  saveDeviation (_data, closed) {

    _data.dvNo = this.state._dvNo;

    // Save on new or edit
    _data.dvMatNo= this.props.devform.dvMatNo.value;
    _data.dvMatName= this.props.devform.dvMatName.value;
    _data.dvCust= this.props.devform.dvCust.value;
    _data.dvBatchNo= this.props.devform.dvBatchNo.value;
    _data.dvSupplier= this.props.devform.dvSupplier.value;
    _data.dvDOM= this.props.devform.dvDOM.value;
    _data.dvDescribe= this.props.devform.dvDescribe.value;
  
    if(_data.dvNo !== 'new') {
      _data._id = this.props.deviation._id;
      _data.dvAssign= this.props.devform.dvAssign.value;
      _data.dvClass = this.props.devform.dvClass.value;
      _data.dvCreated = this.props.devform.dvCreated.value;
      _data.dvInvest= this.props.devform.dvInvest.value;
      _data.dvOutCome= this.props.devform.dvOutCome.value;
      _data.dvCustSend= this.props.devform.dvCustSend.value;
      _data.dvCat = this.props.devform.dvCat.value;
      _data.dvNotChanged = this.props.devform.dvAssign.value === this.props.devform.dvAssign.initial;

      this.props.editDeviation(_data);

    } else {
      _data.dvAssign = 'Quality Assurance';
      _data.dvClass = 'Not Assigned';
      this.props.addDeviation(_data);
      
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
    let task = this.state.task;
    task[field] = event.target.value;
    return this.setState({task: task});
  }

  updateDevStateDate(field, value) {
    // this.setState({dirty: true});
    let task = this.state.task;
    task[field] = value;
    return this.setState({task: task});
  }


  render() {

    const _title = this.props.deviation !== null ? `${this.props.deviation.dvNo} - ${this.props.deviation.dvMatName}` : 'New - Deviation';

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

    // TODO The title for a new deviation is undefined - undefined needs to state "New Deviaiton"

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
            tasklist = {this.props.tasklist}
            tasksTab = {this.state.TasksTab}
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

};

export default connect(state => ({
  deviation: state.deviation,
  devform: state.form.devform,
  main: state.main,
  log: state.log,
  tasklist: state.tasks.ctlist,
  ctTotal: state.tasks.ctTotal,
  users: state.users
}), {
  addDeviation, createLog, editDeviation, closeDeviation, getDeviation, getProjectTasks, setMain
})(DeviationDetail);
