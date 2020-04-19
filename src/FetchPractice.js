/*
const getData = async () => {
    try {
        const response = await fetch (wikipediaEndpoint, {
            method: 'POST',
            body: JSON.stringify({id: '200'})
        });
        if(response.ok){
            const jsonResponse = await response.json();
            console.log(jsonResponse)
            console.log(jsonResponse.query)
        }
        /*throw new Error('Request Failed!'); */
    /*} catch(error){
        console.log(error)
    }
    } */

    /*const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = wikipediaEndpoint; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response)
    .then(contents => console.log(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
} */