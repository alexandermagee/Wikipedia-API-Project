import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

let snippet = "loading"
const wikipediaEndpoint= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Craig%20Cash&format=json";


    const getData = async () => {
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
    }



export class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            retrievedData: null
        }
    }

    async componentDidMount(){
        const url=wikipediaEndpoint;
        const response=await fetch(url);
        const data=await response.json();
        const dataObject = data.query.search[1];
        this.setState({
            retrievedData: dataObject,
            loading: false
        })
        console.log(this.state.retrievedData)
        console.log(this.state.retrievedData.title)
    }

    render () {
        return (
            <div>
            <input type="text"></input>
            {this.state.loading ? <p>currently Loading</p> : 
            <div>
            <p>not loading</p>
            <p>{this.state.retrievedData.title}</p>
            <div>...{ ReactHtmlParser(this.state.retrievedData.snippet)}...</div>
            </div>
            }
            </div>
        )
    }
}