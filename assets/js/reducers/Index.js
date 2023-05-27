import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

// Reducers
import commitReducer from './CommitReducer';
import pageReducer from './PageReducer';
import filterReducer from './FilterReducer';

// Combine Reducers
const reducers = combineReducers({
  form: formReducer,
  commitState: commitReducer,
  pageState: pageReducer,
  filterState: filterReducer,
});

export default reducers;
