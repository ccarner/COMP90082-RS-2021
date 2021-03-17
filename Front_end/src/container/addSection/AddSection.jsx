import React from "react"
import { Card, Button, Form } from "react-bootstrap"
import request from "../../utils/request"
// eslint-disable-next-line react/prefer-stateless-function
class AddSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subjectType: "",
      sectionName: "",
      isLoading: false,
      subject: null
    }
  }

  componentDidMount() {
    request.get(`/subject/`+this.props.match.params.code).then((response) => {
      this.setState({
        subject: response.data.subject,
        loading: false
      })
    })
  }

  getSectionType = (evt) => {
    this.setState({ subjectType: evt.target.value })
  }

  getSectionName = (evt) => {
    this.setState({
      sectionName: evt.target.value,
    })
  }

  sendSectionInfo = () => {
    this.setState({
      isLoading: true,
    })
    const params = {
      name: this.state.sectionName,
      type: this.state.subjectType,
      // Get the subjectCode through url
      subject_code: this.props.match.params.code,
      owner: this.state.subject._id
    }
    // Pass the subject_title to subject page
    request
      .post("/section/add", params)
      .then((response) => {
        this.setState({
          isShow: false,
          isLoading: false,
        })
        this.props.history.push(`/subject/${this.props.match.params.code}/editLayout`)
      })
      .catch((error) => {
        alert("Fail to add.Please try later")
        this.setState({
          isLoading: false,
        })
      })
  }

  cancelCreate = () => {
    this.props.history.push(`/subject/${this.props.match.params.code}/editLayout`)
  }

  // eslint-disable-next-line class-methods-use-this
  toolSection() {
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="../HomePage/images/card-image.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }

  render() {
    return (
      <div style={{ padding: "40px" }}>
        <div style={{ width: "50%" }}>
          <Form.Group>
            <Form.Label
              style={{
                color: "#064675",
                fontWeight: "bolder",
                fontSize: "20px",
              }}
            >
              Section Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Insert section title"
              onChange={this.getSectionName}
            />
            <Form.Label
              style={{
                color: "#064675",
                fontWeight: "bolder",
                fontSize: "20px",
                marginTop: "20px",
              }}
            >
              What type of section do you want to add?
            </Form.Label>
            <Form.Control as="select" custom onChange={this.getSectionType}>
              <option value="" selected disabled hidden>Please Select the type of section</option>
              <option value="tools">Topic/Tool Recommendations</option>
              {/* <option value="discussion">Discussion</option> */}
              {/* <option value="article">Article</option> */}
            </Form.Control>
          </Form.Group>
        </div>
        <div
          style={{
            minHeight: "300px",
            width: "80%",
            border: "1px solid #ced4da",
            borderRadius: "5px",
            marginBottom: "20px",
            padding: "20px",
          }}
        >
          {/* {this.toolSection()} */}
        </div>
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Button
            onClick={this.cancelCreate}
            variant="secondary"
            style={{ marginLeft: "20px" }}
          >
            Cancel
          </Button>{" "}
          <Button
            variant="primary"
            style={{ backgroundColor: "#0e4381" }}
            disabled={this.state.isLoading}
            onClick={!this.state.isLoading ? this.sendSectionInfo : null}
          >
            {this.state.isLoading ? "Add..." : "Add Section"}
          </Button>{" "}
        </div>
      </div>
    )
  }
}

export default AddSection
