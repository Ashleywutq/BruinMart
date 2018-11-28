//  TODO: Profiles

import React, { Component } from "react";
import "mdbreact/dist/css/mdb.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Fa
} from "mdbreact";

import { BrowserRouter as Router } from "react-router-dom";
class Profile extends React.Component {
  state = {
    collapseID: ""
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  render() {
    return (
      <Navbar color="secondary-color" dark expand="xl" fixed="top" scrolling>
        <NavbarBrand href="/">
          <strong>
            <FontAwesomeIcon icon="stroopwafel" />
            BruinMart
          </strong>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
        <Collapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
          <NavbarNav left>
            <NavItem active>
              <NavLink to="/">
                <FontAwesomeIcon icon="home" />
                Home
              </NavLink>
            </NavItem>
          </NavbarNav>
          <NavbarNav right>
            <NavItem>
              <NavLink
                className="waves-effect waves-light d-flex align-items-center"
                to="#!"
              >
                1<Fa icon="envelope" className="ml-1" />
              </NavLink>
            </NavItem>
            <NavItem>
              <Dropdown>
                <DropdownToggle className="dopdown-toggle" nav>
                  <img
                    src="assets/images/joe_bruin.jpg"
                    className="rounded-circle z-depth-0"
                    style={{ height: "35px", padding: 0 }}
                    alt=""
                  />
                </DropdownToggle>
                <DropdownMenu className="dropdown-default" right>
                  <DropdownItem href="/profile">My account</DropdownItem>
                  <DropdownItem href="/login">Log out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Profile;
