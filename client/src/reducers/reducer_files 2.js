import { GET_FILES, ADD_FILE, BOOKOUT_FILE, DELETE_FILE } from '../actions/actions_files';

function toggleBooked(file, action) {

  if (file._id !== action.payload) {
    return file;
  }

  return {
    ...file,
    fsBooked: 1,
    fsAddedBy: sessionStorage.getItem('username'),
    fsAddedAt: new Date()
  };
}

function searchIndex(data, index) {
  return data.filter((item) => item._id !== index);
}

export default function (state = [], action) {
  let _data = [];
  switch (action.type) {
    case ADD_FILE: {
      _data = action.payload;
      const currIds = state.map(c => c._id);
      const index = currIds.indexOf(_data._id);

      return [
        ...state.slice(0, index),
        // Copy the object before mutating
        Object.assign({}, _data),
        ...state.slice(index + 1)
      ];
    }
    case GET_FILES:
      if (!action.payload.data) {
        return [];
      }

      return action.payload.data;

    case BOOKOUT_FILE:
      return state.map(f => toggleBooked(f, action));

    case DELETE_FILE: {
      const _id = action.payload;
      const deleted = searchIndex(state, _id);
      return deleted;
    }

    case 'ADD_EXPORTFILE':
      _data = action.payload.data;

      return [
        ...state,
        _data
      ];

    default:
      return state;
  }
}
