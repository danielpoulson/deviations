import axios from 'axios';

export const SET_MAIN = 'SET_MAIN';
export const SET_USER = 'SET_USER';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const SET_FILETAB_COUNT = 'SET_FILETAB_COUNT';
export const SET_GRAPH_DATA = 'SET_GRAPH_DATA';
export const SET_LOADING = 'SET_LOADING';
export const SET_USER_DASHBOARD = 'SET_USER_DASHBOARD';
export const SET_VIEW = 'SET_VIEW';


export function getUserDashboard(username){
  let request = {};

  if (username !== null ) {
    const url = `/api/deviations/userdashboard/${username}`;
    request = axios.get(url);
  }

  return {
    type: SET_USER_DASHBOARD,
    payload: request
  };
}

export function getGraphData(){
  const url = "/api/deviations/graphdata";
  const request = axios.get(url);

  return {
    type: SET_GRAPH_DATA,
    payload: request
  };
}


export function setMain(data) {

  return {
    type: SET_MAIN,
    data
  };
}

export function setFiletabCount(data) {

  return {
    type: SET_FILETAB_COUNT,
    data
  };
}

export function setLoading(data) {

  return {
    type: SET_LOADING,
    data
  };
}

export function setUser() {
  const url = '/api/users/logged';
  const request = axios.get(url);

  return {
    type: SET_USER,
    payload: request
  };
}

export function login(data) {
  const url = '/login';
  const request = axios.post(url, data);

  return {
    type: SET_USER,
    payload: request
  };
}

export function setView() {
  return {
    type: SET_VIEW
  };
}

export function logoutUser() {
  const url = '/logout';
  axios.get(url);

  return {
    type: USER_LOGGED_OUT
  };
}
