import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import dva from "dva";

const app = dva({});

app.model(require("./common/models/example").default);

app.router(require('./App').default);
app.start("#root");

// 红色报错先不用管
// const root = createRoot(document.getElementById("root") as any);
// root.render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </BrowserRouter>
// );
