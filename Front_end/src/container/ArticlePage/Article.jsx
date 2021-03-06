import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import "../../styles/main.css"
import { Col, Row, Container, Button } from "react-bootstrap"
import "jodit"
import "jodit/build/jodit.min.css"
import jwtDecode from "jwt-decode";

// using this to test getting html files
import request from "../../utils/request"

// import test from './test2.html'
import { withRouter } from "react-router"
import { Link } from "react-router-dom"
import Comment from "../Comment/Comment"
import Editor from "./EditorComponent.jsx"
import Bookmark from './Bookmark.jsx'
import LikeButton from './LikeButton.jsx'
import CreateArticlePage from "../CreateArticlePage/CreateArticlePage"
import { setOriginalNode } from "typescript"

const baseURL = "https://api.cervidae.com.au/api/"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewer: null,
      article: null,
      content: null,
      loaded: false,
      hasPending: false,
      buttonText: "Edit article",
      // this needs to be set from when the article is clicked in the subject page, but those are currently inaccessible
      id: window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      ),
      title: null,
    }
    this.updateContent = this.updateContent.bind(this)
  }

  componentDidMount() {
    this.setStart()
  }

  // currently testing setting the page using previously used code
  setStart() {
    request
      .get(`article/get/${this.state.id}`, {
        headers: {
          "auth-token": localStorage.getItem("accessToken"),
        },
      })
      .then((response) => response.data)
      .then((data) => {

        console.log(data)

        if (data.success) {
          this.editorComponent &&
          this.editorComponent.setContent(data.returnValuesForArticle.content)
          this.updateContent(data.returnValuesForArticle.content)

          this.setState({
            token : data.auth_token,
            article : data.returnValuesForArticle,
            loaded: true,
            title: data.returnValuesForArticle.title,
          })

          if (data.returnValuesForArticle.is_pending) {
            this.setState({
              hasPending: true,
              buttonText: "Pending",
            })
          }


          return data
        }

        this.editorComponent && this.editorComponent.setContent("")
        this.updateContent("")
        this.setState({ loaded: true })
      })
      .catch((err) => {
        this.setState({ loaded: true })
        console.log(err)
      })
  }

  async changedLiked(article, token){
    const body = {...article}
    const viewer = jwtDecode(token)._id
    if(article._id){
      const idx = article.likes.indexOf(viewer);

      if(idx >= 0){
        article.likes.splice(idx,1)
      }else{
        article.likes = [...article.likes,viewer];
      }
      const updated = {
        _id : article._id,
        likes : article.likes
      };
      console.log('send request')
      await request.patch(`article/liked`,updated, {
        headers: {
          "auth-token": localStorage.getItem("accessToken"),
        },
      })
    }
      
  }

  handleLike = async (article, token) =>{

    const viewer = jwtDecode(token)._id;
    const originalArticle = article;
    // article.likes.indexOf(viewer) >= 0

    try{
      await this.changedLiked(article, token)
    }catch(ex){
      console.error(ex);
      request.patch()
      this.setState({article : originalArticle})
    }   
  
  }

  renderEditor() {
    if (this.state.content || this.state.title) {
      
      return (
        <Editor
          ref={this.editorComponent}
          value={this.state.content}
          onChange={(content) => this.setState({ content })}
        />
      )
    }
    if (this.state.loaded) {
      return <h1>The article is submitted for approval</h1>
    }
    return (
      <>
        {/* <div class="spinner-border" role="status"> */}
        <h1>
          <FontAwesomeIcon icon={faSpinner} />
        </h1>
        {/* <span class="sr-only">Loading...</span> */}
        {/* </div> */}
      </>
    )
  }

  updateContent(value) {
    this.setState({ content: value })
  }
  
  render() {

    return (
      <>
        <div className="App article-editor-content-section">
          <Container>
            {/* just a temporary link, replace href with a function to send a request to backend */}

            <Row>
              <Col>
                {/* Bold article title */}
                <h1 style={{fontWeight: 'bold'}}>{this.state.title}</h1>
              </Col>
              
              <Col>                
                <Link
                  disabled={this.state.hasPending}
                  to={{ pathname: `/editpage/${this.state.id}` }}
                >
                  <Button
                    className="edit-button"
                    variant="primary"
                    disabled={this.state.hasPending}
                    style={{ 
                      width:"7rem",
                      fontWeight:"bold"
                    }}
                  >
                    {this.state.buttonText}
                  </Button>
                </Link>

                {/* currently not find a good way to back to the subject page, 
                therefore back to the home page instead */}
                <Link to="/home/"> 
                  <Button
                    className="edit-button"
                    variant="success"
                    style={{ 
                      width:"7rem",
                      fontWeight:"bold"
                    }}
                  >
                    Back
                  </Button>
                </Link>
              </Col>
            </Row>

            <hr></hr>
            {this.renderEditor()}

            {/* add the bookmark button; see Bookmark.jsx for detail */}
            <Bookmark/> 
            {/* add the like button; see LikeButton.jsx for detail */}
            <LikeButton liked={this.state.liked} onClick={()=> this.handleLike(this.state.article, this.state.token)}/> 

          </Container>
        </div>
        <span>&nbsp;</span>
        {/* Discussion Board */}
        <div className="App article-editor-content-section">
          
            <Comment params={`${baseURL}article/get/${this.state.id}`} />
          
        </div>   
      </>
    )
  }
}

export default withRouter(App)
