import { createAction } from 'redux-actions';

import { API_CALL } from '../middlewares/fetchMiddleware';

export const STOCK_FETCH         = 'STOCK_FETCH';
export const STOCK_FETCH_RECURRING   = 'STOCK_FETCH_RECURRING';
export const STOCK_FETCH_SUCCESS = 'STOCK_FETCH_SUCCESS';
export const STOCK_FETCH_FAILURE = 'STOCK_FETCH_FAILURE';
export const STOCK_BUY           = 'STOCK_BUY';
export const STOCK_SELL          = 'STOCK_SELL';

function fetchStock(token, recurring = false) {
    const fetchType = recurring ? STOCK_FETCH_RECURRING : STOCK_FETCH;
    return {
        [API_CALL]: {
            types:    [fetchType, STOCK_FETCH_SUCCESS, STOCK_FETCH_FAILURE],
            endpoint: `https://data.benzinga.com/rest/richquote`,
            method:   'GET'
        },
        payload:    { symbols: token }
    };
}

let to;

function fetch(token, recurring = false) {
    if (!recurring && to) {
        clearTimeout(to);
    }

    return function (dispatch) {
        return dispatch(fetchStock(token, recurring))
            .then(data => {

                if (data.type == STOCK_FETCH_SUCCESS) {
                    if (to) {
                        clearTimeout(to);
                    }
                    to = setTimeout(() => dispatch(fetch(token, true)), 2000);
                }

                if (data.type == STOCK_FETCH_FAILURE && to) {
                    clearTimeout(to);
                }
            });
    }
}

const buy  = createAction(STOCK_BUY);
const sell = createAction(STOCK_SELL);

export default {
    fetch,
    buy,
    sell
}
