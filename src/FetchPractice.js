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

        /*const response = fetch(url);
        const data= response.json();
        const dataObject = data.query.search[1];
        
        
        this.setState({
            retrievedData : dataObject,
            loading: false
        }) */

 /*       const getData = async () => {
            fetch (wikipediaEndpoint).then(response => {
                if (response.ok){
                    return response.json();
                } 
                throw new Error('Request failed!');
             },networkError => console.log(networkError.message))
             .then(jsonResponse => {
                 console.log(jsonResponse.query.search[0].snippet)
                 snippet = (jsonResponse.query.search[0].snippet)
                 console.log('Snippet is: '+snippet)
             })
        }       */

        