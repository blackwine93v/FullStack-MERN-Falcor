import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
class CoreLayout extends React.Component {
  render() {
    return (
      <div>
        <span>
          Links: <Link to="/login">Login</Link> |
          <Link to="/">Home Page</Link>
        </span>
        <br />
        {this.props.children}
      </div>
    );
  }
}
CoreLayout.propTypes = { children: PropTypes.element };
export default CoreLayout;
