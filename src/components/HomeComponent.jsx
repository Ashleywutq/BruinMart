import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardDeck, CardSubtitle, CardLink, Button, Row } from 'reactstrap';
import ReserveModal from "./ReserveModalComponent";
import SaveModal from "./SaveModalComponent";
import { RenderItem } from './ItemDetailComponent';

function RenderCard({ item }) {
    if (item == null) {
        return (
            <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBody>
                    <CardTitle>Item Name</CardTitle>
                    <CardSubtitle>Posted by Joe Bruin on 26/11/2018</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <div class="row">
                        <div class="col-sm">
                        <ReserveModal />
                        </div>
                        <div class="col-sm">
                        <SaveModal />
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }
    return (
        <Card>
            <CardImg top width="100%" className="card-img-top img-fluid" src={item.picture} alt={item.name} />
            <CardBody>
                <CardTitle id="HASH">
                    <span> {item.name} </span>
                    <span> {item.price}</span>
                </CardTitle>
                <CardSubtitle>{item.seller} <br /> {item.time}</CardSubtitle>
                <CardText>{item.detail}</CardText>
                    <div class="row">
                        <div class="col-sm">
                        <ReserveModal item={item}/>
                        </div>
                        <div class="col-sm">
                        <SaveModal item={item}/>
                        </div>
                    </div>
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
            <div className="row">
                <CardDeck>
                    {sellItems}
                </CardDeck>
            </div>
        </div>
    );
}

export default Home;
