import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "../SearchInput.css";

class SearchComponent extends PureComponent {
  handleChange = event => {
    this.props.textChange(event);
  };

  render() {
    return (
      <div className="component-search-input">
        <div>
          <input
            placeholder="Search Here"
            style={{ color: "white" }}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

SearchComponent.PropTypes = {
  textChange: PropTypes.func
};

export default SearchComponent;
