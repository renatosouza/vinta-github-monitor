import * as types from './ActionTypes';

export const updatePage = (pageNumber) => ({
  type: types.UPDATE_PAGE,
  payload: pageNumber
});

export const updateTotalPages = (totalPages) => ({
  type: types.UPDATE_TOTAL_PAGES,
  payload: totalPages
});
