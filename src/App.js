import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";

function App() {
  return (
  
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/hats" component={HatsPage} />
        </Switch>
      </div>

  );
}

const HatsPage = () => (
  <div>
    <h1>HATS PAGE </h1>
  </div>
);

export default App;
