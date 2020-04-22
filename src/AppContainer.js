import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {SearchBar3} from './SearchBar3';
import {DisplayResults} from './DisplayResults';

export class AppContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            userInput: "",
            userInputEncoded: "",
            titleList: "",
            snippetList: ""
        }
    }

    async componentDidMount(){
        const url= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=JS%React&format=json";

     try {
        const response=await fetch(url);
        const data=await response.json();       

        const dataArray = data.query.search;
        let collectedTitles = [];
        let collectedSnippets = [];
        for(let i=0;i<dataArray.length;i++){
            let title = dataArray[i]["title"];
            let snippet = dataArray[i]["snippet"]; 
            collectedTitles.push(title);
            collectedSnippets.push(snippet);
        }       
        
        this.setState({
            titleList: collectedTitles,
            snippetList: collectedSnippets,
            loading: false
        })
    } catch (e){
        throw new Error(e)
    } 
    }

    generateNewResults = () => {
        const url=(this.state.userInputEncoded);

        this.setState({
            loading: true
        })
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
        
        this.setState({
            titleList: collectedTitles,
            snippetList: collectedSnippets,
            loading: false,
            userInput: ""
        })
        })

    }

    handleKeyPress = e => {
        if (e.key === "Enter"){
            this.handleClick()
        }
    }

    updateSearchTerm = (newSearch,newSearchEncoded) => {
        this.setState({
            userInput : newSearch,
            userInputEncoded : newSearchEncoded
        });
    }

    render () {
        return (
            <div>
            <SearchBar3 userInput={this.state.userInput} 
            generateNewResults={this.generateNewResults}
            updateSearchTerm={this.updateSearchTerm} 
            />
            <DisplayResults loading={this.state.loading} 
            snippetList={this.state.snippetList} 
            titleList={this.state.titleList}
            />
            </div>
        )
    }
}