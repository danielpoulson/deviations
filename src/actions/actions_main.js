import axios from 'axios';

export const SET_MAIN = 'SET_MAIN';
export const SET_USER = 'SET_USER';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const SET_FILETAB_COUNT = 'SET_FILETAB_COUNT';
export const SET_LOADING = 'SET_LOADING';
export const SET_USER_DASHBOARD = 'SET_USER_DASHBOARD';


export function getUserDashboard(username){
  const url = `/api/userdashboard/${username}`;
  const request = axios.get(url);

  return {
    type: SET_USER_DASHBOARD,
    payload: request
  };
}


export function setMain(data) {

  return {
    type: SET_MAIN,
    data,
  };
}

export function setFiletabCount(data) {

  return {
    type: SET_FILETAB_COUNT,
    data,
  };
}

export function setLoading(data) {

  return {
    type: SET_LOADING,
    data,
  };
}

export function setUser() {
  const url = '/api/loggeduser';
  const request = axios.get(url);

  return {
    type: SET_USER,
    payload: request,
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

// export function login(data) {
//   const url = '/login';
//   const request = new Promise((resolve, reject) => {
//     axios.post(url, data).then((response) => {
//       if(response.data.success === true) {
//         resolve(response);
//       } else {
//         reject({"success":false});
//       }
//     });
//   });
//
//   request.then((request) => {
//     console.log('resolved');
//   });
//
//   return {
//     type: SET_USER,
//     payload: request
//   };
//
// }

export function logoutUser() {
  const url = '/logout';
  axios.get(url);

  return {
    type: USER_LOGGED_OUT,
  };
}
