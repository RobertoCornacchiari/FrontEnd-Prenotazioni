import React, { useReducer, useContext, useEffect, useState } from "react";
import "./style.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export function HomeButton(props) {
    let style = props.style;
    return (
        <Link to="/">
            <button className="btn btn-primary" style={style}>
                Torna alla Home
            </button>
        </Link>
    )
}

export function HomeButtonAdmin(props) {
    let style = props.style;
    return (
        <Link to="/schermataAmministratore">
            <button className="btn btn-primary" style={style}>
                Torna alla Home
            </button>
        </Link>
    )
}