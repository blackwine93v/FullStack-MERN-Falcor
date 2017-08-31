import "./app.scss";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import App from "./components/App.jsx";

const initState = { articles: [] };
const counter = (state = { ...initState }, action) => {
  switch (action.type) {
    case "RETURN_ALL_ARTICLES":
      return { ...state };
    case "ARTICLES_LIST_ADD":
      return { ...state, articles: action.payload };
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
