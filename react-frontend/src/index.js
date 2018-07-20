import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Content from "./components/docs/content.jsx";
import Quickstart from "./components/quickstart/quickstartContent.jsx"
import Faq from "./components/FAQ/faq.jsx"
import Home from "./components/home.jsx"

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/docs" component={Content}></Route>
      <Route path="/quickstart" component={Quickstart}></Route>
      <Route path="/faq" component={Faq} />      
      </div>
    </Router>
  );
};
render(<App />, document.getElementById("app"));
