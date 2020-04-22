import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

let snippet = "loading"
const wikipediaEndpoint= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Craig%20Cash&format=json";
const newEndpoint= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts";
const userWikipediaEndpointA= "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";
const userWikipediaEndpointB= "&format=json";


export class SearchBar2 extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            retrievedData: null,
            retrievedDataArray: "",
            userInput: "",
            userInputEncoded: "",
            titleList: "",
            snippetList: ""
        }
    }

    async componentDidMount(){
        const url=wikipediaEndpoint;

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
            <input type="text" value={this.state.userInput} onChange={this.handleChange} placeholder="Enter here..."></input>
            <button onClick={this.handleClick}>Submit</button>
            {this.state.loading ? <p>Currently loading...</p> : 
            <div>
            <p>Top Wikipedia Results:</p>
            <ol>
              {this.state.titleList.map((title,i) => {
                  let desc = this.state.snippetList[i];
                  let hyperlink = (`https://en.wikipedia.org/wiki/${title.split(" ").join("_")}`)
                  return (
                  <div>
                    <a href={hyperlink} target="_blank">
                        <li key={i}>
                        <strong>{title}</strong>
                        </li>
                    </a>
                  <span>...{ReactHtmlParser(desc)}...</span>
                  </div>
                  )
              })}  
            </ol>

            </div>
            }
            </div>
        )
    }
}