import React, { useReducer, useContext, useEffect, useState } from "react";
import "./style.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import assets from "../img/*.png";
import { HomeButtonAdmin } from "./utility";
import { Table } from "react-bootstrap";

const { GETData, postData } = require("./fetch.js");

const AppContext = React.createContext(null);

export function Amministratore() {
  const [state, dispatch] = useReducer(reducer, {
    presidi: new Array(),
    operatori: new Array(),
    prenotazioniGiornaliere: new Array(),
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route exact path="/schermataAmministratore">
            <SchermataAmministatore contesto={AppContext} />
          </Route>
          <Route exact path="/aggiungiOperatore">
            <AggiungiOperatore contesto={AppContext} />
          </Route>
          <Route exact path="/aggiungiPresidio">
            <AggiungiPresidio contesto={AppContext} />
          </Route>
          <Route exact path="/visualizzaDati">
            <VisualizzaDati contesto={AppContext} />
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
    case "Carica operatori":
      newState.operatori = action.payload;
      break;
    case "Prenotazioni giornaliere":
      newState.prenotazioniGiornaliere = action.payload;
      break;
    default:
      break;
  }
  console.log("stato", newState);
  return newState;
}

let bool = 0;

export function SchermataAmministatore(params) {
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
      GETData("Operatori.php", {}).then((r) => {
        let a = new Array();
        for (let i in r) a.push(r[i].nomeUtente);
        let elencoOperatori = a;
        console.log(elencoOperatori);
        dispatch({ type: "Carica operatori", payload: elencoOperatori });
      });
    }
  }
  carica();
  return (
    <PaginaAdmin
      body={
        <div className="corpo">
          <div className="container">
            <div className="row row-cols-3">
              <div className="col-lg-4 col-sm-12 col-12">
                <Card
                  nome="aggiungiOperatore"
                  titolo="Aggiungi Operatore"
                  testo="Aggiungi dei nuovi account per gli operatori sanitari."
                  contesto={params.contesto}
                  immagine={assets.aggiungioperatore}
                />
              </div>
              <div className="col-lg-4 col-sm-12 col-12">
                <Card
                  nome="aggiungiPresidio"
                  titolo="Aggiungi Presidio"
                  testo="Aggiungi un nuovo presidio in cui effettuare i tamponi."
                  contesto={params.contesto}
                  immagine={assets.aggiungipresidio}
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

function PaginaAdmin(props) {
  return (
    <div className="PaginaAdmin">
      <nav className="navbar sticky-top navbar-light bg-light">
        <img
          src={assets.Logo}
          width="160"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        <div className="Titolo">PRENOTAZIONE TAMPONI-AMMINISTRATORE</div>
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
      <footer>Footer</footer>
    </div>
  );
}

function Card(params) {
  const { state, dispatch } = useContext(params.contesto);
  let link = "/" + params.nome;
  return (
    <div className="card">
      <h5 className="card-header">{params.titolo}</h5>
      <div className="card-body">
        <Link to={link}>
          <Image immagine={params.immagine} />
        </Link>
        <p className="card-text">{params.testo}</p>
        <Link to={link}>
          <button className="btn btn-primary" style={{ fontSize: "20px" }}>
            {params.titolo}
          </button>
        </Link>
      </div>
    </div>
  );
}

function AggiungiOperatore(params) {
  const { state, dispatch } = useContext(params.contesto);
  function carica() {
    if (bool == 0) {
      bool = 1;
      GETData("Operatori.php", {}).then((r) => {
        let a = new Array();
        for (let i in r) a.push(r[i].nomeUtente);
        let elencoOperatori = a;
        console.log(elencoOperatori);
        dispatch({ type: "Carica operatori", payload: elencoOperatori });
      });
    }
  }
  carica();
  return (
    <PaginaAdmin
      body={
        <div className="corpo">
          <div className="aggiunta">
            <div className="mb-3 Operatori">
              <SelettoreOperatori contesto={params.contesto} />
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: "red",
                  borderColor: "red",
                  marginTop: "10",
                }}
                onClick={() => {
                  let a = confirm(
                    "Vuoi davvero cancellare l'account operatore corrente?"
                  );
                  if (a == true) {
                    let e = document.getElementById("Operatori");
                    let valore = e.options[e.selectedIndex].value;
                    postData("elimina_operatore.php", {
                      nomeUtente: valore,
                    });
                    alert("Operatore eliminato con successo.");
                    bool = 0;
                    carica();
                  }
                }}
              >
                Elimina Operatore
              </button>
            </div>

            <label htmlFor="Presidi" className="form-label">
              Nome Utente
            </label>
            <div className="mb-3 Presidi">
              <input
                type="text"
                className="form-control"
                id="NomeOperatore"
                aria-describedby="descrizioneNome"
                required
              ></input>
              <div id="descrizioneNome" className="form-text">
                Inserisci il nome del nuovo operatore da aggiungere.
              </div>
            </div>
            <label htmlFor="Presidi" className="form-label">
              Password
            </label>
            <div className="mb-3 Presidi">
              <input
                type="password"
                className="form-control"
                id="password"
                aria-describedby="descrizionePassword"
                required
              ></input>
              <div id="descrizionePassword" className="form-text">
                Inserisci la password dell'account.
              </div>
            </div>
            <label htmlFor="Presidi" className="form-label">
              Ripeti Password
            </label>
            <div className="mb-3 Presidi">
              <input
                type="password"
                className="form-control"
                id="ripetiPassword"
                aria-describedby="descrizioneRipetiPassword"
                required
              ></input>
              <div id="descrizioneRipetiPassword" className="form-text">
                Ripeti la password inserita.
              </div>
            </div>
            <button
              className="btn btn-primary"
              style={{ marginTop: "10" }}
              onClick={() => {
                let nome = document.getElementById("NomeOperatore").value;
                let password = document.getElementById("password").value;
                let ripetiPassword =
                  document.getElementById("ripetiPassword").value;
                postData("aggiungi_utente.php", {
                  nomeUtente: nome,
                  password: password,
                  ripetiPassword: ripetiPassword,
                  admin: JSON.parse(sessionStorage.getItem("Permessi"))
                    .nomeUtente,
                }).then((r) => {
                  document.getElementById("password").value = "";
                  document.getElementById("ripetiPassword").value = "";
                  if (r == "Utilizzato")
                    alert("Errore nell'inserimento. Nome già utilizzato.");
                  else if (r == "Errore") {
                    alert("Le password inserite non coincidono, riprovare.");
                  } else {
                    document.getElementById("NomeOperatore").value = "";
                    alert("Operatore inserito correttamente.");
                    bool = 0;
                    carica();
                  }
                });
              }}
            >
              Aggiungi Operatore
            </button>
            <div style={{ marginTop: "10" }}>
              <HomeButtonAdmin />
            </div>
          </div>
        </div>
      }
    />
  );
}

function SelettoreOperatori(params) {
  const { state, dispatch } = useContext(params.contesto);

  return (
    <select className="form-select" id="Operatori">
      <Operatori contesto={params.contesto} />
    </select>
  );
}

function Operatori(params) {
  let Selettore = [];
  const { state, dispatch } = useContext(params.contesto);
  let operatori = state.operatori;
  operatori.forEach((element, i) => {
    Selettore[Selettore.length] = (
      <option value={rimuoviSpazi(element)} key={i}>
        {element}
      </option>
    );
  });

  return <>{Selettore}</>;
}
function AggiungiPresidio(params) {
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
    <PaginaAdmin
      body={
        <div className="corpo">
          <div className="aggiunta">
            <div className="mb-3 Presidi">
              <SelettorePresidi contesto={params.contesto} />
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: "red",
                  borderColor: "red",
                  marginTop: "10",
                }}
                onClick={() => {
                  let a = confirm(
                    "Vuoi davvero cancellare il presidio corrente?"
                  );
                  if (a == true) {
                    let e = document.getElementById("Presidi");
                    let valore = e.options[e.selectedIndex].value;
                    postData("elimina_presidio.php", {
                      presidio: valore,
                    });
                    alert("Presidio eliminato con successo.");
                    bool = 0;
                    carica();
                  }
                }}
              >
                Elimina Presidio
              </button>
            </div>
            <div className="mb-3 Presidi">
              <input
                type="text"
                className="form-control"
                id="NomePresidio"
                aria-describedby="descrizioneNome"
                required
              ></input>
              <div id="descrizioneNome" className="form-text">
                Inserisci il nome del nuovo presidio da aggiungere.
              </div>
              <button
                className="btn btn-primary"
                style={{ marginTop: "10" }}
                onClick={() => {
                  let e = document.getElementById("NomePresidio").value;
                  if (e == "") alert("Inserire un nome valido.");
                  else {
                    postData("aggiungi_presidio.php", {
                      presidioNome: e,
                      presidioValue: rimuoviSpazi(e),
                    }).then((r) => {
                      if (r == "Errore")
                        alert("Errore nell'inserimento. Nome già utilizzato.");
                      else {
                        alert("Presidio inserito correttamente.");
                        bool = 0;
                        carica();
                      }
                    });
                  }
                }}
              >
                Aggiungi Presidio
              </button>
            </div>
            <HomeButtonAdmin />
          </div>
        </div>
      }
    />
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

function VisualizzaDati(params) {
  const { state, dispatch } = useContext(params.contesto);
  GETData("Lista_prenotazioni_giornaliere.php", {}).then((r) => {
    dispatch({ type: "Prenotazioni giornaliere", payload: r });
  });
  return (
    <PaginaAdmin
      body={
        <div className="corpo">
          <div className="dati">
            <div className="prenotazioniGiornaliere">
              <h2>Prenotazioni Giornaliere</h2>
              <PrenotazioniGiornaliere contesto={params.contesto} />
            </div>
            <div className="prenotazioneTraDate">
              <h2>Prenotazioni tra 2 date</h2>
              <SelettorePresidi contesto={params.contesto}/>
              <div className="pickers">
              Da: <DatePicker numero="1"/>
              A: <DatePicker numero="2"/>
              </div>
              <button className="btn btn-primary"  style={{"marginTop": "10"}}onClick={()=>{
                let e = document.getElementById("Presidi");
                let valore = e.options[e.selectedIndex].value;
                let dataIniziale = document.getElementById("datepicker1").value;
                let dataFinale = document.getElementById("datepicker2").value;
                if (dataIniziale > dataFinale)
                  alert("Errore nell'inserimento delle date.");
                else {
                  GETData('prenotazioni_tra_date.php', {
                    presidio: valore,
                    giornoIniziale: dataIniziale,
                    giornoFinale: dataFinale,
                  }).then(r => {
                    
                  })
                }
              }}>Cerca</button>
            </div>
          </div>
        </div>
      }
    />
  );
}

function DatePicker(params) {
  let codice = "datepicker" + params.numero;
  return(
    <input type="date" id={codice}></input>
  )
}

function PrenotazioniGiornaliere(params) {
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

function Image(props) {
  return <img src={props.immagine} className="immagineCard" />;
}
