import * as types from '../actions/ActionTypes';

const initialState = {
  loadingCommitList: false,
  loadingRepoList: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_LOADING_COMMIT_LIST_STATUS:
      return {
        ...state,
        loadingCommitList: action.payload,
      };
    case types.CHANGE_LOADING_REPO_LIST_STATUS:
      return {
        ...state,
        loadingRepoList: action.payload,
      };
    default:
      return state;
  }
};

export default loadingReducer;
