import { LOAD_PAGE } from '../actions/actions_paged';

export default function (state = [], action) {
  switch (action.type) {
    case LOAD_PAGE: {
      const per_page = action.data.per_page || 10;
      const page = action.data.page || 1;
      const offset = (page - 1) * per_page;
      const paginatedItems = state.slice(offset, offset + per_page);

      return {
        page,
        per_page,
        total: state.length,
        total_pages: Math.ceil(state.length / per_page),
        data: paginatedItems
      };
    }

    default:
      return state;
  }
}
