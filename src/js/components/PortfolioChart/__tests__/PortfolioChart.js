jest.dontMock('../PortfolioChart.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import PortfolioChart from '../PortfolioChart.jsx';

describe('<PortfolioChart />', () => {
  it('should exist', () => {
    const portfolioChart = TestUtils.renderIntoDocument(
      <PortfolioChart />
    );

    expect(TestUtils.isCompositeComponent(portfolioChart)).toBeTruthy();
    expect(true).toBeTruthy();
  });
});