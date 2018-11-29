import {
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { login } from "../redux/ActionCreators";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      username: "",
      password: ""
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.login(this.state.username, this.state.password);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button style={{ background: "transparent" }} onClick={this.toggle}>
          <span className="fa fa-sign-in fa-lg" /> Login
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  onChange={this.onChange}
                  value={this.state.username}
                  //innerRef={input => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  //innerRef={input => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={input => (this.remember = input)}
                  />{" "}
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.users.username,
  password: state.users.password,
  isLoggedin: state.users.isLoggedIn
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
