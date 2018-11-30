import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Button, ModalHeader, Modal, ModalBody, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { fetchUserInfo } from '../redux/ActionCreators';

import Register from './RegisterComponent';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            username: '',
            password: ''
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
        this.props.fetchUserInfo(this.state.username, this.state.password);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Button style={{ background: 'transparent' }} onClick={this.toggle}>
                    <span className="fa fa-sign-in fa-lg" /> Login
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
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

                            <Row>
                                <Col xl={{ size: 3, offset: 1 }}>
                                    <Register />
                                </Col>
                                <Col xl={{ size: 3, offset: 4 }}>
                                    <Button
                                        block
                                        className="item-button"
                                        onClick={() => this.onClick()}
                                        value="submit"
                                        color="primary"
                                    >
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

const mapStateToProps = (state) => ({
    username: state.users.username,
    password: state.users.password,
    isLoggedin: state.users.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
    fetchUserInfo: (username, password) => {
        dispatch(fetchUserInfo(username, password));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
