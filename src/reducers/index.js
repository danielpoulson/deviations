import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import DeviationsReducer from './reducer_deviations';
import DeviationReducer from './reducer_deviation';
import MainReducer from './reducer_main';
import TasksReducer from './reducer_tasks';
import TaskReducer from './reducer_task';
import FilesReducer from './reducer_files';
import UsersReducer from './reducer_users';
import UserReducer from './reducer_user';
import LogReducer from './reducer_log';
import { NEW_DEVIATION } from 'actions/actions_deviations';

const rootReducer = combineReducers({
  /* your reducers */
  deviations: DeviationsReducer,
  deviation: DeviationReducer,
  main: MainReducer,
  tasks: TasksReducer,
  task: TaskReducer,
  files: FilesReducer,
  users: UsersReducer,
  user: UserReducer,
  log: LogReducer,

  form: formReducer.plugin({
    devform: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch (action.type) {
        case NEW_DEVIATION:
          return undefined;       // <--- blow away form data
        default:
          return state;
      }
    }
  })
});

export default rootReducer;
