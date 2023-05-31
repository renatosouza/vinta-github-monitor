import axios from 'axios';
import {reset} from 'redux-form';
import store from '../store';
import {
  createRepositoryAction, getRepositoriesSuccess, getCommitsSuccess,
} from '../actions/CommitActions';
import { updateTotalPages, updatePage } from '../actions/PageActions';
import { changeLoadingCommitListStatus,
  changeLoadingRepoListStatus
} from '../actions/LoadingActions';
import { changeRepoName } from '../actions/FilterActions';

export const getCommits = ({ page = 1, authorName = '', repoName = '' }={}) => axios
  .get(`/api/commits/?author=${authorName}&repository=${repoName}&page=${page}`)
  .then((response) => {
    store.dispatch(getCommitsSuccess({...response.data.results}));

    const totalResults = response.data.count;
    const resultsPerPage = response.data.page_size;
    const totalPages = Math.ceil(totalResults/resultsPerPage);
    store.dispatch(updateTotalPages(totalPages));
    store.dispatch(updatePage(page));
  })
  .catch((error) => {
    const err = error.response.data;
    console.error(err);
  })
  .finally(() => {
    store.dispatch(changeLoadingCommitListStatus(false));
  });

export const getRepositories = () => axios.get('/api/repositories/')
  .then((response) => {
    store.dispatch(getRepositoriesSuccess(response.data));
  })
  .catch((error) => {
    const err = error.response.data;
    console.error(err);
  })
  .finally(() => {
    store.dispatch(changeLoadingRepoListStatus(false));
  });

export const deleteRepository = (repoName, headers) => axios
  .delete(`/api/repositories/${repoName}`, {headers: headers})
  .then((response) => {
    store.dispatch(changeRepoName(''));
  })
  .catch((error) => {
    const err = error.response.data;
    console.error(err);
  })
  .finally(() => {
    getRepositories();
    getCommits();
  })

export const createRepository = (values, headers, formDispatch) => axios
  .post('/api/repositories/', values, {headers})
  .then((response) => {
    store.dispatch(createRepositoryAction(true, false, ''));
    formDispatch(reset('repoCreate'));

    store.dispatch(changeLoadingRepoListStatus(true));
    getRepositories();

    store.dispatch(changeLoadingCommitListStatus(true));
    pollingCommits(response.data.name);
  })
  .catch((error) => {
    let errorFeedback = '';
    if (error.response && error.response.data) {
      const err = error.response.data;
      errorFeedback = err[0] || Object.values(err)[0][0];
    } else {
      errorFeedback = 'Error!';
    }
    store.dispatch(createRepositoryAction(false, true, errorFeedback));
  });

const pollingCommits = (repoName) => {
  const pollingInterval = 1000;
  const pollingTimeout = 10000;

  const interval = setInterval(() => getCommitsPolling(repoName), pollingInterval);

  const timeout = setTimeout(() => {
    clearInterval(interval);
    store.dispatch(updateTotalPages(0));
    store.dispatch(updatePage(1));

    store.dispatch(getCommitsSuccess({...[]}));
    store.dispatch(changeLoadingCommitListStatus(false));
  }, pollingTimeout);

  const getCommitsPolling = (repoName) => axios
  .get(`/api/commits/?repository=${repoName}&page=1`)
  .then((response) => {
    const totalResults = response.data.count;
    if (totalResults) {
      const resultsPerPage = response.data.page_size;
      const totalPages = Math.ceil(totalResults/resultsPerPage);
      store.dispatch(updateTotalPages(totalPages));
      store.dispatch(updatePage(1));

      store.dispatch(changeRepoName(repoName));
      store.dispatch(getCommitsSuccess({...response.data.results}));
      store.dispatch(changeLoadingCommitListStatus(false));
      stopPolling();
    }
  });

  const stopPolling = () => {
    clearInterval(interval);
    clearTimeout(timeout);
  }
}
