import React, { Component } from 'react';
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
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Avatar from 'react-avatar';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    handleLogin(event) {
        this.toggleModal();
        alert('Username: ' + this.username.value + ' Password: ' + this.password.value + ' Remember: ' + this.remember.checked);
        event.preventDefault();
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (
            <>
                <Navbar dark fixed="top">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto">
                            <Avatar size={50} src="assets/images/joe_bruin.jpg" round={true} />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/profile">
                                        <h4>Joe Bruin</h4>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/profile">
                                        <span className="fa fa-user fa-lg" /> My Profile
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/posts">
                                        <span className="fa fa-stack-exchange fa-lg" /> My Posts
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/saved">
                                        <span className="fa fa-heart-o fa-lg" /> Saved Items
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/ongoing">
                                        <span className="fa fa-exchange fa-lg" /> Ongoing
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/sold">
                                        <span className="fa fa-shopping-bag fa-lg" /> Sold
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/settings">
                                        <span className="fa fa-cog fa-lg" /> Settings
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg" /> Login
                                    </Button>
                                </NavItem>
                            </Nav>


                        
                        {/* <Nav className="md-mx-auto">
                                <NavItem>
                                    <NavLink className="nav-link nav-buttons" to="/home">
                                        <span className="fa fa-shopping-bag fa-lg" />
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link nav-buttons" to="/settings">
                                        <span className="fa fa-user fa-lg" />
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link nav-buttons" to="/newpost">
                                        <span className="fa fa-plus-square-o fa-lg" />
                                    </NavLink>
                                </NavItem>
                            </Nav> */}
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>BruinMart</h1>
                                <p>We want to redesign the user experience for using the Facebook "Free and For Sale" group for both buyers and sellers. </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" innerRef={input => (this.username = input)} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" innerRef={input => (this.password = input)} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember" innerRef={input => (this.remember = input)} /> Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">
                                Login
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default Header;
