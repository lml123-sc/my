import React from "react";
import Layouts from "./layouts/Layouts";

function App({ history }) {
  return (
    <div style={{ height: "100%" }}>
      <Layouts history={history} />
    </div>
  );
}

export default App;
