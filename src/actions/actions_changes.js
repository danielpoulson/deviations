import axios from 'axios';

export const GET_CHANGES = 'GET_CHANGES';
export const GET_CHANGE = 'GET_CHANGE';
export const ADD_CHANGE = 'ADD_CHANGE';
export const EDIT_CHANGE = 'EDIT_CHANGE';
export const LOAD_PAGE_CHANGES = 'LOAD_PAGE_CHANGES';
export const CREATE_LOG = 'CREATE_LOG';
export const BOOKOUT_FILE = 'BOOKOUT_FILE';


export function getChanges(data) {
  const url = `/api/changes/${data}`;
  const request = axios.get(url);

  return {
    type: GET_CHANGES,
    payload: request,
  };

}

export function getChange(data) {

  const url = `/api/change/${data}`;
  const request = axios.get(url);

  return {
    type: GET_CHANGE,
    payload: request,
  };

}

export function addChange(data) {
  const url = '/api/changes';
  const request = axios.post(url, data);

  return {
    type: ADD_CHANGE,
    payload: request,
  };

}

export function editChange(data) {
  const url = `/api/change/${data._id}`;
  axios.put(url, data);

  return {
    type: EDIT_CHANGE,
    payload: data,
  };

}

export function loadPage(data) {
  return {

    type: LOAD_PAGE_CHANGES,
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

export function exportChanges(search) {
  const url = '/export/changes';
  axios.post(url, search);

  return {
    type: 'EXPORT_CHANGES',
  };
}
