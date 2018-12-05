import React, { Component } from "react";
import { connect } from "react-redux";
import { Control, Errors, actions } from 'react-redux-form';
import {
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Col, 
  Row
} from "reactstrap";
import validator from 'validator';
import { required} from '../shared/validators';

// class Profile extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   render() {
//     return (
//       <Jumbotron>
//         <div className="container">
//           <div className="row row-header">
//             <div className="col-12 col-sm-6">
//               <h1>Hello {this.props.userInfo.name},</h1>
//               <table cellpadding="10">
//                 <tr>
//                   <td> <span className="fa fa-envelope-o fa-lg" /></td>
//                   <td>{this.props.userInfo.email}</td>
//                 </tr>
//                 <tr>
//                   <td><span className="fa fa-phone fa-lg" /></td> 
//                   <td>{this.props.userInfo.tel}</td>
//                 </tr>  
//               </table>            
//             </div>
//           </div>
//         </div>
//       </Jumbotron>
//     );
//   }
// }


// export default Profile;




class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(values) {
        this.props.StoreUserInfo(values.name, this.props.userInfo.username, this.props.userInfo.password, values.email, values.tel);
    }

    render() {
        return (
            <div className="start-of-home">

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
                            placeholder={this.props.userInfo.email}
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
                        <span className="fa fa-phone fa-lg" />
                    </Label>
                    <Col xs={9}>
                        <Control.text
                            model=".tel"
                            id="tel"
                            name="tel"
                            placeholder={this.props.userInfo.tel}
                            className="form-control"
                            validators={{
                                required,
                                isMobilePhone: (val) => val && validator.isMobilePhone(val)
                            }}
                        />
                        <Errors
                            className="text-danger"
                            model=".tel"
                            show="touched"
                            messages={{
                                required: 'Required. ',
                                isMobilePhone: "Phone number's format is wrong. Please use all numbers."
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ size: 4, offset: 7 }}>
                        <Button block type="submit" value="submit" color="primary" >
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
            </div>
        );
    }
}


export default Profile;

// const mapDispatchToProps = (dispatch) => ({
//     resetRegisterForm: () => {
//         dispatch(actions.reset('register'));
//     },
//     StoreUserInfo: (name, username, password, email, phone) => {
//         dispatch(StoreUserInfo(name, username, password, email, phone));
//     }
// });

// export default connect(
//     (state) => {
//         return {};
//     },
//     mapDispatchToProps
// )(Register);
