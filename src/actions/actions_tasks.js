import axios from 'axios';

export const GET_TASKS = 'GET_TASKS';
export const GET_TASK = 'GET_TASK';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const EXPORT_TASKS = 'EXPORT_TASKS';
export const DELETE_TASK = 'DELETE_TASK';
export const LOAD_PAGE_TASKS = 'LOAD_PAGE_TASKS';
export const GET_PROJECT_TASKS = 'GET_PROJECT_TASKS';
export const GET_ALL_TASKS = 'GET_ALL_TASKS';


export function getTasks(data) {
  const url = `/api/tasks/${data}`;
  const request = axios.get(url);

  return {
    type: GET_TASKS,
    payload: request,
  };

}

export function getAllTasks() {
// TODO: LOW 2 Remove the hardwire status input 4 = "active tasks"
  const _status = 4;
  const url = `/api/alltasks/${_status}`;
  const request = axios.get(url);

  return {
    type: GET_TASKS,
    payload: request,
  };

}

export function getProjectTasks(data) {
  const url = `/api/project/tasks/${data}`;
  const request = axios.get(url);

  return {
    type: GET_PROJECT_TASKS,
    payload: request,
  };

}

export function getTask(data) {
  let request = {};

  if (data !== 'new') {
    const url = `/api/task/${data}`;
    request = axios.get(url);
  }

  return {
    type: GET_TASK,
    payload: request,
  };

}

export function addTask(data) {
  const url = '/api/task';
  const request = axios.post(url, data);

  return {
    type: ADD_TASK,
    payload: request,
  };

}

export function editTask(data) {
  const url = `/api/task/${data._id}`;
  axios.put(url, data);

  return {
    type: EDIT_TASK,
    payload: data,
  };

}

export function deleteTask(data) {
  const url = `/api/tasks/${data}`;
  axios.delete(url);

  return {
    type: DELETE_TASK,
    payload: data,
  };

}


export function loadPageTask(data) {
  return {

    type: LOAD_PAGE_TASKS,
    data,
  };

}

export function exportTasks(search) {
  const url = '/export/tasks';
  axios.post(url, search);

  return {
    type: 'EXPORT_TASKS',
  };
}
