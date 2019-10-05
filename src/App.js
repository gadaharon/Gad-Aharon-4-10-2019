import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import State from "./context/State";
import Home from "./components/Home";
import Favorites from "./components/Favorites";

// Font Awesome React
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fab, fas);

function App() {
  return (
    <div className="app">
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
    </div>
  );
}

export default App;
