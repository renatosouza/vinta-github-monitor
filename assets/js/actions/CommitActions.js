import * as types from './ActionTypes';

export const createRepositoryAction = (successMessage, errorMessage, errorFeedback) => ({
  type: types.CREATE_REPOSITORY_ACTION,
  payload: {successMessage, errorMessage, errorFeedback},
});

export const getRepositoriesSuccess = repositories => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  payload: repositories,
});

export const getCommitsSuccess = commits => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: commits,
});
