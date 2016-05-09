import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {getValues} from 'redux-form';
import DeviationDetailForm from 'components/Deviations/deviation-detail.form';
import DeviationInvestForm from 'components/Deviations/deviation-invest.form';
import TaskList from 'components/Tasks/task-list';
import FileList from 'containers/Files/file-list';
import DeviationLog from 'components/Deviations/deviation-log';
import classNames from 'classnames';
import toastr from 'toastr';

/* actions */
import { addDeviation, createLog, editDeviation, getDeviation } from 'actions/actions_deviations';
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
      outcomes: [
        'Accept',
        'Rework',
        'Repair',
        'Reject',
        ''
      ],
      categories: [
        'Bulk',
        'Finished Goods',
        'Packaging / Labels',
        'Raw Materials',
        'other',
        ''
      ],
      classifies: [
        'Contamination',
        'Customer Complaint',
        'Documentation',
        'Formulation Difficulty',
        'Leakers',
        'Not Assigned',
        'Out of Specification',
        'Operator Error',
        'Procedure',
        'Transport Issue',
        'Stock Discrepancy',
        'Other',
        ''
      ]
    };

    this.onApprove = this.onApprove.bind(this);
    this.onFinal = this.onFinal.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.saveDetail = this.saveDetail.bind(this);
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

  onRefresh() {
    this.props.getDeviation(this.state._dvNo);
  }

  onCancel() {
    this.logMessage('Deviation Cancelled');
  }

  onApprove() {
    this.logMessage('Approved to Implement');
  }

  onFinal() {
    this.logMessage('Deviation Closed');
  }

  logMessage(message) {

    let _dvLog = this.props.deviation.dvLog;

    const newMessage = {
      dvLogType : message,
      dvLogBy: this.props.main.user.fullname,
      dvLogDate: new Date()
    };

    if (typeof _dvLog === "undefined") {
      _dvLog = new Array(newMessage);
    } else {
      _dvLog.push(newMessage);
    }

    return _dvLog;

  }

  cancelDeviation = (e) => {
    e.preventDefault();
    this.context.router.push('/deviations');
  };

  saveDetail() {
    let _data = {};

    if (this.state._dvNo !== 'new') {
      _data.dvLog = this.logMessage('Deviation actioned and completed');     
    } else {
      _data.dvLog = this.logMessage('Deviation Created');
    }

    _data.dvClosed = 0;

    this.saveDeviation(_data)

  }


// TODO: LOW Remove CC_ActDept : this.prop.main.user.dept
  saveDeviation (_data) {

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
      _data.dvInvest= this.props.devform.dvInvest.value;
      _data.dvOutCome= this.props.devform.dvOutCome.value;
      _data.dvCustSend= this.props.devform.dvCustSend.value;
      _data.dvCat = this.props.devform.dvCat.value;
      _data.dvClass = this.props.devform.dvClass.value;
      _data.dvCreated = this.props.devform.dvCreated.value;

      this.props.editDeviation(_data);

    } else {

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

    return (
    <div>
          <div className="">
            <div className="section-header">
              <p className="section-header-text-sub">{_title}</p>
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
                <DeviationDetailForm 
                  onSubmit={this.saveDetail}
                  onCancel={this.cancelDeviation} />
              </div>
            </div>
          </div>

          <div className={this.state.InvestTab}>
            <div className="panel panel-default">
              <div className="panel-body">
                {this.state.notnew && <DeviationInvestForm 
                  onSubmit={this.saveDetail}
                  status={this.state.status}
                  outcomes={this.state.outcomes}
                  categories={this.state.categories}
                  classifies={this.state.classifies}
                  users={this.props.users}
                  onCancel={this.cancelDeviation} />}
              </div>
            </div>
          </div>

          {this.state.notnew && <DeviationLog
            logTab={this.state.LogTab}
            onApprove={this.onApprove}
            onFinal={this.onFinal}
            onCancel={this.onCancel}
            log={this.props.deviation} />}

          {this.state.notnew && <TaskList
            tasklist = {this.props.tasklist}
            tasksTab = {this.state.TasksTab}
            title={this.state.deviationTitle} />}

          {this.state.notnew && <FileList
            filesTab={this.state.FilesTab}
            refreshDeviation={this.onRefresh}
            sourceId={this.props.location.pathname.split('/')[2]} />}

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
  tasklist: state.tasks.ctlist,
  ctTotal: state.tasks.ctTotal,
  users: state.users
}), {
  addDeviation, createLog, editDeviation, getDeviation, getProjectTasks, setMain
})(DeviationDetail);
