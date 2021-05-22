import React, { Component } from "react"
import AuthService from "../utils/AuthService"
import "../styles/main.css"
import {
  Button,
  Navbar,
  Nav,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import logo from "../resources/RS-UnimelbLogo.svg"
import {
  Link,
} from 'react-router-dom'

// eslint-disable-next-line react/prefer-stateless-function
class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchContent: "",
    }
  }

  getSearchContent = (event) => {
    this.setState({
      searchContent: event.target.value
    })
  }

  linkToSearch() {
    if (!this.state.searchContent) {
      console.log("pressed search")
      this.props.history.push(`/search`)
    }else{
      const url = `/search?query=${this.state.searchContent}&type=all`
      this.props.history.push(url)
    }
  }

  clickLogout() {
    AuthService.logout()
    this.props.history.push(`/login`)
  }
  

  clickedHome() {
    this.props.history.push(`/home`)
  }

  /** Add function to redirect to FAQ page*/
  clickedFAQ() {
    this.props.history.push(`/faq`)
  }

  clickedUserPage() {
    this.props.history.push(`/userPage`)
  }

  userManagement(){
    
    if(AuthService.userIsAdmin()){
      return (
        <Nav.Link onClick={() => this.clickedUserPage()}>
          <div className="navbar-home">User Management</div>
        </Nav.Link>
      )

    } else {
      return
    }
  }
  
  ClickedStudentProfilePage() {
    this.props.history.push(`/studentprofile`)
  }

  ClickedModeratorProfilePage() {
    this.props.history.push(`/moderatorprofile`)
  }

  renderPending(){
    console.log("testing print" + (window.location.href.split("/")[3]))
    if(window.location.href.split("/")[3] === "subject"){

      return (<Link to={{pathname: `/pendingpage/${window.location.href.substring(window.location.href.lastIndexOf('/')+1)}`}}>
      <Button 
        variant="primary"
      >
        Pending Submissions
      </Button>
  </Link>)

    } else {
      return
    }
  }

  adminNav() {
    return(
      <Navbar collapseOnSelect className="nav-bar" variant="dark" expand="lg">
        <Navbar.Brand href="#home" className="navbar-logo">
          <a href="https://unimelb.edu.au/">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              src={logo}
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/** enable link in nav bar to redirect to home page*/}
            <Nav.Link onClick={() => this.clickedHome()}>
              <div className="navbar-home">Home</div>
            </Nav.Link>

            {/** enable link in nav bar to redirect to user management page*/}
            {this.userManagement()}

            {/** enable link in nav bar to redirect to FAQ*/}
            <Nav.Link 
              onClick={() => this.clickedFAQ()} 
              style={{marginRight: "20px"}}
            >
              <div className="navbar-home">FAQ</div>
            </Nav.Link>

            {/* show pending submission button */}
            {this.renderPending()}          
          </Nav>
          <Form inline className="nav-search">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={this.getSearchContent}
            />
            <Button
              variant="primary"
              style={{
                marginRight: "10px", 
                width: "3.5rem"
              }}
            >
              <FontAwesomeIcon
                icon={faSearch}
                id="input"
                onClick={() => this.linkToSearch()}
              />
            </Button>
          </Form>
          <Dropdown 
            alignRight 
            className="nav-drop-down-button"
          >
            <Dropdown.Toggle 
              variant="success" 
              id="dropdown-basic"
              style={{ width:"3.5rem"}}
            >
              <FontAwesomeIcon icon={faUserCircle} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.ClickedModeratorProfilePage()}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => this.clickLogout()}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  studentNav() {
    return (
      <Navbar collapseOnSelect className="nav-bar" variant="dark" expand="lg">
        <Navbar.Brand href="#home" className="navbar-logo">
          <a href="https://unimelb.edu.au/">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              src={logo}
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/** enable link in nav bar to redirect to home page*/}
            <Nav.Link onClick={() => this.clickedHome()}>
              <div className="navbar-home">Home</div>
            </Nav.Link>

            {/** enable link in nav bar to redirect to FAQ*/}
            <Nav.Link onClick={() => this.clickedFAQ()}>
              <div className="navbar-home">FAQ</div>
            </Nav.Link>
          </Nav>
          <Form inline className="nav-search">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button 
              variant="primary"
            >
              <FontAwesomeIcon
                icon={faSearch}
                id="input"
                onClick={() => this.linkToSearch()}
              />
            </Button>
          </Form>
          <Dropdown alignRight className="nav-drop-down-button">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FontAwesomeIcon icon={faUserCircle} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.ClickedStudentProfilePage()}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => this.clickLogout()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    )
    
  }

  render() {

    console.log(AuthService.userIsModerator())
    if(AuthService.userIsModerator()){
      return this.adminNav()
    } else {
      return this.studentNav()
    }    
  }
}

export default NavBar
