import React, { Component } from 'react';
import {Button } from 'react-bootstrap';

class Bookmark extends Component{
    constructor(props){
        super(props);
        this.state = {
            isBookmarked: false,
            color: "grey"
        }
    }    
        
    isBookmarkedChange = () => {
        this.setState({
            isBookmarked: !this.state.isBookmarked,
            color: "#1185ba"
        })
    }
        
    render(){
        const { isBookmarked } = this.state;
        const innerText = isBookmarked ? 'Bookmarked' : 'Bookmark';
        const color = isBookmarked ? '#1185ba' : 'grey';
        return(
            <Button 
                className="edit-button" 
                onClick={this.isBookmarkedChange}
                variant="secondary"
                style={{ 
                    background: color,
                    width:"7rem",
                    fontWeight:"bold"
                  }}
            >
                <span>{innerText}</span>
            </Button>
            )
        }
    }

export default Bookmark;