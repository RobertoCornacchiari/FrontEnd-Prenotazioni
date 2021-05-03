export async function GETData(phpScriptName, variables) {
    let data = await fetch('http://localhost:63342/prenotazioni/' + phpScriptName + "?" + formatVariables(variables),
        {
            method: "GET",
        })
        .then(r => r.json());
    return data;
}

function formatVariables(variables) {
    let variablesString = "";
    for (const key in variables) {
        variablesString += key + "=" + variables[key] + "&";
    }
    return variablesString.substr(0, variablesString.length - 1);
}

