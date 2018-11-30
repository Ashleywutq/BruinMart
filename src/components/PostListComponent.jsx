import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from 'react-avatar';
import Typography from '@material-ui/core/Typography';
import { itemsLoading } from '../redux/ActionCreators';

var divStyle = {
    background: 'white',
    padding: '0px',
    margin: '0px'
};

function RenderListItem({ item }) {
    var reserved = 'Not Reserved';
    if (item.reserved == true) {
        reserved = 'Reserved';
    }
    var time = item.time;
    time = time.slice(0, 10);
    return (
        <ListItem alignItems="flex-start" style={{ height: 200 }}>
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={item.picture} size="150" />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography component="span" color="textPrimary" variant="display1">
                        {item.name}
                    </Typography>
                }
                secondary={
                    <React.Fragment>
                        <Typography component="span" color="textPrimary" variant="title">
                            {reserved}
                        </Typography>
                        <Typography component="span" color="textPrimary" variant="body2">
                            {time}
                        </Typography>
                        <Typography component="span" color="textPrimary" variant="body2">
                            Price: ${item.price}
                        </Typography>
                        Description: {item.detail}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

function PostList(props) {
    if (!props.isLoggedIn) {
        return (
            <div className="container">
                <div className="col-12">
                    <h3>Please Login First</h3>
                    <hr />
                </div>
            </div>
        );
    }
    const sellItems = props.sellItems.map((item) => {
        //console.log("props.posts: " + props.posts);
        //console.log("item.id: " + item.id);
        //console.log(props.posts[item.id]);
        var arr = [];
        for (var key in props.posts) {
            if (props.posts.hasOwnProperty(key)) {
                //console.log(key);
                //console.log(props.posts[key]);
                arr.push(props.posts[key]);
            }
        }
        if (arr.indexOf(item.id) < 0) {
            return <div />;
        } else {
            //console.log("sellItems: " + item.name);
            return (
                <div key={item.id} className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        <RenderListItem item={item} />
                    </div>
                </div>
            );
        }
    });

    return (
        <div className="container">
            <div className="col-12">
                <h3>My Posts</h3>
                <hr />
            </div>
            <div style={divStyle}>
                <List>{sellItems}</List>
            </div>
        </div>
    );
}

export default PostList;
