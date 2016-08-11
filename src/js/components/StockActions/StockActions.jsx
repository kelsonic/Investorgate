import { Map } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';
import isNumeric from '../../helpers/isNumeric';

// Display the quantity input field and the resulting buy/sell price for the searched stock
class StockActions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quantity: null,
            error:    false
        };

        this._onAmountChange = this._onAmountChange.bind(this);
    }

    _onAmountChange(event) {
        const quantity = event.target.value;

        this.setState({ quantity: quantity });
    }

    _onButtonClick = (action) => {
        const quantity = this.refs.input.value;

        // Input must be a positive integer
        if (!isNumeric(quantity) || quantity <= 0 || quantity.match(/[.-]/)) {
            return this.setState({ error: true });
        } else {
            const stockAction = action == 'buy' ? 'ask' : 'bid';

            this.props[action]({
                symbol:   this.props.stock.get('symbol'),
                name:     this.props.stock.get('name'),
                price:    this.props.stock.get(`${stockAction}Price`),
                quantity: parseFloat(quantity)
            });

            return this.setState({ quantity: null, error: false });
        }
    };

    render() {
        const { stock, stockList, cash, disabled } = this.props;

        const stockInPortfolio = stockList.find(item => item.get('symbol') == stock.get('symbol'));

        const disabledBuy  = disabled || this.state.quantity * stock.get('askPrice') > cash;
        const disabledSell = disabled || !stockInPortfolio || this.state.quantity > stockInPortfolio.get('quantity');

        const priceBuy  = this.state.quantity * stock.get('askPrice');
        const priceSell = this.state.quantity * stock.get('bidPrice');

        return (
            <div>
                <input
                    value={this.state.quantity}
                    type="number"
                    placeholder="How many shares?"
                    onChange={this._onAmountChange}
                    disabled={this.props.disabled}
                    ref="input"
                    className="input-bar" />

                <div className="col m5 s6 stock-actions">
                    <p>Buy: {priceBuy ? ` $${priceBuy.toLocaleString()}` : null}</p>
                    <button
                        onClick={this._onButtonClick.bind(this, 'buy')}
                        disabled={disabledBuy}
                        className={disabledBuy ? "buy-btn btn disabled" : "buy-btn btn"}
                        >Buy</button>
                </div>
                <div className="col m5 offset-m2 s6 stock-actions">
                    <p>Sell: {priceSell ? ` $${priceSell.toLocaleString()}` : null}</p>
                    <button
                        onClick={this._onButtonClick.bind(this, 'sell')}
                        disabled={disabledSell}
                        className={disabledSell ? "sell-btn btn disabled" : "sell-btn btn"}
                        >Sell</button>
                </div>
            </div>
        );
    }
}

/* Check if:
stock is an object,
stockList is an array,
cash is a number,
disabled is a boolean
*/
StockActions.PropTypes = {
    stock: PropTypes.object.isRequired,
    stockList: PropTypes.array.isRequired,
    cash: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        stock:     state.getIn(['stock', 'value']) ? state.getIn(['stock', 'value']) : Map(),
        stockList: state.get('stockList'),
        cash:   state.get('cash'),
        disabled:  !state.getIn(['stock', 'value', 'askPrice']),
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions.stock, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StockActions);