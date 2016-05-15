import { SET_MAIN, SET_USER, USER_LOGGED_OUT, SET_FILETAB_COUNT, SET_LOADING, SET_USER_DASHBOARD, SET_VIEW } from 'actions/actions_main';
import toastr from 'toastr';

const initialState = {
  MainId: '',
  CurrentMode: 'change',
  ShowAll: false,
  user: {
    username: '',
    fullname: '',
    role: 'user'
  }
};

export default function (state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case SET_MAIN:
      return {
        ...state,
        MainId: action.data.MainId,
        CurrentMode: action.data.CurrentMode,
        loading: action.data.loading
      };

    case SET_USER: {
      let _user = {};

      if (action.payload.data.success) {
         _user = action.payload.data.user;
        sessionStorage.setItem('authorised', true);
        sessionStorage.setItem('username', action.payload.data.user.username);
      } else {
        toastr.error('Your username / password combination was incorrect!', 'Authentication Failed', { timeOut: 2000, positionClass: 'toast-bottom-right' });
      }

      return {
        ...state,
        user: _user
      };
    }

    case USER_LOGGED_OUT:
      return {
        ...state,
        user: initialState.user,
      };

    case SET_FILETAB_COUNT:
      return {
        ...state,
        fileTabCount: action.data
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.data.loading
      };

    case SET_VIEW:
      const _showAll = !state.ShowAll;
      
      return {
        ...state,
        ShowAll: _showAll,
      };

    case SET_USER_DASHBOARD:
      const countDeviationsUser = action.payload.data ? action.payload.data.deviationCount : 0;
      const countTasksUser = action.payload.data ? action.payload.data.taskCount : 0;
      const allOpenTasks = action.payload.data ? action.payload.data.allTaskCount : 0;
      const allOpenDeviations = action.payload.data ? action.payload.data.allDeviationCount : 0;
      return {
        ...state,
        countDeviationsUser,
        countTasksUser,
        allOpenTasks,
        allOpenDeviations
      }

    default:
      return state;
  }
}
