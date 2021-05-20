import React from 'react';

import '../../styles/main.css';
import {Card} from 'react-bootstrap';

import request from "../../utils/request"

const baseURL = "https://api.cervidae.com.au/api/"
const accessToken = localStorage.getItem("accessToken")

class ProfilePendingArticleComponent extends React.Component{
	constructor() {
		super();
		
	this.approveArticle = this.approveArticle.bind(this);
	this.rejectArticle = this.rejectArticle.bind(this);
	}

	approveArticle(articleId) {
		console.log(baseURL + "article/pendingArticle/approve/" + articleId)
		console.log("clicked on approve button")
		request.get("article/pendingArticle/approve/" + articleId,
		{headers: {"auth-token": accessToken}}).then(response => response.data).catch((err) => {console.log(err)})
	}

	rejectArticle(articleId) {
		console.log("clicked on reject button")
		request.get("article/pendingArticle/reject/" + articleId,
		{headers: {"auth-token": accessToken}}).then(response => response.data).catch((err) => {console.log(err)})
	}

	render() {
		return (
			<Card onClick={this.props.onClick}>
				<Card.Header as="h5" >{this.props.name}</Card.Header>
				<Card.Body>
					<Card.Text>This section contains a short description of pending article</Card.Text>
					<hr></hr>
				</Card.Body>
			</Card>
		)
	}
}

export default ProfilePendingArticleComponent

	