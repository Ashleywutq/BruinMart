import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardDeck, CardSubtitle, Row, Col } from 'reactstrap';
import ReserveModal from './ReserveModalComponent';
import SaveModal from './SaveModalComponent';
import Moment from 'react-moment';
import { setTimeout } from 'timers';

function RenderReserve(users, item, reserveItem) {
    if (!users.isLoggedIn || users.username === item.username) {
        return <div />;
    } else {
        return <ReserveModal userInfo={users.userInfo} item={item} reserveItem={reserveItem} />;
    }
}

function RenderSave(users, item) {
    if (!users.isLoggedIn || users.username === item.username) {
        return <div />;
    } else {
        return <SaveModal item={item} />;
    }
}

function RenderCard({ item, reserveItem, users }) {
    return (
        <Card>
            <CardImg top width="100%" className="card-img-top img-fluid" src={item.picture} alt={item.name} />
            <CardBody>
                <CardTitle className="card-title">
                    <span style={{ width: '27.3vw', wordWrap: 'break-word' }}> {item.name} </span>
                    <span> ${item.price}</span>
                </CardTitle>
                <CardSubtitle>
                    {item.seller}
                    <br />
                    <Moment date={item.time} format="MMM D YYYY HH:MM" />
                </CardSubtitle>
                <CardText style={{ width: '27.3vw', wordWrap: 'break-word' }}>{item.detail}</CardText>
                <Row>
                    <Col xl={{ size: 4, offset: 1 }}>{RenderReserve(users, item, reserveItem)}</Col>
                    <Col xl={{ size: 4, offset: 2 }}>{RenderSave(users, item)}</Col>
                </Row>
            </CardBody>
        </Card>
    );
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.reserveItem = this.reserveItem.bind(this);
    }

    reserveItem(key, name, email, tel) {
        this.props.reserveItem(key, name, email, tel);
        setTimeout(() => this.forceUpdate(), 500);
    }

    render() {
        const sellItems = this.props.sellItems
            .sort((a, b) => new Date(b.time) - new Date(a.time))
            .filter((item) => !item.reserved.isReserved)
            .map((item) => {
                return (
                    <div key={item.id} className="row align-items-start">
                        <div className="col-12 col-md m-1">
                            <RenderCard item={item} reserveItem={this.reserveItem} users={this.props.users} />
                        </div>
                    </div>
                );
            });

        return (
            <div className="container">
                <div className="row start-of-home">
                    <div className="col-12">
                        <h3>Items On Sale</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <CardDeck>{sellItems}</CardDeck>
                </div>
            </div>
        );
    }
}

export default Home;
