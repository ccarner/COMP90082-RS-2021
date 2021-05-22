import React from 'react';
import '../../styles/main.css';
import {Col, Row, Container, Button,InputGroup,FormControl} from 'react-bootstrap';
import request from "../../utils/request"

import ProfilePendingArticleComponent from './ProfilePendingArticleComponent.jsx'
import {withRouter} from "react-router"
import profile_pic from './images/profile_pic.png'
import AuthService from "../../utils/AuthService";

const accessToken = localStorage.getItem("accessToken")
//using this to test getting html files
//import test from './test2.html'


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//getting id of the subject/tool page
			loaded: false,
			articles: []
		}
		this.clickedArticle = this.clickedArticle.bind(this);
	}
	componentDidMount(){
		this.setStart();
	}

	setStart(){
		//get all published articles by the moderator
		request.get("article/getAllPublishedArticlesByUserId",
		{headers: {
			"auth-token": localStorage.getItem("accessToken")
		}}).then(response => {
			console.log(response.data)
			if(response.data.success){
			this.setState({
				articles: response.data.articles,
			})
			console.log("successfully got list of published articles for moderator's profile")
			return response
			} else {
			this.setState({loaded: true})
			}
		}).catch((err) =>{
			this.setState({loaded: true})
			console.log("error")})
	}


	//function to route to published article once article is clicked
	clickedArticle(article) {
		console.log("clicked on a published article (as a moderator)")
		this.props.history.push(`/article/${article.id}`)
	}
	// button for edit preferred name
	editPreferredNameButton(){
		if(AuthService.userIsModerator()){
			return (
				<Button
					className="edit_preferred_name_button"
					variant="btn btn-outline-primary"
					onClick={" "}
				>
					Edit
				</Button>
			)
		}
	}
			
	// button for edit Bio
	// editBioButton(){
	// 	if(AuthService.userIsModerator()){
	// 		return (
	// 			<Button
	// 				className="edit-io-button"
	// 				variant="btn btn-outline-primary"
	// 				onClick={""}
	// 			>
	// 				Edit Bio
	// 			</Button>
	// 		)
	// 	}
	// }

	// button to change profile picture 
	changeProfilepicButton(){
		if(AuthService.userIsModerator()){
			return (
				<Button
					className="change-profile-pic-button"
					variant="btn btn-outline-primary"
					onClick={" "}
					style={{marginLeft:'4rem'}}
				>
					Upload pic
				</Button>
			)
		}
	}
	
	render () {
		//only attempt render the articles if they exist
		if(this.state.articles.length !== 0) {
			return (
		    <Container>
		    	<Row>
		    		<Col>
						<hr></hr>
						<h1>Welcome to the moderator profile page</h1>
						<hr></hr>
						<Row>
							<img src = {profile_pic} alt=""/>
						</Row>
						<Row>
							<Col sm={3}>
								{this.changeProfilepicButton()}
							</Col>
						</Row>
						<p></p>
						<hr></hr>
						<Row>
							<Col>
							<h5>Username: </h5>
							</Col>
						</Row>
						<p></p>
						<Row>
							<Col sm={2}>
								<h5>Preferred name: </h5>
							</Col>
							<Col sm={3}>
								<InputGroup
									className='name'
									style={{width:"100%", marginRight:"100%"}}
								>
									<FormControl
										placeholder="Preferrd name"
										aria-label="name"
										aria-describedby="name"
										//onChange={""}
										id="js-input"
									/>
								</InputGroup>
						    </Col>			
							<Col sm={5}>
								{this.editPreferredNameButton()}
							</Col>
						</Row>
						<p></p>
						{/* <Row>
							<Col sm={1}>
								<h5>Bio: </h5>
							</Col>
							<Col sm={5}>
								<InputGroup
									className='Bio'
									style={{width:"100%", marginRight:"100%"}}
								>
									<FormControl
										placeholder="BIO"
										aria-label="BIO"
										aria-describedby="BIO"
										//onChange={""}
										id="js-input"
									/>
								</InputGroup>
						    </Col>
							<Col sm={4}>
								{this.editBioButton()} 
						    </Col>
						</Row> */}
						<hr></hr>
				    	<h1>List of your published articles</h1>
				    	<hr></hr>
					</Col>
				</Row>
				<Row>
					<Col>
						{this.state.articles.map((article, index) => (
							<ProfilePendingArticleComponent 
								name={article.name} 
								id={article.id}
								onClick={() => this.clickedArticle(article)}
								key={index}/>
						))}
					</Col>
				</Row>
		    </Container>
		  );
		}
		//articles don't exist, so display a message saying that there's no pending articles
		else {
			return (
		    <div className="container">
				<hr></hr>
				<h1>Welcome to the moderator profile page</h1>
				<hr></hr>
				<Row>
					<img src = {profile_pic} alt=""/>
				</Row>
				<Row>
					<Col sm={3}>
						{this.changeProfilepicButton()}
					</Col>
				</Row>
				<p></p>
				<hr></hr>
				<Row>
					<Col>
	  					<h5>Username: </h5>
					</Col>	
				</Row>
				<p></p>
				<Row>
				<Col sm={2}>
					<h5>Preferred name: </h5>
				</Col>
				<Col sm={3}>
					<InputGroup
						className='name'
						style={{width:"100%", marginRight:"100%"}}
					>
						<FormControl
							placeholder="Preferrd name"
							aria-label="name"
							aria-describedby="name"
							//onChange={""}
							id="js-input"
						/>
					</InputGroup>
			    </Col>			
				<Col sm={5}>
					{this.editPreferredNameButton()}
				</Col>
				</Row>
				<p></p>
				{/* <Row>
					<Col sm={1}>
						<h5>Bio: </h5>
					</Col>
					<Col sm={5}>
						<InputGroup
							className='Bio'
							style={{width:"100%", marginRight:"100%"}}
						>
					    	<FormControl
								placeholder="BIO"
								aria-label="BIO"
								aria-describedby="BIO"
										//onChange={""}
								id="js-input"
							/>
						</InputGroup>
					    </Col>
					<Col sm={4}>
						{this.editBioButton()}
					</Col>
				</Row> */}
				<hr></hr>
				<p>You don't currently have any published articles, you can help contribute by adding articles in a subject or tool page!</p>
			</div>
		  );
		}	
	}
}

export default withRouter(App);