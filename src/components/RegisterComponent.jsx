import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Button, ModalHeader, Modal, ModalBody, Form, FormGroup, Input, Label, Col, Row } from 'reactstrap';
import { StoreUserInfo } from '../redux/ActionCreators';
import { connect } from 'react-redux';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            username: '',
            password: '',
            email: '',
            tel: '',
            name: ''
        };

        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        e.preventDefault();
    }

    onClick() {
        this.toggle();
        this.props.StoreUserInfo(this.state.name, this.state.username, this.state.password, this.state.email, this.state.tel);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Button block className="item-button" onClick={this.toggle} color="secondary">
                    Register
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup row>
                                <Label htmlFor="name" xs={{ size: 1, offset: 1 }}>
                                    <span className="fa fa-id-card-o fa-lg" />
                                </Label>
                                <Col xs={9}>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        placeholder="Your Name"
                                        //innerRef={(input) => (this.username = input)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="username" xs={{ size: 1, offset: 1 }}>
                                    <span className="fa fa-user fa-lg" />
                                </Label>
                                <Col xs={9}>
                                    <Input
                                        type="text"
                                        id="username"
                                        name="username"
                                        onChange={this.onChange}
                                        value={this.state.username}
                                        placeholder="Your username"
                                        //innerRef={(input) => (this.username = input)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="password" xs={{ size: 1, offset: 1 }}>
                                    <span className="fa fa-lock fa-lg" />
                                </Label>

                                <Col xs={9}>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        placeholder="Your password"
                                        //innerRef={(input) => (this.password = input)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" xs={{ size: 1, offset: 1 }}>
                                    <span className="fa fa-envelope-o fa-lg" />
                                </Label>
                                <Col xs={9}>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        placeholder="Your email"
                                        //innerRef={(input) => (this.password = input)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="tel" xs={{ size: 1, offset: 1 }}>
                                    <span className="fa fa-phone fa-lg" />
                                </Label>
                                <Col xs={9}>
                                    <Input
                                        type="tel"
                                        id="tel"
                                        name="tel"
                                        onChange={this.onChange}
                                        value={this.state.tel}
                                        placeholder="Your phone number"
                                    />
                                </Col>
                            </FormGroup>
                            <Row>
                                <Col xs={{ size: 4, offset: 7 }}>
                                    <Button block type="submit" value="submit" onClick={() => this.onClick()} color="primary">
                                        Register
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

const mapStateToProps = (state) => ({
    username: state.users.username,
    password: state.users.password,
    isLoggedin: state.users.isLoggedIn
});

export default connect(
    mapStateToProps,
    { StoreUserInfo }
)(Register);
