jest.dontMock('../App.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from '../App.jsx';

describe('<App />', () => {
  it('should exist', () => {
    const app = TestUtils.renderIntoDocument(
      <App />
    );

    expect(TestUtils.isCompositeComponent(app)).toBeTruthy();
    expect(true).toBeTruthy();
  });
});