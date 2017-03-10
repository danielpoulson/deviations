//SYNC 11/03/2017 DP
import axios from 'axios';

export const GET_TASKS = 'GET_TASKS';
export const GET_TASK = 'GET_TASK';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const LOAD_PAGE_TASKS = 'LOAD_PAGE_TASKS';
export const GET_PROJECT_TASKS = 'GET_PROJECT_TASKS';
export const GET_ALL_TASKS = 'GET_ALL_TASKS';
export const SET_CAPA = 'SET_CAPA';


export function getTasks(data) {
  const url = `/api/tasks/${data}`;
  const request = axios.get(url);

  return {
    type: GET_TASKS,
    payload: request
  };

}

export function getAllTasks() {
  const _status = 4;
  const _capa = 0;
  const url = `/api/tasks/all/${_status}/${_capa}`;
  const request = axios.get(url);

  return {
    type: GET_TASKS,
    payload: request
  };

}

export function getProjectTasks(data) {
  const url = `/api/tasks/project/${data}`;
  const request = axios.get(url);

  return {
    type: GET_PROJECT_TASKS,
    payload: request
  };

}

export function getTask(data) {
  let request = {};

  if (data !== 'new') {
    const url = `/api/tasks/${data}`;
    request = axios.get(url);
  }

  return {
    type: GET_TASK,
    payload: request
  };

}

export function addTask(data) {
  const url = '/api/tasks';
  const request = axios.post(url, data);

  return {
    type: ADD_TASK,
    payload: request
  };

}

export function editTask(data) {
  const url = `/api/tasks/${data._id}`;
  axios.put(url, data);

  return {
    type: EDIT_TASK,
    payload: data
  };

}

export function deleteTask(data) {
  const url = `/api/tasks/${data}`;
  axios.delete(url);

  return {
    type: DELETE_TASK,
    payload: data
  };

}


export function loadPageTask(data) {
  return {

    type: LOAD_PAGE_TASKS,
    data
  };

}

export function exportTasks(search) {
  const url = '/api/tasks/export';
  const request = axios.post(url, search);

  return {
    type: 'ADD_EXPORTFILE',
    payload: request
  };
}

export function setCapa() {
  return {
    type: SET_CAPA
  };
}