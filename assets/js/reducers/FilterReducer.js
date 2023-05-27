import * as types from '../actions/ActionTypes';

const initialState = {
  authorName: '',
  repoName: '',
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_AUTHOR_NAME: {
      return {...state, authorName: action.payload, repoName: ''}
    }
    case types.CHANGE_REPO_NAME: {
      console.log("vou mudar o estado");
      return {...state, authorName: '', repoName: action.payload}
    }
    default:
      return state;
  }
};

export default filterReducer;
