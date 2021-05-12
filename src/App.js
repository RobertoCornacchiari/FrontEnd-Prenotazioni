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
import { Amministratore, SchermataAmministatore } from "./componentsAdmin.js";
import {PrivateRoute, PrivateRouteX }from "./PrivateRoute";
import { OperatoreSanitario, SchermataOperatore } from "./componentsWorker";
const { GETData, postData } = require("./fetch.js");

const AppContext = React.createContext(null);

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    presidi: new Array(),
    giorniDisponibili: new Array(),
    codiceUnivoco: 0,
    admin: false,
    worker: false,
  });
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <PrivateRouteX
            exact
            path="/schermataAmministratore"
            codice={() => {
              if (JSON.parse(sessionStorage.getItem("Permessi")) == null)
                return false;
              else {
                if (JSON.parse(sessionStorage.getItem("Permessi")).admin == "1")
                  return true;
                else return false;
              }
            }}
            component={Amministratore}
          />
          <PrivateRouteX
            exact
            path="/schermataOperatore"
            codice={() => {
              if (JSON.parse(sessionStorage.getItem("Permessi")) == null)
                return false;
              else {
                if (JSON.parse(sessionStorage.getItem("Permessi")).admin == "0")
                  return true;
                else return false;
              }
            }}
            component={OperatoreSanitario}
          />
          <PrivateRoute
            exact
            path="/EsitoPrenotazione"
            codice={state.codiceUnivoco != 0}
            component={EsitoPrenotazione}
            contesto={AppContext}
          />
          <PrivateRoute
            exact
            path="/EsitoTampone"
            codice={state.codiceUnivoco != 0}
            component={EsitoTampone}
            contesto={AppContext}
          />
          <Route exact path="/LogIn">
            <LogIn contesto={AppContext} />
          </Route>
          <Route exact path="/prenota">
            <Prenota contesto={AppContext} /> 
          </Route>
          <Route exact path="/controlla">
            <Controlla contesto={AppContext} />
          </Route>
          <Route exact path="/esito">
            <Esito contesto={AppContext} />
          </Route>
          <Route exact path="/">
            <HomePage contesto={AppContext} />
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
