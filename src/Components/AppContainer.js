import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {SearchBar} from './SearchBar';
import {DisplayResults} from './DisplayResults';

export class AppContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            //Used to show placeholder JSX while fetching data from external API //
            loading: true,

            // Updated when the user updates the input form with their search query. Will be used in new call to API //
            userInput: "",

            // Adds the %20 url syntax to send accurate search term to API //
            userInputEncoded: "",

            // Working upon the JSON object returned from the API fetch - will seek the title values of the nested object //
            titleList: "",

            /* Working upon the JSON object returned from the API fetch - will seek the snippet values of the nested object. 
            This will be returned as a HTML string and needs to be parsed using the imported ReactHTMLParser */
            snippetList: ""
        }
    }

    async componentDidMount(){
        // Endpoint that queries wikipedia api (prefixed with cors to prevent errors). Returns top 10 search terms in JSON format//
        const url= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=JS%React&format=json";

     // Asynchronous JS allows for this to be immediately called when page is loaded //   
     try {
         //Runs the fetch object on the wikipdia API and waits a JSON response (data) //
        const response=await fetch(url);
        const data=await response.json();       

        //Narrows down the returned JSON into the relevant search-data objects and saves in variable */
        const dataArray = data.query.search;

        // Returned search data objects will be iterated over and pushed to these blank arrays */
        let collectedTitles = [];
        let collectedSnippets = [];
        for(let i=0;i<dataArray.length;i++){
            let title = dataArray[i]["title"];
            let snippet = dataArray[i]["snippet"]; 
            collectedTitles.push(title);
            collectedSnippets.push(snippet);
        }       
        
        // The returned data information is passed (as arrays) to the currently empty state. State of loading changed //
        this.setState({
            titleList: collectedTitles,
            snippetList: collectedSnippets,
            loading: false
        })
        //Dealing with errors returned on the API call //
    } catch (e){
        throw new Error(e)
    } 
    }

    //Method will make a new call to the API with updated search term (by user) //
    generateNewResults = () => {
        // Uses the same API as the initial call but the search term replaced with user input search term //
        const url=(this.state.userInputEncoded);

        //First setState call flashes loading indicator while API object is being fetched //
        this.setState({
            loading: true
        })

        /* Uses fetch.then syntax as the method is not asychnronous. the logic once data is returned is the same as the 
        componentDidMount initial call, finding a list of titles and snippets within the returned object and passing the 
        new arrays to the component state */
        fetch(url).then(response => {
            return response.json();
        }).then(result => {
            const dataArray = result.query.search;
        let collectedTitles = [];
        let collectedSnippets = [];
        for(let i=0;i<dataArray.length;i++){
            let title = dataArray[i]["title"];
            let snippet = dataArray[i]["snippet"]; 
            collectedTitles.push(title);
            collectedSnippets.push(snippet);
        }       
        
        //Results from API call are updated in state, loading reverts to false. User input is cleared for new search term //
        this.setState({
            titleList: collectedTitles,
            snippetList: collectedSnippets,
            loading: false,
            userInput: ""
        })
        })

    }

    //Method expects two arguments from the SearchBar component - search term and endpoint syntaxed search term//
    updateSearchTerm = (newSearch,newSearchEncoded) => {
        this.setState({
            userInput : newSearch,
            userInputEncoded : newSearchEncoded
        });
    }

    render () {
        return (
            <div>
            <SearchBar 
            userInput={this.state.userInput} 
            generateNewResults={this.generateNewResults}
            updateSearchTerm={this.updateSearchTerm} 
            />
            <DisplayResults 
            loading={this.state.loading} 
            snippetList={this.state.snippetList} 
            titleList={this.state.titleList}
            />
            </div>
        )
    }
}