import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

function RenderItem({selectedItem}) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={selectedItem.image} alt={selectedItem.name} />
                <CardBody>
                    <CardTitle>{selectedItem.name}</CardTitle>
                    <CardText>{selectedItem.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    if (comments == null) {
        return (
            <div></div>
        );
    } else {
        const elements = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, <Moment format="MMM DD, YYYY">{comment.date}</Moment></p>
                </li>
            );
        });
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {elements}
                </ul>
            </div>
        );
    }
}

const ItemDetail = (props) => {
    console.log(props);
        if (props.selectedItem == null) {
            return <div></div>;
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
