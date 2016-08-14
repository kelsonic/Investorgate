jest.dontMock('../SearchBar.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SearchBar from '../SearchBar.jsx';

describe('<SearchBar />', () => {
  it('should exist', () => {
    const searchBar = TestUtils.renderIntoDocument(
      <SearchBar />
    );

    expect(TestUtils.isCompositeComponent(searchBar)).toBeTruthy();
    expect(true).toBeTruthy();
  });
});