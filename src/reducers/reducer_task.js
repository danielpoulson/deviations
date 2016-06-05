import { GET_TASK, EDIT_TASK } from 'actions/actions_tasks';

const initialState = { _id: '', TKCapa: 0, TKStat: 0, TKChamp: '' };

export default function (state = initialState, action) {

  switch (action.type) {
    case GET_TASK:
      if (!action.payload.data) {
        return {};
      }
      return action.payload.data;

    case EDIT_TASK:
      return Object.assign({}, action.payload);

    default:
      return state;
  }
}
