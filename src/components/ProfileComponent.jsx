import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>Hello {this.props.username},</h1>
            </div>
          </div>
        </div>
      </Jumbotron>
    );
  }
}

const mapStateToProps = state => ({
  username: state.users.username,
  isLoggedin: state.users.isLoggedIn
});

export default connect(
  mapStateToProps,
  {}
)(Profile);
