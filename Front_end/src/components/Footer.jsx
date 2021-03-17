import React, { Component } from "react"
import "../styles/main.css"
import {
    Container,
} from "react-bootstrap"

// eslint-disable-next-line react/prefer-stateless-function
class Footer extends Component {

  render() {
    return (
        <footer id="sticky-footer" className="page-footer">
            <Container>
            <div className="footer-copyright text-center py-3">
                © 2020 Copyright:
                <a href="https://unimelb.edu.au/"> RS TEAM</a>
            </div>
            </Container>
        </footer>
    )
  }
}

export default Footer
