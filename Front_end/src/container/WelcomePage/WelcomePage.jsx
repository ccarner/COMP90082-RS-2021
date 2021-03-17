/* welcome page
   author: jinxint@student.unimelb.edu.au
 */

import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {Container, Row, Col, Image} from "react-bootstrap";
import "./WelcomePage.css"
import Button from "react-bootstrap/Button";
import logo from "../../resources/RS-UnimelbLogo.svg"

export default class WelcomePage extends Component{

  routeChange(code) {
    this.props.history.push(`/${code}`)
  }

  render() {
      return (
        <div className="WelcomePage" >
          <div className="background-color">
            <Container>
                <div className="main">
                  <Row>
                    <Col xs lg="3">
                      <Image className="image-welcome" src={logo} rounded />
                    </Col>
                    <Col  xs lg="9">
                      <div className="content-welcome">
                        <h1>
                          Welcome
                        </h1>
                        <p>
                          This is a tool created by the Advanced Masters Software Project team.
                        </p>
                        <p>
                          We hope that this repository will be able to help you learn about important 
                          emerging technologies and along the way, hopefully you can share 
                          that knowledge with others in the University of Melbourne as well!
                        </p>
                        <Button variant="primary" size="lg" onClick={() => this.routeChange("login")}>
                          Enter
                        </Button>
                      </div>
                      
                    </Col>
                    
                  
                  </Row>
                </div>
            </Container>
          </div>
        </div>
      )
    }
    }