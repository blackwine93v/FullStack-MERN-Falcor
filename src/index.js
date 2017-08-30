import "./app.scss";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import App from "./components/App.jsx";

const initState = { counter: 0 };
const counter = (state = { ...initState }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    default:
      return { ...state };
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(counter, composeEnhancers(applyMiddleware(logger)));

// store.subscribe(() => console.log(store.getState()));

// store.dispatch({ type: "INCREMENT" });
// // 1
// store.dispatch({ type: "INCREMENT" });
// // 2
// store.dispatch({ type: "DECREMENT" });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
