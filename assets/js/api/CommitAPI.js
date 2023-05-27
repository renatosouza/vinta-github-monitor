import axios from 'axios';
import {reset} from 'redux-form';
import store from '../store';
import {
  createRepositorySuccess, getCommitsSuccess,
} from '../actions/CommitActions';
// import { updateTotalPages } from '../actions/PageActions';

export const getCommits = ({ page = 1, authorName = '', repoName = '' }={}, callback) => axios
  .get(`/api/commits/?author=${authorName}&repository=${repoName}&page=${page}`)
  .then((response) => {
    store.dispatch(getCommitsSuccess({...response.data.results}));
    // store.dispatch(updateTotalPages(
    //   Math.trunc(response.data.count/response.data.results.length)
    // ));
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
