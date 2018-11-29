import React, { Component } from 'react';
import Home from './HomeComponent';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterResults, fetchItems } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    return {
        sellItems: state.sellItems,
        users: state.users
    };
};

const mapDispatchToProps = (dispatch) => ({
    filterResults: (searchText) => {
        dispatch(filterResults(searchText));
    },
    fetchItems: () => {
        dispatch(fetchItems());
    }
});

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchItems();
    }

    handleSubmit(event) {
        this.setState({
            loggedIn: true
        });
        event.preventDefault();
    }

    render() {
        const HomePage = () => {
            return <Home sellItems={this.props.sellItems.sellItems} />;
        };

        return (
            <div>
                <Header
                    users={this.props.users}
                    filterResults={this.props.filterResults}
                    fetchItems={this.props.fetchItems}
                />
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
