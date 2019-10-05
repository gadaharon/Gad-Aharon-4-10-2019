import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import State from "./context/State";
import Home from "./components/Home";
import Favorites from "./components/Favorites";

function App() {
  return (
    <State>
      <Fragment>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/favorites" component={Favorites} />
          </Switch>
        </Router>
      </Fragment>
    </State>
  );
}

export default App;
