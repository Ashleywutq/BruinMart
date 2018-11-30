import React, { Component } from 'react';
import Home from './HomeComponent';
import Profile from './ProfileComponent';
import Header from './HeaderComponent';
import SideBar from './SideBarComponent';
import PostList from './PostListComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterResults, fetchItems, postItem, fetchUserInfo, reserveItem } from '../redux/ActionCreators';
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
    fetchUserInfo: (username, password, toggle) => {
        dispatch(fetchUserInfo(username, password));
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
                    />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/profile" component={Profile} />
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
