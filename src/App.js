import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import { Provider } from "react-redux";
import store from "./store";

// Font Awesome React
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fab, fas);

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/favorites" component={Favorites} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
