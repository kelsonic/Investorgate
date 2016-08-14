jest.dontMock('../Cash.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Cash from '../Cash.jsx';

describe('<Cash />', () => {
  it('should exist', () => {
    const cash = TestUtils.renderIntoDocument(
      <Cash />
    );

    expect(TestUtils.isCompositeComponent(cash)).toBeTruthy();
    expect(true).toBeTruthy();
  });
});