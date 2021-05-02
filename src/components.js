import React from "react";
import "./style.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export function HomePage() {

    return (
        <div className="pagina">
            <header>
                Applicazione tamponi
            </header>
            <div className="corpo">
                <div class="container">
                    <div class="row row-cols-3">
                        <div class="col">
                            <Card nome="prenota" titolo="Prenota" testo="Esegui la tua prenotazione"/>
                        </div>
                        <div class="col">
                            <Card nome="controlla" titolo="Controlla" />
                        </div>
                        <div class="col">
                            <Card nome="esito" titolo="Esito"/>
                            
                        </div>
                    </div>
                </div>
                {/*<Link to="/areaRiservata"><Card nome="areaRiservata"/></Link>*/}
            </div>
            <footer>
                Footer
            </footer>
        </div>
    )
}



function Card(props) {
    let link =  "/" + props.nome;
    return (
        <div class="card">
            <h5 class="card-header">{props.titolo}</h5>
            <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">{props.testo}</p>
                <Link to={link}><a class="btn btn-primary">{props.titolo}</a></Link>
            </div>
        </div>
    )
}

export function Prenota() {
    return (
        <div className="pagina">

        </div>
    )
}
export function Controlla() {
    return (
        <div className="pagina">

        </div>
    )
}
export function Esito() {
    return (
        <div className="pagina">

        </div>
    )
}
export function AreaRiservata() {
    return (
        <div className="pagina">

        </div>
    )
}