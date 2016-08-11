import { createAction } from 'redux-actions';

import stock from './stock';

export const SEARCH = 'SEARCH';

function search(token) {
    token = token.toUpperCase();

    return function (dispatch) {
        dispatch(createAction(SEARCH)(token));
        dispatch(stock.fetch(token));
    }
};

export default {
    search
}
