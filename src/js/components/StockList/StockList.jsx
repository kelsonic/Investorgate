import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';
import PortfolioChart from '../PortfolioChart/PortfolioChart.jsx';

// Display each stock's symbol, name, quantity, and price purchased per share in stockList
class StockList extends Component {
    render() {
        
        if (this.props.stockList.length > 0) {
            return (
                <div>
                  <table className="table highlight centered">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Shares</th>
                        <th>$ Paid per Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.stockList.map(item => {
                            return (
                                <tr key={item["symbol"]}>
                                    <td>{item["name"]}</td>
                                    <td>{item["quantity"]}</td>
                                    <td>{item["price"]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                  </table>
                  <PortfolioChart />
                </div>
            );
        }
        else {
            return(<div className="text-center"><h3>Add stocks to your portfolio to get started.</h3></div>);
        }
    }
}

/* Check if:
stockList is an array
*/
StockList.PropTypes = {
    stockList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        stockList: state.get('stockList').toJS(),
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions.stock, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList);