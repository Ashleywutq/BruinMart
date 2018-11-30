import React, { Component } from 'react';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import SearchComponent from './SearchComponent';
import NewPostModal from './NewPostComponent';
import { Navbar, Nav, NavbarToggler, NavItem } from 'reactstrap';

function RenderButton(isLoggedIn, resetNewPostForm, postItem, fetchUserInfo, loginError) {
    if (isLoggedIn) {
        return <NewPostModal resetNewPostForm={resetNewPostForm} postItem={postItem} />;
    } else {
        return <Login fetchUserInfo={fetchUserInfo} loginError={loginError} />;
    }
}

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.toggleSideNav = this.props.toggleSideNav.bind(this);
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
                        <NavbarToggler onClick={this.toggleSideNav} />

                        <Nav className="col-8" navbar>
                            <NavItem>
                                <SearchComponent
                                    filterResults={this.props.filterResults}
                                    fetchItems={this.props.fetchItems}
                                />
                            </NavItem>
                        </Nav>
                        <Nav className="col-2" navbar>
                            <NavItem>
                                {RenderButton(
                                    this.props.isLoggedIn,
                                    this.props.resetNewPostForm,
                                    this.props.postItem,
                                    this.props.fetchUserInfo,
                                    this.props.loginError
                                )}
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
            </>
        );
    }
}

export default Header;
