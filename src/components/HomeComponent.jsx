import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardDeck, CardSubtitle, Row, Col } from 'reactstrap';
import ReserveModal from './ReserveModalComponent';
import SaveModal from './SaveModalComponent';
import Moment from 'react-moment';

function RenderCard({ item, reserveItem }) {
    return (
        <Card>
            <CardImg top width="100%" className="card-img-top img-fluid" src={item.picture} alt={item.name} />
            <CardBody>
                <CardTitle className="card-title">
                    <span style={{'width': '27.3vw', 'wordWrap': 'break-word'}}> {item.name} </span>
                    <span> ${item.price}</span>
                </CardTitle>
                <CardSubtitle>
                    {item.seller}
                    <br />
                    <Moment date={item.time} format="MMM D YYYY HH:MM" />
                </CardSubtitle>
                <CardText style={{'width': '27.3vw', 'wordWrap': 'break-word'}}>{item.detail}</CardText>
                <Row>
                    <Col xl={{ size: 4, offset: 1 }}>
                        <ReserveModal item={item} reserveItem={reserveItem} />
                    </Col>
                    <Col xl={{ size: 4, offset: 2 }}>
                        <SaveModal item={item} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

function Home(props) {
    const sellItems = props.sellItems.map((item) => {
        return (
            <div key={item.id} className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={item} reserveItem={props.reserveItem} />
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
