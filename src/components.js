import React, { useReducer, useContext, useEffect, useState } from "react";
import "./style.css";
import logo from "../img/Logo.jpeg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import * as fetch from "./fetch.js";

let bool = 0;

function Pagina(props) {
  return (
    <div className="Pagina">
      <header>
        <div class="container">
          <div class="row">
            <div class="col Titolo">
              <Logo />
              Applicazione tamponi
            </div>
            <div class="col">
              <Link to="/LogIn">
                <button className="btn btn-primary LogIn">Accedi</button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {props.body}
      <footer>Footer</footer>
    </div>
  );
}

export function HomePage(params) {
  const { state, dispatch } = useContext(params.contesto);
  function carica () {
    if (bool == 0) {
      bool = 1;
      fetch.GETData("Presidi.php", {}).then((r) => {
        let a = new Array();
        for (let i in r) a.push(r[i].nome);
        let elencoPresidi = a;
        console.log(elencoPresidi);
        dispatch({ type: "Carica presidi", payload: elencoPresidi });
      });
    }
  };
  carica();
  return (
    <Pagina
      body={
        <div className="corpo">
          <div class="container">
            <div class="row row-cols-3">
              <div class="col-xl-4 col-sm-12">
                <Card
                  nome="prenota"
                  titolo="Prenota"
                  testo="Esegui la tua prenotazione"
                  contesto={params.contesto}
                />
              </div>
              <div class="col-xl-4 col-sm-12">
                <Card
                  nome="controlla"
                  titolo="Controlla"
                  testo="Controlla, annulla o stampa la tua prenotazione"
                  contesto={params.contesto}
                />
              </div>
              <div class="col-xl-4 col-sm-12">
                <Card
                  nome="esito"
                  titolo="Esito"
                  testo="Controlla l'esito del tampone"
                  contesto={params.contesto}
                />
              </div>
            </div>
          </div>
          {/*<Link to="/areaRiservata"><Card nome="areaRiservata"/></Link>*/}
        </div>
      }
    />
  );
}

/*
fetch.GETData("Presidi.php", {}).then((r) => {
      let a = new Array();
      for (let i in r) a.push(r[i].nome);
      let elencoPresidi = a;
      console.log(elencoPresidi);
      dispatch({ type: "Carica presidi", payload: elencoPresidi });

*/

function Card(params) {
  const { state, dispatch } = useContext(params.contesto);
  let link = "/" + params.nome;
  return (
    <div class="card">
      <h5 class="card-header">{params.titolo}</h5>
      <div class="card-body">
        <p class="card-text">{params.testo}</p>
        <Link to={link}>
          <a class="btn btn-primary">{params.titolo}</a>
        </Link>
      </div>
    </div>
  );
}

//Pagina per la prenotazione di un tampone (scelta di data e presidio)
export function Prenota(params) {
  const { state, dispatch } = useContext(params.contesto);

  return (
    <Pagina
      body={
        <div className="Form">
          <form>
            <div class="mb-3">
              <label htmlFor="CodiceFiscale" class="form-label">
                Codice Fiscale
              </label>
              <input
                type="text"
                class="form-control"
                id="CodiceFiscale"
                aria-describedby="CodiceFiscaleHelp"
              ></input>
              <div id="CodiceFiscaleHelp" class="form-text">
                Inserisci il tuo codice fiscale (lettere maiuscole).
              </div>
            </div>
            <div class="mb-3 Presidi">
              <label htmlFor="Presidi" class="form-label">
                Presidi Disponibili
              </label>
              <SelettorePresidi contesto={params.contesto} />
              <div id="CodiceFiscaleHelp" class="form-text">
                Scegli il presidio in cui effettuare il tampone.
              </div>
            </div>
            <div class="mb-3 Giorni">
              <label htmlFor="CodiceFiscale" class="form-label">
                Giorni Disponibili
              </label>
              <select
                class="form-select"
                id="Giorni"
                aria-describedby="GiorniHelp"
                disabled={true}
              >
                <Giorni contesto={params.contesto} />
              </select>
              <div id="CodiceFiscaleHelp" class="form-text">
                Scegli il giorno in cui effettuare il tampone (
                <b>presidi diversi hanno disponibilità diverse</b>).
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              id="submitPrenota"
              disabled
            >
              Submit
            </button>
            <Link to="/">
              <button class="btn btn-primary" style={{ marginLeft: "5px" }}>
                Torna alla Home
              </button>
            </Link>
          </form>
        </div>
      }
    />
  );
}

function SelettorePresidi(params) {
  const { state, dispatch } = useContext(params.contesto);

  return (
    <select
      class="form-select"
      id="Presidi"
      aria-describedby="PresidiHelp"
      onClick={() => {
        dispatch({
          type: "cercaGiorni",
          payload: () => {
            let e = document.getElementById("Presidi");
            let valore = e.options[e.selectedIndex].value;
            return valore;
          },
        });
      }}
    >
      <Presidi contesto={params.contesto} />
    </select>
  );
}

function reducer(state, action) {
  let newState = { ...state };
  switch (action.type) {
    case "cercaGiorni":
      console.log("state");
      break;
    default:
      break;
  }
  console.log("stato", newState);
  return newState;
}

function Presidi(params) {
  let Selettore = [];
  const { state, dispatch } = useContext(params.contesto);
  let presidi = state.presidi;
  presidi.forEach((element, i) => {
    Selettore[Selettore.length] = (
      <option value={rimuoviSpazi(element)} key={i}>
        {element}
      </option>
    );
  });

  return <>{Selettore}</>;
}

function rimuoviSpazi(stringa) {
  return stringa.replace(/\s/g, "");
}

function Giorni(params) {
  let giorni = [];
  const { state, dispatch } = useContext(params.contesto);
  let date = state.giorniDisponibili;
  date.forEach((element, i) => {
    giorni[giorni.length] = (
      <option value={element} key={i}>
        {element}
      </option>
    );
  });

  return <>{giorni}</>;
}

export function Controlla() {
  return (
    <Pagina
      body={
        <div className="Form">
          <form>
            <div class="mb-3">
              <label htmlFor="CodiceFiscale" class="form-label">
                Codice Prenotazione
              </label>
              <input
                type="text"
                class="form-control"
                id="CodicePrenotazione"
              ></input>
            </div>
            <button type="submit" class="btn btn-primary">
              Controlla
            </button>
            <Link to="/">
              <button class="btn btn-primary" style={{ marginLeft: "5px" }}>
                Torna alla Home
              </button>
            </Link>
          </form>
        </div>
      }
    />
  );
}
export function Esito() {
  return (
    <Pagina
      body={
        <div className="Form">
          <form>
            <div class="mb-3">
              <label htmlFor="CodiceFiscale" class="form-label">
                Codice Prenotazione
              </label>
              <input
                type="text"
                class="form-control"
                id="CodicePrenotazione"
              ></input>
            </div>
            <button type="submit" class="btn btn-primary">
              Visualizza l'esito
            </button>
            <Link to="/">
              <button class="btn btn-primary" style={{ marginLeft: "5px" }}>
                Torna alla Home
              </button>
            </Link>
          </form>
        </div>
      }
    />
  );
}
export function AreaRiservata() {
  return <div className="pagina"></div>;
}
export function LogIn() {
  return (
    <Pagina
      body={
        <div className="Form">
          <form>
            <div class="mb-3">
              <label htmlFor="CodiceFiscale" class="form-label">
                Nome Utente
              </label>
              <input type="text" class="form-control" id="NomeUtente"></input>
            </div>
            <div class="mb-3">
              <label htmlFor="CodiceFiscale" class="form-label">
                Password
              </label>
              <input type="password" class="form-control" id="Password"></input>
            </div>
            <button type="submit" class="btn btn-primary">
              Accedi
            </button>
            <Link to="/">
              <button class="btn btn-primary" style={{ margiLeft: "5px" }}>
                Torna alla Home
              </button>
            </Link>
          </form>
        </div>
      }
    />
  );
}

function Logo(props) {
  return <img src={logo} style={{ width: 120, height: 40 }} />;
}
