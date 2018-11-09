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

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      name: ""
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    //  TODO: use redirect
    window.location.assign("/login");
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
            <div className="col-1" />
            <div className="col-10">
              <div className="row">
                <img
                  height="100"
                  width="100"
                  src="assets/images/marketplace.png"
                />
                <h1 className="justify-content-center align-self-center">
                  BruinMart
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-12 col-md-9">
            <Form onSubmit={this.handleOnSubmit}>
              <FormGroup row>
                <Label htmlFor="name" xs={2}>
                  <span className="fa fa-id-card-o fa-lg" />
                </Label>
                <Col xs={10}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="email" xs={2}>
                  <span className="fa fa-envelope-o fa-lg" />
                </Label>
                <Col xs={10}>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="username" xs={2}>
                  <span className="fa fa-user fa-lg" />
                </Label>
                <Col xs={10}>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
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
                    placeholder="Password"
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
                    onClick={() => <Redirect to="/login" />}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col xs={{ size: 6, offset: 0 }}>
                  <Button block type="submit" color="success">
                    Register
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

export default Register;
