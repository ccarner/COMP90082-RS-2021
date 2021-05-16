/* eslint-disable react/prefer-stateless-function */
import React from "react"
import PubSub from "pubsub-js"
import "./comment.css"
import { Container, Row, Image, Form, Button, Spinner } from "react-bootstrap"
import cardImage from "../HomePage/images/card-image.jpg"
import request from "../../utils/request"

const userRoleKey = "userRole"
const accessUserId = "accessUserId"
class SubCommentItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isShowReply: false,
      replyText: "",
      isAuthorDel: false,
      isDeloading : false
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

  postInputComment = () => {
    const self = this
    const params = {
      author_id: localStorage.getItem(accessUserId),
      section_id: this.props.params.section_id,
      content: this.state.replyText,
      reply_to_id: this.props.params._id,
    }
    // this.setState({
    //     showCommentList:false
    // })
    request
      .post("/comment/add", params)
      .then((response) => {
        PubSub.publish("Channel", "Message")
        self.setState({
          isLoading: false,
          isShowReply: false,
        })
        // console.log(response.data)
        // response.data.success && self.getCommentList()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  postComment = () => {
    this.setState({
      isLoading: true,
    })
    this.postInputComment()
    // setTimeout(() => {
    //   // PubSub.publish("Channel", "Message")
    //   this.setState({
    //     isShowReply: false,
    //   })
    // })
    // PubSub.publish("Channel", "Message")
    // this.setState({
    //   isShowReply: false,
    // })
  }

  render() {
    return (
      <Container>
        <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Image src={cardImage} roundedCircle className="smImgSize" />
          <div style={{ width: "615px", position: "relative" }}>
            <span
              style={{
                fontSize: "15px",
                color: "rgb(12, 71, 116)",
                fontWeight: "500",
              }}
            >
              {this.props.params.author_name}{" "}
              <span style={{ fontSize: "15px", color: "gray" }}>reply to </span>
              {this.props.params.reply_to_username}
            </span>
            {this.state.isAuthorDel && (
              <span
                style={{
                  color: "red",
                  position: "absolute",
                  right: "0px",
                  top: "10px",
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
              style={{
                width: "100%",
                minHeight: "20px",
                marginBottom: "10px",
                fontSize: "15px",
              }}
              className="wordwrap"
            >
              {this.props.params.content}
            </div>
            {!this.state.isShowReply ? (
              <Button
                style={{
                  cursor: "pointer", 
                  marginBottom: "10px",}}
                onClick={this.showReply}
                size="sm"
                variant="primary"
              >
                reply
              </Button>
            ) : (
              <Row style={{ display: "flex", justifyContent: "center" }}>
                {" "}
                <Form.Control
                  as="textarea"
                  rows={1}
                  // change px to rem 10px=0.625rem
                  style={{
                    height: "2.5rem",
                    width: "33rem",
                    marginRight: "0.625rem",
                    marginBottom: "0.625rem",
                  }}
                  onChange={this.getReplyText}
                />
                <Button
                  variant="primary"
                  // change px to rem 10px=0.625rem
                  style={{
                    height: "2.5rem",
                    width: "5rem",
                    marginBottom: "0.625rem",
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
          </div>
        </Row>
      </Container>
    )
  }
}

export default SubCommentItem
