//  TODO:  make this the normal home page after the user logs in

import React from 'react';
import {
    Card,
    CardImg,
    CardImgOverlay,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderMarketItem({ item, onClick }) {
    return (
        <Card>
            <Link to={`/menu/${item.id}`}>
                <CardImg width="100%" src={item.image} alt={item.name} />
                <CardImgOverlay>
                    <CardTitle>{item.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const Market = props => {
    const menu = props.dishes.map(item => {
        return (
            <div key={item.id} className="col-12 col-md-5 m-1">
                <RenderMarketItem dish={item} />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem active>Market</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Market</h3>
                    <hr />
                </div>
            </div>
            <div className="row">{menu}</div>
        </div>
    );
};

export default Market;
