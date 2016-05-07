import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Toastr from 'toastr';

import DeviationList from 'components/Deviations/deviations-list';
import Pagination from 'components/Common/pagination';
import SearchBox from 'components/Common/search-box';

/* actions */
import { getDeviation, getDeviations, addDeviation, loadPage, exportDeviations } from 'actions/actions_deviations';
import { setMain } from 'actions/actions_main';

@connect(state => ({ deviations: state.deviations, user: state.main.user }),
  { getDeviation, getDeviations, addDeviation, loadPage, exportDeviations, setMain })

export default class Deviations extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    location: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
      colSelected: null,
      paged: {},
      count: 0,
      numPage: 15,
      txtSearch: '',
      showAll: false
    };
    this.onSearchText = this.onSearchText.bind(this);
    this.onSortByClick = this.onSortByClick.bind(this);
    this.onGetDeviation = this.onGetDeviation.bind(this);
  }

  componentWillMount() {
    const search = this.props.deviations.searchText;
    if (!this.props.deviations.alldata.length > 0) {
      this.props.getDeviations(1);
    }
    this.setState({ txtSearch: search });
    this.onChange(1, search);
  }

  // TODO: MED 2 Show all button reverts to "Show all"
  // The button should be "Show Current" but reverts back when returning from the details page.

  onSearchText(event) {
    const value = event.target.value;
    this.setState({ activePage: 0 });
    this.setState({ txtSearch: value });
    this.onChange(0, value);
  }

  onChange = (page_num, searchText, column) => {
    const action = {};
    action.page_num = page_num || 1;
    action.search = searchText || null;
    action.numPage = this.state.numPage;
    action.column = column;
    this.props.loadPage(action);
  };

  onGetDeviation(i) {
    const _id = i;
    // const _id = this.props.changelist[i].CC_No;
    this.props.setMain({ MainId: _id, CurrentMode: 'deviation', loading: true });
    this.props.getDeviation(_id);
    this.context.router.push(`/deviation/${_id}`);
  }

  onSortByClick(column) {
    this.setState({ activePage: 0 });
    this.onChange(0, this.state.txtSearch, column);
  }

  linkClick(i) {
    // TODO LOW 2 Pagination Adding 1 to the page mumber as it uses the base of 0
    this.onChange(i + 1, this.state.txtSearch);
    this.setState({ activePage: i });
  }

  allDeviations = () => {
    let _showAll = this.state.showAll;
    _showAll = !_showAll;
    this.setState({ showAll: _showAll });

    if (this.state.showAll !== true) {
      this.props.getDeviations(6);
    } else {
      this.props.getDeviations(4);
    }
    this.setState({ txtSearch: null });
    this.setState({ activePage: 0 });
    Toastr.success(`Only showing active changes - ${this.state.showAll}`, 'Deviation Detail', { timeOut: 1000 });
  };

  exportDeviation = () => {
    const info = {
      fsSource: 'exp',
      fsAddedBy: this.props.user.username,
      fsType: 'changes',
      search: this.state.txtSearch,
      showAll: this.state.showAll
    };

    this.props.exportDeviations(info);
  };

  newDeviation = () => {
    this.props.getDeviation(null);
    this.props.setMain({ MainId: 'new', CurrentMode: 'change', loading: false });
    this.context.router.push('/change/new');
  };

  render() {
    var _changeTitle = 'Register';
    let butText;


    if (this.state.showAll !== true) {
      butText = 'Show all changes';
    } else {
      butText = 'Show Current Deviations';
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
          <div className="col-sm-6">
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
          </div>

          <div className="col-sm-6">
            <Pagination
              activePage = {this.state.activePage}
              numPage = {this.props.deviations.per_page}
              count = {this.props.deviations.total}
              getPage = {this.linkClick.bind(this)} />
          </div>
        </div>


        <div className="">
          <DeviationList
            devlist={this.props.deviations.paged}
            getDeviation={this.onGetDeviation}
            sortByClick = {this.onSortByClick}
            colSelected = {this.props.deviations.sorted} />
        </div>

      </section>
    );
  }
}

Deviations.propTypes = {
  changes: PropTypes.array,
  exportDeviations: PropTypes.func,
  getDeviations: PropTypes.func,
  getDeviation: PropTypes.func,
  loadPage: PropTypes.func,
  setMain: PropTypes.func,
  user: PropTypes.object,
};
