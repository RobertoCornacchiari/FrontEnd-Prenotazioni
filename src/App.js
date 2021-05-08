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
} from "./components.js";
import PrivateRoute from "./PrivateRoute";
const {GETData, postData} = require('./fetch.js');

const AppContext = React.createContext(null);

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    presidi: ['Brescia Fiere', 'Centro Congressi'],
    giorniDisponibili: new Array(),
    codiceUnivoco: 0,

  });
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <PrivateRoute path="/EsitoPrenotazione" codice={state.codiceUnivoco} component={EsitoPrenotazione} contesto={AppContext}/>
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
          <Route exact path="/areaRiservata">
            <AreaRiservata contesto={AppContext}/>
          </Route>
          <Route exact path="/">
            <HomePage contesto={AppContext}/>
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
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
    default:
      break;
  }
  console.log("stato", newState);
	return newState;
}