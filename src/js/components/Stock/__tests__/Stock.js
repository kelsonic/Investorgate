jest.dontMock('../Stock.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Stock from '../Stock.jsx';

describe('<Stock />', () => {
  it('should exist', () => {
    const stock = TestUtils.renderIntoDocument(
      <Stock />
    );

    expect(TestUtils.isCompositeComponent(stock)).toBeTruthy();
    expect(true).toBeTruthy();
  });
});