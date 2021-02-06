import React from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import MenuBar from "./components/MenuBar";
import Home from "./router/Home";
import SignIn from "./router/SignIn";
import SignUp from "./router/SignUp";

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
