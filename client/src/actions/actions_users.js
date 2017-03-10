//SYNC 11/03/2017 DP
import axios from 'axios';

export const GET_USER = 'GET_USER';
export const GET_USERS = 'GET_USERS';
export const RESET_USER = 'RESET_USER';
export const SAVE_USER = 'SAVE_USER';
export const DELETED_USER = 'DELETED_USER';
export const USER_CREATED = 'USER_CREATED';


export function getUsers() {
  const url = '/api/users/all';
  const request = axios.get(url);

  return {
    type: GET_USERS,
    payload: request
  };

}

export function getUser(id) {
  const url = `/api/users/${id}`;
  const request = axios.get(url);

  return {
    type: GET_USER,
    payload: request
  };

}

export function resetUser() {
  return {
    type: RESET_USER
  };
}

export function createUser(data) {
  const url = '/api/users';
  axios.post(url, data);

  return {
    type: USER_CREATED,
    fullname: data.fullname
  };
}

export function saveUser(data) {
  const url = `/api/users/updateuser/${data.username}`;
  axios.put(url, data);

  return {
    type: SAVE_USER,
    data
  };
}

export function savePass(id, password) {
  const url = `/api/users/updatepass/${id}`;
  axios.put(url, {password: password});
  
  return {
    type: "PASSWORD_CHANGED"
  };
}

export function deleteUser(data) {
  const fullname = data;
  const url = `/api/users/${data}`;
  axios.delete(url);
  // TODO: (3) LOW Remove server call to repopulate user after delete
  // This action should remove the user from the state tree
  // See user-profile ondeleteUser
  return {
    type: DELETED_USER,
    fullname
  };
}