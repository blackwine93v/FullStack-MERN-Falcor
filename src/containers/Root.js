import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import routes from "../routes";
import createHashHistory from "history/lib/createHashHistory";
import PropTypes from "prop-types";
const noQueryKeyHistory = createHashHistory({
  queryKey: false
});

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <Router history={noQueryKeyHistory}>{routes}</Router>
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};
