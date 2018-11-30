import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Button, ModalHeader, Modal, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
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
            tel: ''
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
        this.props.StoreUserInfo(this.state.username, this.state.password, this.state.email, this.state.tel);
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
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    type="text"
                                    id="username"
                                    name="username"
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    //innerRef={(input) => (this.username = input)}
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
                                    //innerRef={(input) => (this.password = input)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    //innerRef={(input) => (this.password = input)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="tel">Contact number</Label>
                                <Input type="tel" id="tel" name="tel" onChange={this.onChange} value={this.state.tel} />
                            </FormGroup>

                            <Button type="submit" value="submit" onClick={() => this.onClick()} color="primary">
                                Register
                            </Button>
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
