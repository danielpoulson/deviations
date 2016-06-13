import { combineReducers } from 'redux';
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
  log: LogReducer
});

export default rootReducer;
