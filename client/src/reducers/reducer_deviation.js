import { GET_DEV, CREATE_LOG, NEW_DEVIATION } from '../actions/actions_deviations';

const initialState = {
  dvNo: '',
  dvMatName: '',
  dvMatNo: ''
};

export default function (state = initialState, action) {

  switch (action.type) {

    case GET_DEV: {
      const _dev = action.payload.data || initialState;
      return _dev;
    }

    case 'EDIT_DEV': {
      const _dev = action.payload || initialState;
      return _dev;
    }



    case CREATE_LOG: {
      const _addLog = state.CC_LOG;
      const randomID = Math.random() * (1000000 - 0) + 0;
      const logObj = {
        _id: randomID,
        CC_ActBy: action.payload.CC_ActBy,
        CC_ActDate: action.payload.CC_ActDate,
        CC_Action: action.payload.CC_Action
      };

      _addLog.push(logObj);
      return {
        ...state,
        CC_LOG: _addLog
      };
    }

    case NEW_DEVIATION:
      return initialState;

    default:
      return state;
  }
}
