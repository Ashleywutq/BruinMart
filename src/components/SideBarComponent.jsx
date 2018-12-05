import React from 'react';
import { NavbarBrand, Nav, NavItem } from 'reactstrap';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import Avatar from 'react-avatar';
import Login from './LoginComponent';

function RenderSidebar(isLoggedIn, name, fetchUserInfo, loginError, logoutUser) {
    if (isLoggedIn) {
        return (
            <div>
                <NavItem>
                    <NavLink className="nav-link" to="/profile">
                        <h4>Hello, {name} </h4>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/home">
                        <span className="fa fa-home fa-lg fa-fw" /> Market
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/profile">
                        <span className="fa fa-user fa-lg fa-fw" /> My Profile
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/posts">
                        <span className="fa fa-stack-exchange fa-lg fa-fw" /> My Posts
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/saved">
                        <span className="fa fa-heart-o fa-lg fa-fw" /> Saved Items
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/ongoing">
                        <span className="fa fa-exchange fa-lg fa-fw" /> Ongoing
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/sold">
                        <span className="fa fa-shopping-bag fa-lg fa-fw" /> Sold
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/settings">
                        <span className="fa fa-cog fa-lg fa-fw" /> Settings
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/home" onClick={logoutUser}>
                        <span className="fa fa-sign-out fa-lg fa-fw" /> Logout
                    </NavLink>
                </NavItem>
            </div>
        );
    } else {
        return (
            <div>
                <NavItem>
                    <Login fetchUserInfo={fetchUserInfo} loginError={loginError} isSideBar={true} />
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
                {RenderSidebar(
                    props.isLoggedIn,
                    props.users.userInfo.name,
                    props.fetchUserInfo,
                    props.loginError,
                    props.logoutUser
                )}
            </Nav>
        </Menu>
    );
};

export default SideBar;
