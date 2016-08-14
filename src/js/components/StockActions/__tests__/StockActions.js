jest.dontMock('../StockActions.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import StockActions from '../StockActions.jsx';

describe('<StockActions />', () => {
  it('should exist', () => {
    const stockActions = TestUtils.renderIntoDocument(
      <StockActions />
    );

    expect(TestUtils.isCompositeComponent(stockActions)).toBeTruthy();
    expect(true).toBeTruthy();
  });
});