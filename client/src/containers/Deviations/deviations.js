// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toastr from 'toastr';

import DeviationList from '../../components/Deviations/deviations-list';
import Pagination from '../../components/Common/pagination';
import SearchBox from '../../components/Common/search-box';

/* actions */
import { getDeviation, getDeviations, addDeviation, loadPage, exportDeviations, resetDeviation } from '../../actions/actions_deviations';
import { setMain, setView } from '../../actions/actions_main';
import { resetLog, getLog } from '../../actions/actions_logger';

class Deviations extends Component {

props: {
  changes: [],
  deviations: {},
  exportDeviations: any,
  getDeviations: any,
  getDeviation: any,
  getLog: any,
  history: any,
  loadPage: any,
  MainId: string,
  resetLog: any,
  resetDeviation: any,
  setMain: any,
  setView: any,
  ShowAll: boolean,
  user: {}
};

state = {
    activePage: 0,
    colSelected: null,
    paged: {},
    count: 0,
    numPage: 15,
    txtSearch: '',
    showAll: false,
    detailView: false
  };


  componentWillMount() {
    let search = this.props.deviations.searchText;

    if (!this.props.deviations.alldata.length > 0) {
      this.props.getDeviations(1);
    }

    this.setState({ txtSearch: search });
    this.setState({ showAll: this.props.ShowAll });
    this.onChange(1, search);
  }

  onSearchText = (event) => {
    const value = event.target.value;
    this.setState({ activePage: 0 });
    this.setState({ txtSearch: value });
    this.onChange(0, value);
  };

  onChange = (page_num, searchText, column) => {
    const action = {};
    action.page_num = page_num || 1;
    action.search = searchText || null;
    action.numPage = this.state.numPage;
    action.column = column;
    this.props.loadPage(action);
  };

  onGetDeviation = (i) => {
    const _MainId = this.props.MainId;
    const _id = i;

    //This action is linked to component/tasklist handleClick function
    if (_MainId !== _id ) {
      this.props.resetLog();
      this.props.resetDeviation();
      this.props.getDeviation(_id);
      this.props.getLog(_id);
      this.props.setMain({ MainId: _id, CurrentMode: 'deviation', loading: true, reload: false });
    } else {
      this.props.setMain({ MainId: _id, CurrentMode: 'deviation', loading: true, reload: true });
    }

    this.props.history.push(`/deviation/${_id}`);

  };

  onSortByClick = (column) => {
    this.setState({ activePage: 0 });
    this.onChange(0, this.state.txtSearch, column);
  };

  linkClick = (i) => {
    this.onChange(i + 1, this.state.txtSearch);
    this.setState({ activePage: i });
  };

  allDeviations = () => {
    let _showAll = this.state.showAll;
    _showAll = !_showAll;
    this.setState({ showAll: _showAll });
    this.props.setView();

    if (_showAll !== true) {
      this.props.getDeviations(2);
    } else {
      this.props.getDeviations(1);
    }
    this.setState({ txtSearch: '' });
    this.setState({ activePage: 0 });
    Toastr.success(`Only showing active changes - ${String(_showAll)}`, 'Deviation Detail', { timeOut: 1000 });
  };

  exportDeviation = () => {
    const info = {
      fsSource: 'exp',
      fsAddedBy: this.props.user.username,
      fsType: 'deviations',
      search: this.state.txtSearch,
      showAll: this.state.showAll
    };

    this.props.exportDeviations(info);
    this.props.history.push('/export');
  };

  newDeviation = () => {
    // this.props.getDeviation(null);
    this.props.resetDeviation();
    this.onChange(1, null);
    this.props.setMain({ MainId: 'new', CurrentMode: 'deviation', loading: false });
    this.props.history.push('/deviation/new');
  };

  showDetailed = () => {
    this.setState({detailView: !this.state.detailView});
  };

  render() {
    let _changeTitle = 'Register';
    let butText;


    if (this.state.showAll !== true) {
      butText = 'All Deviations';
    } else {
      butText = 'Current Deviations';
    }

    return (
      <section>
        <div className="">
          <div className="section-header">
            <div className="col-sm-6 pull-left">
              <p className="section-header-text-main">Deviation Control - {_changeTitle} </p>
            </div>
            <SearchBox
              searchText={this.state.txtSearch}
              onChange={this.onSearchText}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">
            <button
              className="btn btn-success pull-left"
              onClick={this.newDeviation} >
              New Deviation
            </button>
            <button
              className="btn btn-info dp-margin-10-LR"
              onClick={this.exportDeviation} >
              Export List
            </button>
            <button
              className="btn btn-warning"
              onClick={this.allDeviations} >
              {butText}
            </button>
            <span style={{paddingLeft: 20}}>
              <label><input onClick={this.showDetailed} type="checkbox" /> Show Detail View</label>
            </span>
          </div>

          <div className="col-sm-4">
            <Pagination
              activePage={this.state.activePage}
              numPage={this.props.deviations.per_page}
              count={this.props.deviations.total}
              getPage={this.linkClick} />
          </div>
        </div>


        <div className="">
          <DeviationList
            devlist={this.props.deviations.paged}
            getDeviation={this.onGetDeviation}
            sortByClick={this.onSortByClick}
            colSelected={this.props.deviations.sorted}
            detailView={this.state.detailView} />
        </div>

      </section>
    );
  }
}

export default connect(state => ({ deviations: state.deviations, MainId: state.main.MainId, ShowAll: state.main.ShowAll, user: state.main.user }),
  { getDeviation, getDeviations, addDeviation, loadPage, exportDeviations, resetDeviation, setMain, setView, resetLog, getLog })(Deviations);
