import { GET_DEVS, ADD_DEV, DELETE_DEV, LOAD_PAGE_DEVS } from '../actions/actions_deviations';
import _ from 'lodash';
import { pagedList, removeByIndex, searchData } from '../utils/data-functions';

const initialState = {
  alldata: [],
  page: 1,
  per_page: 15,
  offset: 0,
  paged: [],
  columns: ['dvNo', 'dvMatNo', 'dvMatName', 'dvCust', 'dvAssign' ]
};

export default function (state, action) {
  let alldata = [];
  let _data = {};
  let paged = [];
  let searchText = '';
  let currIds = [];
  let index = [];


  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {

    case ADD_DEV:
      _data = action.payload.data;
      alldata = [
        ...state.alldata,
        _data
      ];
      paged = alldata.slice(0,14);
      return {
        ...state,
        searchText: '',
        total: alldata.length,
        total_pages: Math.ceil(alldata.length / state.per_page),
        alldata,
        paged
      };

    case 'EDIT_DEV':
      _data = action.payload;
      currIds = state.alldata.map(c => c._id);
      index = currIds.indexOf(_data._id);
      alldata = [
        ...state.alldata.slice(0, index),
        // Copy the object before mutating
        Object.assign({}, _data),
        ...state.alldata.slice(index + 1)
      ];
      return {
        ...state,
        paged,
        alldata
      };

    case DELETE_DEV: {
      const _id = action.payload;
      alldata = removeByIndex(state.alldata, _id);
      paged = pagedList(alldata);

      return {
        ...state,
        alldata,
        paged
      };
    }


    case GET_DEVS:
      const column = state.sorted;
      alldata = action.payload.data;
      state.offset = (state.page - 1) * state.per_page;
      searchText = state.searchText || null;
      const searcheddata = searchData(alldata, searchText, column, initialState.columns);
      paged = pagedList(searcheddata, state.page);

      return {
        ...state,
        searchText: null,
        total: searcheddata.length,
        total_pages: Math.ceil(alldata.length / state.per_page),
        paged,
        alldata
      };

    case LOAD_PAGE_DEVS: {
      const column = action.data.column || state.sorted;
      const page = action.data.page_num || 1;
      searchText = action.data.search;
      const searcheddata = searchData(state.alldata, searchText, column, initialState.columns);
      paged = pagedList(searcheddata, page);

      return {
        ...state,
        sorted: column,
        searchText,
        page,
        total: searcheddata.length,
        total_pages: Math.ceil(alldata.length / state.per_page),
        paged
      };
    }

    default:
      return state;
  }
}
