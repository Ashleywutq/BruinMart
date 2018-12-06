import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from 'react-avatar';
import Typography from '@material-ui/core/Typography';
import { Row, Col } from 'reactstrap';

var divStyle = {
    background: 'white',
    padding: '0px',
    margin: '0px'
};

function RenderListItem({ item, renderOngoing, unreserveItem }) {
    const reservedTexts = item.reserved.isReserved ? `Reserved by ${item.reserved.name}` : 'Not Reserved';
    const phoneNum = renderOngoing ? item.seller.tel : item.reserved.tel;
    const phoneButton = item.reserved.isReserved ? (
        <Button href={`tel:${phoneNum}`}>
            <span className="fa fa-phone fa-fw" /> {phoneNum}
        </Button>
    ) : (
        <div />
    );
    const email = renderOngoing ? item.seller.email : item.reserved.email;
    const emailButton = item.reserved.isReserved ? (
        <Button href={`mailto:${email}`} style={{ 'text-transform': 'none' }}>
            <span className="fa fa-envelope-o fa-fw" /> {email}
        </Button>
    ) : (
        <div />
    );
    var time = item.time;
    time = time.slice(0, 10);
    return (
        <ListItem alignItems="flex-start">
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
                        <Typography component="span" color="textPrimary" variant="subtitle1">
                            <Row>
                                <Col xs={4}>{renderOngoing ? `Seller: ${item.seller.name}` : reservedTexts}</Col>
                                <Col xs={{ size: 3, offset: 1 }}>{phoneButton}</Col>
                                <Col xs={{ size: 3 }}>{emailButton}</Col>
                            </Row>
                        </Typography>
                        <Typography component="span" color="textPrimary" variant="body2">
                            {time}
                        </Typography>
                        <Typography component="span" color="textPrimary" variant="body2">
                            Price: ${item.price}
                        </Typography>
                        <Row>
                            <Col xs={4}>Description: {item.detail}</Col>
                            {item.reserved.isReserved ? (
                                <Col
                                    xs={{
                                        size: renderOngoing ? 3 : 4,
                                        offset: renderOngoing ? 5 : 4
                                    }}
                                >
                                    <Button
                                        size="medium"
                                        bsStyle="primary"
                                        bsSize="large"
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => unreserveItem(item.id)}
                                    >
                                        {renderOngoing ? 'Unreserve' : 'Cancel Transaction'}
                                    </Button>
                                </Col>
                            ) : (
                                <Col xs={{ size: 3, offset: 5 }} />
                            )}
                        </Row>
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

class PostList extends Component {
    constructor(props) {
        super(props);

        this.unreserveItem = this.unreserveItem.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(filterCriteria) {
        return this.props.sellItems.filter(filterCriteria).map((item) => {
            return (
                <div key={item.id} className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        <RenderListItem
                            item={item}
                            renderOngoing={this.props.renderOngoing}
                            unreserveItem={this.unreserveItem}
                        />
                    </div>
                </div>
            );
        });
    }

    unreserveItem(key) {
        this.props.unreserveItem(key);
        setTimeout(() => {
            this.forceUpdate();
            alert('Reservation canceled!');
        }, 500);
    }

    render() {
        if (!this.props.isLoggedIn) {
            return (
                <div className="container start-of-home">
                    <div className="col-12">
                        <h3>Please Login First</h3>
                        <hr />
                    </div>
                </div>
            );
        }
        var arr = [];
        if (!this.props.renderOngoing) {
            for (let key in this.props.users.userInfo.posts) {
                if (this.props.users.userInfo.posts.hasOwnProperty(key)) {
                    arr.push(this.props.users.userInfo.posts[key]);
                }
            }
        } else {
            for (let i = 0; i < this.props.sellItems.length; i++) {
                let item = this.props.sellItems[i];
                if (item.reserved.name === this.props.users.userInfo.name) {
                    arr.push(item.id);
                }
            }
        }

        var reservedItems = this.renderItem((item) => arr.indexOf(item.id) >= 0 && item.reserved.isReserved);
        if (!this.props.renderOngoing) {
            reservedItems = reservedItems.concat(
                this.renderItem((item) => arr.indexOf(item.id) >= 0 && !item.reserved.isReserved)
            );
        }

        const title = this.props.renderOngoing === true ? 'My Ongoing Posts' : 'My Posts';

        return (
            <div className="container start-of-home">
                <div className="col-12">
                    <h3>{title}</h3>
                    <hr />
                </div>
                <div style={divStyle}>
                    <List>{reservedItems}</List>
                </div>
            </div>
        );
    }
}

export default PostList;
