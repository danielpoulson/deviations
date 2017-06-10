import axios from 'axios';

export const GET_DEVS = 'GET_DEVS';
export const GET_DEV = 'GET_DEV';
export const ADD_DEV = 'ADD_DEV';
export const DELETE_DEV = 'DELETE_DEV';
export const NEW_DEVIATION = 'NEW_DEVIATION';
export const LOAD_PAGE_DEVS = 'LOAD_PAGE_DEVS';
export const CREATE_LOG = 'CREATE_LOG';

export function getDeviations(data) {
  const cust = 'all';
  const url = `/api/deviations/${data}/${cust}`;
  const request = axios.get(url);

  return {
    type: GET_DEVS,
    payload: request
  };

}

export function getDeviation(data) {

  const url = `/api/deviations/${data}`;
  const request = axios.get(url);

  return {
    type: GET_DEV,
    payload: request
  };

}

export function addDeviation(data) {
  let _data = data;
  _data.dvExtract = data.dvDescribe.slice(0,200).replace(/(\r\n|\n|\r)/gm,"");
  const url = '/api/deviations';
  const request = axios.post(url, _data);

  return {
    type: ADD_DEV,
    payload: request
  };

}

export function closeDeviation(data){
  let _data = data;
  const url = `/api/deviations/${_data.dvNo}`;
  axios.put(url, _data);

  return {
    type: DELETE_DEV,
    payload: _data.dvNo
  };
}

export function editDeviation(data) {
  let _data = data;
  _data.dvExtract = data.dvDescribe.slice(0,200).replace(/(\r\n|\n|\r)/gm,"");
  const url = `/api/deviations/${_data.dvNo}`;
  axios.put(url, _data);

  return {
    type: 'EDIT_DEV',
    payload: _data
  };

}



export function resetDeviation(){
  return {
    type: NEW_DEVIATION
  };
}

export function loadPage(data) {
  return {
    type: LOAD_PAGE_DEVS,
    data
  };
}

export function createLog(data) {
  const url = `/api/changelog/${data.CC_No}`;
  axios.put(url, data);

  return {
    type: CREATE_LOG,
    payload: data
  };

}

export function exportDeviations(search) {
  const url = '/api/deviations/export/';
  axios.post(url, search);

  return {
    type: 'EXPORT_DEVS'
  };
}
