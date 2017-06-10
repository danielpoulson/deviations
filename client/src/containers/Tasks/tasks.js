import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskList from '../../components/Tasks/task-list';
import Pagination from '../../components/Common/pagination';
import SearchBox from '../../components/Common/search-box';
/* actions */
import { getAllTasks, loadPageTask, exportTasks, setCapa } from '../../actions/actions_tasks';
import { getDeviation, resetDeviation } from '../../actions/actions_deviations';
import { setMain } from '../../actions/actions_main';
import { resetLog, getLog } from '../../actions/actions_logger';

class Tasks extends Component {
  props: {
    history: any,
    user: {},
    tasks: {},
    exportTasks: any,
    getAllTasks: any,
    loadPageTask: any
  };
  constructor(props) {
    super(props);
    this.state = {
        activePage: 0,
        paged: {},
        count: 0,
        numPage: 15,
        _showCapaOnly: false,
        txtSearch: ''
      };

    this.onSearchText = this.onSearchText.bind(this);
    this.onSelectTask = this.onSelectTask.bind(this);
    this.linkClick = this.linkClick.bind(this);
    this.exportTask = this.exportTask.bind(this);
    this.showCapa = this.showCapa.bind(this);
    this.onSortByClick = this.onSortByClick.bind(this);

  }

  componentWillMount() {
    if (!this.props.tasks.alldata.length > 0) {
      this.props.getAllTasks();
    }

    this.onloading();

  }

  onloading(){
    const search = this.props.tasks.searchText;
    const showCapaOnly = this.props.tasks.showCapaOnly;
    this.setState({ txtSearch: search });
    this.setState({ _showCapaOnly: showCapaOnly });
    this.onChange(1, showCapaOnly, search);
  }

  showCapa() {
    let _CapaOnly = !this.state._showCapaOnly;
    this.setState({ _showCapaOnly: _CapaOnly });

    this.setState({ activePage: 0 });
    this.onChange(0, _CapaOnly, this.state.txtSearch);
  }

  onChange(page_num, showCapaOnly, searchText, column) {
    const action = {};
    action.page_num = page_num || 1;
    action.search = searchText || this.state.txtSearch;
    action.numPage = this.state.numPage;
    action.column = column;
    action.showCapaOnly = showCapaOnly;
    this.props.loadPageTask(action);
  }

  onSearchText(event) {
    const value = event.target.value;
    this.setState({ activePage: 0 });
    this.setState({ txtSearch: value });
    this.onChange(0, this.state._showCapaOnly, value);
  }

  onSelectTask(i) {
    const dvNo:string = i.SourceId;
    if (this.props.mainId !== dvNo ) {
        this.props.resetLog();
        this.props.resetDeviation();
        this.props.getDeviation(dvNo);
        this.props.getLog(dvNo);
        this.props.setMain({ MainId: dvNo, CurrentMode: 'deviation', loading: true, reload: false });
    } else {
        this.props.setMain({ MainId: dvNo, CurrentMode: 'deviation', loading: true, reload: true });
    };

    this.props.history.push(`/deviation/${dvNo}`);
  }

  onSortByClick(column) {
    this.setState({ activePage: 0 });
    this.onChange(0, this.state._showCapaOnly, this.state.txtSearch, column);
  }

  linkClick(i) {
    this.onChange(i + 1, this.state._showCapaOnly, this.state.txtSearch);
    this.setState({ activePage: i });
  }

  exportTask() {
    const info = {
      fsSource: 'exp',
      fsAddedBy: this.props.user.username,
      fsType: 'tasks',
      search: this.state.txtSearch
    };

    this.props.exportTasks(info);
    this.props.history.push('/export');
  }

  render() {
    let butText = 'Show CAPA Only';

    if (this.props.tasks.showCapaOnly !== true) {
      butText = 'Show CAPA Only';
    } else {
      butText = 'Active Tasks';
    }

    return (

      <div>
        <div className="">
          <div className="section-header">
            <div className="col-sm-6 pull-left">
              <p className="section-header-text-main">Active Task List </p>
            </div>
            <SearchBox
              searchText={this.state.txtSearch}
              onChange={this.onSearchText}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <button
              className="btn btn-info"
              onClick={this.exportTask} >
              Export List
            </button>
            <button
              className="btn btn-wild dp-margin-10-LR"
              onClick={this.showCapa} >
              {butText}
            </button>
          </div>

          <div className="col-sm-6">
            <Pagination
              activePage={this.state.activePage}
              numPage={this.props.tasks.per_page}
              count={this.props.tasks.total}
              getPage={this.linkClick.bind(this)} />
          </div>
        </div>

        <TaskList
          tasklist={this.props.tasks.paged}
          onSelectTask={this.onSelectTask}
          type="All" />

        </div>
    );
  }
}

export default connect(state => ({ tasks: state.tasks, user: state.main.user, mainId: state.main.MainId }),
  { getAllTasks, loadPageTask, exportTasks, setCapa, getDeviation, resetDeviation, setMain, resetLog, getLog })(Tasks);
