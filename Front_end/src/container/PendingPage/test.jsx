import React, {useState, useRef, useMemo, ReactDOM} from 'react';
import { faSave } from "@fortawesome/free-solid-svg-icons"

import '../../styles/main.css';
import NavBar from '../../components/NavBar';
import {Card, Button, Listroup} from 'react-bootstrap';

import axios from "axios";
import {withRouter} from "react-router";

const baseURL = "http://158.101.92.248:4000/"
const accessToken = localStorage.getItem("accessToken")

class PendingArticle extends React.Component{
	constructor() {
		super();
	}

	render() {
		return (
			<Card>
				<Card.Header as="h5">{this.props.name}</Card.Header>
				<Card.Body>
					<Card.Text>This section contains a short description of pending article</Card.Text>
					<hr></hr>
					<Button variant="primary">Approve</Button>{' '}
					<Button variant="secondary">Reject</Button>
				</Card.Body>
			</Card>
		)
	}
}



export default PendingArticle
