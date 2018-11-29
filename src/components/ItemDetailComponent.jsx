import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardLink,
    Button,
    Row,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import ReserveModal from './ReserveModalComponent';
import SaveModal from './SaveModalComponent';

export const RenderItem = ({ selectedItem }) => {
    if (selectedItem == null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg
                        top
                        width="100%"
                        src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                        alt="Card image cap"
                    />
                    <CardBody>
                        <CardTitle>Item Name</CardTitle>
                        <CardSubtitle>
                            Joe Bruin <br /> 26/11/2018
                        </CardSubtitle>
                        <CardText>
                            Some quick example text to build on the card title and make up the bulk of the card's
                            content.
                        </CardText>
                        <Row>
                            <ReserveModal /> <SaveModal />
                        </Row>
                    </CardBody>
                </Card>
            </div>
        );
    }
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={selectedItem.picture} alt={selectedItem.name} />
                <CardBody>
                    <CardTitle>{selectedItem.name}</CardTitle>
                    <CardSubtitle>
                        {selectedItem.seller}
                        <br />
                        <Moment parse="MMM D YYYY HH:mm" date={selectedItem.date} />
                    </CardSubtitle>
                    <CardText>{selectedItem.detail}</CardText>
                    <Row>
                        <ReserveModal /> <SaveModal />
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

function RenderComments({ comments }) {
    if (comments == null) {
        return <div />;
    } else {
        const elements = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>
                        -- {comment.author}, <Moment format="MMM DD, YYYY">{comment.date}</Moment>
                    </p>
                </li>
            );
        });
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">{elements}</ul>
            </div>
        );
    }
}

const ItemDetail = (props) => {
    console.log(props);
    if (props.selectedItem == null) {
        return <div />;
    } else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.selectedItem.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.selectedItem.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderItem selectedDish={props.selectedItem} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
};

export default ItemDetail;
