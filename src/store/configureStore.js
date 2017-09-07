import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";

export default function configureStore(initialState, debug = false) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let createStoreWithMiddleware;
  const middleware = applyMiddleware(thunk);
  createStoreWithMiddleware = composeEnhancers(middleware);
  const store = createStoreWithMiddleware(createStore)(
    rootReducer,
    initialState
  );
  return store;
}
