import React from 'react';
import { NavbarBrand, Nav, NavItem } from 'reactstrap';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import Avatar from 'react-avatar';
import Login from './LoginComponent';

function RenderSidebar(isLoggedIn, name, fetchUserInfo, loginError) {
    if (isLoggedIn) {
        return (
            <div>
                <NavItem>
                    <NavLink className="nav-link" to="/profile">
                        <h4>Hello, {name} </h4>
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
            </div>
        );
    } else {
        return (
            <div>
                <NavItem>
                    <h4>Please Log in</h4>
                </NavItem>
                <NavItem>
                    <Login fetchUserInfo={fetchUserInfo} loginError={loginError} />
                </NavItem>
            </div>
        );
    }
}

const SideBar = (props) => {
    const avatarSrc = props.isLoggedIn ? props.users.userInfo.avatar : 'assets/images/joe_bruin.jpg';
    return (
        // Pass on our props
        <Menu {...props}>
            <Nav navbar onClick={props.toggleSideNav}>
                <NavbarBrand className="mr-auto col-2 col-sm-2">
                    <Avatar size={100} src={avatarSrc} round={true} />
                </NavbarBrand>
                {RenderSidebar(props.isLoggedIn, props.users.userInfo.name, props.fetchUserInfo, props.loginError)}
            </Nav>
        </Menu>
    );
};

export default SideBar;
