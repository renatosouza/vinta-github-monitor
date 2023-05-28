import * as types from '../actions/ActionTypes';

const initialState = {
  commits: [],
  repositories: [],
  successMessage: false,
};

const commitReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMMITS_SUCCESS:
      return {
        ...state,
        commits: Object.values(action.payload),
      };
    case types.GET_REPOSITORIES_SUCCESS:
      return {
        ...state,
        repositories: Object.values(action.payload),
      }
    case types.CREATE_REPOSITORY_SUCCESS: {
      return {...state, successMessage: action.payload.successMessage};
    }
    default:
      return state;
  }
};

export default commitReducer;
