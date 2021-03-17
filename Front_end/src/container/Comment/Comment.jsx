/* eslint-disable react/prefer-stateless-function */
/*
    Common Component:Discussion Board
    Author : Congran Li
    Contact:  congranl@student.unimleb.edu.au

    How to use?
        - When using this component, pass a url param into this.
        - Eg: 
        -   <Comment params="/subject/swen90013" />
        - It will return the discussion board belong to SWEN90013 Subject. 

    Need to be Improved? 
        - When using this common component,the system will send the url twice
        - Need a pagination when data is large
*/
import React from "react"
import "./comment.css"
import { Container, Row, Image, Form, Button, Spinner } from "react-bootstrap"
import PubSub from "pubsub-js"
import cardImage from "../HomePage/images/card-image.jpg"
import SubComment from "./SubComment"
import request from "../../utils/request"

const accessUserId = "accessUserId"
class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      commentContent: "",
      commentList: [],
      section_id: "",
      showBoard: true,
      showCommentList: false,
    }
  }

  componentDidMount() {
    this.initCommentList()
    PubSub.subscribe("Channel", (msg, data) => {
      // this.setState({
      //   showCommentList: false,
      // })
      this.getCommentList()
    })
    // this.getCommentList()
  }

  postInputComment = () => {
    const self = this
    if(!this.state.commentContent){
      document.getElementById('exampleForm.ControlTextarea1').blur()
      return
    }
    document.getElementById('exampleForm.ControlTextarea1').value = ""
    const params = {
      author_id: localStorage.getItem(accessUserId),
      section_id: this.state.section_id,
      content: this.state.commentContent,
    }
    this.setState({
      isLoading: true,
    })
    request
      .post("/comment/add", params)
      .then((response) => {
        response.data.success && self.getCommentList()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getCommentList = () => {
    request
      .get(this.props.params)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            commentContent: "",
            isLoading: false,
            commentList:
              response.data.returnValuesForArticle.comment_section.comments,
            section_id:
              response.data.returnValuesForArticle.comment_section._id,
          })
        }
      })
      .catch((err) => {
        // this.setState({
        //   searchLoading: false,
        // })
        console.log(err)
      })
  }

  initCommentList = () => {
    request
      .get(this.props.params)
      .then((response) => {
        console.log(
          "pppp",
          response.data.returnValuesForArticle.comment_section.comments
        )
        if (response.data.success) {
          this.setState({
            showBoard: true,
            showCommentList: true,
            commentList:
              response.data.returnValuesForArticle.comment_section.comments,
            section_id:
              response.data.returnValuesForArticle.comment_section._id,
          })
        }
      })
      .catch((err) => {
        // this.setState({
        //   searchLoading: false,
        // })
        console.log(err)
      })
  }

  getInputComment = (event) => {
    this.setState({
      commentContent: event.target.value,
    })
  }

  renderComment = (arr) => {
    return arr.reverse().map((ele) => {
      return <SubComment params={ele} />
    })
  }

  render() {
    return (
      <div>
        {this.state.showBoard && (
          <div>
            
            <div>
              <Container>
                <div className="boardTitle">Discussion Board</div>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Image src={cardImage} roundedCircle className="imgSize" />
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      style={{
                        height: "80px",
                        width: "600px",
                        marginRight: "10px",
                      }}
                      onChange={this.getInputComment}
                    />
                  </Form.Group>
                  <Button
                    disabled={this.state.isLoading}
                    variant="primary"
                    style={{
                      height: "80px",
                      width: "100px",
                      backgroundColor: "#2183f8",
                    }}
                    onClick={this.postInputComment}
                  >
                  <Spinner
                    as="span"
                    animation={!this.state.isLoading ? "false" : "border"}
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                    {!this.state.isLoading ? "POST" : "Loading..."}
                  </Button>{" "}
                </Row>
                {/* <SubComment params={{ key: 1, value: 2 }} /> */}
                {this.state.showCommentList &&
                  this.renderComment(this.state.commentList)}
                <Row className="line" />
              </Container>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Comment
