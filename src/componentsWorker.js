import React, { useReducer, useContext, useEffect, useState } from "react";
import "./style.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import assets from "../img/*.png";
import { HomeButtonWorker } from "./utility";
import { Table } from "react-bootstrap";
import { Card } from "./componentsUser";

const { GETData, postData } = require("./fetch.js");

const AppContext = React.createContext(null);

export function OperatoreSanitario() {
  const [state, dispatch] = useReducer(reducer, {
    presidi: new Array(),
    prenotazioniGiornaliere: new Array(),
    prenotazioniTraDate: new Array(),
    verifica: "",
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route exact path="/schermataOperatore">
            <SchermataOperatore contesto={AppContext} />
          </Route>
          <Route exact path="/verificaPrenotazione">
            <VerificaPrenotazione contesto={AppContext} />
          </Route>
          <Route exact path="/aggiungiEsito">
            <AggiungiEsito contesto={AppContext} />
          </Route>
          <Route exact path="/visualizzaDati">
            <VisualizzaDati contesto={AppContext} home={<HomeButtonWorker />} />
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

function reducer(state, action) {
  let newState = { ...state };
  switch (action.type) {
    case "Carica presidi":
      newState.presidi = action.payload;
      break;
    case "Prenotazioni giornaliere":
      newState.prenotazioniGiornaliere = action.payload;
      break;
    case "Prenotazioni tra date":
      newState.prenotazioniTraDate = action.payload;
      break;
    case "Modifica Verifica":
      newState.verifica = action.payload;
      break;
    default:
      break;
  }
  console.log("stato", newState);
  return newState;
}

function PaginaOperatore(props) {
  return (
    <div className="PaginaOperatore">
      <nav className="navbar sticky-top navbar-light bg-light">
        <img
          src={assets.Logo}
          width="160"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        <div className="Titolo">PRENOTAZIONE TAMPONI-OPERATORE</div>
        <form className="form-inline my-2 my-lg-0">
          <Link to="/">
            <button
              className="btn btn-primary my-2 my-sm-0"
              onClick={() => {
                sessionStorage.setItem("Permessi", JSON.stringify("Niente"));
                document.location.reload(true);
              }}
            >
              Disconnetti
            </button>
          </Link>
        </form>
      </nav>
      <div className="bodyPrincipale">{props.body}</div>
    </div>
  );
}

let bool = 0;

export function SchermataOperatore(params) {
  const { state, dispatch } = useContext(params.contesto);
  function carica() {
    if (bool == 0) {
      bool = 1;
      GETData("Presidi.php", {}).then((r) => {
        let a = new Array();
        for (let i in r) a.push(r[i].nome);
        let elencoPresidi = a;
        console.log(elencoPresidi);
        dispatch({ type: "Carica presidi", payload: elencoPresidi });
      });
    }
  }
  carica();
  return (
    <PaginaOperatore
      body={
        <div className="corpo">
          <div className="container">
            <div className="row row-cols-3">
              <div className="col-lg-4 col-sm-12 col-12">
                <Card
                  nome="verificaPrenotazione"
                  titolo="Verifica Prenotazione"
                  testo="Verifica che la prenotazione sia in data odierna."
                  contesto={params.contesto}
                  immagine={assets.oggi}
                />
              </div>
              <div className="col-lg-4 col-sm-12 col-12">
                <Card
                  nome="aggiungiEsito"
                  titolo="Aggiungi Esito Tampone"
                  testo="Aggiungi l'esito di un tampone effettuato."
                  contesto={params.contesto}
                  immagine={assets.aggiungiesito}
                />
              </div>
              <div className="col-lg-4 col-sm-12 col-12">
                <Card
                  nome="visualizzaDati"
                  titolo="Visualizza i dati"
                  testo="Accedi ai dati sulle prenotazioni per visualizzare l'andamento."
                  contesto={params.contesto}
                  immagine={assets.visualizzadati}
                />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

function VerificaPrenotazione(params) {
  const { state, dispatch } = useContext(params.contesto);
  return (
    <PaginaOperatore
      body={
        <div className="corpo">
          <div className="aggiunta">
            <h2>Verifica prenotazione</h2>
            <div className="mb-3 Presidi">
              <label htmlFor="Presidi" className="form-label">
                Presidio attuale
              </label>
              <SelettorePresidi contesto={params.contesto} />
              <div className="mb-3 Presidi">
                <label htmlFor="Presidi" className="form-label">
                  Codice Prenotazione
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="codicePrenotazione"
                  aria-describedby="descrizioneCodicePrenotazione"
                  required
                ></input>
                <div id="descrizioneRipetiPassword" className="form-text">
                  Insersci il codice mostrato dall'utente.
                </div>
              </div>
              <Indicatore contesto={params.contesto} />
              <button
                className="btn btn-primary"
                onClick={() => {
                  let e = document.getElementById("Presidi");
                  let valore = e.options[e.selectedIndex].value;
                  let codice =
                    document.getElementById("codicePrenotazione").value;
                  postData("verifica_prenotazione.php", {
                    codice: codice,
                    presidio: valore,
                  }).then((r) => {
                    dispatch({ type: "Modifica Verifica", payload: r });
                  });
                }}
              >
                Verifica
              </button>
            </div>
            <HomeButtonWorker />
          </div>
        </div>
      }
    />
  );
}

function Indicatore(params) {
  const { state, dispatch } = useContext(params.contesto);
  let style = "";
  if (state.verifica == "") return <></>;
  if (state.verifica == "Oggi")
    style = { backgroundColor: "green", color: "black" };
  else style = { backgroundColor: "red", color: "black" };
  return (
    <div style={style} className="indicatore">
      {state.verifica}
    </div>
  );
}

function AggiungiEsito(params) {
  const { state, dispatch } = useContext(params.contesto);
  return (
    <PaginaOperatore
      body={
        <div className="corpo">
          <div className="aggiunta">
            <h2>Aggiungi Esito</h2>
            <div className="mb-3 Presidi">
              <label htmlFor="Presidi" className="form-label">
                Codice Prenotazione
              </label>
              <input
                  type="text"
                  className="form-control"
                  id="codicePrenotazione"
                  aria-describedby="descrizioneCodicePrenotazione"
                  required
                ></input>
                </div>
              <div className="mb-3 Presidi">
                <label htmlFor="Presidi" className="form-label">
                  Esito
                </label>
                <select id="Scelte">
                    <option value="pending">Pending</option>
                    <option value="positivo">Positivo</option>
                    <option value="negativo">Negativo</option>
                </select>
                <div id="descrizioneRipetiPassword" className="form-text">
                  Scegli l'esito del tampone.
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  let e = document.getElementById("Scelte");
                  let valore = e.options[e.selectedIndex].value;
                  let codice =
                    document.getElementById("codicePrenotazione").value;
                  postData("inserisci_esito.php", {
                    operatore: JSON.parse(sessionStorage.getItem("Permessi"))
                    .nomeUtente,
                    codice: codice,
                    esito: valore,
                  }).then((r) => {
                    if (r == "Errore")
                        alert("Prenotazione non trovata.");
                    else 
                        alert("Esito inserito con successo.");
                  });
                }}
              >
                Inserisci
              </button>
              <div style={{"marginTop": "10"}}>
              <HomeButtonWorker />
              </div>
            </div>
            
          </div>
      }
    />
  );
}

let boolean = true;
export function VisualizzaDati(params) {
  const { state, dispatch } = useContext(params.contesto);
  const home = params.home;
  if (boolean) {
    GETData("Lista_prenotazioni_giornaliere.php", {}).then((r) => {
      dispatch({ type: "Prenotazioni giornaliere", payload: r });
    });
    boolean = false;
  }

  return (
    <PaginaOperatore
      body={
        <div className="corpo">
          <div className="dati">
            <div className="prenotazioniGiornaliere">
              <h2>Prenotazioni Giornaliere</h2>
              <PrenotazioniGiornaliere contesto={params.contesto} />
            </div>
            <div className="prenotazioneTraDate">
              <h2>Prenotazioni tra 2 date</h2>
              <SelettorePresidi contesto={params.contesto} />
              <div className="pickers">
                Da: <DatePicker numero="1" />
                A: <DatePicker numero="2" />
              </div>
              <button
                className="btn btn-primary"
                style={{ marginTop: "10" }}
                onClick={() => {
                  let e = document.getElementById("Presidi");
                  let valore = e.options[e.selectedIndex].value;
                  let dataIniziale =
                    document.getElementById("datepicker1").value;
                  let dataFinale = document.getElementById("datepicker2").value;
                  if (dataIniziale > dataFinale)
                    alert("Errore nell'inserimento delle date.");
                  else {
                    GETData("prenotazioni_tra_date.php", {
                      presidio: valore,
                      giornoIniziale: dataIniziale,
                      giornoFinale: dataFinale,
                    }).then((r) => {
                      dispatch({ type: "Prenotazioni tra date", payload: r });
                    });
                  }
                }}
              >
                Cerca
              </button>
              <PrenotazioniTraDate contesto={params.contesto} />
            </div>
            {home}
          </div>
        </div>
      }
    />
  );
}

export function PrenotazioniTraDate(params) {
  const { state, dispatch } = useContext(params.contesto);
  let array = state.prenotazioniTraDate;
  let prenotazioni = [];
  array.forEach((element, i) => {
    let j = i + 1;
    let e = element.quanti;
    if (e == null) e = 0;
    prenotazioni[prenotazioni.length] = (
      <tr key={i}>
        <td>{j}</td>
        <td>{element.data}</td>
        <td>{e}</td>
      </tr>
    );
  });
  return (
    <Table striped bordered hover size="sm" style={{ marginTop: "10" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Data</th>
          <th>Numero prenotazioni</th>
        </tr>
      </thead>
      <tbody>{prenotazioni}</tbody>
    </Table>
  );
}

export function DatePicker(params) {
  let codice = "datepicker" + params.numero;
  return <input type="date" id={codice}></input>;
}

export function PrenotazioniGiornaliere(params) {
  const { state, dispatch } = useContext(params.contesto);
  let array = state.prenotazioniGiornaliere;
  let prenotazioni = [];
  array.forEach((element, i) => {
    let j = i + 1;
    prenotazioni[prenotazioni.length] = (
      <tr key={i}>
        <td>{j}</td>
        <td>{element.codice_fiscale}</td>
        <td>{element.codice}</td>
        <td>{element.nome}</td>
      </tr>
    );
  });
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Codice Fiscale</th>
          <th>Codice</th>
          <th>Presidio</th>
        </tr>
      </thead>
      <tbody>{prenotazioni}</tbody>
    </Table>
  );
}
function SelettorePresidi(params) {
  const { state, dispatch } = useContext(params.contesto);

  return (
    <select className="form-select" id="Presidi">
      <Presidi contesto={params.contesto} />
    </select>
  );
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
