import axios from 'axios';

export const GET_USER = 'GET_USER';
export const GET_USERS = 'GET_USERS';
export const RESET_USER = 'RESET_USER';
export const SAVE_USER = 'SAVE_USER';
export const DELETED_USER = 'DELETED_USER';
export const USER_CREATED = 'USER_CREATED';


export function getUsers() {
  const url = '/api/allusers';
  const request = axios.get(url);

  return {
    type: GET_USERS,
    payload: request,
  };

}

export function getUser(id) {
  const url = `/api/user/${id}`;
  const request = axios.get(url);

  return {
    type: GET_USER,
    payload: request,
  };

}

export function resetUser() {
  return {
    type: RESET_USER,
  };
}

export function createUser(data) {
  const url = '/api/user';
  axios.post(url, data);

  return {
    type: USER_CREATED,
    fullname: data.fullname,
  };
}

export function saveUser(data) {
  const url = `/api/updateuser/${data.username}`;
  axios.put(url, data);

  return {
    type: SAVE_USER,
    data,
  };
}

export function deleteUser(data) {
  const fullname = data;
  const url = `/api/user/${data}`;
  axios.delete(url);
  // TODO: LOW 3 Remove server call to repopulate user after delete
  // This action should remove the user from the state tree
  // See user-profile ondeleteUser
  return {
    type: DELETED_USER,
    fullname,
  };
}
