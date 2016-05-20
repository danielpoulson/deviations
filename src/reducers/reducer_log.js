import { ADD_LOG, GET_LOG, RESET_LOG } from 'actions/actions_logger';
import { GET_DEV, NEW_DEVIATION } from 'actions/actions_deviations';

// function counter(num) {
// 	return num++;
// }

export default function (state = [], action) {
	switch (action.type) {

		case ADD_LOG: {
			const _addLog = state;
			const logObj = action.payload;

			_addLog.push(logObj);

			return _addLog;
		}

		case GET_LOG:
			return state.concat(action.payload.data);

		case GET_DEV: {
			const data = action.payload.data.dvLog;
			let _count = 0;

			const _data = data.map(obj => {
				const newObj = {
					_id: obj._id ? obj._id : _count++,
					LogType: 'DEV',
					LogMessage: obj.dvLogType,
					LogBy: obj.dvLogBy,
					LogDate: obj.dvLogDate,
				};
			return newObj;
			});

			const _state = state.concat(_data);

			return _state;
		}

		case NEW_DEVIATION:
			return [];

		case RESET_LOG:
			return [];

		default:
			return state;
	}
}
