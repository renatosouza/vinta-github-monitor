import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

// Reducers
import commitReducer from './CommitReducer';
import pageReducer from './PageReducer';

// Combine Reducers
const reducers = combineReducers({
  form: formReducer,
  commitState: commitReducer,
  pageState: pageReducer,
});

export default reducers;
