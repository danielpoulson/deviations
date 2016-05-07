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

const rootReducer = combineReducers({
  form: formReducer,
  /* your reducers */
  deviations: DeviationsReducer,
  deviation: DeviationReducer,
  main: MainReducer,
  tasks: TasksReducer,
  task: TaskReducer,
  files: FilesReducer,
  users: UsersReducer,
  user: UserReducer,
});

export default rootReducer;
