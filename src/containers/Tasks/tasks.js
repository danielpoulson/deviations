import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TaskList from 'components/Tasks/task-list';
import Pagination from 'components/Common/pagination';
import SearchBox from 'components/Common/search-box';
/* actions */
import { getAllTasks, loadPageTask, exportTasks } from 'actions/actions_tasks';

// TODO: MED 3 - Make a common component search box Changes and Task List
// Changes and Task share the same search text box function which should be made as a common component

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activePage: 0,
        paged: {},
        count: 0,
        numPage: 15,
        txtSearch: '',
      };

    this.onSearchText = this.onSearchText.bind(this);
    this.linkClick = this.linkClick.bind(this);
    this.exportTask = this.exportTask.bind(this);

  }

  componentWillMount() {
    const search = this.props.tasks.searchText;
    if (!this.props.tasks.alldata.length > 0) {
      this.props.getAllTasks();
    }
    // TODO: HIGH (FUNC) Sticky options on the task list
    // This section should remember you page and or serach options.
    this.setState({ txtSearch: search });
    this.onChange(1, search);
  }

  onChange(page_num, searchText, column) {
    const action = {};
    action.page_num = page_num || 1;
    action.search = searchText || this.state.txtSearch;
    action.numPage = this.state.numPage;
    action.column = column;
    this.props.loadPageTask(action);
  }

  onSearchText(event) {
    const value = event.target.value;
    this.setState({ activePage: 0 });
    this.setState({ txtSearch: value });
    this.onChange(0, value);
  }

  onSortByClick = (column) => {
    this.setState({ activePage: 0 });
    this.onChange(0, this.state.txtSearch, column);
  };

  linkClick(i) {
    // TODO: LOW (BUG) Pagination Adding 1 to the page mumber as it uses the base of 0
    this.onChange(i + 1, this.state.txtSearch);
    this.setState({ activePage: i });
  }

  exportTask() {
    const info = {
      fsSource: 'exp',
      fsAddedBy: this.props.user.username,
      fsType: 'tasks',
      search: this.state.txtSearch,
    };

    this.props.exportTasks(info);
  }

  render() {

    return (

      <div>
        <div className="">
          <div className="section-header">
            <div className="col-sm-6 pull-left">
              <p className="section-header-text-main">
              Active Task List
              </p>
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
          </div>

          <div className="col-sm-6">
            <Pagination
              activePage = {this.state.activePage}
              numPage = {this.props.tasks.per_page}
              count = {this.props.tasks.total}
              getPage = {this.linkClick.bind(this)} />
          </div>
        </div>

        <TaskList
          tasklist = {this.props.tasks.paged}
          type = "All" />

        </div>
    );
  }
}

Tasks.propTypes = {
  user: PropTypes.object,
  tasks: PropTypes.object,
  exportTasks: PropTypes.func,
  getAllTasks: PropTypes.func,
  loadPageTask: PropTypes.func,
};

export default connect(state => ({ tasks: state.tasks, user: state.main.user }),
  { getAllTasks, loadPageTask, exportTasks })(Tasks);
