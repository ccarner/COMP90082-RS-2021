import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import React, { Component } from 'react';
import '../../styles/main.css';
import { Modal, Form, Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import request from "../../utils/request"

class AddUser extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      students: null,
      isShow: false,
      newUsername: "",
      newPassword: "",
      newName: "",
      newType: "",
      newID: "",
      is_moderator: false,
      isLoading: false
    }
  }
  
  componentDidMount() {

    request.get('/user/allUsers').then((response) => {
      
      var result = Object.keys(response.data).map((key) => response.data[key]);
      console.log(result)
      this.setState({
        students: result,
        loading: false
      })
    })
    
  }

  postUser = () => {
    this.setState({
      isLoading: true,
    })
    const params = {
      account: this.state.newUsername,
      password: this.state.newPassword,
      name: this.state.newName,
      student_number: this.state.newID,
      is_moderator: this.state.is_moderator
    }
   
    request
      .post("/user/add", params)
      .then((response) => {
        
        this.setState({
          isShow: false,
          isLoading: false,
          students: [...this.state.students, response.data.user]
        })
        console.log(response)
      })
      .catch((error) => {
        alert('Fail to create new user. Please try later');
        this.setState({
          isLoading: false,
        })
      })
  }

  showModal = () => {
    // console.log(r)
    this.setState({
      isShow: true,
    })
  }
  closeModal = () => {
    this.setState({
      isShow: false,
    })
  }

  setUsername = (evt) => {
    this.setState({
      newUsername: evt.target.value,
    })
  }
  setPassword = (evt) => {
    this.setState({
      newPassword: evt.target.value,
    })
  }

  setName = (evt) => {
    this.setState({
      newName: evt.target.value,
    })
  }

  setType = (evt) => {
    this.setState({
      newType: evt.target.value,
    })
  }

  setId = (evt) => {
    this.setState({
      newID: evt.target.value,
    })
  }

  UserModel = () => {
    return (
      <div>
        {this.state.isShow ? (
        <Modal
          size="lg"
          show={this.state.isShow}
          onHide={this.closeModal}
          centered
          dialogClassName="modal-90w"
        >
          <Modal.Header
            style={{ backgroundColor: "#0e4381", color: "white" }}
          >
            <Modal.Title>Create New User</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter the username"
                  onChange={this.setUsername}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password" 
                  placeholder="Please enter the password"
                  onChange={this.setPassword}
                  style={{ marginTop: "5px" }}
                />
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter the name"
                  onChange={this.setName}
                  style={{ marginTop: "5px" }}
                />
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter the ID"
                  onChange={this.setId}
                  style={{ marginTop: "5px" }}
                />
                <Form.Label>Type</Form.Label>
                <Form.Control setType size="sm" as="select">
                  <option value="true">Moderator</option>
                  <option value="false">Student</option>
                </Form.Control>
                
              </Form.Group>
            </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={this.closeModal}
            >
              Close
            </Button>
            <Button
              variant="primary"
              disabled={this.state.isLoading}
              onClick={!this.state.isLoading ? this.postUser : null}
            >
              {this.state.isLoading ? "Adding..." : "Add"}
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </div>
      
    )
  }

  render() {
    if (this.state.loading ) {
      return (
        <Row>
          <Col className="text-center unsubcribes-message">
            <h5>
              <FontAwesomeIcon icon={faSpinner} />
            </h5>
          </Col>
        </Row>
      )
    }
    return (
      <div className="subject-section">
        <Container>
          {this.UserModel()}
          <Row>
            <h1>User Management</h1>
          </Row>
          <hr />

          <section className="Subj">
            <Row>
              <Card>
                <Card.Header as="h5">
                  <Button 
                    onClick={this.showModal} 
                    variant="outline-primary"
                  >
                    Add New User
                  </Button>
                </Card.Header>
                <Card.Body>

                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Account</th>
                        <th>Moderator</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.students.map(student => (
                        <tr>
                          <td>{student.name}</td>
                          <td>{student.account}</td>
                          <td>{student.is_moderator.toString()}</td>
                        </tr>
                      ))}
                    </tbody>
                   
                  </Table>
                </Card.Body>
              </Card>
            </Row>
          </section>
        </Container>
      </div>
    );
  }

}

export default AddUser;