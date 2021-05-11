import React, { useReducer, useContext, useEffect, useState } from "react";
import "./style.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  HomePage,
  Prenota,
  Controlla,
  Esito,
  AreaRiservata,
  LogIn,
  EsitoPrenotazione,
  EsitoTampone,
} from "./componentsUser.js";
import {
  Amministratore,
  SchermataAmministatore,

} from "./componentsAdmin.js";
import PrivateRoute from "./PrivateRoute";
const {GETData, postData} = require('./fetch.js');

const AppContext = React.createContext(null);
let admin = false;
export function App() {
  const [state, dispatch] = useReducer(reducer, {
    presidi: new Array(),
    giorniDisponibili: new Array(),
    codiceUnivoco: 0,
    admin: false,
  });
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
        <PrivateRoute exact path="/schermataAmministratore" codice={admin} component={Amministratore}/>
          <PrivateRoute exact path="/EsitoPrenotazione" codice={state.codiceUnivoco!=0} component={EsitoPrenotazione} contesto={AppContext}/>
          <PrivateRoute exact path="/EsitoTampone" codice={state.codiceUnivoco!=0} component={EsitoTampone} contesto={AppContext}/>
          <Route exact path="/LogIn">
            <LogIn contesto={AppContext}/>
          </Route>
          <Route exact path="/prenota">
            <Prenota contesto={AppContext}/>
          </Route>
          <Route exact path="/controlla">
            <Controlla contesto={AppContext}/>
          </Route>
          <Route exact path="/esito">
            <Esito contesto={AppContext}/>
          </Route>
          <Route exact path="/">
            <HomePage contesto={AppContext}/>
          </Route>
          
        </Switch>
      </Router>
    </AppContext.Provider>
  );
} 

export function slogga() {
  admin = false;
}

function reducer(state, action) {
	let newState = { ...state };
  switch (action.type) {
    case "caricaGiorni":
      newState.giorniDisponibili = action.payload;
      break;
    case "Carica presidi":
      newState.presidi = action.payload;
      break;
    case "aggiornaCodice":
      newState.codiceUnivoco = action.payload;
      break;
    case "LogIn":
      newState.admin = true;
      admin = true;
    break;
    case "LogOut":
      newState.admin = false;
    break;
    default:
      break;
  }
  console.log("stato", newState);
	return newState;
}