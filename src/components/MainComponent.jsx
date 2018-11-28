import React, { Component } from 'react';
import Home from './HomeComponent';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterResults } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
    return {
        sellItems: state.sellItems,
        users: state.users
    };
};

const mapDispatchToProps = (dispatch) => ({
    filterResults: (searchText) => dispatch(filterResults(searchText))
    // postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    // fetchDishes: () => {
    //     dispatch(fetchDishes());
    // },
    // fetchComments: () => {
    //     dispatch(fetchComments());
    // },
    // fetchPromos: () => {
    //     dispatch(fetchPromos());
    // },
    // resetFeedbackForm: () => {
    //     dispatch(actions.reset('feedback'));
    // }
});

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
            return <Home sellItems={this.props.sellItems} />;
        };

        return (
            <div>
                <Header users={this.props.users} filterResults={this.props.filterResults} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Redirect to="/" />
                </Switch>
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
