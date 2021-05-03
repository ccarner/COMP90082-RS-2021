import React, { Component } from 'react';
import {Button } from 'react-bootstrap';

class LikeButton extends Component {
    constructor(props){
      super(props);
      this.state = {
        isLiked: true
      }
    }  

    isLikedChange = () => {
      this.setState({
          isLiked: !this.state.isLiked
      })
    }

    render(){
      const { isLiked } = this.state;
      const innerText = isLiked ? 'Like' : 'Unlike';
      return(
          <Button 
              className="edit-button" 
              onClick={this.isLikedChange}
              variant="danger"
          >
              <span>{innerText}</span>
          </Button>
          )
      }
  }


export default LikeButton;