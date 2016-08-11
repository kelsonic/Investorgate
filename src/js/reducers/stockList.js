import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { STOCK_BUY, STOCK_SELL } from '../actions/stock';

function update(state, action, sign = 1) {
    const idx = state.findIndex(item => item.get("symbol") == action.payload["symbol"]);

    if (idx > -1) {
        const qty    = state.getIn([idx, 'quantity']);
        const newQty = qty + action.payload["quantity"] * sign;

        if (newQty <= 0) {
            return state.delete(idx);
        }

        return state.updateIn([idx, 'quantity'], item => item + action.payload["quantity"] * sign);
    } else if (sign > 0) {
        return state.push(fromJS(action.payload));
    }

    return state;
}

export default handleActions({
    [STOCK_BUY]:  (state, action) => update(state, action, +1),
    [STOCK_SELL]: (state, action) => update(state, action, -1)
});