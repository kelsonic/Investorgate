import { handleActions } from 'redux-actions';

import { STOCK_BUY, STOCK_SELL } from '../actions/stock';

export default handleActions({
    [STOCK_BUY]:  (state, action) => state - action.payload["price"] * action.payload["quantity"],
    [STOCK_SELL]: (state, action) => state + action.payload["price"] * action.payload["quantity"]
});