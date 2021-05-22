import React, { Component } from 'react';
import {Button } from 'react-bootstrap';

class LikeButton extends Component {
    constructor(props){
      super(props);
      this.state = {
        isLiked: true,
        color: "grey"
      }
    }  

    isLikedChange = () => {
      this.setState({
          isLiked: !this.state.isLiked,
          color: "#d14521"
      })
    }

    render(){
      const { isLiked } = this.state;
      const innerText = isLiked ? 'Like' : 'Liked';
      const color = isLiked ? 'grey' : "#d14521";
      return(
          <Button 
              className="edit-button" 
              onClick={this.isLikedChange}
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


export default LikeButton;