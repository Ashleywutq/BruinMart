import React, { Component } from 'react';
import { Button, ModalHeader, Modal, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import Register from './RegisterComponent';
import { required } from "../shared/validators";

const isLoginValid = () => true;
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values) {
        this.props.fetchUserInfo(values.username, values.password);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div className="container">
                <Button style={{ background: 'transparent' }} onClick={this.toggle}>
                    <span className="fa fa-sign-in fa-lg" />
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        <Form model="login" onSubmit={(values) => this.onSubmit(values)}>
                            {/* <Row>
                                <Col xs={{size: 4, offset: 3}}>
                                    <h1 className="justify-content-center align-self-center">
                                        <strong>BruinMart</strong>
                                    </h1>
                                </Col>
                            </Row> */}
                            <Row className="form-group">
                                <Label htmlFor="username" xs={{ size: 1, offset: 1 }}>
                                    <span className="fa fa-user fa-lg" />
                                </Label>
                                <Col xs={8}>
                                    <Control.text
                                        model=".username"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        className="form-control"
                                        validators={{
                                            required,
                                            isLoginValid
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: 'Required. ',
                                            isLoginValid: 'Username does not exist. '
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" xs={{ size: 1, offset: 1 }}>
                                    <span className="fa fa-lock fa-lg" />
                                </Label>
                                <Col xs={8}>
                                    <Control.password
                                        model=".password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            required,
                                            isLoginValid
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: 'Required. ',
                                            isLoginValid: 'Password is incorrect. '
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={{ size: 3, offset: 2 }}>
                                    <Register />
                                </Col>
                                <Col xl={{ size: 3, offset: 2 }}>
                                    <Button block className="item-button" value="submit" color="primary">
                                        Login
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Login;
