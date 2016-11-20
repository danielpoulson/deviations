import { GET_USER, RESET_USER } from '../actions/actions_users';

const initialState = { _id: ''};

export default function (state = initialState, action) {

  switch (action.type) {
    case GET_USER: {
      let user = action.payload.data;
      //user = typeof user !== 'undefined' ? user : initialState;
      return user;
    }

    case RESET_USER:
    case 'DELETED_USER':
      return {};

    default:
      return state;
  }
}
