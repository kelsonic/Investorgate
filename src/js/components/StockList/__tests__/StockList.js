jest.dontMock('../StockList.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import StockList from '../StockList.jsx';

describe('<StockList />', () => {
  it('should exist', () => {
    const stockList = TestUtils.renderIntoDocument(
      <StockList />
    );

    expect(TestUtils.isCompositeComponent(stockList)).toBeTruthy();
    expect(true).toBeTruthy();
  });
});