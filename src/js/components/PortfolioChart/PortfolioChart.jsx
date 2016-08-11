import { Map } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReactHighcharts, { Highcharts } from 'react-highcharts';

// Display searched stock's chart
export default class StockChart extends Component {
  
  constructor(props) {
    super(props);

    this._calculateTotal = this._calculateTotal.bind(this);
    this._generateData = this._generateData.bind(this);
  }

  _calculateTotal() {
    let total = 0;

    if (this.props.stockList.length > 1) {
        for (let i = 0; i < this.props.stockList.length; i++) {
            const stock = this.props.stockList[i];
            total += stock.quantity * stock.price;
        }
    }

    total += this.props.cash;
    return total;
  }

  _generateData(total) {
    let data = this.props.stockList.map((stock) => {
        return {
            name: stock.symbol,
            y: (stock.quantity * stock.price) / total
        };
    });
    return [{
        name: 'Cash',
        y: this.props.cash / total
    }, 
    ...data];
  }

  render() {

    const total = this._calculateTotal();
    const data = this._generateData(total);

    // Build the chart
    const config = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Your Current Portfolio'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            data: data
        }]
    };

    return (
      <div>
        <ReactHighcharts config={config} />
      </div>
    );
  }
}

/* Check if:
stockList is an array
cash is a number
*/
StockChart.PropTypes = {
    stockList: PropTypes.array.isRequired,
    cash: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        stockList: state.get('stockList').toJS(),
        cash: state.get('cash')
    }
}

export default connect(mapStateToProps)(StockChart);