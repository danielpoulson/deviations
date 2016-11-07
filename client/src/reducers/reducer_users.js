import { GET_USERS, USER_CREATED } from '../actions/actions_users';


export default function (state = [], action) {

  function filterIndex(data, index) {
    return data.filter((item) => item !== index);
  }

  switch (action.type) {
    case GET_USERS:
      return action.payload.data;

    case USER_CREATED:
      return [
        ...state,
        action.fullname
      ];

    case 'DELETED_USER':
      return filterIndex(state, action.fullname);


    default:
      return state;
  }
}
