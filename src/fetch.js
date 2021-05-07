module.exports = {
    GETData,
    postData
}

async function GETData(phpScriptName, variables) {
    let url = 'http://localhost/prenotazioni/' + phpScriptName + "?" + formatVariables(variables);
    console.log(url);
    let data = await fetch(url,
        {
            method: "GET",
            mode:"cors",
        })
        .then(r => r.json());
    return data;
}

async function postData(phpScriptName, data ) {
    let url = 'http://localhost:63342/prenotazioni/' + phpScriptName;
    console.log(url);
    console.log(JSON.stringify(data));
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
        
    });
    return response.json();
}

function formatVariables(variables) {
    let variablesString = "";
    for (const key in variables) {
        variablesString += key + "=" + variables[key] + "&";
    }
    return variablesString.substr(0, variablesString.length - 1);
}

