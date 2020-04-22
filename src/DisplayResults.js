import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export class DisplayResults extends React.Component {

    render () {
        return (
            this.props.loading ? <p>Currently loading...</p> : 
                <div>
                <p>Top Wikipedia Results:</p>
                <ol>
                  {this.props.titleList.map((title,i) => {
                      let desc = this.props.snippetList[i];
                      let hyperlink = (`https://en.wikipedia.org/wiki/${title.split(" ").join("_")}`);
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
        )
    }
}