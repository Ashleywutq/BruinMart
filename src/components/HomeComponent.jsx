import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardDeck, CardSubtitle, Row, Col } from 'reactstrap';
import ReserveModal from './ReserveModalComponent';
import SaveModal from './SaveModalComponent';
import Moment from 'react-moment';

function RenderReserve(isLoggedIn, item, reserveItem) {
    if (isLoggedIn) {
        return <ReserveModal item={item} reserveItem={reserveItem} />;
    } else {
        return;
    }
}

function RenderSave(isLoggedIn, item) {
    if (isLoggedIn) {
        return <SaveModal item={item} />;
    } else {
        return;
    }
}

function RenderCard({ item, reserveItem, isLoggedIn }) {
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
                    <Col>{RenderReserve(isLoggedIn, { item }, { reserveItem })}</Col>
                    <Col xl={{ size: 4, offset: 2 }}>{RenderSave(isLoggedIn, { item })}</Col>
                </Row>
            </CardBody>
        </Card>
    );
}

function Home(props) {
    const sellItems = props.sellItems
        .filter((item) => !item.reserved.isReserved)
        .map((item) => {
            return (
                <div key={item.id} className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        <RenderCard item={item} reserveItem={props.reserveItem} isLoggedIn={props.isLoggedIn} />
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

export default Home;
