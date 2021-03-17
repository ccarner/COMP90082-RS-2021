/* eslint-disable react/prefer-stateless-function */
import React from "react"
import "./comment.css"
import PubSub from "pubsub-js"
import { Container, Row, Image, Form, Button, Spinner } from "react-bootstrap"
import cardImage from "../HomePage/images/card-image.jpg"
import SubCommentItem from "./SubCommentItem"
import request from "../../utils/request"

const accessUserId = "accessUserId"
const userRoleKey = "userRole"
class SubComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isShowReply: false,
      isAuthorDel: false,
      replyText: "",
      isDeloading: false
    }
  }

  componentDidMount() {
    this.hasAuthorToDel()
  }

  hasAuthorToDel = () => {
    if (
      !localStorage.getItem(userRoleKey) ||
      this.props.params.author_id === localStorage.getItem(accessUserId)
    ) {
      this.setState({
        isAuthorDel: true,
      })
    }
  }

  deleteComment = () => {
    
    this.setState({
      isDeloading: true
    })
    request
      .delete("/comment/delete", {
        data: {
          _id: this.props.params._id,
        },
      })
      .then((response) => {
        PubSub.publish("Channel", "Message")
        this.setState({
          isDeloading: false
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  postInputComment = () => {
    const self = this
    const params = {
      author_id: localStorage.getItem(accessUserId),
      section_id: this.props.params.section_id,
      content: this.state.replyText,
      reply_to_id: this.props.params._id,
    }
    request
      .post("/comment/add", params)
      .then((response) => {
        self.setState({
          isLoading: false,
          isShowReply: false
        })
        PubSub.publish("Channel", "Message")
        // response.data.success && self.getCommentList()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  showReply = () => {
    this.setState({
      isShowReply: true,
    })
  }

  getReplyText = (event) => {
    this.setState({
      replyText: event.target.value,
    })
  }

  postComment = () => {
    this.setState({
      isLoading:true
    })
    this.postInputComment()
    // setTimeout(() => {
    //   PubSub.publish("Channel", "Message")

    // })
    // PubSub.publish("Channel", "Message")
    // this.setState({
    //   isShowReply: false,
    // })
  }

  renderCommentItem = (arr) => {
    return arr.map((ele) => {
      return <SubCommentItem params={ele} />
    })
  }

  render() {
    return (
      <Container fluid>
        <Row className="line" />
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Image src={cardImage} roundedCircle className="imgSize" />
          <div style={{ width: "695px", position: "relative" }}>
            <span style={{ fontWeight: "700", color: "rgb(12, 71, 116)" }}>
              {this.props.params.author_name}
            </span>
            {this.state.isAuthorDel && (
              <span
                style={{
                  color: "red",
                  position: "absolute",
                  right: "0px",
                  cursor: "pointer",
                }}
                onClick={this.deleteComment}
              >
                {this.state.isDeloading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Delete"
                )}
              </span>
            )}
            <div
              style={{ width: "100%", minHeight: "20px", marginBottom: "30px" }}
              className="wordwrap"
            >
              {this.props.params.content}
            </div>
            {!this.state.isShowReply ? (
              <div
                style={{
                  position: "absolute",
                  right: "0px",
                  cursor: "pointer",
                  color: "rgb(12, 71, 116)",
                  fontWeight: "500",
                  top: "15px",
                }}
                onClick={this.showReply}
              >
                reply
              </div>
            ) : (
              <Row>
                {" "}
                <Form.Control
                  as="textarea"
                  rows={1}
                  style={{
                    height: "40px",
                    width: "600px",
                    marginRight: "10px",
                    marginLeft: "15px",
                  }}
                  onChange={this.getReplyText}
                />
                <Button
                  variant="primary"
                  style={{
                    height: "40px",
                    width: "80px",
                    backgroundColor: "#2183f8",
                  }}
                  onClick={this.postComment}
                >
                  <Spinner
                    as="span"
                    animation={!this.state.isLoading ? "false" : "border"}
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                    {!this.state.isLoading ? "POST" :" "}
                </Button>{" "}
              </Row>
            )}

            {/* <SubCommentItem /> */}
            {this.props.params &&
              this.renderCommentItem(this.props.params.leaf_comments)}
          </div>
        </Row>
      </Container>
    )
  }
}

export default SubComment
