import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const userWikipediaEndpointA= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";
const userWikipediaEndpointB= "&format=json";

export class SearchBar3 extends React.Component {

    handleClick = () => {
        this.props.generateNewResults();
    }

    handleChange = e => {
        let newSearch = e.target.value;
        let newSearchEncoded = (`${userWikipediaEndpointA}${encodeURIComponent(newSearch)}${userWikipediaEndpointB}`);
        this.props.updateSearchTerm(newSearch,newSearchEncoded);
    }

    handleKeyPress = e => {
        /* let newSearch = e.target.value;
        let newSearchEncoded = (`${userWikipediaEndpointA}${encodeURIComponent(newSearch)}${userWikipediaEndpointB}`);
        this.props.updateSearchTerm(newSearch,newSearchEncoded); */
        if (e.key === "Enter"){
            this.props.generateNewResults()
        }
    }

    render () {
        return (
            <div>
                <input type="text" value={this.props.userInput} onChange={this.handleChange} onKeyPress={this.handleKeyPress} placeholder="Enter here..."></input>
                <button onClick={this.handleClick}>Submit</button>
            </div>
        )
    }
}