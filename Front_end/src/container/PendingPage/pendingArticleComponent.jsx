import React from 'react';

import '../../styles/main.css';
import {Card, Button} from 'react-bootstrap';
import { withRouter } from "react-router";

import request from "../../utils/request"
const accessToken = localStorage.getItem("accessToken")

const baseURL = "http://127.0.0.1/"

class PendingArticle extends React.Component{
	constructor() {
		super();
		
	this.approveArticle = this.approveArticle.bind(this);
	this.rejectArticle = this.rejectArticle.bind(this);
	}

	approveArticle(articleId) {
		console.log("clicked on approve button")
		request.get("article/pendingArticle/approve/" + articleId,
		{headers: {"auth-token": accessToken}}).then(response => response.data).catch((err) => {console.log(err)})
// axios.get(baseURL + "article/pendingArticle/approve/" + articleId,
// {headers: {"auth-token": localStorage.getItem("accessToken")}}).then(response => response.data).catch((err) => {console.log(err)})

		this.props.history.push(`/subject/${this.props.subjectID}`)
	}

	rejectArticle(articleId) {
		console.log("clicked on reject button")
		request.get("article/pendingArticle/reject/" + articleId,
		{headers: {"auth-token": accessToken}}).then(response => response.data).catch((err) => {console.log(err)})
// 		axios.get(baseURL + "article/pendingArticle/reject/" + articleId,
//  		{headers: {"auth-token": localStorage.getItem("accessToken")}}).then(response => response.data).catch((err) => {console.log(err)})
		this.props.history.push(`/subject/${this.props.subjectID}`)

	}

	render() {
		return (
			<Card>
				<Card.Header as="h5" onClick={this.props.onClick}>{this.props.name}</Card.Header>
				<Card.Body>
					<Card.Text>This section contains a short description of pending article</Card.Text>
					<hr></hr>
					<Button variant="primary" 
							onClick={() => {this.approveArticle(this.props.id)}}>Approve</Button>{' '}
					<Button variant="secondary"
							onClick={() => {this.rejectArticle(this.props.id)}}>Reject</Button>
				</Card.Body>
			</Card>
		)
	}
}



export default withRouter(PendingArticle);

	