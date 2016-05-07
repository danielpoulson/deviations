import { ADD_TASK, EDIT_TASK, DELETE_TASK, GET_TASKS, LOAD_PAGE_TASKS, GET_PROJECT_TASKS } from 'actions/actions_tasks';
const initialState = {
  alldata: [],
  paged: [],
};

function searchIndex(data, index) {
  return data.filter((item) => item._id !== index);
}

function searchData(data, searchText, sortColumn) {
  function search(item) {
    const reg1 = new RegExp(`${searchText}.*`, 'i');

    if (item.SourceId.match(reg1) || item.TKChamp.match(reg1) || item.TKName.match(reg1)) {
      return true;
    }
    return false;
  }

  if (searchText === null) {
    return _.sortBy(data, sortColumn);
  }

  let _sortColumn = '';
  _sortColumn = sortColumn || 'TKTarg';
  const newList = _.chain(data).filter(search).sortBy(_sortColumn).value();
  return newList;
}

export default function (state, action) {
  let alldata = [];
  let _data = {};
  let per_page = 15;
  let page = 1;
  let offset = 0;
  let paged = [];
  let searchText = '';
  let currIds = [];
  let ctTotal = 0;
  let ctlist = [];

  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case ADD_TASK:
      _data = action.payload.data;
      alldata = [
        ...state.alldata,
        _data,
      ];
      return {
        ...state,
        alldata,
      };

    case EDIT_TASK: {
      _data = action.payload;
      currIds = state.alldata.map(c => c._id);
      const index = currIds.indexOf(_data._id);

      alldata = [
        ...state.alldata.slice(0, index),
        // Copy the object before mutating
        Object.assign({}, _data),
        ...state.alldata.slice(index + 1),
      ];
      return {
        ...state,
        alldata,
      };
    }

    case DELETE_TASK: {
      const _id = action.payload;
      alldata = searchIndex(state.alldata, _id);
      ctlist = searchIndex(state.ctlist, _id);
      ctTotal = ctlist.length;
      return {
        ...state,
        alldata,
        ctlist,
        ctTotal,
      };
    }

    case GET_PROJECT_TASKS:
      ctlist = action.payload.data;
      ctTotal = ctlist.length;

      return {
        ...state,
        ctlist,
        ctTotal,
      };

    case GET_TASKS:
    // this.props.loadPage(page_num, this.state.numPage, search);
      alldata = action.payload.data;
      per_page = 15;
      page = 1;
      offset = (page - 1) * per_page;
      paged = alldata.slice(offset, offset + per_page);

      return {
        ...state,
        page,
        per_page,
        total: alldata.length,
        total_pages: Math.ceil(alldata.length / per_page),
        paged,
        alldata,
      };

    case LOAD_PAGE_TASKS: {
      const column = action.data.column || state.sorted;
      per_page = action.data.numPage || 15;
      page = action.data.page_num || 1;
      offset = (page - 1) * per_page;
      searchText = action.data.search;
      const searcheddata = searchData(state.alldata, searchText, column);
      paged = searcheddata.slice(offset, offset + per_page);

      return {
        ...state,
        sorted: column,
        searchText,
        page,
        per_page,
        total: searcheddata.length,
        total_pages: Math.ceil(alldata.length / per_page),
        paged
      };
    }
    default:
      return state;
  }
}
