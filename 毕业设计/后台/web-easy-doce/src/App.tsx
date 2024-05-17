import React from "react";
import Layouts from "./layouts/Layouts";

class App extends React.PureComponent {
  render() {
    return (
      <div style={{height: '100%'}}>
        <Layouts />
      </div>
    );
  }
}

export default App;
