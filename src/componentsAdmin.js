import React, { useReducer, useContext, useEffect, useState } from "react";
import "./style.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import assets from "../img/*.png";

const { GETData, postData } = require('./fetch.js');

const AppContext = React.createContext(null);

export function Amministratore() {
    const [state, dispatch] = useReducer(reducer, {
        presidi: new Array(),
    });

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <Router>
                <Switch>
                    <Route path="/schermataAmministratore">
                        <SchermataAmministatore contesto={AppContext} />
                    </Route>
                </Switch>
            </Router>
        </AppContext.Provider>
    )
}

function reducer(state, action) {
    let newState = { ...state };
    switch (action.type) {

        default:
            break;
    }
    console.log("stato", newState);
    return newState;
}

export function SchermataAmministatore(params) {
    return (
        <PaginaAdmin
            body={
                <div className="corpo">
                    <div className="container">
                        <div className="row row-cols-3">
                            <div className="col-lg-4 col-sm-12 col-12">
                                <Card
                                    nome="aggiungiOperatori"
                                    titolo="Aggiungi Operatori"
                                    testo="Aggiungi dei nuovi account per gli operatori sanitari."
                                    contesto={params.contesto}
                                    immagine={assets.prenota}
                                />
                            </div>
                            <div className="col-lg-4 col-sm-12 col-12">
                                <Card
                                    nome="aggiungiPresidio"
                                    titolo="Aggiungi Presidio"
                                    testo="Aggiungi un nuovo presidio in cui effettuare i tamponi."
                                    contesto={params.contesto}
                                    immagine={assets.controlla}
                                />
                            </div>
                            <div className="col-lg-4 col-sm-12 col-12">
                                <Card
                                    nome="prenotazioni"
                                    titolo="Visualizza i dati sulle prenotazioni"
                                    testo="Accedi ai dati sulle prenotazioni, controlla quante ne sono state effettuate tra 2 date e quelle odierne."
                                    contesto={params.contesto}
                                    immagine={assets.esito}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            } />
    )
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
                    <Link to="/LogIn">
                        <button className="btn btn-primary my-2 my-sm-0">Disconnetti</button>
                    </Link>
                </form>
            </nav>
            <div className="bodyPrincipale">
                {props.body}
            </div>
            <footer>Footer</footer>
        </div>
    )
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
                    <button className="btn btn-primary" style={{ "fontSize": "20px" }}>
                        {params.titolo}
                    </button>
                </Link>
            </div>
        </div>
    );
}
function Image(props) {
    return <img src={props.immagine} className="immagineCard" />;
}