import axios from 'axios';
import {reset} from 'redux-form';
import store from '../store';
import {
  createRepositorySuccess, getCommitsSuccess,
} from '../actions/CommitActions';
import { updateTotalPages, updatePage } from '../actions/PageActions';

export const getCommits = ({ page = 1, authorName = '', repoName = '' }={}, callback) => axios
  .get(`/api/commits/?author=${authorName}&repository=${repoName}&page=${page}`)
  .then((response) => {
    store.dispatch(getCommitsSuccess({...response.data.results}));
    const totalResults = response.data.count;
    const resultsPerPage = response.data.page_size;
    if(totalResults && resultsPerPage) {
      const totalPages = Math.ceil(totalResults/resultsPerPage);
      store.dispatch(updateTotalPages(totalPages));

    } else {
      store.dispatch(updateTotalPages(0));
    }
    store.dispatch(updatePage(page));
    callback();
  });

export const createRepository = (values, headers, formDispatch) => axios.post('/api/repositories/', values, {headers})
  .then((response) => {
    store.dispatch(createRepositorySuccess(response.data, true));
    formDispatch(reset('repoCreate'));
  }).catch((error) => {
    if (error.response && error.response.data) {
      const err = error.response.data;
      console.error(err);
    }
  });
