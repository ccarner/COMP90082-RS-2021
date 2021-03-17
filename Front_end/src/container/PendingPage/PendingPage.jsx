import React from 'react';
import '../../styles/main.css';

import { Col, Row, Container} from 'react-bootstrap';
import request from "../../utils/request"

import PendingArticleComponent from './pendingArticleComponent.jsx'

//using this to test getting html files
import {withRouter} from "react-router";

const accessToken = localStorage.getItem("accessToken")


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//getting id of the subject/tool page
			id: window.location.href.substring(window.location.href.lastIndexOf('/')+1),
			loaded: false,
			articles: null,
		}
		this.clickedArticle = this.clickedArticle.bind(this);
	}
	componentDidMount(){
		this.setStart();
	}

	setStart(){
		request.get("article/getNamesOfPendingArticles/" + this.state.id,
		{headers: {
			"auth-token": localStorage.getItem("accessToken")
		}}).then(response => {
			console.log(response.data)
			if(response.data.success){
			this.setState({
				loaded: true,
				articles: response.data.articles,
			})
			console.log("successfully got list of pending articles")
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
	clickedArticle(article) {
		console.log("clicked on a pending article")
		this.props.history.push({
			pathname: `/detailedpendingpage/${article.id}`,
			state: {
				article: article,
				subjectID: this.state.id,
			}
		})
	}
	
	render () {
		//only attempt render the articles if they exist
		if(this.state.articles !== null) {
			return (
		    <Container>
		    	<Row>
		    		<Col>
				    	<h1>Pending Articles</h1>
				    	<p>{this.state.id}</p>
				    	<hr></hr>
					</Col>
				</Row>
				<Row>
					<Col>
						{this.state.articles.map((article, index) => (
							<PendingArticleComponent 
								name={article.name} 
								id={article.id}
								subjectID={this.state.id}
								article={article}
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
		    <Container>
		    	<Row>
		    		<Col>
		    			<br></br>
				    	<h1>Pending Articles</h1>
				    	<hr></hr>
					</Col>
				</Row>
				<Row>
					<Col>
						<br></br>
						<h2>Currently there are no pending articles for this subject!</h2>
					</Col>
				</Row>
		    </Container>
		  );
		}	
	}
}

export default withRouter(App);