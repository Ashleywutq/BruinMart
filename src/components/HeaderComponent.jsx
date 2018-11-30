import React, { Component } from "react";
import Login from "./LoginComponent";
import Register from "./RegisterComponent";
import SearchComponent from "./SearchComponent";
import NewPostModal from "./NewPostComponent";
import { connect } from "react-redux";
import { Navbar, Nav, NavbarToggler, NavItem, Jumbotron } from "reactstrap";

function RenderButton(isLoggedin) {
  if (isLoggedin) {
    return <NewPostModal />;
  } else {
    return <Login />;
  }
}

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.toggleSideNav = this.props.toggleSideNav.bind(this);
  }

  handleLogin(event) {
    this.toggleModal();
    alert(
      "Username: " +
        this.username.value +
        " Password: " +
        this.password.value +
        " Remember: " +
        this.remember.checked
    );
    event.preventDefault();
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
            <Nav navbar>
              <NavItem>{RenderButton(this.props.isLoggedin)}</NavItem>
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
                <p>
                  We want to redesign the user experience for using the Facebook
                  "Free and For Sale" group for both buyers and sellers.{" "}
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
      </>
    );
  }
}

const mapStateToProps = state => ({
  username: state.users.username,
  password: state.users.password,
  isLoggedin: state.users.isLoggedIn
});

export default connect(
  mapStateToProps,
  {}
)(Header);
