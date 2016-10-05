import axios from 'axios';
export const ADD_LOG = 'ADD_LOG';
export const GET_LOG = 'GET_LOG';
export const RESET_LOG = 'RESET_LOG';

// Send a new task to the database
export function createLog(data) {
  const url = '/api/logger';
  axios.post(url, data);
  data._id = Math.random() * (1000000 - 0) + 0;

  return {
    type: ADD_LOG,
    payload: data
  };
}

export function getLog(data) {
  const url = `/api/logger/${data}`;
  const request = axios.get(url);

  return {
    type: GET_LOG,
    payload: request
  };
}

export function resetLog() {
	return { type: RESET_LOG };
}