import { GET_TASK } from 'actions/actions_tasks';

export default function (state = null, action) {

  switch (action.type) {
    case GET_TASK:
      if (!action.payload.data) {
        return {};
      }
      return action.payload.data;

    default:
      return state;
  }
}
