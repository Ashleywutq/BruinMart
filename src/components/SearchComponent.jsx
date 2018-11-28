import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../SearchInput.css';

class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.filterResults(event.target.value);
    }

    render() {
        return (
            <div className="component-search-input">
                <div>
                    <input placeholder="Search Here" style={{ color: 'white' }} onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

export default SearchComponent;
