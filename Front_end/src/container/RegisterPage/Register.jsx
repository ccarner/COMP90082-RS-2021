import { Form, Button } from "react-bootstrap"
import React, { Component } from "react"
import request from "../../utils/request"
//import AuthService from "../../utils/AuthService"
import "./Register.css"
import UnimelbLogo from "./images/RS-UnimelbLogo.svg"
import "bootstrap/dist/css/bootstrap.min.css"

export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: null,
            password: null,
            userId: null,
            confirmPassword:null,
        }
    }
    regist() {
        const self = this;
        const params = {
            username: this.state.username,
            password: this.state.password,
            studentId: this.state.userId,
        }
        request
            .post("/register", params)
            .then((response) => {
                response.data.success && self.routeChange("login")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    routeChange(code) {
        this.props.history.push(`/${code}`)
    }

    getPassword = (e) => {
        this.setState({
            password: e.target.value,
        })
    }

    getUsername = (e) => {
        this.setState({
            username: e.target.value,
        })
    }
    getUserId = (e) => {
        this.setState({
            userId: e.target.value,
        })
    }

    render() {
        return (
            <div>
                <div className="nav">
                    < img src={UnimelbLogo} />
                    <div>
                        <a className="root">
                            <span className="glyphicon glyphicon-home" />
                            The University of Melbourne
                        </a >
                        <span> / </span>
                        <a className="root" title="Register">
                            Register
                        </a >
                    </div>
                </div>
                <div id="title">
                    <div>Register</div>
                </div>
                <div className="contentTitle">
                    Please enter the information for register
                </div>
                <div className="content">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>UserId:</Form.Label>
                            <Form.Control
                                placeholder="Enter UserId"
                                onChange={(e) => this.getUserId(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                placeholder="Enter Username"
                                onChange={(e) => this.getUsername(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                onChange={(e) => this.getPassword(e)}
                            />
                        </Form.Group>
                        {/*<Form.Group controlId="formBasicComfirmPassword">*/}
                        {/*    <Form.Label>Comfirm Password:</Form.Label>*/}
                        {/*    <Form.Control*/}
                        {/*        type="password"*/}
                        {/*        placeholder="Comfirm Password"*/}
                        {/*        onChange={(e) => this.getComfirmPassword(e)}*/}
                        {/*    />*/}
                        {/*</Form.Group>*/}
                        {/*{ this.state.showWarning*/}
                        {/*    ? <Form.Text className="text-danger">*/}
                        {/*        The two passwords do not agree.*/}
                        {/*    </Form.Text>*/}
                        {/*    : <div></div>*/}
                        {/*}*/}
                        <Button
                            id="btn"
                            onClick={() => this.regist()}>
                            Confirm
                        </Button>{" "}
                    </Form>
                </div>
            </div>
        )
    }
}