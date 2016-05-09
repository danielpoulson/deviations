import axios from 'axios';

export const GET_DEVS = 'GET_DEVS';
export const GET_DEV = 'GET_DEV';
export const ADD_DEV = 'ADD_DEV';
export const EDIT_DEV = 'EDIT_DEV';
export const NEW_DEVIATION = 'NEW_DEVIATION';
export const LOAD_PAGE_DEVS = 'LOAD_PAGE_DEVS';
export const CREATE_LOG = 'CREATE_LOG';
export const BOOKOUT_FILE = 'BOOKOUT_FILE';


export function getDeviations(data) {
  // TODO: Hard copy customer can not choose to load a particular customer
  const cust = 'all';
  const url = `/api/deviationlist/${data}/${cust}`;
  const request = axios.get(url);

  return {
    type: GET_DEVS,
    payload: request,
  };

}

export function getDeviation(data) {

  const url = `/api/deviation/${data}`;
  const request = axios.get(url);

  return {
    type: GET_DEV,
    payload: request,
  };

}

export function addDeviation(data) {
  const url = '/api/changes';
  const request = axios.post(url, data);

  return {
    type: ADD_DEV,
    payload: request,
  };

}

export function editDeviation(data) {
  const url = `/api/deviations/${data.dvNo}`;
  axios.put(url, data);

  return {
    type: EDIT_DEV,
    payload: data,
  };

}

export function resetDeviation(){
  return {
    type: NEW_DEVIATION
  }
}

export function loadPage(data) {
  return {

    type: LOAD_PAGE_DEVS,
    data,
  };

}

export function createLog(data) {
  const url = `/api/changelog/${data.CC_No}`;
  axios.put(url, data);

  return {
    type: CREATE_LOG,
    payload: data,
  };

}

export function bookoutFile(data) {
  const url = `/api/filebooked/${data._id}`;
  axios.put(url);

  return {
    type: BOOKOUT_FILE,
    payload: data,
  };

}

export function exportDeviations(search) {
  const url = '/export/changes';
  axios.post(url, search);

  return {
    type: 'EXPORT_DEVS',
  };
}
