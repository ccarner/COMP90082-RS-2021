import React, { Component } from 'react';
import {Button } from 'react-bootstrap';

class Bookmark extends Component{
    constructor(props){
        super(props);
        this.state = {
            isBookmarked: false
        }
    }    
        
    isBookmarkedChange = () => {
        this.setState({
            isBookmarked: !this.state.isBookmarked
        })
    }
        
    render(){
        const { isBookmarked } = this.state;
        const innerText = isBookmarked ? 'Bookmarked' : 'Bookmark';
        return(
            <Button 
                className="edit-button" 
                onClick={this.isBookmarkedChange}
                variant="secondary"
            >
                <span>{innerText}</span>
            </Button>
            )
        }
    }

export default Bookmark;