import React, { Component } from 'react';
import Login from './LoginComponent';
import SearchComponent from './SearchComponent';
import NewPostModal from './NewPostComponent';
import { Navbar, Nav, NavbarToggler, NavItem } from 'reactstrap';

function RenderButton(resetNewPostForm, postItem, fetchUserInfo, users, formatPhoneNumbers) {
    if (users.isLoggedIn) {
        return <NewPostModal resetNewPostForm={resetNewPostForm} postItem={postItem} users={users} />;
    } else {
        return <Login fetchUserInfo={fetchUserInfo} loginError={users.userInfo.loginError} formatPhoneNumbers={formatPhoneNumbers} />;
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

                        <Nav className="mx-auto col-6 col-lg-8" navbar>
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
                                    this.props.resetNewPostForm,
                                    this.props.postItem,
                                    this.props.fetchUserInfo,
                                    this.props.users,
                                    this.props.formatPhoneNumbers
                                )}
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar>
            </>
        );
    }
}

export default Header;
