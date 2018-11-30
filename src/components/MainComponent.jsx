import React, { Component } from 'react';
import Home from './HomeComponent';
import Profile from './ProfileComponent';
import Header from './HeaderComponent';
import SideBar from './SideBarComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterResults, fetchItems, postItem, reserveItem } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

import '../style.css';

const mapStateToProps = (state) => {
    return {
        sellItems: state.sellItems,
        users: state.users
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
                        users={this.props.users}
                        filterResults={this.props.filterResults}
                        fetchItems={this.props.fetchItems}
                        toggleSideNav={this.toggleSideNav}
                        resetNewPostForm={this.props.resetNewPostForm}
                        postItem={this.props.postItem}
                    />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/profile" component={Profile} />
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
