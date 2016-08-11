import { Map } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

// Display searched stock's name, symbol, ask price, and bid price
class Stock extends Component {
    render() {
        const { stock } = this.props;

        const name   = stock.get('name', 'Unknown');
        const symbol = stock.get('symbol', 'N/A');
        const ask    = stock.get('askPrice', '...');
        const bid    = stock.get('bidPrice', '...');

        return (
            <div>
                <div className="searched-stock col m8 offset-m2 s12">
                    <p className="stock-name">{name}</p>
                    <p className="symbol">{symbol}</p>
                    <p>Ask: ${ask}</p>
                    <p>Bid: ${bid}</p>
                </div>
            </div>
        );
    }
}

/* Check if:
stock is an object
*/
Stock.PropTypes = {
    stock: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        stock: state.getIn(['stock', 'value']) ? state.getIn(['stock', 'value']) : Map()
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions.stock, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);