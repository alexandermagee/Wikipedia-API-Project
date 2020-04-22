import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

let snippet = "loading"
const wikipediaEndpoint= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Craig%20Cash&format=json";
const newEndpoint= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts";
const userWikipediaEndpointA= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";
const userWikipediaEndpointB= "&format=json";


export class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            retrievedData: null,
            userInput: "",
            userInputEncoded: ""
        }
    }

    async componentDidMount(){
        const url=wikipediaEndpoint;

      /*  try {
            const response=await fetch(newEndpoint);
            const data=await response.json();
            console.log(data);
        } catch(e) {
            throw new Error(e)
        } */

      try {
        const response=await fetch(url);
        const data=await response.json();
        const dataObject = data.query.search[0];
        console.log(dataObject);
        this.setState({
            retrievedData: dataObject,
            loading: false
        })
    } catch (e){
        throw new Error(e)
    } 
    }

     handleClick = () => {
        console.log(this.state.userInputEncoded);
        const url=(this.state.userInputEncoded);

        let awaitedResult;
        this.setState({
            loading: true
        })
        fetch(url).then(response => {
            return response.json();
        }).then(result => {
            awaitedResult = result.query.search[0];
            this.setState({
            retrievedData: awaitedResult,
            loading: false
        })
        })

    }




    handleChange = e => {
        const newValue = e.target.value;
        const newValueEncoded = (`${userWikipediaEndpointA}${encodeURIComponent(newValue)}${userWikipediaEndpointB}`)
        this.setState({
            userInput : newValue,
            userInputEncoded : newValueEncoded
        });
    }

    render () {
        return (
            <div>
            <input type="text" value={this.state.userInput} onChange={this.handleChange}></input>
            <button onClick={this.handleClick}>Submit</button>
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