import React, { Component } from 'react';
import { Button, ModalHeader, Modal, ModalBody, Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { StoreUserInfo } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import validator from 'validator';
import { required, doesUsernameExist } from '../shared/validators';

const normalizePhone = (value) => {
    if (!value) {
        return value;
    }

    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) {
        return onlyNums;
    }
    if (onlyNums.length <= 7) {
        return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3)}`;
    }
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
};

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    formatPhoneNumbers(event) {
        this.props.formatPhoneNumbers(event.target.value, normalizePhone);
    }

    onSubmit(values) {
        this.toggle();
        this.props.StoreUserInfo(values.name, values.username, values.password, values.email, values.tel);
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
                        <Form model="register" onSubmit={(values) => this.onSubmit(values)}>
                            {/* <Row>
                                <Col xs={{size: 4, offset: 3}}>
                                    <h1 className="justify-content-center align-self-center">
                                        <strong>BruinMart</strong>
                                    </h1>
                                </Col>
                            </Row> */}
                            <Row className="form-group">
                                <Label htmlFor="name" xs={{ size: 1, offset: 1 }}>
                                    <span className="fa fa-id-card-o fa-lg fa-fw" />
                                </Label>
                                <Col xs={9}>
                                    <Control.text
                                        model=".name"
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required. '
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="username" xs={{ size: 1, offset: 1 }}>
                                    <span className="fa fa-user fa-lg fa-fw" />
                                </Label>
                                <Col xs={9}>
                                    <Control.text
                                        model=".username"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        className="form-control"
                                        asyncValidators={{
                                            doesUsernameExist
                                        }}
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: 'Required. ',
                                            doesUsernameExist: 'Username already exist in the database. '
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" xs={{ size: 1, offset: 1 }}>
                                    <span className="fa fa-lock fa-lg fa-fw" />
                                </Label>
                                <Col xs={9}>
                                    <Control.password
                                        model=".password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: 'Required. '
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" xs={{ size: 1, offset: 1 }}>
                                    <span className="fa fa-envelope-o fa-lg fa-fw" />
                                </Label>
                                <Col xs={9}>
                                    <Control.text
                                        model=".email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required,
                                            isEmail: (val) => val && validator.isEmail(val)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required. ',
                                            isEmail: "Wrong format. Email's format is ab@cd.ef"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="tel" xs={{ size: 1, offset: 1 }}>
                                    <span className="fa fa-phone fa-lg fa-fw" />
                                </Label>
                                <Col xs={9}>
                                    <Control.text
                                        model=".tel"
                                        id="tel"
                                        name="tel"
                                        placeholder="Phone Number"
                                        className="form-control"
                                        onChange={(event) => this.formatPhoneNumbers(event)}
                                        validateOn="blur"
                                        updateOn="blur"
                                        validators={{
                                            required,
                                            isMobilePhone: (val) => val && validator.isMobilePhone(val, 'en-US')
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".tel"
                                        show="touched"
                                        messages={{
                                            required: 'Required. ',
                                            isMobilePhone: "Phone number's format is wrong. Please enter 10 digits."
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ size: 4, offset: 7 }}>
                                    <Button block type="submit" value="submit" color="primary">
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

const mapDispatchToProps = (dispatch) => ({
    resetRegisterForm: () => {
        dispatch(actions.reset('register'));
    },
    StoreUserInfo: (name, username, password, email, phone) => {
        dispatch(StoreUserInfo(name, username, password, email, phone));
    }
});

export default connect(
    (state) => {
        return {};
    },
    mapDispatchToProps
)(Register);
