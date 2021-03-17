
import React from 'react';
import Editor from './EditorComponent.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import '../../styles/main.css';
import { Col, Row, Container, Button } from 'react-bootstrap';
import 'jodit';
import 'jodit/build/jodit.min.css';
import AuthService from "../../utils/AuthService"
import request from "../../utils/request"

//using this to test getting html files
//import test from './test2.html'
import { withRouter } from "react-router";
const accessToken = localStorage.getItem("accessToken")


class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			content: null,
			loaded: false,
			//this needs to be set from when the article is clicked in the subject page, but those are currently inaccessible
			id: window.location.href.substring(window.location.href.lastIndexOf('/')+1),
			title: null,
        }
        this.updateContent = this.updateContent.bind(this)
        this.approveArticle = this.approveArticle.bind(this);
		this.rejectArticle = this.rejectArticle.bind(this);
	}
	componentDidMount(){
		this.setStart();
	}

	//currently testing setting the page using previously used code
	setStart(){
		let urlstring = "";
		if(AuthService.userIsModerator()){
			urlstring = "article/getPendingArticle/"

		} else {
			urlstring = "article/editPendingArticle/"
		}
		request.get( urlstring + this.state.id, {headers: {
			"auth-token": accessToken

		}}).then(response => response.data).then(data => {
			console.log(data)
			if(data.success){this.editorComponent &&
				this.editorComponent.setContent(data.returnValuesForArticle.content);
				this.updateContent(data.returnValuesForArticle.content)
				this.setState({loaded: true,
				title: data.returnValuesForArticle.title})
				return data
				} else {
					this.editorComponent &&
					this.editorComponent.setContent("");
					this.updateContent("")
					this.setState({loaded: true})
				}
		}).catch((err) =>{
			this.setState({loaded: true})
			console.log(err)})
	}

	renderEditor(){
		if(this.state.content||this.state.title){
			return ( <Editor ref={this.editorComponent} value={this.state.content} onChange={content => this.setState({content})}/>)
		} else {
			if(this.state.loaded){
				return (<h1>Error: Article ID not found</h1>)
			} else {
				return (
				<React.Fragment>
				  {/* <div class="spinner-border" role="status"> */}
				  <h1>
					  <FontAwesomeIcon icon={faSpinner} />
					</h1>
					{/* <span class="sr-only">Loading...</span> */}
				  {/* </div> */}
				</React.Fragment>
			  );
			}
		}
	}

    renderButtons(){
		if(AuthService.userIsModerator()){
			return ( <Row>
				<Col sm={9}>
				  <h1>{this.state.title}</h1>
				</Col>
				<Col sm={3}>
					  <Button variant="primary" 
							onClick={() => {this.approveArticle(this.state.id)}}>Approve</Button>{' '}
					<Button variant="secondary"
							onClick={() => {this.rejectArticle(this.state.id)}}>Reject</Button>
				</Col>
			  </Row>)
 
		} else {
			return ( <Row>
				<Col sm={9}>
				  <h1>{this.state.title}</h1>
				</Col>
				<Col sm={3}>
					  
				</Col>
			  </Row>)
		}
	}

    updateContent(value) {
        this.setState({content: value})
    }

    approveArticle(articleId) {
		request.get( "article/pendingArticle/approve/" + articleId, {headers: {
			"auth-token": accessToken

		}}).then(response => response.data).catch((err) => {console.log(err)})
		this.props.history.push(`/subject/${this.props.location.state.subjectID}`)

	}

	rejectArticle(articleId) {
		request.get("article/pendingArticle/reject/" + articleId,
		{headers: {"auth-token": accessToken}}).then(response => response.data).catch((err) => {console.log(err)})
		this.props.history.push(`/subject/${this.props.location.state.subjectID}`)

	}

	render () {
	 return (
	    <div className="App article-editor-content-section">
        <Container>        	
          {this.renderButtons()}
          {this.renderEditor()}
        </Container>  
	    </div>
	  );
	}
}

export default withRouter(App);

