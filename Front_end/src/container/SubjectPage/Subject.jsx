import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import React, { Component } from 'react';
import '../../styles/main.css';
import { Jumbotron, Col, Row, Container, Card, Button, Modal, Form } from 'react-bootstrap';
import './Subject.css'
import cardImage from './images/logo512.png'
import request from "../../utils/request"
import AuthService from "../../utils/AuthService"


import {
  useParams
} from "react-router-dom";

class Subject extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      loadingArticle: true,
      subject: null,
      articles: null,
      isShow: false,
      isPostLoading: false,
      isShowEditDescription: false,
      isSubscribed: false
    }
  }
  
  componentDidMount() {
    request.get(`/subject/`+this.props.match.params.code).then((response) => {
      
      this.setState({
        subject: response.data.subject,
        // Save value for editing modal
        subjectDescription: response.data.subject.description,
        subjectCodeModal: response.data.subject.subject_code,
        subjectNameModal: response.data.subject.name,
        isSubscribed: response.data.is_subscribed,
        loading: false
      })
    })

    request.get('/article/getNamesOfArticles/'+this.props.match.params.code).then((response) => {
      this.setState({
        articles: response.data.articles,
        loadingArticle: false
      })
    })
    
  }

  getSubject(){
    let { code } = useParams();
    console.log({code})
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

  showEditSubModal = () => {
    this.setState({
      isShowEditDescription: true
    })
  }

  closeEditSubModal = () => {
    this.setState({
      isShowEditDescription: false
    })
  }

  getArticleTitle = (evt) => {
    this.setState({
      subjectTitle: evt.target.value,
    })
  }

  getEditSubj = (evt) => {
    this.setState({
      subjectDescription: evt.target.value
    })
  }

  getSubjectTitle = (evt) => {
    this.setState({
      subjectNameModal: evt.target.value,
    })
  }

  getSubjectCode = (evt) => {
    this.setState({
      subjectCodeModal: evt.target.value,
    })
  }

  clickedAddNewArticle = () => {
    this.setState({
      isPostLoading: true
    })
    this.props.history.push({
      pathname: "/createarticle",
      state: {
        title: this.state.subjectTitle,
        content: "",
        tags: [this.props.match.params.code],
        subject: [this.state.subjectCodeModal]
      }
    })
  }

  clickedSubscribe = () => {
    const params = {
      subjbect_id: this.state.subject._id,
      subject_code: this.state.subject.subject_code
    }
    request
      .patch("/user/subscribe", params)
      .then((response) => {
        if (response.data.success){
          this.setState({
            isSubscribed: true
          })
        } 
      })
  }

  clickedUpdateSubject = () => {

    this.setState({
      isPostLoading: true
    })
    const params = {
      _id: this.state.subject._id,
      description: this.state.subjectDescription,
      subject_code: this.state.subjectCodeModal,
      name: this.state.subjectNameModal
    }
    // Pass the subject_title to subject page
    request
      .patch("/subject/patch", params)
      .then((response) => {
        let newSubject = this.state.subject
        newSubject.description = this.state.subjectDescription
        newSubject.name = this.state.subjectNameModal
        newSubject.subject_code = this.state.subjectCodeModal
        this.setState({
          subject: newSubject
        })
        this.closeEditSubModal()
      })
      .catch((error) => {
        alert('Fail to publish.Please try later');
        this.setState({
          isPostLoading: false,
        })
      })
  }

  clickedArticle(article) {
    //this function should look up the subject code in the backend and redirect the user to the correct page
    this.props.history.push(`/article/${article.id}`)
  }

  clickedSubscribe(code) {
    //this function should subscribe the user to the topic
    alert("you clicked on subscribe for " + code)
  }

  // eslint-disable-next-line react/sort-comp
  clickedEditLayout(code) {
    this.props.history.push(`/subject/${this.state.subject.subject_code}/editLayout`)
  }

  // edit description of a subject 
  editSubjectModal() {
    return (
      <div>
        {this.state.isShowEditDescription ? (
          <Modal
            size="lg"
            show={this.state.isShowEditDescription}
            onHide={this.closeModal}
            centered
            dialogClassName="modal-90w"
          >
            <Modal.Header
              style={{ backgroundColor: "#0e4381", color: "white" }}
            >
            <Modal.Title>Update Description</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Subject Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter the subject code"
                  onChange={this.getSubjectCode}
                  value={this.state.subjectCodeModal}
                />
                <Form.Label>Subject Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter the subject title"
                  onChange={this.getSubjectTitle}
                  style={{ marginTop: "5px" }}
                  value={this.state.subjectNameModal}
                />    
                <Form.Label>Subject Description</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows="3"
                  value={this.state.subjectDescription}
                  onChange={this.getEditSubj} 
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={this.closeEditSubModal}
              >
                Close
              </Button>

              <Button
                variant="primary"
                disabled={this.state.isLoading}
                onClick={!this.state.isLoading ? this.clickedUpdateSubject : null}
              >
                {this.state.isLoading ? "Publishing..." : "Publish"}
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </div>
    )
  }

  // add article title
  createArticleModel() {
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
              <Modal.Title>Create New Article</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                {/* add article title */}
                <Form.Label>Article Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter the article title"
                  onChange={this.getArticleTitle}
                  style={{ marginTop: "5px" }}
                />
              
                {/* Commented by the previous team
                    Maybe useful in the future so not delete */}
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
                onClick={!this.state.isLoading ? this.clickedAddNewArticle : null}
              >
                {this.state.isLoading ? "Creating..." : "Create"}
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}  
      </div>
      
    )
  }

  toolSection = (section) => {
    if(section.tools.length === 0){
      return (
        <div className="subject-section">
          <Row>
            <Col md={11}>
              <h1>{section.name}</h1>
            </Col>
            <Col md={1}>
              <Button variant="outline-secondary">
                  Edit
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="text-center unsubcribes-message">
              <h5>
                Moderator has not create tools yet.
              </h5>
            </Col>
          </Row>
        </div>
      )
    }
      return (
        <div className="subject-section">
          <Row>
            <Col md={11}>
              <h1>{section.description}</h1>
            </Col>
            <Col md={1}>
              <Button 
                onClick={() => this.clickedAddNewArticle()} 
                variant="outline-secondary" 
              >
                Edit
              </Button>
            </Col>
          </Row>
          <hr />
          <Row className="topic-card-section">
            {section.tools.map(tool => (
              <Col key={tool.id} md={3} className="card-sub">
                <Card onClick={() => this.clickedTopic(tool.title)}>
                  <Card.Img variant="top" src={cardImage} />
                  <Card.Body>
                    <Card.Title>{tool.title}
                    <Button 
                      className="card-subject-button"
                      variant="primary" 
                      onClick = {(e) => {e.stopPropagation(); this.clickedSubscribe(tool.title)}}
                    >
                      Subscribe
                    </Button>
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">Suggested by {tool.suggested}</small> 
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
    )
  }

  articleSection = () => {
    if(this.state.articles.length === 0){
      return (
        <div className="subject-section">
          <Row>
            <Col md={10}>
              <h2>Helpful articles relating to this subject</h2>
            </Col>
            <Col md={2}>
              <Button 
                onClick={() => this.showModal()} 
                variant="outline-primary adding-artical-button" 
              >
                Add Article
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="text-center unsubcribes-message">
              <h5>
                Moderator has not add articles yet.
              </h5>
            </Col>
          </Row>
        </div>
      )
    }

    return(
      <div className="subject-section">
        <Row>
          <Col md={10}>
            <h2>Helpful articles relating to this subject</h2>
          </Col>
          <Col md={2}>
            <Button 
              onClick={() => this.showModal()} 
              variant="outline-primary adding-artical-button"
            >
              Add Article
            </Button>
          </Col>
        </Row>
        <hr />
        {this.state.articles.map(article => (
          <Card key={article.id} className="card-article-section" onClick={() => this.clickedArticle(article)}>
            <Card.Body>
              <Card.Text>
                <h4>
                  {article.name}
                </h4>
                
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    )
  }
  subjectSection = (section) => {

    if(section.type === "tools"){
      return this.toolSection(section)
    }

  }

  emptySection = (sections) => {
      return(
        <div>
          {
            sections.map(section => ( 
              this.subjectSection(section)
            ))
          }
        </div>
      )
  }

  editButton = () => {
    if(AuthService.userIsModerator()){
      return (
        // allign "Edit Description" and "Edit Section" buttons
        <Container>
          <Row>
            <Col md="auto">
            <Button 
              variant="primary" 
              onClick={() => this.showEditSubModal()}
              size="sm"
            >
              Edit Description
            </Button>
            </Col>
            <Col md="auto">
            <Button 
              variant="secondary" 
              onClick={() => this.clickedEditLayout()} 
              size="sm"
            >
              Edit Section
            </Button>
            </Col>
          </Row>
        </Container>
      )
    } else {
      // Check the student subscribe this subject or not
      if(this.state.isSubscribed){
        return (
          <Col>
            <Button 
              variant="secondary" 
              size="sm" 
              disabled
            >
              Subscribed
            </Button>
          </Col>  
        )
      }
      // Return button that student can click subscribe
      return (
        <Col>
          <Button 
            variant="success" 
            onClick={() => this.clickedSubscribe()} 
            size="sm"
          >
            Subscribe
          </Button>
        </Col>
      )
    }
  }

  render() {
    if (this.state.loading || this.state.loadingArticle) {
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
      <div>
        <Jumbotron fluid className="jumbroton-subject">
          <Container>
            <Row>
              <Col md="9">
                <h1>Welcome to {this.state.subject.name}</h1>
                <h2>{this.state.subject.subject_code}</h2>
                <p>
                  {this.state.subject.description}
                </p>
                <p>
                </p>
              </Col>
              <Col md="3"></Col>
            </Row>
            <Row>
              {
                this.editButton()
              }
            </Row>
          </Container>
        </Jumbotron>
        <section className="Subj">
          <Container>
            {
              this.emptySection(this.state.subject.sections)
            }
            {this.articleSection()}
          </Container>
        </section>
        {
          this.createArticleModel()
        }
      {this.editSubjectModal()}

      </div>
    );
  }

}

export default Subject;
