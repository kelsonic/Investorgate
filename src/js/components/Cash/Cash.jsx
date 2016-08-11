import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Cash extends Component {
    
    // Display cash
    render() {
        return (
            <div>
                <h4 className="cash-amount">Cash: <span className="cash-green">${this.props.cash.toLocaleString()}</span></h4>
            </div>
        );
    }
}

/* Check if:
cash is a number
*/
Cash.PropTypes = {
    cash: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        cash: state.get('cash'),
    }
}

export default connect(mapStateToProps)(Cash);