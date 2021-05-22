/* eslint-disable lines-between-class-members */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import React, { Component } from "react"
import "../../styles/main.css"
import {
  Jumbotron,
  Col,
  Row,
  Container,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap"
import "./Home.css"
import cardImage from "./images/card-image.jpg"
import request from "../../utils/request"
import AuthService from "../../utils/AuthService"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      subjects: [],
      topics: [],
      isShow: false,
      subjectTitle: "",
      subjectDscrip: "",
      subjectTags: "",
      link: "subject",
      subjectCode: "",
      isLoading: false,
    }
  }

  componentDidMount() {
    request.get(`/user/home`).then((response) => {
      if(response.data.success){
        this.setState({
        loading: false,
        subjects: response.data.user.moderated_subjects,
        subscribed_subjects: response.data.user.subscribed_subjects
      })}
      else {
        this.setState({
          loading:false
        })
      }
    }).catch((err) =>{
      console.log(err)
    })
  }

  // eslint-disable-next-line react/sort-comp
  clickedSubject(code) {
    this.props.history.push(`/subject/${code}`)
  }

  postSubjectInfo = () => {
    this.setState({
      isLoading: true,
    })
    const params = {
      name: this.state.subjectTitle,
      description: this.state.subjectDscrip,
      subject_code: this.state.subjectCode,
    }
    // Pass the subject_title to subject page
    request
      .post("/subject/add", params)
      .then((response) => {
        this.setState({
          isShow: false,
          isLoading: false,
        })
        this.props.history.push(`/subject/${params.subject_code}`)
      })
      .catch((error) => {
        alert('Fail to publish.Please try later');
        this.setState({
          isLoading: false,
        })
      })
  }
  
  showModal = () => {
    this.setState({
      isShow: true,
    })
  }
  closeModal = () => {
    this.setState({
      isShow: false,
    })
  }
  getSubjectTitle = (evt) => {
    this.setState({
      subjectTitle: evt.target.value,
    })
  }
  getSubjectDscrip = (evt) => {
    this.setState({
      subjectDscrip: evt.target.value,
    })
  }

  getSubjectCode = (evt) => {
    this.setState({
      subjectCode: evt.target.value,
    })
  }

  TopicSection() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.loading) {
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
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.topics.length > 0) {
      return (
        <Row className="card-section">
          {this.state.topics.map((topic) => (
            <Col key={topic.id} xs={6} md={4} className="card-sub">
              <Card className="subject-card" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={cardImage} />
                <Card.Body>
                  <Card.Title>{topic.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )
    }

    return (
      <Row>
        <Col className="text-center unsubcribes-message">
          <h5>You have not subscribed to any topic</h5>
        </Col>
      </Row>
    )
  }

  // if true, admin can add subjects; if false, users can subscribe subjects
  addSubjectButton() {
    if(AuthService.userIsModerator()){
      return (
        <Button
          className="padding-articles-button"
          variant="outline-primary"
          onClick={this.showModal}
        >
          Add Subject
        </Button>
      )
    } else {
      return (
        <Button
          className="padding-articles-button"
          variant="outline-primary"
          onClick={this.showModal}
        >
          Subscribe Subject
        </Button>
      )
    }
  }

  SubjectDescriptionSect = () =>{
    if(AuthService.userIsModerator()){
      return(
        <Row>
          <Col sm={9}>
            <h2>Subjects you have as a moderator</h2>
          </Col>
          <Col sm={3}>
            {this.addSubjectButton()}
          </Col>
        </Row>
      )
    } else {
      return (
        <Row>
          <Col sm={9}>
            <h2>Subjects you have subscribed to</h2>
          </Col>
          <Col sm={3}>
            {this.addSubjectButton()}
          </Col>
        </Row>
      )
    }
  }

  SubjectSection = () => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.loading) {
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

    if(AuthService.userIsModerator()){
    // eslint-disable-next-line react/destructuring-assignment
      if (this.state.subjects&&this.state.subjects.length > 0) {
        return (
          <Row className="card-section">
            {this.state.subjects.map((subject) => (
              <Col key={subject.id} xs={6} md={4} className="card-sub">
                <Card
                  className="subject-card"
                  style={{ width: "18rem" }}
                  onClick={() => this.clickedSubject(subject.subject_code)}
                >
                  <Card.Img variant="top" src={cardImage} />
                  <Card.Body>
                    <Card.Title>{subject.subject_code}</Card.Title>
                    <Card.Text>{subject.name}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )
      }
    } else {
      if (this.state.subscribed_subjects&&this.state.subscribed_subjects.length > 0) {
        return (
          <Row className="card-section">
            {this.state.subscribed_subjects.map((subject) => (
              <Col key={subject.id} xs={6} md={4} className="card-sub">
                <Card
                  className="subject-card"
                  style={{ width: "18rem" }}
                  onClick={() => this.clickedSubject(subject.subject_code)}
                >
                  <Card.Img variant="top" src={cardImage} />
                  <Card.Body>
                    <Card.Title>{subject.subject_code}</Card.Title>
                    <Card.Text>{subject.name}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )
      }
    }

    return (
      <Row>
        <Col className="text-center unsubcribes-message">
          <h5>You have not subscribed to any subject</h5>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <div>
        {this.state.isShow && AuthService.userIsModerator() ? (
          // if condition is true, admin can create subjects using the code below
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
              <Modal.Title>Create New Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Subject Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter the subject code"
                  onChange={this.getSubjectCode}
                />
                <Form.Label>Subject Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter the subject title"
                  onChange={this.getSubjectTitle}
                  style={{ marginTop: "5px" }}
                />
                <Form.Label style={{ marginTop: "5px" }}>
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  placeholder="Please write a brief description"
                  onChange={this.getSubjectDscrip}
                  style={{ marginTop: "5px" }}
                />
                {/* <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please write some keywords"
                  onChange={this.getSubjectTags}
                /> */}
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
                onClick={!this.state.isLoading ? this.postSubjectInfo : null}
              >
                {this.state.isLoading ? "Publishing..." : "Publish"}
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          // if condition is false, users can subscribe subjects using code below
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
              <Modal.Title>Subscribe Subject</Modal.Title>
            </Modal.Header>

            <Modal.Body>

            </Modal.Body>

            <Modal.Footer>

            </Modal.Footer>
          
          </Modal>
          //null
        )}
        <Jumbotron fluid>
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <h1>Welcome to the home page!</h1>
                <p>
                  Here, you will see all the subjects that you are enrolled in
                  and topics you are subscribed to.
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <section className="main-section">
          <Container>
            {this.SubjectDescriptionSect()}
            <hr />
            {this.SubjectSection()}
          </Container>
        </section>
        <section className="main-section">
          <Container>
            <Row>
              <h2>Topics you have subscribed to</h2>
            </Row>
            <hr />
            {this.TopicSection()}
          </Container>
        </section>
      </div>
    )
  }
}

export default Home
