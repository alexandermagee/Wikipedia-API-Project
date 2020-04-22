import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export class SearchBar extends React.Component {

    //Triggers the new API call when user presses submit button //
    handleClick = () => {
        this.props.generateNewResults();
    }

    // Triggers the updateSearchTerm method on the parent component - changes the internal state to reflect user input //
    handleChange = e => {
        //Variables represent the Wikipedia API endpoint that the new userInput encoded value will be added between //
        const userWikipediaEndpointA= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";
        const userWikipediaEndpointB= "&format=json";
        let newSearch = e.target.value;
        // Adds the %20 syntax for the API call endpoint concatenates this within the full endpoint //
        let newSearchEncoded = (`${userWikipediaEndpointA}${encodeURIComponent(newSearch)}${userWikipediaEndpointB}`);
        this.props.updateSearchTerm(newSearch,newSearchEncoded);
    }

    // Triggers the new API call when pressed within input bar - same as clicking submit //
    handleKeyPress = e => {
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