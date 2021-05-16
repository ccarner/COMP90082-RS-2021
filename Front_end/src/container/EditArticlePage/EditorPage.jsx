import React from 'react';
import Editor from './EditorComponent.jsx';
import ReactTag from './tagComponent.jsx';
import '../../styles/main.css';
import { Container, Button, Row, Col } from 'react-bootstrap';
import 'jodit';
import 'jodit/build/jodit.min.css';

//using this to test getting html files
import {withRouter} from "react-router";
import request from "../../utils/request"

const accessToken = localStorage.getItem("accessToken")


class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			content: null,
			loaded: false,
			hasPending: false,
			buttonText: "Save article",
			id: window.location.href.substring(window.location.href.lastIndexOf('/')+1),
			title: null,
			tags: [],
			subjects: null,
			tools: null,
		}
		this.updateContent = this.updateContent.bind(this)
	}
	componentDidMount(){
		this.setStart();
	}
	// setStart(){
	// 	axios.get("http://localhost:3000/test.html").then(response => response.data).then(data => {this.editorComponent &&
	// 		this.editorComponent.setContent(data);
	// 		this.updateContent(data)
	// 		return data
	// 	})
	// }
	//currently testing setting the page using previously used code
	setStart(){
		// console.log(this.state.id)
		request.get("article/get/" + this.state.id,
		{headers: {
			"auth-token": localStorage.getItem("accessToken")
		}}).then(response => response.data).then(data => {
			if(data.success){this.editorComponent &&
			this.editorComponent.setContent(data.returnValuesForArticle.content);
			// this.updateContent(data.returnValuesForArticle.content)
			let reformattedTags = data.returnValuesForArticle.tags.map(tag=>{
				let rTag = {}
				rTag["id"] = tag
				rTag["text"] = tag
				return rTag
			})
			console.log(reformattedTags)
			this.setState({
				content: data.returnValuesForArticle.content,
				loaded: true,
				title: data.returnValuesForArticle.title,
				tags: reformattedTags,
				subjects: data.returnValuesForArticle.subjects,
				tools: data.returnValuesForArticle.tools
			})
			if(data.returnValuesForArticle.is_pending){
				this.setState({hasPending: true, buttonText: "Pending article exists"})
			}
			// console.log(data)
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
	saveFunc(){
		// alert(accessToken)
		// console.log(this.state.content)
		console.log(this.state.tags)
		console.log(this.state.subjects)
		console.log(this.state.tools)
		// the body of this post request should be done programmatically
		let reformattedTags = this.state.tags.map(obj=>{
			
			return obj.text
		})
		console.log("these are the tags: " +this.state.tags)
		console.log("reformatted " +reformattedTags)
		// alert("success")
		request.post("article/publish/", {
			title: this.state.title,
			content: this.state.content,
			tags: reformattedTags,
			subjects: this.state.subjects,
			tools: this.state.tools,
			article_id: this.state.id
		}, {headers: {"auth-token": localStorage.getItem("accessToken")}}).then(response => response.data).then(data => {console.log(data)
			this.props.history.push(`/article/${this.state.id}`)
			return data
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
					onChange={content => this.setState({content})}
				/>
					&nbsp;
				<ReactTag 
					tagsIn={this.state.tags}
					updateTags={this.updateTags.bind(this)}
				/>
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

	render () {
		// console.log("send " + this.state.tags)
	 return (
		<>
	    <div className="App article-editor-content-section">
			<Container>
				<Row>
					<Col>
					{/* Bold article title */}
					<h1 style={{fontWeight: 'bold'}}>{this.state.title}</h1>
					</Col>

					{/* add cancel and save article buttons */}
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
				</Row>
				
				<hr></hr>				
				{this.renderEditor()}
				<hr></hr>
			</Container>
	        
	    </div>
		</>
	  );
	}
}

export default withRouter(App);