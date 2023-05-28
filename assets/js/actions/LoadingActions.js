import * as types from './ActionTypes';

export const changeLoadingCommitListStatus = statusLoading => ({
  type: types.CHANGE_LOADING_COMMIT_LIST_STATUS,
  payload: statusLoading,
});

export const changeLoadingRepoListStatus = statusLoading => ({
  type: types.CHANGE_LOADING_REPO_LIST_STATUS,
  payload: statusLoading,
});
