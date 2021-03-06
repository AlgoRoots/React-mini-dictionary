import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import words from "./modules/words";
import logger from "redux-logger";
const middlewares = [thunk, logger];
const rootReducer = combineReducers({ words });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;
