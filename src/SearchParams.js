import React from "react";
import SearchBox from "./SearchBox";
import { withRouter } from "react-router-dom";

class SearchParams extends React.Component {
  handleSearchSubmit = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="search-route">
        <SearchBox search={this.handleSearchSubmit} />
      </div>
    );
  }
}

export default SearchParams;
