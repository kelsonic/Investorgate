import { handleActions } from 'redux-actions';

import { SEARCH } from '../actions/search';

export default handleActions({
    [SEARCH]: (state, action) => action.payload
});