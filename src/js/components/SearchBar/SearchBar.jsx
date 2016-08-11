import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

// Display search bar
class SearchBar extends Component {

    _onClick() {
        const term = this.refs.searchInput.value;
        if (!!term.length) {
            this.props.search(term);
        }
    }

    render() {
        return (
            <div>
                <h4 className="finder-title">Find a Stock</h4>
                <div className="text-center">
                    <input 
                        placeholder="Enter a stock symbol..."
                        className="input-bar stock"
                        ref="searchInput" />
                    <button 
                        onClick={this._onClick.bind(this)}
                        className="lookup-btn"
                        >Lookup</button>
                </div>
            </div>
        );
    }
}

/* Check if:
search is a function
*/
SearchBar.PropTypes = {
    search: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        search: state.get('search')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions.search, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);