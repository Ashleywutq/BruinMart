import React, { Component } from 'react';
import Home from './HomeComponent';
import Profile from './ProfileComponent';
import Header from './HeaderComponent';
import SideBar from './SideBarComponent';
import PostList from './PostListComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterResults, fetchItems, postItem, fetchUserInfo, reserveItem, logoutUser } from '../redux/ActionCreators';
import { checkLoginInfo } from '../shared/validators';
import * as MessageTypes from '../shared/MessageTypes';
import { actions } from 'react-redux-form';

import '../style.css';

const mapStateToProps = (state) => {
    return {
        sellItems: state.sellItems,
        users: state.users,
        loginError: state.users.error
    };
};

const mapDispatchToProps = (dispatch) => ({
    postItem: (item) => dispatch(postItem(item)),
    logoutUser: () => {
        dispatch(logoutUser());
    },
    filterResults: (searchText) => {
        dispatch(filterResults(searchText));
    },
    fetchItems: () => {
        dispatch(fetchItems());
    },
    resetNewPostForm: () => {
        dispatch(actions.reset('newPost'));
    },
    reserveItem: (key) => {
        dispatch(reserveItem(key));
    },
    resetLoginForm: () => {
        dispatch(actions.reset('login'));
    },
    fetchUserInfo: (username, password) => {
        dispatch(actions.setPending('login.username', true));
        dispatch(actions.setPending('login.password', true));

        checkLoginInfo(username, password).then((message) => {
            let valid = {
                username: true,
                password: true
            };
            if (message === MessageTypes.SUCCESS) {
                dispatch(fetchUserInfo(username));
            } else if (message === MessageTypes.USER_NOT_EXIST) {
                valid.username = false;
            } else if (message === MessageTypes.PASSWORD_WRONG) {
                valid.password = false;
            }
            dispatch(
                actions.setValidity('login.username', {
                    isLoginValid: valid.username
                })
            );
            dispatch(
                actions.setValidity('login.password', {
                    isLoginValid: valid.password
                })
            );
            dispatch(actions.setPending('login.username', false));
            dispatch(actions.setPending('login.password', false));
        });
    }
});

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            isSideNavOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleSideNav = this.toggleSideNav.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchItems();
    }

    handleStateChange(state) {
        this.setState({
            isSideNavOpen: state.isOpen
        });
    }

    toggleSideNav() {
        this.setState({
            isSideNavOpen: !this.state.isSideNavOpen
        });
    }

    handleSubmit(event) {
        this.setState({
            loggedIn: true
        });
        event.preventDefault();
    }

    render() {
        const HomePage = () => {
            return <Home sellItems={this.props.sellItems.sellItems} reserveItem={this.props.reserveItem} />;
        };

        const PostPage = () => {
            return (
                <PostList
                    sellItems={this.props.sellItems.sellItems}
                    posts={this.props.users.userInfo.posts}
                    isLoggedIn={this.props.users.isLoggedIn}
                />
            );
        };

        const ProfilePage = () => {
            return <Profile userInfo={this.props.users.userInfo} />;
        };

        const OngoingPage = () => {
            return (
                <PostList
                    sellItems={this.props.sellItems.sellItems}
                    posts={this.props.users.userInfo.posts}
                    isLoggedIn={this.props.users.isLoggedIn}
                    renderOngoing={true}
                />
            );
        };

        return (
            <div id="App">
                <SideBar
                    noOverlay
                    users={this.props.users}
                    pageWrapId={'page-wrapper'}
                    outerContainerId={'App'}
                    isOpen={this.state.isSideNavOpen}
                    onStateChange={(state) => this.handleStateChange(state)}
                    toggleSideNav={this.toggleSideNav}
                    isLoggedIn={this.props.users.isLoggedIn}
                    fetchUserInfo={this.props.fetchUserInfo}
                    logoutUser={this.props.logoutUser}
                />
                <div id="page-wrapper">
                    <Header
                        filterResults={this.props.filterResults}
                        fetchItems={this.props.fetchItems}
                        toggleSideNav={this.toggleSideNav}
                        resetNewPostForm={this.props.resetNewPostForm}
                        postItem={this.props.postItem}
                        isLoggedIn={this.props.users.isLoggedIn}
                        fetchUserInfo={this.props.fetchUserInfo}
                        loginError={this.props.loginError}
                        users={this.props.users}
                    />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/profile" component={ProfilePage} />
                        <Route path="/ongoing" component={OngoingPage} />
                        <Route path="/posts" component={PostPage} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Main)
);
