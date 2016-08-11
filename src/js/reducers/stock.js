import { handleActions } from 'redux-actions';

import { STOCK_FETCH, STOCK_FETCH_SUCCESS, STOCK_FETCH_FAILURE } from '../actions/stock';

export default handleActions({
    [STOCK_FETCH]:         (state, action) => state.merge({ isFetching: true, symbol: action.payload["symbols"] }),
    [STOCK_FETCH_SUCCESS]: (state, action) => {
        if (state.get('symbol') == action.payload["symbol"]) {
            return state.merge({ isFetching: false, value: action.payload, error: null });
        }

        return state;
    },
    [STOCK_FETCH_FAILURE]: (state, action) => state.merge({ isFetching: false, value: null, error: action.payload })
});