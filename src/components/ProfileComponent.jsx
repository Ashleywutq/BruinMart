import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';

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
                            <h1>Hello {this.props.userInfo.name},</h1>
                            <p>email: {this.props.userInfo.email}</p>
                            <p>contact number: {this.props.userInfo.tel}</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
        );
    }
}

export default Profile;
