import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button
} from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleOnSubmit = this.props.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleRegister(event) {
    event.preventDefault();

    //  TODO: Use redirect
    window.location.assign("/register");
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="container login-div">
        <div className="container logo-div">
          <div className="row">
            <div className="col-2" />
            <div className="col-10">
              <div className="row">
                <img
                  height="90"
                  width="90"
                  src="assets/images/marketplace.png"
                />
                <h1 className="justify-content-center align-self-center">
                  <strong>BruinMart</strong>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-14 col-md-9">
            <Form onSubmit={this.handleOnSubmit}>
              <FormGroup row>
                <Label htmlFor="username" xs={2}>
                  <span className="fa fa-user fa-lg" />
                </Label>
                <Col xs={10}>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="password" xs={2}>
                  <span className="fa fa-lock fa-lg" />
                </Label>
                <Col xs={10}>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs={{ size: 6, offset: 0 }}>
                  <Button
                    block
                    type="button"
                    color="secondary"
                    onClick={this.handleRegister}
                  >
                    Register
                  </Button>
                </Col>
                <Col xs={{ size: 6, offset: 0 }}>
                  <Button block type="submit" color="primary">
                    Login
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
