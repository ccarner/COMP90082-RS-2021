/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react"
import {
  InputGroup,
  Button,
  FormControl,
  Card,
  Pagination,
  Spinner,
  Form,
} from "react-bootstrap"
import request from "../../utils/request"
import "./search.css"
import tools from "../../utils/tools"

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showResult: false,
      searchLoading: false,
      searchResult: {},
      searchContent: "",
      searchType: "",
    }
  }

  componentDidMount() {
    if (tools.getLoctionParams("query")) {
      document.getElementById("js-input").value = decodeURI(
        tools.getLoctionParams("query")
      )
      this.searchRequest()
    }
  }

  clickedArticle = (article) => {
    // this function should look up the subject code in the backend and redirect the user to the correct page
    this.props.history.push(`/article/${article.id}`)
    // alert("you clicked on " + code)
  }

  searchRequest = () => {
    if (document.getElementById("js-input").value) {
      const searchContent =
        this.state.searchContent || tools.getLoctionParams("query")
      const searchType = this.state.searchType || tools.getLoctionParams("type")
      const url = tools.addParamsToUrl(
        window.location.href,
        "query",
        searchContent
      )
      const newurl = tools.addParamsToUrl(url, "type", searchType)
      window.history.pushState("", "", newurl)
      this.setState({
        searchLoading: true,
        showResult: true,
      })
      const query = tools.getLoctionParams("query") || "article"
      let type = tools.getLoctionParams("type") || ""
      if (type === "all") {
        type = ""
      }
      request
        //commented out below get request because search isn't working at the moment, 
        //replaced temporarily with another get request that returns all of the articles
        //related to the subject being searched
        //.get(`/search/query/?q=${query}&type=${type}`)
        .get(`/article/getNamesOfArticles/${query}`)
        .then((response) => {
          if (response.data.success) {
            this.setState({
              searchResult: response.data.articles,
              searchLoading: false,
            })
          } else {
            this.setState({
              searchLoading: false,
            })
          }
        })
        .catch((err) => {
          this.setState({
            searchLoading: false,
          })
          console.log(err)
        })
    }
  }

  getSearchContent = (event) => {
    if (!event.target.value) {
      this.setState({
        showResult: false,
      })
    }
    this.setState({
      searchContent: event.target.value,
    })
  }

  setAllType = (event) => {
    event.target.value && this.setState({ searchType: "all" })
  }

  setArticleType = (event) => {
    event.target.value && this.setState({ searchType: "article" })
  }

  setToolType = (event) => {
    event.target.value && this.setState({ searchType: "tool" })
  }

  renderTag = (arr) => {
    return (
      <>
        {arr.map((ele) => {
          return <div className="tag">{ele}</div>
        })}
      </>
    )
  }

  renderResult = (arr) => {
    console.log(arr)
    if (arr && arr.length > 0) {
      return (
        <>
          {arr.map((ele) => {
            return (
              <Card
                style={{ marginBottom: "10px" }}
                onClick={() => this.clickedArticle(ele)}
              >
                <Card.Header>{ele.name}</Card.Header>
                <Card.Body>
                  <Card.Title>{ele.name}</Card.Title>
                  {/*commented out below until search is fixed, currently using another api call that gets all articles related to a subject*/}
                  {/* <Card.Text>
                        With supporting text below as a natural lead-in to additional
                        content.
                      </Card.Text> */}
                </Card.Body>
                {/*<Card.Footer className="text-muted">
                  {this.renderTag(ele.tags)}
                </Card.Footer>*/}
              </Card>
            )
          })}
        </>
      )
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
          color: "rgb(12, 71, 116)",
        }}
      >
        No Data
      </div>
    )
  }

  renderPagination = () => {
    const active = 1
    const items = []
    for (let number = 1; number <= 4; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      )
    }
    const paginationBasic = (
      <div>
        <Pagination>
          {items}
        </Pagination>
        <br />
      </div>
    )

    return paginationBasic
  }

  renderSearchResult = () => {
    return this.state.searchLoading ? (
      <div className="loading">
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
      </div>
    ) : (
      <div className="searchResult">
        <div
          style={{
            color: "#0c4774",
            fontSize: "28px",
            marginTop: "25px",
            marginBottom: "20px",
            fontWeight: "630",
            marginLeft: "18%",
          }}
        >
          Search Results
        </div>
        <div style={{ width: "60%", marginLeft: "18%" }}>
          {this.state.searchResult &&
            this.renderResult(this.state.searchResult)}
        </div>
        {/* <div className="pagination">{this.renderPagination()}</div> */}
      </div>
    )
  }

  render() {
    return (
      <div className="searchBackground">
        <div className="searchContent">
          <div
            style={{
              color: "white",
              fontSize: "35px",
              fontWeight: "630",
              marginLeft: "7%",
            }}
          >
            Search
          </div>
          <div>
            <InputGroup
              className="mb-3"
              style={{ width: "50%", marginLeft: "24%" }}
            >
              <FormControl
                placeholder="Search the University"
                aria-label="Search the University"
                aria-describedby="basic-addon2"
                onChange={this.getSearchContent}
                id="js-input"
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  style={{ backgroundColor: "#157ffb", color: "white" }}
                  onClick={this.searchRequest}
                >
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <Form
              style={{ display: "flex", marginLeft: "24%", color: "white" }}
            >
              <Form.Check
                type="radio"
                label="All"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                style={{ marginRight: "15px", width: "50px" }}
                onChange={this.setAllType}
              />
              <Form.Check
                type="radio"
                label="Article"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                style={{ marginRight: "25px", width: "60px" }}
                onChange={this.setArticleType}
              />
              <Form.Check
                type="radio"
                label="Tool"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
                style={{ marginRight: "15px", width: "60px" }}
                onChange={this.setToolType}
              />
            </Form>
          </div>
        </div>
        {this.state.showResult && this.renderSearchResult()}
        <div className="searchFooter" />
        {/* <Comment params="/subject/swen90013" /> */}
      </div>
    )
  }
}
