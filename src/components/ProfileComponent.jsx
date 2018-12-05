import React, { Component } from 'react';
import { Control } from 'react-redux-form';
import { Form, Label, Col, Row } from 'reactstrap';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(values) {
        this.props.StoreUserInfo(
            values.name,
            this.props.userInfo.username,
            this.props.userInfo.password,
            values.email,
            values.tel
        );
    }

    render() {
        if (!this.props.isLoggedIn) {
            return (
                <div className="container start-of-home">
                    <div className="col-12">
                        <h3>Please Login First</h3>
                        <hr />
                    </div>
                </div>
            );
        }

        return (
            <div className="start-of-home">
                <div className="col-12">
                    <h1>Hello, {this.props.userInfo.name}</h1>
                    <hr />
                </div>
                <Form model="profile" onSubmit={(values) => this.onSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="name" xs={{ size: 1, offset: 1 }}>
                            <span className="fa fa-id-card-o fa-lg" />
                        </Label>
                        <Col xs={9}>
                            <Control.text
                                model=".name"
                                id="name"
                                name="name"
                                value={this.props.userInfo.name}
                                className="form-control"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="email" xs={{ size: 1, offset: 1 }}>
                            <span className="fa fa-envelope-o fa-lg" />
                        </Label>
                        <Col xs={9}>
                            <Control.text
                                model=".email"
                                id="email"
                                name="email"
                                value={this.props.userInfo.email}
                                className="form-control"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="tel" xs={{ size: 1, offset: 1 }}>
                            <span className="fa fa-phone fa-lg" />
                        </Label>
                        <Col xs={9}>
                            <Control.text
                                model=".tel"
                                id="tel"
                                name="tel"
                                value={this.props.userInfo.tel}
                                className="form-control"
                            />
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Profile;
