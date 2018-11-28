import React, { Component } from "react";
import Home from "./HomeComponent";
import Login from "./LoginComponent";
import Register from "./RegisterComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Profile from "./ProfileComponent";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.setState({
      loggedIn: true
    });
    event.preventDefault();
  }

  render() {
    const HomePage = () => {
      return <Home />;
    };

    const LoginPage = () => {
      return <Login onSubmit={this.handleSubmit} />;
    };

    const ProfilePage = () => {
      return <Profile />;
    };

    if (this.state.loggedIn) {
      return (
        <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Redirect to="/" />
          </Switch>
        </div>
      );
    } else {
      return (
        <div>
          <Switch>
            <Route path="/register" component={() => <Register />} />
            <Route path="/login" component={LoginPage} />
            <Route path="/profile" component={ProfilePage} />
            <Redirect to="/login" />
          </Switch>
        </div>
      );
    }
  }
}

export default Main;
