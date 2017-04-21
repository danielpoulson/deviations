//SYNC 11/03/2017 DP
import axios from 'axios';

export const GET_FILES = 'GET_FILES';
export const ADD_FILE = 'ADD_FILE';
export const BOOKOUT_FILE = 'BOOKOUT_FILE';
export const DELETE_FILE = 'DELETE_FILE';
export const REMOVE_FILE = 'REMOVE_FILE';


export function getFiles(data) {
  const url = `/api/files/${data}`;
  const request = axios.get(url);

  return {
    type: GET_FILES,
    payload: request
  };

}

export function addFile(data) {

  return {
    type: ADD_FILE,
    payload: data
  };

}

export function deleteFile(id) {
  const url = `/api/files/delete/${id}`;
  axios.delete(url);

  return {
    type: DELETE_FILE,
    payload: id
  };

}

export function removeFile(id) {

  return {
    type: DELETE_FILE,
    payload: id
  };

}
//
export function bookoutFile(id, user) {
  const url = `/api/files/booked/${id}`;
  axios.put(url, {user: user});

  return {
    type: BOOKOUT_FILE,
    payload: id
  };

}
