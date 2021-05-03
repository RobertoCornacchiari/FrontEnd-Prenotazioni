import React from "react";
import "./style.css";
import logo from '../img/Logo.jpeg';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FormCheck } from "react-bootstrap";

function Pagina(props) {
  return (
    <div className="Pagina">
      <header>
        <div class="container">
          <div class="row">
            <div class="col Titolo">
                <Logo/>
                Applicazione tamponi
            </div>
            <div class="col">
              <Link to="/LogIn"><button className="btn btn-primary LogIn">
                Accedi
              </button></Link>
            </div>
          </div>
        </div>
      </header>
      {props.body}
      <footer>Footer</footer>
    </div>
  );
}

export function HomePage() {
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
                />
              </div>
              <div class="col-xl-4 col-sm-12">
                <Card
                  nome="controlla"
                  titolo="Controlla"
                  testo="Controlla, annulla o stampa la tua prenotazione"
                />
              </div>
              <div class="col-xl-4 col-sm-12">
                <Card
                  nome="esito"
                  titolo="Esito"
                  testo="Controlla l'esito del tampone"
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

function Card(props) {
  let link = "/" + props.nome;
  return (
    <div class="card">
      <h5 class="card-header">{props.titolo}</h5>
      <div class="card-body">
        <p class="card-text">{props.testo}</p>
        <Link to={link}>
          <a class="btn btn-primary">{props.titolo}</a>
        </Link>
      </div>
    </div>
  );
}

//Pagina per la prenotazione di un tampone (scelta di data e presidio)
export function Prenota() {

    //Inserire la fetch per i presidi

  return (
    <Pagina
      body={
        <div className="Form">
          <form>
            <div class="mb-3">
              <label for="CodiceFiscale" class="form-label">
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
            <label for="Presidi" class="form-label">
                Presidi Disponibili
              </label>
              <select class="form-select"  id="Presidi"
                aria-describedby="PresidiHelp">
              </select>
              <div id="CodiceFiscaleHelp" class="form-text">
                Scegli il presidio in cui effettuare il tampone.
              </div>
            </div>
            <div class="mb-3 Giorni">
            <label for="CodiceFiscale" class="form-label">
                Giorni Disponibili
              </label>
              <select class="form-select"  id="Giorni"
                aria-describedby="GiorniHelp" disabled>
              </select>
              <div id="CodiceFiscaleHelp" class="form-text">
                Scegli il giorno in cui effettuare il tampone (<b>presidi diversi hanno disponibilità diverse</b>).
              </div>
            </div>
            <button type="submit" class="btn btn-primary" disabled>
              Submit
            </button>
            <Link to="/"><button class="btn btn-primary" style={{"margin-left": "5px"}}>
              Torna alla Home
            </button></Link>
          </form>
        </div>
      }
    />
  );
}

export function Controlla() {
  return (
    <Pagina body={
        <div className="Form">
      <form>
        <div class="mb-3">
          <label for="CodiceFiscale" class="form-label">
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
        <Link to="/"><button class="btn btn-primary" style={{"margin-left": "5px"}}>
          Torna alla Home
        </button></Link>
      </form>
    </div>
    }/>
  );
}
export function Esito() {
    return (
        <Pagina body={
            <div className="Form">
          <form>
            <div class="mb-3">
              <label for="CodiceFiscale" class="form-label">
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
            <Link to="/"><button class="btn btn-primary" style={{"margin-left": "5px"}}>
              Torna alla Home
            </button></Link>
          </form>
        </div>
        }/>
      );
}
export function AreaRiservata() {
  return <div className="pagina"></div>;
}
export function LogIn() {
    return (
        <Pagina body={
            <div className="Form">
          <form>
            <div class="mb-3">
              <label for="CodiceFiscale" class="form-label">
                Nome Utente
              </label>
              <input
                type="text"
                class="form-control"
                id="NomeUtente"
              ></input>
            </div>
            <div class="mb-3">
              <label for="CodiceFiscale" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="Password"
              ></input>
            </div>
            <button type="submit" class="btn btn-primary">
              Accedi
            </button>
            <Link to="/"><button class="btn btn-primary" style={{"margin-left": "5px"}}>
              Torna alla Home
            </button></Link>
          </form>
        </div>
        }/>
    )
}

function Logo(props) {
    return (
        <img src={logo} style={{width: 120, height: 40}}/>
    );
}