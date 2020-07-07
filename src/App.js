import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home/home";
import Chat from "./components/Chat/chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/chat" exact component={Chat} />
      </Router>
    </div>
  );
}

export default App;
