import React from "react";
import { Badge, Card } from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/LinkContainer";

function SimilarProduct({ _id, name, kategorija, slika }) {
    return (
        <LinkContainer to={`/product/${_id}`} style={{ cursor: "pointer", width: "13rem", margin: "10px" }}>
        <Card style={{ width: "20rem", margin: "10px" }}>
            <Card.Img variant="top" className="product-preview-img" src={slika} style={{ height: "150px", objectFit: "cover" }} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Badge bg="warning" text="dark">
                    {kategorija}
                </Badge>
            </Card.Body>
        </Card>
    </LinkContainer>
    );
}

export default SimilarProduct;