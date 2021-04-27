import React, { Component } from 'react';
import {Button } from 'react-bootstrap';

class LikeButton extends React.Component {
    state = {
        likes: 0
    };

    addLike = () => {
        let newCount = this.state.likes + 1;
          this.setState({
          likes: newCount
        });
      };

    render() {
        
          return (
            <Button 
                onClick={this.addLike}
                className="edit-button"
                variant="danger" 
            >
              Likes: {this.state.likes}
            </Button>)
      }
    }

export default LikeButton;