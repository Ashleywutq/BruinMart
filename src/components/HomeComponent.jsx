import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,CardLink, Button } from 'reactstrap';
import PropTypes from 'prop-types';


function RenderCard({ item }) {
    return (
        /*
        <Card>
            <CardImg src={item.image} alt={item.name}/>
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? (
                    <CardSubtitle>{item.designation}</CardSubtitle>
                ) : null}
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
        */
       <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
            <CardTitle>Item Name</CardTitle>
            <CardSubtitle>Posted by Joe Bruin</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button onClick={()=>{ alert('Item saved!'); }}>Save</Button> <CardLink href="#" className="float-right">More Info</CardLink>
            </CardBody>
        </Card>
    );
}
  

function Home(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
            <div className="col-12 col-md m-1">
                <RenderCard item={null}/>
            </div>
            <div className="col-12 col-md m-1">
                <RenderCard item={null}/>
            </div>
            <div className="col-12 col-md m-1">
                <RenderCard item={null}/>
            </div>
            </div>
            <div className="row align-items-start">
            <div className="col-12 col-md m-1">
                <RenderCard item={null}/>
            </div>
            <div className="col-12 col-md m-1">
                <RenderCard item={null}/>
            </div>
            <div className="col-12 col-md m-1">
                <RenderCard item={null}/>
            </div>
            </div>
            <div className="row align-items-start">
            <div className="col-12 col-md m-1">
                <RenderCard item={null}/>
            </div>
            <div className="col-12 col-md m-1">
                <RenderCard item={null}/>
            </div>
            <div className="col-12 col-md m-1">
                <RenderCard item={null}/>
            </div>
            </div>
        </div>
    );
}

export default Home;
