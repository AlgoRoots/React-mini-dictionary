import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";

// word리스트에 리덕스를 주입해줄 provider import
import { Provider } from "react-redux";
// 연결할 스토어
import store from "./redux/configStore";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
