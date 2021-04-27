import React from 'react';
import '../../styles/main.css';
import { Col, Row, Container} from 'react-bootstrap';

import request from "../../utils/request"

import ProfilePendingArticleComponent from './ProfilePendingArticleComponent.jsx'
import {withRouter} from "react-router"
import profile_pic from '/Users/tianmi/Documents/GitHub/COMP90082-RS-2021/Front_end/src/container/ProfilePage/images/profile_pic.png'
import AuthService from "../../utils/AuthService";

const accessToken = localStorage.getItem("accessToken")
//using this to test getting html files


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//getting id of the subject/tool page
			loaded: false,
			//articles: null,
			pendingArticles: [],
			publishedArticles: []
		}
		this.clickedPendingArticle = this.clickedPendingArticle.bind(this);
		this.clickedPublishedArticle = this.clickedPublishedArticle.bind(this);
	}
	componentDidMount(){
		this.setStart();
	}

	setStart(){
		//get all pending articles
		request.get("article/getAllPendingArticlesByUserId",
		{headers: {
			"auth-token": localStorage.getItem("accessToken")
		}}).then(response => {
			console.log(response.data)
			if(response.data.success){
			this.setState({
				pendingArticles: response.data.articles,
			})
			console.log("successfully got list of pending articles for profile")
			return response
			} else {
			this.setState({loaded: true})
			console.log("there are no current pending articles")
			}
		}).catch((err) =>{
			this.setState({loaded: true})
			console.log("error")})

		//getting all published articles by the student
		request.get("article/getAllPublishedArticlesByUserId",
		{headers: {
			"auth-token": localStorage.getItem("accessToken")
		}}).then(response => {
			console.log(response.data)
			if(response.data.success){
			this.setState({
				publishedArticles: response.data.articles,
			})
			console.log("successfully got list of pending articles for profile")
			return response
			} else {
			this.setState({loaded: true})
			console.log("there are no current pending articles")
			}
		}).catch((err) =>{
			this.setState({loaded: true})
			console.log("error")})
	}

	//function to route to detailed pending page once article is clicked
	clickedPendingArticle(article) {
		console.log("clicked on a pending article")
	}

	clickedPublishedArticle(article) {
		console.log("clicked on a published article")
		this.props.history.push(`/article/${article.id}`)
	}

/*	editUserPreferredNameButton(){
		if(AuthService.userIsAuthenticated()){
			return (
				<Button
					className="edit_new_user-preferred_name_button"
					variant="btn btn-outline-primary"
					onClick={""}
				>
					Edit Name
				</Button>
			)
		}
	}
	
		

	editUserBioButton(){
		if(AuthService.userIsAuthenticated()){
			return (
				<Button
					className="edit-user-Bio-button"
					variant="btn btn-outline-primary"
					onClick={""}
				>
					Edit Bio
				</Button>
			)
		}
	}

	changeUserProfilepicButton(){
		if(AuthService.userIsAuthenticated()){
			return (
				<Button
					className="change-user-profile-pic-button"
					variant="btn btn-outline-primary"
					onClick={""}
				>
					Change profile pic
				</Button>
			)
		}
	}
*/

	render () {
		return (
		<Container>
			<Row>
				<Col>
					<hr></hr>
					<h1>Welcome to your profile page!</h1>
					<hr></hr>
					<Row>
						<img src = {profile_pic} alt=""/>
					</Row>
				 {/*  <Row>
						<Col sm={3}>
							{this.changeUserProfilepicButton()}
						</Col>
				 </Row> */}
					<p></p>
					<Row>
						<Col>
							<h5>Username: </h5>
						</Col>
					</Row>
					<p></p>
					<Row>
						<Col sm={4}>
							<h5>Preferred name: </h5>
						</Col>							
					{/*	<Col sm={5}>
							{this.editUserPreferredNameButton()}
				</Col>*/}
					</Row>
					<p></p>
					<Row>
						<Col sm={4}>
							<h5>Bio: </h5>
						</Col>
					{/*	<Col sm={5}>
							{this.editUserBioButton()}
			</Col> */}
					</Row>
					<hr></hr>
					<h2>Here is a list of your articles currently that are under review</h2>
					<hr></hr>
				</Col>
			</Row>
			<Row>
				<Col>
					{this.state.pendingArticles.map((article, index) => (
						<ProfilePendingArticleComponent 
							name={article.name} 
							id={article.id}
							onClick={() => this.clickedPendingArticle(article)}
							key={index}/>
					))}
				</Col>
			</Row>
			<Row>
				<Col>
					<hr></hr>
					<h2>Here is a list of articles you've published</h2>
					<hr></hr>
				</Col>
			</Row>
			<Row>
				<Col>
					{this.state.publishedArticles.map((article, index) => (
						<ProfilePendingArticleComponent 
							name={article.name} 
							id={article.id}
							onClick={() => this.clickedPendingArticle(article)}
							key={index}/>
					))}
				</Col>
			</Row>
		</Container>
		);
	}
}

export default withRouter(App);