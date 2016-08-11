import React, { Component, PropTypes } from 'react';

// Import Components
import SearchBar from '../SearchBar/SearchBar.jsx';
import Stock from '../Stock/Stock.jsx';
import StockActions from '../StockActions/StockActions.jsx';
import Cash from '../Cash/Cash.jsx';
import StockList from '../StockList/StockList.jsx';

/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div className="header-styles">

                            <h1 className="pageTitle">Eurika</h1>
                        </div>

                        <div className="col l4 m12 s12 left-side">
                            <SearchBar/>
                            <Stock/>
                            <StockActions/>
                        </div>

                        <div className="col l7 push-l1 m12 s12 right-side">
                            <Cash/>
                            <StockList/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}