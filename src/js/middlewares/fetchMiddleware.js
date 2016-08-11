import $ from 'jquery';
import createAction from 'redux-actions/lib/createAction';

export const API_CALL = Symbol('API Call');

const API_ROOT = 'http://localhost:3000';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.type === 'opaque') {
        return response;
    } else {
        const error    = new Error(response.statusText);
        error.response = response;

        throw error
    }
}

function callApi(endpoint, method = 'get', body = {}) {
    let fullUrl = endpoint;

    const params = { method, mode: 'no-cors' };
    if (['post', 'put'].indexOf(method.toLowerCase()) > -1) {
        params.body    = JSON.stringify(body);
        params.headers = {
            'Accept':       'application/json',
            'Content-Type': 'application/json'
        }
    } else {
        if (Object.keys(body).length) {
            const params = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');

            fullUrl = `${fullUrl}?${params}`;
        }
    }

    return $.ajax({
        url:      fullUrl,
        dataType: 'jsonp'
    });
}


export default store => next => action => {
    const apiCall = action[API_CALL];

    if (typeof apiCall === 'undefined') {
        return next(action)
    }

    let { endpoint, method, types } = apiCall;

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    const [ requestType, successType, failureType ] = types;

    next(createAction(requestType)(action.payload));

    return callApi(endpoint, method, action.payload).then(
        data => {
            var error = data[Object.keys(data)[0]].error;
            if (!!error) {
                return next(createAction(failureType)(error.message || 'Something bad happened'))
            }

            return next(createAction(successType)(data[Object.keys(data)[0]]))
        },
        error => {
            return next(createAction(failureType)(error.message || 'Something bad happened'))
        }
    );
}