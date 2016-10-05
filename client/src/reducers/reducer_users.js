import { GET_USERS, USER_CREATED } from '../actions/actions_users';


export default function (state = [], action) {

  switch (action.type) {
    case GET_USERS:
      return action.payload.data;

    case USER_CREATED:
      return [
        ...state,
        action.fullname
      ];

    default:
      return state;
  }
}
