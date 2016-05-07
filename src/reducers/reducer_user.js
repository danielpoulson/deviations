import { GET_USER, RESET_USER } from 'actions/actions_users';

export default function (state = null, action) {

  switch (action.type) {
    case GET_USER: {
      let user = action.payload.data[0];
      user = typeof user !== 'undefined' ? user : null;
      return user;
    }

    case RESET_USER:
      return {};

    default:
      return state;
  }
}
