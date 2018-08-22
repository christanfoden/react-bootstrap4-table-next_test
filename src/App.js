import React, { Component } from "react";
import "./App.css";
import { Provider } from "rebass";
import Rebass from "./components/reBass";
import "semantic-ui-css/semantic.min.css";

class App extends Component {
  render() {
    return (
      <Provider
        theme={{
          fonts: {
            sans: '"Avenir Next", Helvetica, sans-serif'
          },
          fontSizes: [12, 16, 24, 36, 48, 72]
        }}
      >
        <Rebass />
      </Provider>
    );
  }
}

export default App;
