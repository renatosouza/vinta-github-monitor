import * as types from '../actions/ActionTypes';

const initialState = {
  currentPage: 1,
  totalPages: 0,
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_PAGE: {
      return {...state, currentPage: action.payload}
    }
    case types.UPDATE_TOTAL_PAGES: {
      return {...state, totalPages: action.payload}
    }
    default:
      return state;
  }
};

export default pageReducer;
