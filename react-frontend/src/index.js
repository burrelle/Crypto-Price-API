import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Sidebar from "./components/sidebar.jsx";
import Content from "./components/content.jsx";
//import tutorialCards from "./components/tutorialcards.jsx";
import Quickstart from './components/quickstart';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
      <Route path="/docs" component={ Content } />
      <Route path="/quickstart" component={ Quickstart } />
      {/* <Route path="/" componet={} /> */}
      </div>
    </Router>
  );
};
render(<App />, document.getElementById("app"));
