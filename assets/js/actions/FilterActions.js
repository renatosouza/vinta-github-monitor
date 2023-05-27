import * as types from './ActionTypes';

export const changeAuthorName = (authorName) => ({
  type: types.CHANGE_AUTHOR_NAME,
  payload: authorName
});

export const changeRepoName = (repoName) => ({
  type: types.CHANGE_REPO_NAME,
  payload: repoName
});
