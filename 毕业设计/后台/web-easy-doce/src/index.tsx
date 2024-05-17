import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import dva from 'dva'

const app = dva({})

app.model(require('src/common/models/exampleModel').default);

app.router(require('/router').default);
app.start('#root')

// 红色报错先不用管
const root = createRoot(document.getElementById("root") as any);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
