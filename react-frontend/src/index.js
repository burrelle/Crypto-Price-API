import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Content from "./components/docs/content.jsx";
import Quickstart from "./components/quickstart/quickstartContent.jsx"

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
      <Route path="/docs" component={Content}></Route>
      <Route path="/quickstart" component={Quickstart}></Route>
      {/* <Route path="/faq" componet={} />       */}
      {/* <Route path="/" componet={} /> */}
      </div>
    </Router>
  );
};
render(<App />, document.getElementById("app"));
