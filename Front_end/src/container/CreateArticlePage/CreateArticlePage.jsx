import React from 'react';
import Editor from './EditorComponent.jsx';
import ReactTag from './tagComponent.jsx';
import '../../styles/main.css';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import 'jodit';
import 'jodit/build/jodit.min.css';
import AuthService from "../../utils/AuthService"

//using this to test getting html files
import {withRouter} from "react-router";
import request from "../../utils/request"

const accessToken = localStorage.getItem("accessToken")


class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			content: "",
			loaded: true,
			hasPending: false,
			buttonText: "Publish",
			title: "",
			tags: [],
			subjects: null,
			tools: null,
		}
		this.updateContent = this.updateContent.bind(this)
	}
	componentDidMount(){
		this.setStart();
	}

	//getting pre-enetered title from previous page, probably don't need tags though since it's a 'new' article
	setStart(){
		let reformattedTags = this.props.location.state.tags.map(tag=>{
			let rTag = {}
			rTag["id"] = tag
			rTag["text"] = tag
			return rTag
		})
		this.setState({
			title: this.props.location.state.title,
			tags: reformattedTags,
			subjects: this.props.location.state.subject,
		})
		
		//console.log(this.state.subjec)
	}
	saveFunc(){
		//this can stay the same but needs to change where it redirects to in the history push depending on if student or moderator, so pending or full article
		// alert(accessToken)
		// console.log(this.state.content)
		// the body of this post request should be done programmatically
		let reformattedTags = this.state.tags.map(obj=>{
			
			return obj.text
		})
		// alert("success")

		request.post("article/publish/", {
			title: this.state.title,
			content: this.state.content,
			tags: reformattedTags,
			subjects: this.state.subjects,
			tools: this.state.tools,
		}, {headers: {"auth-token": localStorage.getItem("accessToken")}}).then(response => response.data).then(data => {console.log(data)
			if(AuthService.userIsModerator()){
				this.props.history.push(`/article/${data.article_id}`)
				return data
			} else {
				this.props.history.push(`/detailedpendingpage/${data.article_id}`)
				return data
			}
			
		}).catch((err) =>{console.log(err)})
	}
	
	renderEditor(){
		// console.log(this.state.title)
		if(this.state.content||this.state.title){
			// console.log("testing: " + this.state.tags+ this.state.content)
			return (
				<React.Fragment>        
				<Editor 
					ref={this.editorComponent} 
					value={this.state.content}
					saveFunc={this.saveFunc.bind(this)}
					onChange={content => this.setState({content})}/>
					&nbsp;
				<ReactTag 
				tagsIn={this.state.tags}
				updateTags={this.updateTags.bind(this)}/>
				</React.Fragment>	
			)
		} 

		else {
			if(this.state.loaded){
				return (<h1>Error: Article ID not found</h1>)
			} else {
				return (
				<React.Fragment>
				  <div class="spinner-border" role="status">
					<span class="sr-only">Loading...</span>
				  </div>
				</React.Fragment>
			  );
			}
			
		}
	}

    updateContent(value) {
        this.setState({content: value})
	}
	updateTags(newTags){
		this.setState({tags: newTags})
		console.log("newtags " + JSON.stringify(newTags))
	}

	//changes the stored title when changed in the form
	getArticleTitle = (evt) => {
		this.setState({
			title: evt.target.value,
		})
		console.log(this.state.title)
	}

	render () {
		// console.log("send " + this.state.tags)
		//need to change the title to be a text field with placeholder, or take in the value from props somehow
	 return (
	    <div className="App article-editor-content-section">
			<Container>
				<Form>
					<Form.Row>
						<Col sm="auto">								
							<h1><Form.Label>Article Title</Form.Label></h1>
						</Col>

						<Col>
							<Form.Control defaultValue={this.state.title} onChange={this.getArticleTitle} size="lg"></Form.Control>
						</Col>

						<Col>
							<Button 
								className="edit-button" 
								disabled={this.state.hasPending} 
								variant="primary" 
								onClick={this.saveFunc.bind(this)}
							>
								{this.state.buttonText}
							</Button>
								
							<Button 
								className="edit-button" 
								variant="success"
								onClick={this.props.history.goBack}
							>
								Cancel
							</Button>
						</Col>
					</Form.Row>	
				</Form>
				
				<hr></hr>
				{this.renderEditor()}
				<hr></hr>
			</Container>
	    </div>
	  );
	}
}

export default withRouter(App);