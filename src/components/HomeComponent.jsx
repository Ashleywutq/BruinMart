import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardLink, Button, Row } from 'reactstrap';
import { RenderItem } from './ItemDetailComponent';

function RenderCard({ item }) {
    return (
        <Card>
            <CardImg
                top
                height="200px"
                width="200px"
                src={item.picture}
                alt={item.name}
            />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {/* <CardSubtitle></CardSubtitle> */}
                <CardText>
                    <b>Seller:</b> {item.seller}
                    <br/>
                    <b>More details:</b> {item.detail}
                </CardText>
                <Row>{/* <ReserveModal /> {' '} <SaveModal /> */}</Row>
                <CardLink href="#" className="float-right">
                    More Info
                </CardLink>
            </CardBody>
        </Card>
    );
}

function Home(props) {
    const sellItems = props.sellItems.map((item) => {
        return (
            <div key={item.id} className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={item} />
                </div>
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Items On Sale</h3>
                    <hr />
                </div>
            </div>
            <div className="row">{sellItems}</div>
        </div>
    );
}

export default Home;
