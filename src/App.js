import React from "react";
import "./style.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import {HomePage, Prenota, Controlla, Esito, AreaRiservata} from "./components.js";


export function App() {
  return (
    <Router>
			<Switch>
        <Route path="/prenota">
          <Prenota/>
        </Route>
        <Route path="/controlla">
          <Controlla/>
        </Route>
        <Route path="/esito">
          <Esito/>
        </Route>
        <Route path="/areaRiservata">
          <AreaRiservata/>
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
			</Switch>
		</Router>
  );
}