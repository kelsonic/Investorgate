import searchReducer from './reducers/search';
import stockReducer from './reducers/stock';
import cashReducer from './reducers/cash';
import stockListReducer from './reducers/stockList';

const reducer = function (state, action) {
    return state.merge({
        search:    searchReducer(state.get('search'), action),
        stock:     stockReducer(state.get('stock'), action),
        cash:   cashReducer(state.get('cash'), action),
        stockList: stockListReducer(state.get('stockList'), action)
    });
};

export default reducer;

