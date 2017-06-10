// data-function ver-002 11/06/2017 DP
import sortBy from 'lodash/fp/sortBy';
import compose from 'lodash/fp/compose';
import filter from 'lodash/fp/filter';
const per_page = 15;
const init_page = 1;

export function pagedList(data, page) {
  const _page = page || init_page;
  const offset = (_page - 1) * per_page;
  return data.slice(offset, offset + per_page);
}

export function searchData(data, searchText, sortColumn, columns) {
  const reg1 = new RegExp(`${searchText}.*`, 'i');

  function search(item) {

    if (
      item[columns[0]].match(reg1) || 
      item[columns[1]].match(reg1) || 
      item[columns[2]].match(reg1) || 
      item[columns[3]].match(reg1) || 
      item[columns[4]].match(reg1)
    ) {
      return true;
    }
    return false;
  }
 
  // let _sortColumn = sortColumn;

  if (typeof(sortColumn) === 'undefined') {
    sortColumn = columns[0];
  }

  if (searchText === null) {
    return sortBy(sortColumn, data);
  }

  const newList = compose(
      sortBy(sortColumn),
      filter(search)
      )(data);

  return newList;
}

export function removeByIndex(data, index) {
  return data.filter((item) => item._id !== index);
}

export function getBySourceId(data, id) {
  return data.filter(item => item.SourceId === id);
}