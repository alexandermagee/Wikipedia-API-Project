import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export class DisplayResults extends React.Component {

    render () {
        return (
            // Ternary conditional will show either results or a loading indicator based on status of API call //
            this.props.loading ? <p>Currently loading...</p> : 
                <div>
                <p>Top Wikipedia Results:</p>
                <ol>
                    {/* Title List array is mapped and each element returned as a JSX <li> within an ordered list */}
                  {this.props.titleList.map((title,i) => {

                      //With each map the i parameter increases, used to access the same index within the snippet array //
                      let desc = this.props.snippetList[i];

                      // This generates a URL within the standard wikipedia format to attach a hyperlink to all results
                      let hyperlink = (`https://en.wikipedia.org/wiki/${title.split(" ").join("_")}`);
                      return (
                      <div>
                        <a href={hyperlink} target="_blank">
                            <li key={i}>
                            <strong>{title}</strong>
                            </li>
                        </a>
                      {/* Uses the imported module that parses the html string into JSX to be rendered by the browser */}  
                      <span>...{ReactHtmlParser(desc)}...</span>
                      </div>
                      )
                  })}  
                </ol>
    
                </div>
        )
    }
}